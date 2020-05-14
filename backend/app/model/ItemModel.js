'use strict'

module.exports = (sequelize, DataTypes) => {
    const ItemModel = sequelize.define('items', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        productId: {type: DataTypes.STRING},
        price: {type: DataTypes.FLOAT},
        des: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return ItemModel;
}