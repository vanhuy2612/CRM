'use strict'

module.exports = (sequelize, DataTypes) => {
    const WorkonModel = sequelize.define('workons', {
        memberId: {type: DataTypes.STRING},
        marketingId: {type: DataTypes.STRING}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return WorkonModel;
}