'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelizeConfig');
const UserModel = require('./UserModel')

const BranchModel = sequelize.define('branchs', {
    id: {type: Sequelize.STRING, primaryKey: true},
    name: {type: Sequelize.STRING}
},{
    freezeTableName: true
})
//BranchModel.hasMany(UserModel, { foreignKey: 'branchId', sourceKey: "id"})

module.exports = BranchModel;