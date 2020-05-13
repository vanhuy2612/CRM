'use strict'

module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('users',{
        id: { type: DataTypes.STRING, primaryKey: true},
        username: { type: DataTypes.STRING},
        password: { type: DataTypes.STRING},
        branchId: { type: DataTypes.STRING},
        role: { type: DataTypes.STRING }
    },{
        freezeTableName: true
    })
    return UserModel;
}