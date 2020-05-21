'use strict'

const BaseController = require('./BaseController')
const PermissionModel = require('../model/PermissionModel')
const to = require('await-to-js').default;
const db = require('../model/db')

class PermissionController extends BaseController{
    constructor(){
        super(PermissionController, PermissionModel)
    }
    async index(req, res, next){
        let [err, permissions] = await to( db.permissions.findAll())
        if(err) res.json({messsage: "Fail"})
        res.json(permissions);
    }
}
module.exports = new PermissionController()