'use strict'

const BaseController = require('./BaseController')
const db = require('../model/db')

class ProductController extends BaseController{
    constructor(){
        super(ProductController, db.products)
    }
    async index(req, res, next){
        let products = await db.products.findAll({ order: [ ['name', 'ASC']]});
        res.json(products);
    }
    async store(req, res, next) {
        // find id for product;
        let newIdProduct = process.env.DB_LOC + '1';
        let lastProduct = await db.products.findAll({ order: [ ['createdAt', 'DESC']], limit: 1, offset: 0}, { raw: true, mapToModel: false });
        
        if( lastProduct.length !=0 ) {
            lastProduct = lastProduct[0].dataValues; // get dataValues.
            let stringId = lastProduct.id;
            let numberId = stringId.split( process.env.DB_LOC)[1];
                numberId = parseInt(numberId, 10) + 1; // convert string to int and inc 1.
                newIdProduct = process.env.DB_LOC + numberId;
        }
        let data = {
            id: newIdProduct,
            name: req.body.name,
            branchId: req.body.branchId
        }

        let insertedProduct = await db.products.create(data);
        if(insertedProduct == null) res.json({message: "Luu tai khoan that bai"});
        else res.json(insertedProduct);
    }
    async getOne(req, res, next) {
        let productId = req.params.productId;
        let product = await db.products.findOne({ where: { id: productId}});
        res.json(product);
    }
}
module.exports = new ProductController();