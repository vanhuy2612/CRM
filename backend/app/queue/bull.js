'use strict'

const Bull = require('bull')
const nodemailer = require('nodemailer')
let { MAIL_HOST, MAIL_PASS} = process.env

// 1. Initiating the Queue
const sendMailQueue = new Queue('sendMail', {
    redis: {
      host: 'localhost',
      port: 6379,
      password: 'root'
    }
});

const sendMail = async (data) => {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: MAIL_HOST, // generated ethereal user
            pass: MAIL_PASS, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: MAIL_HOST, // sender address
        to: data.customer, // list of receivers
        subject: data.subject, // Subject line
        text: data.content, // plain text body
        // html: "<b>Test chức năng gửi mail ứng dụng Nodejs với Nodemailer</b>" // html body
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}