'use strict'

module.exports = (sequelize, DataTypes) => {
    const PaymentModel = sequelize.define('payments', {
        invoiceId: { type: DataTypes.STRING},
        type: { type: DataTypes.STRING},
        bankName: { type: DataTypes.STRING},
        numberId: { type: DataTypes.STRING}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return PaymentModel;
}