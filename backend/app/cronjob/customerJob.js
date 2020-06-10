'use strict'
const CronJob = require('cron').CronJob;
const db = require('../model/db')
const to = require('await-to-js').default
const Op = db.Sequelize.Op

class CustomerJob {
    constructor() { }
    // lấy thông tin từ bảng customerStats rồi tổng hợp lên từ tháng.
    async returnOfYear(time = '* * * * * *') {
        console.log("Conjob: Customer.returnOfMonth")
        let startTime = new Date();//------------------------[ 1 - 1 - last year]
        startTime.setFullYear(startTime.getFullYear() - 1);
        startTime.setMonth(0)
        startTime.setDate(1)
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(); //--------------------------[ 1 - 1 - current year]
        endTime.setFullYear(endTime.getFullYear())
        endTime.setMonth(0)
        endTime.setDate(1)
        endTime.setHours(0, 0, 0, 0)
        // Create cronjob:
        let job = new CronJob(time, async () => {
            let [err, customers] = await to(
                db.customerstats.findAll({
                    where: {
                        type: 'month',
                        timeStart: {
                            [Op.gte]: startTime
                        },
                        timeEnd: {
                            [Op.lte]: endTime
                        }
                    },
                    attributes: [
                        'customerId',
                        [db.sequelize.fn('sum', db.sequelize.col('income')), 'income'],
                        [db.sequelize.fn('sum', db.sequelize.col('total')), 'total']
                    ],
                    group: ['customerId'],
                    raw: true
                })
            )
            //console.log(customers);
            customers.forEach(ele => {
                let data = {
                    customerId: ele.customerId,
                    type: "year",
                    timeStart: startTime,
                    timeEnd: endTime,
                    income: ele.income,
                    total: ele.total || 0
                }
                db.customerstats.create(data)
            })
        }, null, true, 'Asia/Ho_Chi_Minh')
        job.start();
    }
    // chọc vào csdl quét bảng invoice....
    async returnOfMonth(time = '* * * * * *') {
        console.log("Conjob: Customer.returnOfMonth")
        let startTime = new Date();//------------------------[ 1 - last month - year]
        startTime.setMonth(startTime.getMonth() - 1);
        startTime.setDate(1)
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(); //--------------------------[ 1 - current month - year]
        endTime.setMonth(endTime.getMonth());
        startTime.setDate(1)
        endTime.setHours(0, 0, 0, 0)

        let job = new CronJob(time, async () => {
            let [err, customers] = await to(
                db.customers.findAll({
                    include: {
                        attributes: ['id'],
                        model: db.orders,
                        include: [{
                            attributes: ['id'],
                            model: db.items,
                            through: {
                                attributes: ['quantity', 'price', [db.Sequelize.literal('SELECT SUM(quantity*price) AS total FROM orderdetails'), 'total']]
                            }
                        }, {
                            attributes: ['id'],
                            model: db.invoices,
                            where: {
                                createdAt: {
                                    [Op.gte]: startTime,
                                    [Op.lt]: endTime
                                }
                            }
                        }]
                    },
                    raw: true//,  nest: true
                })
            )
            // caculate income and total of a customer
            let paymented = []
            customers.forEach(customer => {
                let total = customer["orders.items.orderdetails.price"] * customer["orders.items.orderdetails.quantity"]
                let totalReturn = 0
                // payment rong
                if (paymented.length == 0) {
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
                    paymented.forEach(ele => {
                        if (ele.id == customer.id) { index = paymented.indexOf(ele); }
                    })
                    // ko tim thay customer trong payment
                    if (index == -1) {
                        // nếu khách hàng đã trả tiền: tiền thu lại = total
                        if (customer["orders.invoice.id"] != null) totalReturn = total;
                        paymented.push({
                            id: customer.id,
                            name: customer.name,
                            type: customer.type,
                            urlImage: customer.urlImage,
                            totalReturn: totalReturn,
                            total: total || 0
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
            // Store in customerstats:
            paymented.forEach(ele => {
                let data = {
                    customerId: ele.id,
                    type: "month",
                    timeStart: startTime,
                    timeEnd: endTime,
                    income: ele.totalReturn,
                    total: ele.total || 0
                }
                db.customerstats.create(data);
            })
        }, null, true, 'Asia/Ho_Chi_Minh')
        job.start();
    }
}
module.exports = new CustomerJob()