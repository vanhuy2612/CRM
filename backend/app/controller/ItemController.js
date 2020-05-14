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
    
}