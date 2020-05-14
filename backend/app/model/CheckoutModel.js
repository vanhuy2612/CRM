'use strict'

module.exports = (sequelize, DataTypes) => {
    const CheckoutModel = sequelize.define('checkouts', {
        id: { type: DataTypes.STRING, primaryKey: true},
        customerId: { type: DataTypes.STRING},
        cartId: { type: DataTypes.STRING},
        paymentType: { type: DataTypes.STRING}
    })
    return CheckoutModel;
}