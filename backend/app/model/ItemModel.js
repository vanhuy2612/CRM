'use strict'

module.exports = (sequelize, DataTypes) => {
    const ItemModel = sequelize.define('items', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        productId: {type: DataTypes.STRING},
        price: {type: DataTypes.FLOAT},
        
    },{
        freezeTableName: true
    })
    return ProductModel;
}