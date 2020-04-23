'use strict'

const Router = require('express').Router();
const UserController = require('../app/controller/UserController');

Router.post('/api/login', UserController.login)
Router.post('/api/register', UserController.register)

module.exports = Router;
