'use strict'
const BaseController = require('./BaseController');
const db = require('../model/db')
class OrderitemController extends BaseController {
    constructor(){
        super( OrderitemController, db.orderitems);
    }
    async index(req, res, next) {
        let order = await db.orderitems.findAll({ order: [ ["createdAt", "DESC"]]});
        res.json(order);
    }
    async store(req, res, next) {
        // find id for orderitem
        let newId = process.env.DB_LOC + '1';
        let lastOrderitem = await db.orderitems.findAll({ order: [ ['createdAt', 'DESC']], limit: 1, offset: 0, raw: true,});
        console.log(lastOrderitem);
        if( lastOrderitem.length != 0) {
           
            // handle Id : MB0001 => 0001
            let stringId = lastOrderitem[0].id;
            let numberId = stringId.split( process.env.DB_LOC)[1];
                numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
            newId = process.env.DB_LOC + numberId;
        }
        let data = req.body;
        data.id = newId;
        let insertedOrder = await db.orderitems.create(data);
        if(insertedOrder == null) res.json({ message: "Insert order faild"});
        else res.json(insertedOrder);
    }
    
}
module.exports = new OrderitemController()