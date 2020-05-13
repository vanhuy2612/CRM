'use strict'
const dbConfig = require('../../config/dbConfig');
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model, table:
db.users = require('./UserModel')(sequelize, Sequelize);
db.branchs = require('./BranchModel')(sequelize, Sequelize);

// Relations:



module.exports = db;



