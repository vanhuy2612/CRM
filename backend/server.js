'use strict'

require('dotenv').config().parsed
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mssql = require('mssql')
const dbConfig = require('./config/dbConfig');
const {PORT} = process.env || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Authentication:
app.use(require('./middleware/auth.middleware'));
// Routes:
app.use(require('./routes/index'));

// connect to database:

mssql.connect(dbConfig, err => {
    if(err) {
        console.log("*******************************************");
        console.log("*******************************************");
        console.log("************Faild to connect DB************");
        console.log("*******************************************");
        console.log("*******************************************");
    } else {
        console.log("Connected to DB");
    }
})
// const pool = new mssql.ConnectionPool(dbConfig);
// pool.connect( err => {
//     if(err) {
//         console.log("*******************************************");
//         console.log("*******************************************");
//         console.log("************Faild to connect DB************");
//         console.log("*******************************************");
//         console.log("*******************************************");
//     } else {
//         console.log("Connected to DB");
//     }
// })
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