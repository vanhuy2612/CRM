'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProductModel = sequelize.define('products', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        des: {type: DataTypes.STRING},
        makeDate: {type: DataTypes.DATE},
        expiryDate: {type: DataTypes.DATE},
        inputPrice: {type: DataTypes.FLOAT},
        quantity: {type: DataTypes.INTEGER},
        urlImage: {type: DataTypes.INTEGER},
        branchId: {type: DataTypes.STRING},
        supplyId: {type: DataTypes.STRING},
        categoryId: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return ProductModel;
}