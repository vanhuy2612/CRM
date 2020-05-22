'use strict'

const db = require('../model/db')
const Op = db.Sequelize.Op

class InvoiceController {
    constructor(){}

    // thống kê doanh thu theo sản phẩm trong ngay
    async revenueStatisticsByItemToday(req, res, next){
        let data = await 
            db.items.findAll({
                include: [{
                    model: db.products
                },{ 
                    attributes: ['id'],                                  
                    model: db.orders,
                    through: {
                        attributes: ['price','quantity']
                    },
                    include: [ {
                        attributes: ['id','createdAt'],
                        model: db.invoices,
                        required: true // INNER JOIN
                    }]                   
                }],
                raw: true
            })
        res.json(data)
    }
    // thống kê doanh thu theo khách hàng trong ngày:
    async revenueStatisticsByCustomerToday(req, res, next){
        let today = new Date();
        let startToday = new Date();
            startToday.setHours(0,0,0,0);
        let endToday = new Date();
            endToday.setHours(23,59,59,999)
        let data = await
            db.customers.findAll({
                include: [{
                    attributes: ["id"],
                    model: db.invoices,
                    include: [{
                        attributes: ['id','createdAt'],
                        model: db.orders,
                        include: [{
                            attributes: ['id'],
                            model: db.items,
                            through: {
                                attributes: ['price', 'quantity']
                            }
                        }]
                    }]
                }],
                raw: true
            })
        res.json(data)
    }
    // thống kê doanh thu trong ngày:
    async revenueStatisticsToday(req, res, next){
        let today = new Date();
        let startToday = new Date();
            startToday.setHours(0,0,0,0);
        let endToday = new Date();
            endToday.setHours(23,59,59,999)
        // tính thời điểm khach hàng trả tiền => đứng tại bảng invoice.
        let data = await db.invoices.findAll({
            where: {
                createdAt: {
                    [Op.gte] : startToday,
                    [Op.lte] : endToday
                }
            },
            include: [{
                attributes: ['id', 'customerId'],
                model: db.orders,
                as: 'order',
                include: [{
                    attributes: ['id', 'productId'], // Lấy dữ liệu tại table items
                    model: db.items,
                    through: {
                        attributes: [
                            'price', 'quantity'
                        ]
                    },
                }],

            }],           
            order: [ ['createdAt', 'ASC']],
            raw: true          
        })
        res.json(data)
    }
}

module.exports = new InvoiceController()