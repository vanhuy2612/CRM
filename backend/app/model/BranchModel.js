'use strict'

module.exports = (sequelize, DataTypes) => {
    const BranchModel = sequelize.define('branchs', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return BranchModel;
}