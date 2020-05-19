'use strict'

const Router = require('express-group-router');
const router = new Router();

const MemberController = require('../app/controller/MemberController');
const BranchController = require('../app/controller/BranchController')
const ProductController = require('../app/controller/ProductController')
const ItemController = require('../app/controller/ItemController')
const CustomerController = require('../app/controller/CustomerController')
const OrderController = require('../app/controller/OrderController')
const InvoiceController = require('../app/controller/InvoiceController')



const AuthMiddleware = require('../middleware/auth.middleware')

// Routes for register and login;
router.group( router => {
    router.post('/login', MemberController.login);
    router.post('/register', MemberController.register);
}
).prefix('/api');

// Routes for Member:
router.group( router => {
    router.get('/', MemberController.index)
    router.delete('/:id', MemberController.delete)
    router.put('/:id', MemberController.update)

}).prefix('/api/member')

// Routes for Branch:
router.group( router => {
    router.get('/', BranchController.index);
    router.post('/', BranchController.store);
    router.get('/:branchId/user', BranchController.getAllUserOfBranch)
    router.get('/:branchId/customer', BranchController.getAllCustomerOfBranch)
    router.get('/test', BranchController.testDate)
}).prefix('/api/branch')

// Routes for Product:
router.group( router => {
    router.get('/', ProductController.index);
    router.get('/:productId', ProductController.getOne);
    router.post('/', ProductController.store);
}).prefix('/api/product')
// Routes for Item:
router.group( router => {
    router.get('/', ItemController.index);
    router.get('/:itemID', ItemController.getOne);
    router.post('/', ItemController.store);
    router.put('/:itemId', ItemController.update);
}).prefix('/api/item')

// Routes for Customer:
router.group( router => {
    router.get('/', CustomerController.index);
    router.get('/:customerId', CustomerController.getOne);
    router.post('/', CustomerController.store);
    router.delete('/:customerId', CustomerController.delete);
    router.put('/:customerId', CustomerController.update);
}).prefix('/api/customer')

// Routes for Order:
router.group( router => {
    router.post('/', OrderController.store)
    router.get('/', OrderController.index)
}).prefix('/api/order')

// Routes for Cart
// Routes for Checkout

// Routes for Invoice:
router.group( router => {
    router.get('/item', InvoiceController.revenueStatisticsByProduct)
    router.get('/customer', InvoiceController.revenueStatisticsByCustomer)
    router.get('/today', InvoiceController.revenueStatisticsForTheDay)
}).prefix('/api/invoice')

let listRoutes = router.init();
module.exports = listRoutes;
