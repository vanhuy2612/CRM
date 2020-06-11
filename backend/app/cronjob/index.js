'use strict'
const db = require('../model/db')
const CustomerJob = require('./customerJob')
const RevenueJob = require('./revenueJob')

let index = {}
// Customer Job;

index.CusReturnOfMonth = CustomerJob.returnOfMonth('0 0 0 1 0 *') // luc 0H sang dau thang
index.CusReturnOfYear = CustomerJob.returnOfYear('0 0 0 1 0 *') // luc 1h sang dau nam

// Revenue Job:
index.RevReturnOfDay = RevenueJob.returnOfDay('0 0 0 * * *') // luc 
index.RevReturnOfMonth = RevenueJob.returnOfMonth('0 0 0 * * *') // luc 
index.RevReturnOfYear = RevenueJob.returnOfYear('0 0 0 * * *') // luc 

module.exports = index;

// transaction hoạt động hết các query trong cùng 1 bảng ghi.
// index.example = () => {
//     try {
//         db.sequelize.transaction( async (t) => {
//             let message = {}
//             let email = 'dfa'
//             let phone = 'dfaf'
//             message.select_1 = await db.branchs.findAll({raw: true})
//             message.update_2 = await db.branchs.update({name: 'Hahaa', }, { where: { id: 'MB1'}})
//             if (email != '')  {
//                 message.select_3 = await db.branchs.findAll({raw: true})
//                 message.insert_4 = await db.branchs.create({id: 'MB5', name: 'Chi nhanh 5'},{raw: true})
//             }
//             if (phone != '') {
//                 message.select_5 = await db.branchs.findAll({raw: true})
//                 message.insert_6 = await db.branchs.create({id: 'MB6', name: 'Chi nhanh 6'},{raw: true})
//             }
//             console.log(message)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
// index.example()