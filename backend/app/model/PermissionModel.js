'use strict'

module.exports = (sequelize, DataTypes) => {
    const RoleModel = sequelize.define('permissions', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        des: {type: DataTypes.STRING},
        keyRoute: {type: DataTypes.STRING},
        link: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return RoleModel;
}