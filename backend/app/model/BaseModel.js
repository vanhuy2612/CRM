'use strict'

const mssql = require('mssql');
const dbConfig = require('../../config/dbConfig')

let setPool = async function createConnectionToDB(pool){
    pool = await mssql.connect(dbConfig);
}
/*
    giúp em tạo biến pool : biến này dùng để tạo connection dạng bất đồng bộ:
*/ 
class BaseModel {
    constructor(){
        
    }
}
module.exports = BaseModel;