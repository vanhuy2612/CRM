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
    async index(req, res, next) {
        let users = await UserModel.findAll();
        return res.json(users);
    }
    async update(req, res, next) {
        let updateUser = await UserModel.update(req.body, {where: {id: req.body.id}});
        if(updateUser != 0 ) return res.json({message: "Cap nhat tai khoan thanh cong"})
        else return res.json({message: "Cap nhat tai khoan that bai"})
    }
    async delete(req, res, next) {
        let deleteUser = await UserModel.destroy({ where: {id: req.body.id}})
        if (deleteUser != 0) return res.json({message: "Xoa tai khoan thanh cong"})
        else return res.json({message: "Xoa tai khoan that bai"})
    }
    async register(req, res, next){
        
        let username = req.body.username;
        let hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

        let UserGetByName = await UserModel.findOne({where: {username: username}});
        if(UserGetByName != null) res.json({message: "Tai khoan da ton tai"});
        else {
            // find id for new user
            let newIdUser = process.env.DB_LOC + '1';
            let lastUser = await UserModel.findAll({order: [ ['createdAt', 'DESC']], limit: 1, offset: 0}, { raw: true, mapToModel: false });
                console.log(lastUser)
            if ( lastUser.length != 0) {
                lastUser = lastUser[0].dataValues;
                // handle Id : MB0001 => 0001
                let stringId = lastUser.id;
                let numberId = stringId.split( process.env.DB_LOC)[1];
                    numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
                newIdUser = process.env.DB_LOC + numberId;
                
            }
            // insert to db:
            let data = {
                id: newIdUser,
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role,
                branchId: req.body.branchId
            }
            let UserInserted = await UserModel.create(data);
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
                let payload = {
                    username: UserGetByName.username,
                    password: UserGetByName.password,
                    branchId: UserGetByName.branchId,
                    role: UserGetByName.role
                };
                let token = jwt.sign(payload, authConfig.secrectKey, authConfig.options);
                return res.json(token);            
            } else {
                return res.status(401).json({message: "Sai mat khau"})
            }
        }
    }
}
module.exports = new UserController();