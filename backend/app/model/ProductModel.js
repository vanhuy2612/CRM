'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProductModel = sequelize.define('products', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        branchId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return ProductModel;
}