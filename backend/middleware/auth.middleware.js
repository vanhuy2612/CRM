'use strict'

const authConfig = require('../config/authConfig')
const jwt = require('jsonwebtoken')


const ignorePath = ['/api/login', '/api/register'];

module.exports = (req, res, next) => {
    let path = req.path;
    if(ignorePath.includes(path)) next();
    else {
        let token = req.header('Authorization');
        if (!token ) return res.status(401).json({message: 'You dont have token'})
        
        jwt.verify(token, authConfig.secrectKey, authConfig.options, (err, decode) => {
            if(err) return res.status(401).json({Errors: err, message:"Chuoi token sai"})
            console.log(decode);
            next();
        });
    }
}