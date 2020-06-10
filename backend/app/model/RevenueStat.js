'use strict'

module.exports = (sequelize, DataTypes) => {
    const RevenueStat = sequelize.define('revenuestats', {
        branchId: {type: DataTypes.STRING, defaultValue: process.env.BRANCH_ID},
        type: {type: DataTypes.STRING},
        timeStart: {type: DataTypes.DATE},
        timeEnd: {type: DataTypes.DATE},
        income: {type: DataTypes.FLOAT},
        createdAt: {type: DataTypes.DATE},
        updatedAt: {type: DataTypes.DATE}
    },{
        freezeTableName: true
    })
    return RevenueStat;
}