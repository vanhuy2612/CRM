'use strict'

module.exports = (sequelize, DataTypes) => {
    const OrderdetailModel = sequelize.define('orderdetails', {
        price: {type: DataTypes.FLOAT},
        quantity: {type: DataTypes.INTEGER},
        itemId: {type: DataTypes.STRING, primaryKey: true},
        orderId: {type: DataTypes.STRING, primaryKey: true}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return OrderdetailModel;
}