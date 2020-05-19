'use strict'

module.exports = (sequelize, DataTypes) => {
    const InvoiceModel = sequelize.define('invoices', {
        id: { type: DataTypes.STRING, primaryKey: true},
        customerId: { type: DataTypes.STRING},
        orderId: { type: DataTypes.STRING},
        memberId: { type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return InvoiceModel;
}