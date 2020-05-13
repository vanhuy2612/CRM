'use strict'

const BaseController = require('./BaseController');
const db = require('../model/db.js');

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
        let data = {
            id: newIdBranch,
            name: req.body.name
        }
        let BrachInserted = await db.branchs.create(data);
        if(BrachInserted == null) res.json({message: "Luu tai khoan that bai"});
        else res.json(BrachInserted);
    }
    async getAllUserOfBranch(req, res, next) {
        let branchId = req.params.branchId;
        db.branchs.hasMany(db.users, { foreignKey: 'branchId'});
        db.users.belongsTo(db.branchs, {foreignKey: "branchId"});

        let data = await db.branchs.findAll({
            where: { id: branchId},
            include: [{ model: db.users}]
        })
        return res.json(data);
    }
}

module.exports = new BranchController();