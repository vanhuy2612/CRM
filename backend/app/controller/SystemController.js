'use strict'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const imapConfig = require('../../config/imapConfig');
const MailService = require('../services/MailService');

const mailQueue = require('../queue/Bull');
var Imap = require('imap'),
    inspect = require('util').inspect;
const { simpleParser} = require('mailparser')
const path = require('path')

var imap = new Imap(imapConfig.imap);

let openInbox = (cb) => {
    imap.openBox('INBOX', true, cb);
}

class SystemController {
    constructor() {
    }
    async sendMail(req, res, next) {
        mailQueue.add(req.body);
        res.json({ message: "Your email was sending" })
    }
    async getAllMail(req, res, next) {
        let mailService = new MailService();
        let listMail = await mailService.getAllMail();

        return res.json(listMail.reverse())
    }
}
module.exports = new SystemController()