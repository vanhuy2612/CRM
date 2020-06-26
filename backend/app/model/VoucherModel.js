'use strict'

module.exports = (sequelize, DataTypes) => {
    const VoucherModel = sequelize.define('vouchers', {
        id: {type: DataTypes.STRING, primaryKey: true},
        customerId: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        discount: {type: DataTypes.FLOAT}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return VoucherModel;
}