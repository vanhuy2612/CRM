'use strict'

module.exports = (sequelize, DataTypes) => {
    const CustomerStat = sequelize.define('customerstats', {
        customerId: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        timeStart: {type: DataTypes.DATE},
        timeEnd: {type: DataTypes.DATE},
        income: {type: DataTypes.FLOAT},
        total: {type: DataTypes.FLOAT}, 
        createdAt: {type: DataTypes.DATE},
        updatedAt: {type: DataTypes.DATE}
    },{
        freezeTableName: true
    })
    return CustomerStat;
}