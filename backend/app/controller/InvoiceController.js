'use strict'

const db = require('../model/db')
const Op = db.Sequelize.Op
const to = require('await-to-js').default

class InvoiceController {
    constructor(){}

    // thống kê doanh thu theo sản phẩm trong ngay
    async revenueStatisticsByItemToday(req, res, next){
        let today = new Date();
        let startToday = new Date();
            startToday.setHours(0,0,0,0);
        let endToday = new Date();
            endToday.setHours(23,59,59,999)

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
                        where:{
                            createdAt: {
                                [Op.gte]: startToday,
                                [Op.lte]: endToday
                            }
                        },
                        required: true // INNER JOIN
                    }]                   
                }],
                order: [ [db.orders, db.invoices, 'createdAt', 'ASC']], // items => order => invoices.createdAt
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
                    attributes: ["id","createdAt"],
                    model: db.invoices,
                    where:{
                        createdAt: {
                            [Op.gte]: startToday,
                            [Op.lte]: endToday
                        }
                    },
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
                order: [ [db.invoices,'createdAt','ASC']], /// Special Order
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
    // tinh so tien thu duoc va so tien khach hang chua thanh toan (tỉ lệ deals)
    async turnoverRatioByCustomer(req, res, next) {
        let [err, customers] = await to(
            db.customers.findAll({
                include: {
                    attributes: ['id'],
                    model: db.orders,  
                    include: [{
                        attributes: ['id'],
                        model: db.items,
                        through: {
                            attributes: ['quantity', 'price', [db.Sequelize.literal('SELECT SUM(quantity*price) AS total FROM orderdetails'),'total']]
                        }                       
                    },{
                        attributes: ['id'],
                        model: db.invoices
                    }]
                },
                raw: true//,  nest: true
            })
        )
        let paymented = []
        customers.forEach(customer => {
            let total = customer["orders.items.orderdetails.price"]*customer["orders.items.orderdetails.quantity"]
            let totalReturn = 0
            // payment rong
            if(paymented.length == 0 ) {
                // nếu khách hàng đã trả tiền: tiền thu lại = total
                if (customer["orders.invoice.id"] != null) totalReturn = total;
                paymented.push({
                    id: customer.id,
                    name: customer.name,
                    type: customer.type,
                    urlImage: customer.urlImage,
                    totalReturn: totalReturn, // số tiền đã trả
                    total: total        // tổng số tiền phải trả
                }) 
            }
            else {
                let index = -1;
                paymented.forEach( ele => {
                    if(ele.id == customer.id) { index = paymented.indexOf(ele);}
                })
                // ko tim thay customer trong payment
                if(index == -1) {
                    // nếu khách hàng đã trả tiền: tiền thu lại = total
                    if (customer["orders.invoice.id"] != null) totalReturn = total;
                    paymented.push({
                        id: customer.id,
                        name: customer.name,
                        type: customer.type,
                        urlImage: customer.urlImage,
                        totalReturn: totalReturn,
                        total: total
                    }) 
                }
                // tim thay
                else { 
                    // nếu khách hàng đã thanh toán
                    if (customer["orders.invoice.id"] != null) paymented[index].totalReturn += total;
                    paymented[index].total += total
                }
            }
        });
        if(err) res.json({
            message: "Faild query",
            errors: err
        })

        else res.json(paymented);
    }
    // tính doanh thu trong 12 tháng gần nhất:
    async revenue12Months(req, res, next) {
        let today = new Date()
        
        let currentMonth = today.getMonth() + 1;
        let currentYear = today.getFullYear()
        
        let results = []; // Mảng 12 tháng tính đến thời điểm hiện tại
        for(let i = 1 ; i <= 12; i++) {
            if ( currentMonth + i <= 12) results.push({
                month : currentMonth + i,
                year: currentYear -1,
                total : 0
            }) 
            else results.push({
                month : currentMonth + i - 12,
                year: currentYear,
                total: 0
            })
        }
        // Truy vấn lấy dữ liệu thanh toán trong 12 tháng gần nhất :\
        let startDate = new Date();
        let endDate = new Date()
        startDate.setDate(0)
        startDate.setMonth(currentMonth+1)
        startDate.setFullYear(currentYear-1)
        startDate.setHours(0,0,0,0)
        endDate.setDate(30)
        endDate.setMonth(currentMonth)
        endDate.setFullYear(currentYear)
        endDate.setHours(23,59,59,999)

        let [ err, data] = await to(
            db.orders.findAll({
                include: [{
                    model: db.items,
                    attributes: ['id'],
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }, {
                    model: db.invoices,
                    require: true,
                    attributes: ['id','createdAt'],
                    where: {
                        createdAt: {
                            [Op.lte] : endDate,
                            [Op.gte] : startDate
                        }
                    }
                }],
                raw: true
            })
        )
        if(err) res.json({
            message: 'Fail',
            errors: err
        })
        data.forEach( ele => {
            let date = new Date(ele["invoice.createdAt"])
            let income = ele["items.orderdetails.price"]*ele["items.orderdetails.quantity"]
            results.forEach( result => {
                if ( date.getFullYear() == result.year && date.getMonth() + 1 == result.month) result.total += income;
            })
        })
        res.json(results);
    }
    // tính doanh thu trong 10 năm gần nhất:
    async revenue10years(req, res, next) {
        let today = new Date();
        let currentYear = today.getFullYear();

        let results = [];
        for(let i = 0;i< 10;i++) results.push({
            year: currentYear - 9 +i,
            total: 0 
        })
        // Truy vấn lấy dữ liệu thanh toán trong 10 năm gần nhất :\
        let startDate = new Date();
        let endDate = new Date()
        startDate.setDate(0)
        startDate.setMonth(0)
        startDate.setFullYear(currentYear-10)
        startDate.setHours(0,0,0,0)
        endDate.setDate(30)
        endDate.setMonth(11)
        endDate.setFullYear(currentYear)
        endDate.setHours(23,59,59,999)

        let [ err, data] = await to(
            db.orders.findAll({
                include: [{
                    model: db.items,
                    attributes: ['id'],
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }, {
                    model: db.invoices,
                    require: true,
                    attributes: ['id','createdAt'],
                    where: {
                        createdAt: {
                            [Op.lte] : endDate,
                            [Op.gte] : startDate
                        }
                    }
                }],
                raw: true
            })
        )
        if(err) res.json({
            message: 'Fail',
            errors: err
        })
        data.forEach( ele => {
            let date = new Date(ele["invoice.createdAt"])
            let income = ele["items.orderdetails.price"]*ele["items.orderdetails.quantity"]
            results.forEach( result => {
                if ( date.getFullYear() == result.year) result.total += income;
            })
        })
        res.json(results);
    }
}

module.exports = new InvoiceController()