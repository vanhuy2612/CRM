'use strict'

module.exports = (sequelize, DataTypes) => {
    const ContactModel = sequelize.define('contacts', {
        customerId: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        link: {type: DataTypes.STRING},
        username: {type: DataTypes.STRING}
    },{
        freezeTableName: true
    })
    return ContactModel;
}