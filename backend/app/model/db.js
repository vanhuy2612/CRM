'use strict'
const dbConfig = require('../../config/dbConfig');
const {Sequelize, Transaction} = require('sequelize');
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
db.Transaction = Transaction;

//-------------- Model, table-----------------------------------:
db.branchs = require('./BranchModel')(sequelize, Sequelize);
db.supplies = require('./SupplyModel')(sequelize, Sequelize);

db.members = require('./MemberModel')(sequelize, Sequelize);
db.roles = require('./RoleModel')(sequelize, Sequelize);
db.permissions = require('./PermissionModel')(sequelize, Sequelize);
db.role_permissions = require('./Role_PermissionModel')(sequelize, Sequelize);

db.items = require('./ItemModel')(sequelize, Sequelize);
db.products = require('./ProductModel')(sequelize, Sequelize);

db.orderdetails = require('./OrderdetailModel')(sequelize, Sequelize);
db.orders = require('./OrderModel')(sequelize, Sequelize);
db.categories = require('./CategoryModel')(sequelize, Sequelize);
db.invoices = require('./InvoiceModel')(sequelize, Sequelize);
db.payments = require('./PaymentModel')(sequelize, Sequelize);

db.customers = require('./CustomerModel')(sequelize, Sequelize);
db.contacts = require('./ContactModel')(sequelize, Sequelize);
db.vouchers = require('./VoucherModel')(sequelize, Sequelize);

db.marketings = require('./MarketingModel')(sequelize, Sequelize);
db.workons = require('./WorkonModel')(sequelize, Sequelize);
db.marketingdetails = require('./MarketingdetailModel')(sequelize, Sequelize);

db.activities = require('./ActivityModel')(sequelize, Sequelize);
db.activitiedetails = require('./ActivitydetailModel')(sequelize, Sequelize);

db.advertises = require('./AdvertiseModel')(sequelize, Sequelize);
db.advertisedetails = require('./AdvertisedetailModel')(sequelize, Sequelize);

db.customerstats = require('./CustomerStat')(sequelize, Sequelize)
db.revenuestats = require('./RevenueStat')(sequelize, Sequelize)
// --------------Relations---------------------------------:
// 1. branchs 1-n members
db.branchs.hasMany(db.members, { foreignKey: 'branchId'});
db.members.belongsTo(db.branchs, {foreignKey: "branchId"});
// 2. branchs 1-n products
db.branchs.hasMany(db.products, { foreignKey: 'branchId'});
db.products.belongsTo(db.branchs, {foreignKey: "branchId"});
// 3. branchs 1-n marketings
db.branchs.hasMany(db.marketings, { foreignKey: 'branchId'})
db.marketings.belongsTo(db.branchs, { foreignKey: 'branchId'})
// 4. branch 1-n activities
db.branchs.hasMany(db.activities, { foreignKey: 'branchId'});
db.activities.belongsTo(db.branchs, {foreignKey: "branchId"});
// 5. branch 1-n customers
db.branchs.hasMany(db.customers, { foreignKey: 'branchId'});
db.customers.belongsTo(db.branchs, {foreignKey: "branchId"});
// 6. products 1-n items
db.products.hasMany(db.items, { foreignKey: 'productId'})
db.items.belongsTo(db.products, { foreignKey: 'productId'})
// 7. products n-1 categories
db.categories.hasMany(db.products, { foreignKey: 'categoryId'})
db.products.belongsTo(db.categories, { foreignKey: 'categoryId'})
// 8. customers 1-n invoices
db.customers.hasMany(db.invoices, { foreignKey: 'customerId'})
db.invoices.belongsTo(db.customers, { foreignKey: 'customerId'})

// 9. customers 1-n orders
db.customers.hasMany(db.orders, { foreignKey: 'customerId'})
db.orders.belongsTo(db.customers, { foreignKey: 'customerId'})

// 10. orders 1-1 invoices
db.orders.hasOne(db.invoices, { foreignKey: 'orderId'})
db.invoices.belongsTo(db.orders, { foreignKey: 'orderId'})

// 11. customers n-m marketings
db.customers.belongsToMany(db.marketings, { through: db.marketingdetails });
db.marketings.belongsToMany(db.customers, { through: db.marketingdetails });
// 12. customers n-m activities
db.customers.belongsToMany(db.activities, { through: db.activitiedetails });
db.activities.belongsToMany(db.customers, { through: db.activitiedetails });

// 13. members n-m marketings
db.members.belongsToMany(db.marketings, { through: db.workons });
db.marketings.belongsToMany(db.members, { through: db.workons });

// 14. customers 1-n contacts
db.customers.hasMany(db.contacts, { foreignKey: 'customerId'})
db.contacts.belongsTo(db.customers, { foreignKey: 'customerId'})

// 15. invoices 1-1 payments
db.invoices.hasOne(db.payments, { foreignKey: 'invoiceId'})
db.payments.belongsTo(db.invoices, { foreignKey: 'invoiceId'})

// 16. branchs 1-n advertises
db.branchs.hasMany(db.advertises, { foreignKey: 'branchId'})
db.advertises.belongsTo(db.branchs, { foreignKey: 'branchId'})

// 17. supplies 1-n advertises
db.supplies.hasMany(db.advertises, { foreignKey: 'supplyId'})
db.advertises.belongsTo(db.supplies, { foreignKey: 'supplyId'})

// 18. customers n-m advertises
db.customers.belongsToMany(db.advertises, { through: db.advertisedetails });
db.advertises.belongsToMany(db.customers, { through: db.advertisedetails });

// // 19. orders 1-n orderdetails
// db.orders.hasMany(db.orderdetails, { foreignKey: 'orderId'})
// db.orderdetails.belongsTo(db.orders, { foreignKey: 'orderId'})

// // 20. items 1-n orderdetails
// db.items.hasMany(db.orderdetails, { foreignKey: 'itemId'})
// db.orderdetails.belongsTo(db.items, { foreignKey: 'itemId'})

// 21. items n-m orders
db.items.belongsToMany(db.orders, { through: db.orderdetails });
db.orders.belongsToMany(db.items, { through: db.orderdetails });

// 22. customers 1-n vouchers
db.customers.hasMany(db.vouchers, { foreignKey: 'customerId'})
db.vouchers.belongsTo(db.customers, { foreignKey: 'customerId'})

// 23. members 1-1 roles
db.roles.hasOne(db.members, { foreignKey: 'roleId'})
db.members.belongsTo(db.roles, { foreignKey: 'roleId'})

// 24. roles n-m permissions
db.roles.belongsToMany(db.permissions, { through: db.role_permissions });
db.permissions.belongsToMany(db.roles, { through: db.role_permissions });

// export:
module.exports = db;



