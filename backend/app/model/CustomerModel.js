'use strict'

module.exports = (sequelize, DataTypes) => {
    const CustomerModel = sequelize.define('customers', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        dateOfBirth: {type: DataTypes.DATE},
        sex: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING}, // vip or normal
        branchId: {type : DataTypes.STRING},
        avatar: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return CustomerModel;
}