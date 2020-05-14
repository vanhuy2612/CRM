'use strict' 

const BaseController = require('./BaseController')
const db = require('../model/db');
const Op = db.Sequelize.Op;

class CustomerController extends BaseController {
    constructor() {
        super(CustomerController, db.customers)
    }
    async index(req, res, next) {
        let customers = await db.customers.findAll();
        res.json(customers);
    }
    async getOne(req, res, next) {
        let customerId = req.params.customerId ;
        let customer = await db.customers.findOne({ where: { id: customerId}});
        res.json(customer)
    }
    async store(req, res, next) {
        // find id for customer in a branch
        let newCustomerId = process.env.DB_LOC + '1';
        let local = process.env.DB_LOC + '%';
        let lastCustomer = await db.customers.findAll({where: { id: { [Op.like]: local}}, order: [ ['createdAt', 'DESC']], limit: 1, offset: 0})
        if( lastCustomer.length != 0) {
            lastCustomer = lastCustomer[0].dataValues;
            let stringId = lastCustomer.id;
            let numberId = stringId.split(process.env.DB_LOC)[1];
                numberId = parseInt(numberId, 10) + 1;
            newCustomerId = process.env.DB_LOC + numberId;
        }

        let data = req.body;
        data.id = newCustomerId;

        // insert to db:
        let insertedCus = await db.customers.create(data);
        if (insertedCus == null ) res.json({ message: "store customer faild"});
        else res.json(insertedCus);
    }
    async delete(req, res, next) {
        let customerId = req.params.customerId;
        let deleteCus = await db.customers.destroy({ where: {id: customerId}});
        res.json(deleteCus);
    }
    async update(req, res, next) {
        let customerId = req.params.customerId;
        let data = req.body;
        data.id = customerId;
        let updatedCus = await db.customers.update(data, {where: {id: customerId}});
        if(updatedCus != 0) res.json({ message: "Update Customer Success"});
        else res.json({ message: 'Update Customer Faild'});
    }
}

module.exports = new CustomerController();