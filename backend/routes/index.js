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
const PermissionController = require('../app/controller/PermissionController')

/*
router.group().middleware(...) : chỉ dùng middleware cho thằng router group
còn get, pop, put thì phải dùng : router.get('',[middleware], func);
*/ 

const AuthMiddleware = require('../middleware/auth.middleware')
const PermissonMiddleware = require('../middleware/permission.middleware');

// Routes for register and login;
router.group( router => {
    router.post('/login', MemberController.login);
    router.post('/register', MemberController.register);
}
).prefix('/api');
// Routes need check roles
router.group('/api', router => {
    // Routes for Member:
    router.group('/member', router => {
        router.get('/',[PermissonMiddleware('GetAllMember')] , MemberController.index)
        router.delete('/:id', [PermissonMiddleware('DeleteMember')], MemberController.delete)
        router.put('/:id',[PermissonMiddleware('UpdateMember')], MemberController.update)
        router.post('/changepassword',[PermissonMiddleware('ChangePassword')], MemberController.changepassword)
    })

    // Routes for Branch:
    router.group('branch', router => {
        router.get('/',[PermissonMiddleware('GetAllBranch')], BranchController.index)
        router.post('/',[PermissonMiddleware('StoreBranch')], BranchController.store)
        router.put('/:id',[PermissonMiddleware('UpdateBranch')], BranchController.update)
        router.get('/:branchId/member',[PermissonMiddleware('GetListMemberOfBranch')], BranchController.getAllUserOfBranch)
        router.get('/:branchId/customer',[PermissonMiddleware('GetListCustomerOfBranch')], BranchController.getAllCustomerOfBranch)
        router.get('/test',[PermissonMiddleware('DeleteMember')], BranchController.testDate)
    })

    // Routes for Product:
    router.group('product', router => {
        router.get('/',[PermissonMiddleware('GetAllProduct')], ProductController.index)
        router.get('/:productId',[PermissonMiddleware('DetailProduct')], ProductController.getOne)
        router.post('/',[PermissonMiddleware('StoreProduct')], ProductController.store)
    })
    // Routes for Item:
    router.group('item', router => {
        router.get('/',[PermissonMiddleware('GetAllItem')], ItemController.index)
        router.get('/:itemID',[PermissonMiddleware('DetailItem')], ItemController.getOne)
        router.post('/',[PermissonMiddleware('StoreItem')], ItemController.store)
        router.put('/:itemId',[PermissonMiddleware('UpdateItem')], ItemController.update)
    })

    // Routes for Customer:
    router.group('customer', router => {
        router.get('/search',[PermissonMiddleware('SearchCustomer')], CustomerController.search)
        router.get('/',[PermissonMiddleware('GetAllCustomer')], CustomerController.index)
        router.get('/:customerId',[PermissonMiddleware('DetailCustomer')], CustomerController.getOne)
        router.post('/',[PermissonMiddleware('StoreCustomer')], CustomerController.store)
        router.delete('/:customerId',[PermissonMiddleware('DeleteCustomer')], CustomerController.delete)
        router.put('/:customerId',[PermissonMiddleware('UpdateCustomer')], CustomerController.update)
    })

    // Routes for Order:
    router.group('order', router => {
        router.post('/',[PermissonMiddleware('StoreOrder')], OrderController.store)
        router.get('/',[PermissonMiddleware('GetAllOrder')], OrderController.index)
    })



    // Routes for Invoice:
    router.group('invoice', router => {
        router.get('/today/item',[PermissonMiddleware('RevenueStatisticsByItemToday')], InvoiceController.revenueStatisticsByItemToday)
        router.get('/today/customer',[PermissonMiddleware('revenueStatisticsByCustomerToday')], InvoiceController.revenueStatisticsByCustomerToday)
        router.get('/today/revenue',[PermissonMiddleware('revenueStatisticsToday')], InvoiceController.revenueStatisticsToday)
    })
    // Routes for Permission:
    router.group('permission', router => {
        router.get('/',[PermissonMiddleware('GetAllPermission')], PermissionController.index)
    })
}).middleware([AuthMiddleware])


let listRoutes = router.init();
module.exports = listRoutes;
