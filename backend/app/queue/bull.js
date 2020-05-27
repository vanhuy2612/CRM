'use strict'

const Queue = require('bull')
const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mailConfig');
const redisConfig = require('../../config/redisConfig')
const to = require('await-to-js').default

let { MAIL_SENDER_USER, MAIL_SENDER_PASS, MAIL_SENDER_HOST, MAIL_SENDER_PORT, MAIL_SENDER_SECURE} = process.env

// defind transporter of nodemailer:
const transporter = nodemailer.createTransport(mailConfig);
// create Queue
const mailQueue = new Queue('sendMail', redisConfig);
console.log("Queue is ready...")

mailQueue.process( async (job, done) => {
    console.log(job);
    const { to, subject, contents, type} = job.data
    let mailOptions = {
        from: MAIL_SENDER_USER,
        to: to,
        subject: subject,
        text: contents
    }
    let reponse = nodemailer.createTransport(mailConfig).sendMail(mailOptions)
})


module.exports = mailQueue;
  