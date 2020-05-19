'use strict'

module.exports = (sequelize, DataTypes) => {
    const AdvertiseModel = sequelize.define('advertises', {
        id: {type: DataTypes.STRING, primaryKey: true},
        type: {type: DataTypes.STRING},
        contents: {type: DataTypes.STRING},
        subject: {type: DataTypes.STRING},
        cost: {type: DataTypes.FLOAT},
        branchId: {type: DataTypes.STRING},
        supplyId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return AdvertiseModel;
}