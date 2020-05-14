'use strict'

const Router = require('express-group-router');
const router = new Router();

const UserController = require('../app/controller/UserController');
const BranchController = require('../app/controller/BranchController')
const ProductController = require('../app/controller/ProductController')

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
}).prefix('/api/branch')

// Routes for Product:
router.group( router => {
    router.get('/', ProductController.index);
    router.post('/', ProductController.store)
}).prefix('/api/product')

let listRoutes = router.init();
module.exports = listRoutes;
