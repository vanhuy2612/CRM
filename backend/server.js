'use strict'

require('dotenv').config().parsed
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mssql = require('mssql')
const dbConfig = require('./config/dbConfig');
const {Sequelize} = require('sequelize');
const {PORT} = process.env || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Authentication:
//app.use(require('./middleware/auth.middleware'));
// Routes:
app.use(require('./routes/index'));

// connect to database:

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.server,
        dialect: dbConfig.type,
        dialectOptions: {
            instanceName: "MQ00019/MSSQLSERVER1",
            trustedConnection: true
        }
    }
)
// var sequelize = new Sequelize({
//     dialect: 'mssql',
//     dialectOptions: {
//       instanceName: 'MQ00019/MSSQLSERVER1',
//       trustedConnection: true
//     },
//     host: 'localhost',
//     //host: 'MQ00019',
//     //host: ' 192.168.6.194',
//     database: 'crm'
//   })
console.log(dbConfig)
testConnection(sequelize);
async function testConnection(sequelize){
    try {
        await sequelize.authenticate();
        console.log('Sequelize\'s connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
// Disable caching of scripts for easier testing
app.use(function noCache(req, res, next) {
    if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
    }
    next();
});

app.locals.pretty = true;
app.locals.compileDebug = true;

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

// Listen port

const server = require('http').createServer(app)
server.listen(PORT, () => {
    console.log("Server is running in port "+ PORT);
})