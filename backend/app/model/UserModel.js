'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelizeConfig');
const BranchModel = require('./BranchModel');

const UserModel = sequelize.define('users',{
    id: { type: Sequelize.STRING, primaryKey: true},
    username: { type: Sequelize.STRING},
    password: { type: Sequelize.STRING},
    branchId: { type: Sequelize.STRING},
    role: { type: Sequelize.STRING }
},{
    freezeTableName: true
})
UserModel.belongsTo(BranchModel, {foreignKey: "branchId", as: 'Branch'});

module.exports = UserModel;