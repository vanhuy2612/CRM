'use strict'
const {MAIL_SENDER_HOST, MAIL_SENDER_PASS, MAIL_SENDER_PORT, MAIL_SENDER_SECURE, MAIL_SENDER_USER} = process.env
module.exports = {
    host: MAIL_SENDER_HOST,
    port: MAIL_SENDER_PORT,
    secure: MAIL_SENDER_SECURE,
    auth: {
        user: MAIL_SENDER_USER,
        pass: MAIL_SENDER_PASS 
    }
}