'use strict'
const dbConfig = require('./dbConfig');
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.server,
        dialect: dbConfig.type,
        dialectOptions: {
            instanceName: dbConfig.instanceName,
            trustedConnection: true
        }
    }
)

module.exports = sequelize;