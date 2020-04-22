'use strict'

const UserModel = require('../model/UserModel');
const BaseController = require('./BaseController');

class UserController extends BaseController{
    constructor(){
        super(UserController, UserModel);
    }
    async register(req, res, next){
        
        let UserByName = await UserModel.create(req.body);
        res.json(UserByName); 
    }
}
module.exports = new UserController();