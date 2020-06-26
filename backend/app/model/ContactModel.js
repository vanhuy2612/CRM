'use strict'

module.exports = (sequelize, DataTypes) => {
    const ContactModel = sequelize.define('contacts', {
        id: {type: DataTypes.STRING, primaryKey: true},
        customerId: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        link: {type: DataTypes.STRING},
        username: {type: DataTypes.STRING}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return ContactModel;
}