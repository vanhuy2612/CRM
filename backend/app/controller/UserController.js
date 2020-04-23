'use strict'

const UserModel = require('../model/UserModel');
const BaseController = require('./BaseController');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');
const bcrypt = require('bcrypt');
const bcryptConfig = require('../../config/bcryptConfig');
const SALT_ROUNDS =  10;

class UserController extends BaseController{
    constructor(){
        super(UserController, UserModel);
    }
    async register(req, res, next){
        //let username = '%'+req.body.username+'%';
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

        let UserGetByName = await UserModel.findOne({where: {username: username}});
        if(UserGetByName != null) res.json({message: "Tai khoan da ton tai"});
        else {
            let UserInserted = await UserModel.create({username: username, password: password});
            if(UserInserted == null) res.json({message: "Luu tai khoan that bai"});
            else res.json(UserInserted);
        }        
    }
    async login(req, res, next){
        let {username, password} = req.body;
        let UserGetByName = await UserModel.findOne({where: {username: username}});
        if(UserGetByName == null) res.json({message: "Tai khoan khong ton tai"});
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
}
module.exports = new UserController();