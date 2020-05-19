'use strict'

module.exports = (sequelize, DataTypes) => {
    const MarketingModel = sequelize.define('marketings', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        contents: {type: DataTypes.STRING},
        urlImage: {type: DataTypes.STRING},
        subject: {type: DataTypes.STRING},
        startDate: {type: DataTypes.DATE},
        endDate: {type: DataTypes.STRING},
        branchId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return MarketingModel;
}