'use strict'

const db = require('../model/db')
const Op = db.Sequelize.Op

class InvoiceController {
    constructor(){}

    // thống kê doanh thu theo sản phẩm ko theo thời gian
    async revenueStatisticsByProduct(req, res, next){
        let data = await 
            db.products.findAll({
                include: [{          
                    attributes: ["id"],        
                    model: db.items,
                    include: [ {
                        attributes: ["id","price","quantity"],
                        model: db.orderitems
                    }]                   
                }]
            })
        res.json(data)
    }
    // thống kê doanh thu theo khách hàng ko theo thời gian
    async revenueStatisticsByCustomer(req, res, next){
        let data = await
            db.customers.findAll({
                include: [{
                    attributes: ["id","price","quantity"],
                    model: db.orderitems
                }]
            })
        res.json(data)
    }
    // thống kê doanh thu trong ngày:
    async revenueStatisticsForTheDay(req, res, next){
        let today = new Date();
        let startToday = new Date();
            startToday.setHours(0,0,0,0);
        let endToday = new Date();
            endToday.setHours(23,59,59,999)
        let data = await db.orderitems.findAll({
            attributes: ['id','quantity','price','createdAt'],
            where: {
                createdAt: {
                    [Op.gte] : startToday,
                    [Op.lte] : endToday
                }
            },
            order: [ ['createdAt', 'ASC']]
        })
        res.json(data)
    }
}

module.exports = new InvoiceController()