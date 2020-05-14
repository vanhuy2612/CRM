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
        },
        timezone: '+07:00'
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model, table:
db.users = require('./UserModel')(sequelize, Sequelize);
db.branchs = require('./BranchModel')(sequelize, Sequelize);
db.items = require('./ItemModel')(sequelize, Sequelize);
db.products = require('./ProductModel')(sequelize, Sequelize);
db.orderitems = require('./OrderItemModel')(sequelize, Sequelize);
db.customers = require('./CustomerModel')(sequelize, Sequelize);
db.carts = require('./CartModel')(sequelize, Sequelize);
db.checkouts = require('./CheckoutModel')(sequelize, Sequelize);

// Relations:
db.branchs.hasMany(db.users, { foreignKey: 'branchId'});
db.users.belongsTo(db.branchs, {foreignKey: "branchId"});

db.branchs.hasMany(db.customers, { foreignKey: 'branchId'});
db.customers.belongsTo(db.branchs, {foreignKey: "branchId"});

db.customers.hasMany(db.checkouts, { foreignKey: 'customerId'})
db.checkouts.belongsTo(db.customers, { foreignKey: 'customerId'})

db.carts.hasOne(db.checkouts, { foreignKey: 'cartId'})
db.checkouts.belongsTo(db.carts, { foreignKey: 'cartId'})

db.customers.hasMany(db.orderitems, { foreignKey: 'customerId'})
db.orderitems.belongsTo(db.customers, { foreignKey: 'customerId'})

db.items.hasMany(db.orderitems, { foreignKey: 'itemId'})
db.orderitems.belongsTo(db.items, { foreignKey: 'itemId'})

db.carts.hasMany(db.orderitems, { foreignKey: 'cartId'})
db.orderitems.belongsTo(db.carts, { foreignKey: 'cartId'})

db.products.hasOne(db.items, { foreignKey: 'productId'})
db.items.belongsTo(db.products, { foreignKey: 'productId'})

module.exports = db;



