'use strict'

module.exports = (sequelize, DataTypes) => {
    const ActivityModel = sequelize.define('activities', {
        id: {type: DataTypes.STRING, primaryKey: true},
        type: {type: DataTypes.STRING},
        contents: {type: DataTypes.STRING},
        subject: {type: DataTypes.STRING},
        branchId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return ActivityModel;
}