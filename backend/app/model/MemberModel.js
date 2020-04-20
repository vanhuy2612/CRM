'use strict'

const BaseModel = require('./BaseModel')
const bcrypt = require('bcrypt');
const bcryptConfig = require('../../config/bcryptConfig');
const SALT_ROUNDS =  10;
const mssql = require('mssql');
const dbConfig = require('../../config/dbConfig');


class MemberModel extends BaseModel {
    constructor(){
        super();
    }
    async getMemberByUsename(username){
        /*
            Connect to database:
        */
        const pool = await mssql.connect(dbConfig);

        let getMemberByUserame = await pool.request()
            .input('username', mssql.NVarChar, username)
            .query('SELECT * FROM tbluser WHERE username LIKE @username');
        return getMemberByUserame.recordset[0];
    }
    async storeUser(params){
        /*
            Connect to database:
        */
        const pool = await mssql.connect(dbConfig);

        let username = params.username;
        let password = bcrypt.hashSync(params.password, SALT_ROUNDS);
    
        let UserStore = await pool.request()
            .input('username', mssql.NVarChar, username)
            .input('password', mssql.NVarChar, password)
            .query('INSERT INTO tbluser(username, password) VALUES(@username, @password)');
        return UserStore;
    }
}

module.exports = new MemberModel();