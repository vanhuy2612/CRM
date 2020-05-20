'use strict' 
const db = require('../app/model/db');

module.exports = (req, res, next) => {
    // lấy trong req (đã set authMember trong req sau khi auth.middle)
    let authMember = req.authMember;
    let role = req.header('role');

    let roleMember = await db.members.findOne({
        where: {id: authMember.id},
        attributes: ['id'],
        include: [{
            model: db.role,
            include: [{
                model: db.permissions
            }]
        }]
    })
    let arrRole = [];
    // lấy role trong roleMember vào mảng arrRole:
    next();
}