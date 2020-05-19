'use strict'

module.exports = (sequelize, DataTypes) => {
    const RoleModel = sequelize.define('roles', {
        roleId: {type: DataTypes.INTEGER},
        des: {type: DataTypes.STRING},
        keyValue: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return RoleModel;
}