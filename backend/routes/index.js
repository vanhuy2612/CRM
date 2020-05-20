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
router.group('/api', router => {
    // Routes for Member:
    router.group('/member', router => {
        router.get('/', MemberController.index)
        router.delete('/:id', MemberController.delete)
        router.put('/:id', MemberController.update),
        router.post('/changepassword', MemberController.changepassword);

    })

    // Routes for Branch:
    router.group('branch', router => {
        router.get('/', BranchController.index);
        router.post('/', BranchController.store);
        router.put('/:id', BranchController.update);
        router.get('/:branchId/member', BranchController.getAllUserOfBranch)
        router.get('/:branchId/customer', BranchController.getAllCustomerOfBranch)
        router.get('/test', BranchController.testDate)
    })

    // Routes for Product:
    router.group('product', router => {
        router.get('/', ProductController.index);
        router.get('/:productId', ProductController.getOne);
        router.post('/', ProductController.store);
    })
    // Routes for Item:
    router.group('item', router => {
        router.get('/', ItemController.index);
        router.get('/:itemID', ItemController.getOne);
        router.post('/', ItemController.store);
        router.put('/:itemId', ItemController.update);
    })

    // Routes for Customer:
    router.group('customer', router => {
        router.get('/search', CustomerController.search);
        router.get('/', CustomerController.index);
        router.get('/:customerId', CustomerController.getOne);
        router.post('/', CustomerController.store);
        router.delete('/:customerId', CustomerController.delete);
        router.put('/:customerId', CustomerController.update);
    })

    // Routes for Order:
    router.group('order', router => {
        router.post('/', OrderController.store)
        router.get('/', OrderController.index)
    })



    // Routes for Invoice:
    router.group('invoice', router => {
        router.get('/today/item', InvoiceController.revenueStatisticsByItemToday)
        router.get('/today/customer', InvoiceController.revenueStatisticsByCustomerToday)
        router.get('/today/revenue', InvoiceController.revenueStatisticsToday)
    })
}).middleware(AuthMiddleware)


let listRoutes = router.init();
module.exports = listRoutes;
