'use strict'

module.exports = (sequelize, DataTypes) => {
    const BranchModel = sequelize.define('supplies', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return BranchModel;
}