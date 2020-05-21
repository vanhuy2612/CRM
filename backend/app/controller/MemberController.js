'use strict'

const db = require('../model/db');
const BaseController = require('./BaseController');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');
const bcrypt = require('bcrypt');
const bcryptConfig = require('../../config/bcryptConfig');
const SALT_ROUNDS =  10;

class MemberController extends BaseController{
    constructor(){
        super(MemberController, db.members);
    }
    async index(req, res, next) {
        let members = await db.members.findAll();
        return res.json(members);
    }
    async update(req, res, next) {
        let updatemember = await db.members.update(req.body, {where: {id: req.params.id}});
        if(updatemember != 0 ) return res.json({message: "Cap nhat tai khoan thanh cong"})
        else return res.json({message: "Cap nhat tai khoan that bai"})
    }
    async delete(req, res, next) {
        let deletemember = await db.members.destroy({ where: {id: req.params.id}})
        if (deletemember != 0) return res.json({message: "Xoa tai khoan thanh cong"})
        else return res.json({message: "Xoa tai khoan that bai"})
    }
    async register(req, res, next){
        
        let membername = req.body.username;
        let hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

        let memberGetByName = await db.members.findOne({where: {username: membername}});
        if(memberGetByName != null) res.json({message: "Tai khoan da ton tai"});
        else {
            // find id for new member
            let newIdmember = process.env.DB_LOC + '1';
            let lastmember = await db.members.findAll({
                order: [ ['createdAt', 'DESC']], 
                limit: 1, offset: 0
            }, { 
                raw: true, 
                mapToModel: false 
            });
            //    console.log(lastmember)
            if ( lastmember.length != 0) {
                lastmember = lastmember[0].dataValues;
                // handle Id : MB0001 => 0001
                let stringId = lastmember.id;
                let numberId = stringId.split( process.env.DB_LOC)[1];
                    numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
                newIdmember = process.env.DB_LOC + numberId;
                
            }
            // insert to db:
            let data = req.body;
            data.id = newIdmember;
            data.password = hashedPassword;
            let memberInserted = await db.members.create(data);
            if(memberInserted == null) res.json({message: "Luu tai khoan that bai"});
            else res.json(memberInserted);
        }        
    }
    async login(req, res, next){
        let {username, password} = req.body;
        let memberGetByName = await db.members.findOne({
            where: {username: username},
            include: [{
                model: db.roles,
                include: [{
                    attributes: ['keyRoute'],
                    model: db.permissions,
                    through:{
                        attributes: []
                    }
                }]
            }],
        }, {
        
        });
        //console.log(memberGetByName);
        if(memberGetByName == null) res.json({message: "Tai khoan khong ton tai"});
        else {
            memberGetByName = memberGetByName.dataValues;
            let availablePassword = bcrypt.compareSync(password, memberGetByName.password)
            if(availablePassword) {
                let payload = memberGetByName;
                //console.log(payload)
                let token = jwt.sign(payload, authConfig.secrectKey, authConfig.options);
                return res.json(token);            
            } else {
                return res.json({message: "Sai mat khau"})
            }
        }
    }
    async changepassword(req, res, next){
        let token = req.header('Authorization');
        let member = jwt.decode(token);
        let data = req.body;
        // Ma Hoa pass
        data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);

        let updatedPassword = await db.members.update(data, { where: {id: member.id}});
        if(updatedPassword !=0) res.json({message: "Thay doi mat khau thanh cong"});
        else res.json({ message: "Thay doi mat khau that bai"})
    }
}
module.exports = new MemberController();