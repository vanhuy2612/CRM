const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, DB_LOC} = process.env
const conn = require('mssql')


module.exports = {
    user: DB_USER || 'root',
    password: DB_PASS || '',
    server: DB_HOST || 'localhost',
    database: DB_NAME || '',
    //port: DB_PORT || 1433
}
