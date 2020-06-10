'use strict'

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