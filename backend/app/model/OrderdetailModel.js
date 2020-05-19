'use strict'

module.exports = (sequelize, DataTypes) => {
    const OrderdetailModel = sequelize.define('orderdetails', {
        price: {type: DataTypes.FLOAT},
        quantity: {type: DataTypes.INTEGER},
        itemId: {type: DataTypes.STRING},
        orderId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return OrderdetailModel;
}