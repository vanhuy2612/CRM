'use strict' 
const db = require('../app/model/db');
const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
    // lấy trong req (đã set authMember trong req sau khi auth.middle)
    let token = req.header('Authorization');
    let authMember = jwt.decode(token);
    let roleMember = req.header('keyRoute');

    let member = await db.members.findOne({
        where: {id: authMember.id},
        attributes: ['id'],
        include: [{
            attributes: ['id'],
            model: db.roles,
            include: [{
                attributes: ['keyRoute'],
                model: db.permissions,
                through:{
                    attributes: []
                }
            }]
        }]
    })
    
    let arrRole = member.role.permissions;
    let role = [];
    arrRole.forEach(element => {
        role.push(element.keyRoute)
    });
    console.log(roleMember);
    if (role.indexOf(roleMember) != -1) next();
    else res.json({ message: "Ban ko co quyen"});
}