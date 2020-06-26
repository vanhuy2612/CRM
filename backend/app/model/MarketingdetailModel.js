'use strict'

module.exports = (sequelize, DataTypes) => {
    const MarketingdetailModel = sequelize.define('marketingdetails', {
        marketingId: {type: DataTypes.STRING},
        customerId: {type: DataTypes.STRING}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return MarketingdetailModel;
}