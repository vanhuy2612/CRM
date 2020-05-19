'use strict'

module.exports = (sequelize, DataTypes) => {
    const CategoryModel = sequelize.define('categories', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        des: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return CategoryModel;
}