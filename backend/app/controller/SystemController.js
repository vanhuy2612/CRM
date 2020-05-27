'use strict'
const mailQueue = require('../queue/Bull');

class SystemController{
    constructor(){}
    async sendMail(req, res, next){
        mailQueue.add(req.body);
        res.json({message: "Your email was sending"})
    }
}
module.exports = new SystemController()