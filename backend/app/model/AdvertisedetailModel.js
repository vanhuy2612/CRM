'use strict'

module.exports = (sequelize, DataTypes) => {
    const AdvertisedetailModel = sequelize.define('advertisedetails', {
        advertiseId: {type: DataTypes.STRING},
        customerId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return AdvertisedetailModel;
}