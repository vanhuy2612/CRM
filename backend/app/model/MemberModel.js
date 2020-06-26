'use strict'

module.exports = (sequelize, DataTypes) => {
    const MemberModel = sequelize.define('members', {
        id: { type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING},
        birthDate: {type: DataTypes.DATE},
        username: { type: DataTypes.STRING},
        password: { type: DataTypes.STRING},
        branchId: { type: DataTypes.STRING},
        roleId: { type: DataTypes.INTEGER},
        email: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        position: {type: DataTypes.STRING},
        urlImage: {type: DataTypes.STRING}
    },{
        freezeTableName: true,
        hasTrigger: true
    })
    return MemberModel
}