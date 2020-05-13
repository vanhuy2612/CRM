'use strict'

const BaseController = require('./BaseController');
const BranchModel = require('../model/BranchModel');
const UserModel = require('../model/UserModel');

class BranchController extends BaseController {
    constructor() {
        super(BranchController, BranchModel)
    }
    async index(req, res, next) {
        let branchs = await BranchModel.findAll();
        res.json(branchs);
    }
    async store(req, res, next) {
        // find id for branchs
        let newIdBranch = process.env.DB_LOC + '1';
        let lastBrach = await BranchModel.findAll({order: [ ['createdAt', 'DESC']], limit: 1, offset: 0});
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
        let BrachInserted = await BranchModel.create(data);
        if(BrachInserted == null) res.json({message: "Luu tai khoan that bai"});
        else res.json(BrachInserted);
    }
    async getAllUser(req, res, next) {
        let branchId = req.params.branchId;
        BranchModel.hasMany(UserModel, { foreignKey: 'branchId'});
        UserModel.belongsTo(BranchModel, {foreignKey: "branchId"});

        let data = await BranchModel.findAll({
            where: { id: branchId},
            include: [{ model:'users', as: 'users'}]
        })
        return res.json(data);
    }
}

module.exports = new BranchController();