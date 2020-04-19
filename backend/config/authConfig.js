'use strict'

const {ALGORITHM ='', EXPIRESIN = '10h', SECRECT_KEY = 'default'} = process.env

module.exports = {
    options: {
        algorithm: ALGORITHM,
        expiresIn: EXPIRESIN
    },
    secrectKey: SECRECT_KEY
}