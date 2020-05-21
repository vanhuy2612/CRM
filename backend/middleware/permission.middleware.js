'use strict' 
const db = require('../app/model/db');
const jwt = require('jsonwebtoken')

module.exports = (key) => {
    return (req, res, next) => {
        // lấy trong req (đã set authMember trong req sau khi auth.middle)
        let token = req.header('Authorization');
        let authMember = jwt.decode(token);

        let member = authMember
        //console.log(member);
        
        let arrRole = member.role.permissions;
        let role = []; // Danh sach key roles của member
        arrRole.forEach(element => {
            role.push(element.keyRoute)
        });
        // console.log(role)
        // console.log(key)
        if(role.indexOf(key) != -1) { // key: key yêu cầu
            //console.log(role.indexOf(key))
            next()
        } else {
            res.status(403).json({ message: "Unpermitted"})
        }
    }
}