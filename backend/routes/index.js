'use strict'

const Router = require('express-group-router');
const router = new Router();

const UserController = require('../app/controller/UserController');
const BranchController = require('../app/controller/BranchController')
const ProductController = require('../app/controller/ProductController')
const ItemController = require('../app/controller/ItemController')
const CustomerController = require('../app/controller/CustomerController')
const OrderitemController = require('../app/controller/OrderitemController')



const AuthMiddleware = require('../middleware/auth.middleware')

// Routes for register and login;
router.group( router => {
    router.post('/login', UserController.login);
    router.post('/register', UserController.register);
}
).prefix('/api');

// Routes for User:
router.group( router => {
    router.get('/', UserController.index)
    router.delete('/:userId', UserController.delete)
    router.put('/:userId', UserController.update)
}).prefix('/api/user')

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
// Routes for Orderitem:
router.group( router => {
    router.post('/', OrderitemController.store)
}).prefix('/api/orderitem')

let listRoutes = router.init();
module.exports = listRoutes;
