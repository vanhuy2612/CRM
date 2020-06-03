'use strict'

const BaseController = require('./BaseController')
const db = require('../model/db')
const Op = db.Sequelize.Op
const to = require('await-to-js').default

class MarketingController extends BaseController{
    constructor(){
        super(MarketingController, db.marketings)
    }

    async index(req, res, next) {
        
        let [err, listMark] = await to(
            db.marketings.findAll({
                include: [{
                    model: db.branchs
                }],
                order: [ ['createdAt', 'DESC']]
            })
        )
        if(err) res.json({
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
            where: { id: { [Op.like]: local}}, 
            order: [ ['createdAt', 'DESC']], 
            limit: 1, 
            offset: 0
        }, {
            raw: true
        })
        if( lastMark.length != 0) {
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
        let [ err, insertedMark] = await to(
            db.marketings.create(data)
        )
        if(err) res.json({
            message: "Faild to insert marketing to db",
            errors: err
        })
        else res.json(insertedMark)

    }

    async delete(req, res, next) {
        let id = req.params.id;
        let [ err, deletedMark] = await to(
            db.marketings.destroy({ 
                where: {
                    id: id
                }
            })
        )
        if(err) res.json({
            message: 'Fail',
            errors: err
        })
        else if(deletedMark>0) res.json({ message: "Delete Marketing Successfully"})
        else res.json({ message: "Delete Marketing Faild"})
    }
    
    async update(req, res, next) {
        let data = req.body;
        let id = req.params.id;
        //console.log(req.file)
        if(req.file != undefined) data.urlImage = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`

        let [err, updatedMark] = await to(
            db.marketings.update(data, { where: {id: id}})
        )
        if(err) res.json({ message: "Fail", errors: err})
        else if (updatedMark > 0) res.json({message: "Update Marketing success"})
        else res.json({ message: "Update marketing faild"})
    }

}

module.exports = new MarketingController()