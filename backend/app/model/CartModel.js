'use strict'

module.exports = (sequelize, DataTypes) => {
    const CartModel = sequelize.define('carts', {
        id: {type: DataTypes.STRING, primaryKey: true},
        OrderId: {type: DataTypes.STRING},
    },{
        freezeTableName: true
    })
    return CartModel;
}