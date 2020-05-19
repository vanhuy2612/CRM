'use strict'

module.exports = (sequelize, DataTypes) => {
    const CustomerModel = sequelize.define('customers', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING},
        birthDate: {type: DataTypes.DATE}, // ngay sinh
        sex: {type: DataTypes.STRING}, // gioi tinh
        type: {type: DataTypes.STRING}, // vip or normal
        urlImage: {type: DataTypes.STRING},
        country: {type: DataTypes.STRING}, // dat nuoc
        job: {type: DataTypes.STRING},
        branchId: {type : DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return CustomerModel;
}