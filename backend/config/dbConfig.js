const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, DB_LOC, DB_TYPE, DB_INSTANCE} = process.env
const conn = require('mssql')


module.exports = {
    user: DB_USER || 'sa',
    password: DB_PASS || '12345678',
    server: DB_HOST || 'localhost',
    database: DB_NAME || 'crm',
    type: DB_TYPE || 'mssql',
    instanceName: DB_INSTANCE || 'MSSQLSERVER1'
    //port: DB_PORT || 1433
}
