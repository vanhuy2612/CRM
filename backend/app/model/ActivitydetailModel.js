'use strict'

module.exports = (sequelize, DataTypes) => {
    const ActivitydetailModel = sequelize.define('activitydetails', {
        activityId: {type: DataTypes.STRING},
        customerId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return ActivitydetailModel;
}