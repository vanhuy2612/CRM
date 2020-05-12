'use strict'

const Router = require('express-group-router');
const router = new Router();

const UserController = require('../app/controller/UserController');

const AuthMiddleware = require('../middleware/auth.middleware')

router.group( router => {
    router.post('/login', UserController.login);
    router.post('/register', UserController.register);
}
).prefix('/api').middleware(AuthMiddleware);
router.group( router => {
    router.get('/', UserController.index)
}).prefix('/api/user')
let listRoutes = router.init();
module.exports = listRoutes;
