'use strict'

module.exports = (sequelize, DataTypes) => {
    const OrderItemModel = sequelize.define('orderitems', {
        id: {type: DataTypes.STRING, primaryKey: true},
        price: {type: DataTypes.FLOAT},
        quantity: {type: DataTypes.INTEGER},
        itemId: {type: DataTypes.STRING},
        customerId: {type: DataTypes.STRING},
        cartId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return OrderItemModel;
}