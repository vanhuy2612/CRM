'use strict'
const BaseController = require('./BaseController');
const MemberModel = require('../model/MemberModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../../config/authConfig');

class MemberController extends BaseController {
    constructor(){
        super(MemberController, MemberModel);
    }
    async login(req, res, next) {

        let UserGetByName = await MemberModel.getMemberByUsename(req.body.username);
            
        if (UserGetByName.length == 0 ) res.json({message: "Tai khoan khong chinh xac"});
        else {    
            let availablePassword = bcrypt.compareSync(req.body.password, UserGetByName.password)
            if(availablePassword) {
                let payload = req.body;
                let token = jwt.sign(payload, authConfig.secrectKey, authConfig.options);
                return res.json(token);            
            } else {
                return res.status(401).json({message: "Sai mat khau"})
            }
        } 
    }

    async register(req, res, next){
        // Check user exist:
        let UserGetByName = await MemberModel.getMemberByUserame(req.body.username);
        if (UserGetByName.length != 0 ) res.json({message: "Tai khoan da ton tai"});
        else {
            /*
                Store user
            */
            let UserStore = await MemberModel.storeUser(req.body);
            if(UserStore != null) res.json({message: "Luu tai khoan thanh cong"});
            else res.json({message: "Luu tai khoan that bai"});
        }     
    }
}

module.exports = new MemberController();