'use strict'

const nodemailer = require('nodemailer')
const to = require('await-to-js').default

const { MAIL_SENDER_USER} = process.env
const mailConfig = require('../../config/mailConfig');

class MailService {
    async sendMail(req, res, next) {
        
        let data = req.body
        let mailOptions = {
            from: MAIL_SENDER_USER,
            to: data.to,
            subject: data.subject,
            text: data.contents
        }
         console.log(mailConfig)
         console.log(mailOptions)
        let [ err, response] = await to(
            nodemailer.createTransport(mailConfig).sendMail(mailOptions)
        )
        if(err) console.log(err)
        res.json(response)
    }
}

module.exports = new MailService()