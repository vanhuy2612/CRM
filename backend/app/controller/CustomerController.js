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
        let customerId = req.params.customerId;
        let customer = await db.customers.findOne({ where: { id: customerId } });
        res.json(customer)
    }
    async store(req, res, next) {
        let message = {};
        try {
            const result = await db.sequelize.transaction(async (t) => {
                // find id for customer in a branch
                let newCustomerId = process.env.DB_LOC + '1';
                let local = process.env.DB_LOC + '%';
                let lastCustomer = await db.customers.findAll({
                    where: { id: { [Op.like]: local } },
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                    offset: 0
                }, {
                    raw: true, transaction: t
                })
                if (lastCustomer.length != 0) {
                    lastCustomer = lastCustomer[0].dataValues;
                    let stringId = lastCustomer.id;
                    let numberId = stringId.split(process.env.DB_LOC)[1];
                    numberId = parseInt(numberId, 10) + 1;
                    newCustomerId = process.env.DB_LOC + numberId;
                }

                let data = req.body;
                data.id = newCustomerId;
                //link image
                data.urlImage = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`

                // insert to db customers:
                let insertedCus = await db.customers.create(data, {transaction: t});
                //console.log(insertedCus)
                message.insertedCus = "Faild"
                if (insertedCus != null) {
                    message.insertedCus = "OK"
                    // insert to contact:
                    let phone = req.body.phone || ""
                    let email = req.body.email || ""
                    console.log("finding id .........")
                    // find last contacts:
                    let lastContact = await db.contacts.findAll({
                        order: [['createdAt', 'DESC']],
                        limit: 1, offset: 0
                    }, {
                        raw: true, transaction: t
                    });
                    // default id (string, int), and last stringId
                    let newIdContact = process.env.DB_LOC + '1'; // default
                    let numberId = 1;
                    let stringId;
                    if (lastContact.length != 0) {
                        lastContact = lastContact[0].dataValues;
                        stringId = lastContact.id;
                    }
                    // end finding last contacts.

                    //---------------------------Phone---------------
                    if (phone != "") {
                        console.log("finding id for phone.........")

                        if (lastContact.length != 0) {
                            numberId = stringId.split(process.env.DB_LOC)[1];
                            numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
                            newIdContact = process.env.DB_LOC + numberId;
                            stringId = newIdContact
                        }
                        // insert contact phone to db:
                        let data = {
                            id: newIdContact,
                            customerId: insertedCus.dataValues.id,
                            type: "phone",
                            username: insertedCus.dataValues.name,
                            link: phone
                        };
                        let phoneContact = await db.contacts.create(data, { transaction: t});
                        if (phoneContact != null) message.phone = "phone OK"; else message.member = "phone Fail"

                    }
                    //------------------------------Email------------------------
                    if (email != "") {
                        console.log("finding id for email.........")
                       
                        if (lastContact.length != 0) {
                            numberId = stringId.split(process.env.DB_LOC)[1];
                            numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
                            newIdContact = process.env.DB_LOC + numberId;
                            stringId = newIdContact
                        }
                        // insert contact email to db:
                        let data = {
                            id: newIdContact,
                            customerId: insertedCus.dataValues.id,
                            type: "email",
                            username: insertedCus.dataValues.name,
                            link: email
                        };
                        let emailContact = await db.contacts.create(data, { transaction: t});
                        if (emailContact != null) message.email = "email OK"; else message.email = "email Fail"
                    }
                }
                // Return transaction;
                return 0;
            })
            res.json(message)
        } catch (error) {
            res.json({message: "Fail to insert customer"})
            console.log(error)
        }       
    }
    async delete(req, res, next) {
        let customerId = req.params.customerId;
        let deleteCus = await db.customers.destroy({ where: { id: customerId } });
        res.json(deleteCus);
    }
    async update(req, res, next) {
        let message = {}

        let customerId = req.params.id;
        let data = req.body;
        data.id = customerId;
        if(req.file != undefined) data.urlImage = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`

        try {
            const result = db.sequelize.transaction( async (t) => {
                let updatedCus = await db.customers.update(data, { where: { id: customerId } }, {transaction: t});
                if (updatedCus > 0) message.updateCus = "success"
                    else message.updateCus = "false"
                if (req.body.phone != undefined) {
                    let updatePhone = await db.contacts.update({link: req.body.phone}, { where: {customerId: customerId, type: 'phone'}}, { transaction: t})
                    if(updatePhone > 0) message.updatePhone = "success" 
                        else message.updatePhone = "false"
                }
                if (req.body.email != undefined) {
                    let updateEmail = await db.contacts.update({link: req.body.email}, { where: {customerId: customerId, type: 'email'}}, { transaction: t})
                    if(updateEmail > 0) message.updateEmail = "success" 
                        else message.updateEmail = "false"
                }
                res.json(message)
            })
        } catch (error) {
            res.json({
                message: "Fail to update customer",
                errors: error
            })
        }
    }
    async search(req, res, next) {
        let keyword = '%' + req.query.keyword + '%';
        console.log(keyword)
        let result = await db.customers.findAll({
            where: {
                [Op.or]: [{
                    id: { [Op.like]: keyword }
                }, {
                    name: { [Op.like]: keyword }
                }, {
                    address: { [Op.like]: keyword }
                }, {
                    country: { [Op.like]: keyword }
                }, {
                    job: { [Op.like]: keyword }
                }]
            }
        })
        res.json(result)
    }
}

module.exports = new CustomerController();