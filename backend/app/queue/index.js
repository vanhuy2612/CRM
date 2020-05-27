'use strict'
const { makeProcess, makeQueue } = require('./Bull')

module.exports = function(){
    makeProcess();
    makeQueue();
}