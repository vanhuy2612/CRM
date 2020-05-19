'use strict'

const BaseController = require('./BaseController');
const db = require('../model/db.js');
const Op = db.Sequelize.Op;

class BranchController extends BaseController {
    constructor() {
        super(BranchController, db.users)
    }
    async index(req, res, next) {
        let branchs = await db.branchs.findAll();
        res.json(branchs);
    }
    async store(req, res, next) {
        // find id for branchs
        let newIdBranch = process.env.DB_LOC + '1';
        let lastBrach = await db.branchs.findAll({order: [ ['createdAt', 'DESC']], limit: 1, offset: 0});
        if( lastBrach.length != 0) {
            lastBrach = lastBrach[0].dataValues;
            // handle Id : MB0001 => 0001
            let stringId = lastBrach.id;
            let numberId = stringId.split( process.env.DB_LOC)[1];
                numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
            newIdBranch = process.env.DB_LOC + numberId;
        }
        // insert to db:
        let data = req.body;
        data.id = newIdBranch;
        let BrachInserted = await db.branchs.create(data);
        if(BrachInserted == null) res.json({message: "Luu tai khoan that bai"});
        else res.json(BrachInserted);
    }
    async getAllUserOfBranch(req, res, next) {
        let branchId = req.params.branchId;
        
        let data = await db.branchs.findAll({
            where: { id: branchId},
            include: [{ model: db.users}]
        })
        return res.json(data);
    }
    async getAllCustomerOfBranch(req, res, next) {
        let branchId = req.params.branchId;
        let data = await db.branchs.findAll({ 
            where: { id: branchId}, 
            include: [{ model: db.customers}] 
        })
        res.json(data);
    }
    async testDate(req, res, next) {
        let today = Date.now();
        let branch = await db.branchs.findAll({ where: { createdAt: {[Op.lt]: today}}})
        res.json(branch);
    }
}

module.exports = new BranchController();