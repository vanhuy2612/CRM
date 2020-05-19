'use strict'

module.exports = (sequelize, DataTypes) => {
    const RoleModel = sequelize.define('roles', {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        name: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return RoleModel;
}