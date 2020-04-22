'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelizeConfig');

const User = sequelize.define('tbluser',{
    //id: { type: Sequelize.INTEGER},
    username: { type: Sequelize.STRING},
    password: { type: Sequelize.STRING}
},{
    freezeTableName: true
})

module.exports = User;