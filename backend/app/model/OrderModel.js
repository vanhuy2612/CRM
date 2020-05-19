'use strict'

module.exports = (sequelize, DataTypes) => {
    const OrderModel = sequelize.define('orders', {
        id: {type: DataTypes.STRING, primaryKey: true},
        customerId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return OrderModel;
}