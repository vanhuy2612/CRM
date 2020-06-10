'use strict'
const CronJob = require('cron').CronJob;
const db = require('../model/db')
const to = require('await-to-js').default
const Op = db.Sequelize.Op

class RevenueJob {
    constructor() { }
    // truy cap table invoice...
    async returnOfDay(time = '* * * * * *') {
        console.log("Conjob: Revenue.returnOfDay")
        let startTime = new Date();//------------------------[ ]     
        startTime.setDate(startTime.getDate() - 1)
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(); //--------------------------[  ]
        endTime.setDate(endTime.getDate())
        endTime.setHours(0, 0, 0, 0)

        // Create cronjob:
        let job = new CronJob(time, async () => {
            let [err, data] = await to(
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
                        attributes: ['id', 'createdAt'],
                        where: {
                            createdAt: {
                                [Op.gte]: startTime,
                                [Op.lt]: endTime
                            }
                        }
                    }],
                    raw: true
                })
            )
            //console.log('Order: ', data)
            let total = 0;
            data.forEach(ele => {
                total += ele['items.orderdetails.price'] * ele['items.orderdetails.quantity']
            });
            let dataToInsert = {
                type: 'day',
                timeStart: startTime,
                timeEnd: endTime,
                income: total || 0
            }
            db.revenuestats.create(dataToInsert)
        }, null, true, 'Asia/Ho_Chi_Minh');
        job.start();
    }
    // doanh thu trong tháng, truy cập từ bảng revenuestats thống kê từ ngày lên.
    async returnOfMonth(time = '* * * * * *') {
        console.log("Conjob: Revenue.returnOfMonth")
        let startTime = new Date();//------------------------[ 1 - last month - year]
        startTime.setMonth(startTime.getMonth() - 1);
        startTime.setDate(1)
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(); //--------------------------[ 1 - current month - year]
        endTime.setMonth(endTime.getMonth());
        startTime.setDate(1)
        endTime.setHours(0, 0, 0, 0)

        // create cronjob:
        var job = new CronJob(time, async () => {
            let [err, data] = await to(
                db.revenuestats.findAll({
                    type: 'day',
                    where: {
                        timeStart: {
                            [Op.gte]: startTime
                        },
                        timeEnd: {
                            [Op.lte]: endTime
                        }
                    },
                    attributes: [
                        [db.sequelize.fn('sum', db.sequelize.col('income')), 'income'],
                    ],
                    raw: true
                })
            )
            //console.log(data)
            let dataToInsert = {
                type: 'month',
                timeStart: startTime,
                timeEnd: endTime,
                income: data[0].income || 0
            }
            console.log(dataToInsert)
            db.revenuestats.create(dataToInsert)
        }, null, true, 'Asia/Ho_Chi_Minh');
        job.start();       
    }
    // doanh thu theo nam thống kê từ tháng lên
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

        // create cronjob:
        var job = new CronJob(time, async () => {
            let [err, data] = await to(
                db.revenuestats.findAll({
                    where: {
                        type:'month',
                        timeStart: {
                            [Op.gte]: startTime
                        },
                        timeEnd: {
                            [Op.lte]: endTime
                        }
                    },
                    attributes: [
                        [db.sequelize.fn('sum', db.sequelize.col('income')), 'income'],
                    ],
                    raw: true
                })
            )
            //console.log(data)
            let dataToInsert = {
                type: 'year',
                timeStart: startTime,
                timeEnd: endTime,
                income: data[0].income || 0
            }
            console.log(dataToInsert)
            db.revenuestats.create(dataToInsert)
        }, null, true, 'Asia/Ho_Chi_Minh');
        job.start(); 
    }
}

module.exports = new RevenueJob()