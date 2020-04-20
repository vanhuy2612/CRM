'use strict'

const Router = require('express').Router();
const authConfig = require('../config/authConfig');
const dbConfig = require('../config/dbConfig')
const sql = require('mssql')
const to = require('await-to-js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../config/bcryptConfig');
const MemberController = require('../app/controller/MemberController');


Router.post('/api/login', MemberController.login)
Router.post('/api/register', MemberController.register)

module.exports = Router;
/*
    Register user
*/

// async function register(req, res, next) {
//     let password = bcrypt.hashSync(req.body.password, 10);
//     let username =req.body.username;
//     /*
//         check user exist
//     */
//     let pool = await sql.connect(dbConfig);

//     let UserGetByName = await pool.request()
//         .input('username', sql.NVarChar, username)
//         .query('SELECT * FROM tbluser WHERE username LIKE @username')
//     if (UserGetByName.recordset.length != 0 ) res.json({message: "Tai khoan da ton tai"});
//     else {
//         /*
//             Store user
//         */
//         let UserStore = await pool.request()
//             .input('username', sql.NVarChar, username)
//             .input('password', sql.NVarChar, password)
//             .query('INSERT INTO tbluser(username, password) VALUES(@username, @password)');
//         if(UserStore != null) res.json({message: "Luu tai khoan thanh cong"});
//         else res.json({message: "that bai"});
//     }     
// }
// /*
//     Login and send tokens
// */
// async function login(req, res, next) {
//     const pool = await sql.connect(dbConfig);

//     let UserGetByName = await pool.request()
//         .input('username', sql.NVarChar, req.body.username)
//         .query('SELECT * FROM tbluser WHERE username LIKE @username')
        
//     if (UserGetByName.recordset.length == 0 ) res.json({message: "Tai khoan khong chinh xac"});
//     else {    
//         let availablePassword = bcrypt.compareSync(req.body.password, UserGetByName.recordset[0].password)
//         if(availablePassword) {
//             let payload = req.body;
//             let token = jwt.sign(payload, authConfig.secrectKey, authConfig.options);
//             return res.json(token);            
//         } else {
//             return res.status(401).json({message: "Sai mat khau"})
//         }
//     } 
// }
