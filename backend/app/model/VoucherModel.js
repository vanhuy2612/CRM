'use strict'

module.exports = (sequelize, DataTypes) => {
    const VoucherModel = sequelize.define('vouchers', {
        customerId: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        discount: {type: DataTypes.FLOAT}
    },{
        freezeTableName: true
    })
    return VoucherModel;
}