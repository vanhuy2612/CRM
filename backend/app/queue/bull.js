'use strict'

const Bull = require('bull')
const nodemailer = require('nodemailer')
let { MAIL_SENDER_USER, MAIL_SENDER_PASS, MAIL_SENDER_HOST, MAIL_SENDER_PORT, MAIL_SENDER_SECURE} = process.env

// defind transporter of nodemailer:
const transporter = nodemailer.createTransport({
    host: MAIL_SENDER_HOST,
    port: MAIL_SENDER_PORT,
    secure: MAIL_SENDER_SECURE,
    auth: {
        user: MAIL_SENDER_USER,
        pass: MAIL_SENDER_PASS 
    }
});
