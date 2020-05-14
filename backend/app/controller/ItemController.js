'use strict'

const BaseController = require('./BaseController')
const db = require('../model/db')

class ItemController extends BaseController{
    constructor(){
        super(ItemController, db.items)
    }

    async index(req, res, next){
        let items = await db.items.findAll({ order: [ ['name', 'ASC']]});
        res.json(items);
    }
    
    async update(req, res, next){
        let itemId = req.params.itemId;
        let updatedItem = await db.items.update(req.body, { where: { id: itemId}});
        if( updatedItem == null) res.json({message: "Cap nhat item that bai"});
        else res.json(updatedItem);
    }
    async store(req, res, next) {
        // find id for item;
        let newIdItem = process.env.DB_LOC + '1';
        let lastItem = await db.items.findAll({ order: [ ['createdAt', 'DESC']], limit: 1, offset: 0}, { raw: true, mapToModel: false });
        
        if( lastItem.length !=0 ) {
            lastItem = lastItem[0].dataValues; // get dataValues.
            let stringId = lastItem.id;
            let numberId = stringId.split( process.env.DB_LOC)[1];
                numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
                newIdItem = process.env.DB_LOC + numberId;
        }
        let data = {
            id: newIdItem,
            name: req.body.name,
            productId: req.body.productId,
            price: req.body.price,
            des: req.body.des
        }

        let insertedItem = await db.items.create(data);
        if(insertedItem == null) res.json({message: "Luu tai khoan that bai"});
        else res.json(insertedItem);
    }
    async getOne(req, res, next) {
        let itemId = req.params.itemId;
        let item = await db.items.findOne({ where: { id: itemId}});
        res.json(item);
    }
}

module.exports = new ItemController();