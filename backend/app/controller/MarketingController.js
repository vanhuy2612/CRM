'use strict'

const BaseController = require('./BaseController')
const db = require('../model/db')
const Op = db.Sequelize.Op
const to = require('await-to-js').default

class MarketingController extends BaseController {
    constructor() {
        super(MarketingController, db.marketings)
    }

    async index(req, res, next) {

        let [err, listMark] = await to(
            db.marketings.findAll({
                include: [{
                    attributes: ['name'],
                    model: db.branchs
                }, {
                    attributes: ['id', 'name', 'urlImage', 'type'],
                    model: db.customers,
                    include: [{
                        model: db.contacts
                    }],
                    through: {
                        attributes: []
                    }
                }, {
                    model: db.members,
                    through: {
                        attributes: []
                    }
                }],
                order: [['createdAt', 'DESC']]
            })
        )
        if (err) res.json({
            message: "Faild to get list marketing",
            errors: err
        })
        res.json(listMark);
    }
    async store(req, res, next) {
        // find id for customer in a branch
        let newId = process.env.DB_LOC + '1';
        let local = process.env.DB_LOC + '%';
        let lastMark = await db.marketings.findAll({
            where: { id: { [Op.like]: local } },
            order: [['createdAt', 'DESC']],
            limit: 1,
            offset: 0
        }, {
            raw: true
        })
        if (lastMark.length != 0) {
            lastMark = lastMark[0].dataValues;
            let stringId = lastMark.id;
            let numberId = stringId.split(process.env.DB_LOC)[1];
            numberId = parseInt(numberId, 10) + 1;
            newId = process.env.DB_LOC + numberId;
        }

        let data = req.body;
        data.id = newId;
        //link image
        data.urlImage = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`

        // insert to db marketings: 
        let [err, insertedMark] = await to(
            db.marketings.create(data)
        )
        if (err) res.json({
            message: "Faild to insert marketing to db",
            errors: err
        })
        else res.json(insertedMark)

    }
    async detail(req, res, next) {
        let id = req.params.id
        let [ err, result] = await to(
            db.marketings.findAll({
                where: {
                    id: id
                },
                include: [{
                    attributes: ['name'],
                    model: db.branchs
                }, {
                    model: db.customers,
                    include: [{
                        model: db.contacts
                    }],
                    through: {
                        attributes: []
                    }
                }, {
                    model: db.members,
                    through: {
                        attributes: []
                    }
                }]
            })
        )
        if(err) res.json({ message: `Fail to get detail of marketing with id=${id}`})
        res.json(result)
    }
    async delete(req, res, next) {
        let id = req.params.id;
        let [err, deletedMark] = await to(
            db.marketings.destroy({
                where: {
                    id: id
                }
            })
        )
        if (err) res.json({
            message: 'Fail',
            errors: err
        })
        else if (deletedMark > 0) res.json({ message: "Delete Marketing Successfully" })
        else res.json({ message: "Delete Marketing Faild" })
    }

    async update(req, res, next) {
        let data = req.body;
        let id = req.params.id;
        //console.log(req.file)
        if (req.file != undefined) data.urlImage = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`

        let [err, updatedMark] = await to(
            db.marketings.update(data, { where: { id: id } })
        )
        if (err) res.json({ message: "Fail", errors: err })
        else if (updatedMark > 0) res.json({ message: "Update Marketing success" })
        else res.json({ message: "Update marketing faild" })
    }
    // add customer to marketing : add to table marketingdetails
    async addCustomerToMarketing(req, res, next) {
        let message = {
            cusExist: [],
            cusInserted: []
        }
        let marketingId = req.body.marketingId
        let customersId = req.body.customersId
        // loại bỏ phần tử trùng nhau: 
        customersId = customersId.filter((item, index) => {
            return customersId.indexOf(item) === index
        })
        console.log('customersId: ', customersId)

        // Insert to table marketingdetails
       
        for (let i = 0; i < customersId.length; i++) {
            let data = {
                marketingId: marketingId,
                customerId: customersId[i]
            }
            // check marketingdetails exist:
            let marketingdetailExist = await db.marketingdetails.findAll({ where: data })
            if (marketingdetailExist.length == 0) {
                let insertedMarkDetail = await db.marketingdetails.create(data)
                message.cusInserted.push(customersId[i])
            } else {
                message.cusExist.push(customersId[i])
            }
            console.log(message)
        };
        res.json({ status: "Add Customer Successfully", message: message })
    }
    async removeCustomerFromMarketing( req, res, next){
        
        let data = req.body
        let deletedCus = await db.marketingdetails.destroy({ where: data});
        if(deletedCus !=0) res.json({ message: "Delete successfully", deletedCus: data.customerId});
        else res.json({message: "Faild"})
    }
}

module.exports = new MarketingController()