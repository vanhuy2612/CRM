'use strict'

const {SALT_ROUNDS} = process.env;

module.exports ={
    SALT_ROUNDS: SALT_ROUNDS || 10
}