'use strict' 

const BaseController = require('./BaseController')
const db = require('../model/db');
const Op = db.Sequelize.Op;

class CustomerController extends BaseController {
    constructor() {
        super(CustomerController, db.customers)
    }
    async index(req, res, next) {
        let customers = await db.customers.findAll({
            include: [{
                model: db.contacts
            }]
        });
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
        let lastCustomer = await db.customers.findAll({
            where: { id: { [Op.like]: local}}, 
            order: [ ['createdAt', 'DESC']], 
            limit: 1, 
            offset: 0
        }, {
            raw: true
        })
        console.log(lastCustomer);
        if( lastCustomer.length != 0) {
            lastCustomer = lastCustomer[0].dataValues;
            let stringId = lastCustomer.id;
            let numberId = stringId.split(process.env.DB_LOC)[1];
                numberId = parseInt(numberId, 10) + 1;
            newCustomerId = process.env.DB_LOC + numberId;
        }

        let data = req.body;
        data.id = newCustomerId;

        // insert to db customers:
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
        let updatedCus = await db.customers.update(data, {where: {id: customerId}}, { raw: true});
        if(updatedCus != 0) res.json({ message: "Update Customer Success"});
        else res.json({ message: 'Update Customer Faild'});
    }
    async search(req, res, next){
        let keyword = '%'+req.query.keyword+'%';
        console.log(keyword)
        let result = await db.customers.findAll({
            where: {
                [Op.or]: [{
                    id: { [Op.like]: keyword}
                },{
                    name: { [Op.like]: keyword}
                },{
                    address: { [Op.like]: keyword}
                },{
                    country: { [Op.like]: keyword}
                },{
                    job: { [Op.like]: keyword}
                }]
            }
        })
        res.json(result)
    }
}

module.exports = new CustomerController();