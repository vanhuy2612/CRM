'use strict'

module.exports = (sequelize, DataTypes) => {
    const Role_PermissionModel = sequelize.define('role_permissions', {
        roleId: {type: DataTypes.INTEGER},
        permissionId: {type: DataTypes.INTEGER}
    },{
        freezeTableName: true
    })
    return Role_PermissionModel;
}