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
        let listMail = await mailService.getListMail();

        return res.json(listMail)
        // Starting read mail:
        // imap.once('ready', () => {
        //     imap.openBox('INBOX', false, (err, box) => {
        //         //if (err)  console.log(err);
        //         imap.search(['SEEN'], (err1, results) => {
        //             // if (err1) res.json(err1)
        //             try {
        //                 const f = imap.fetch(results, {
        //                     bodies: '',
        //                     struct: true
        //                 })
        //                 f.on('message', (msg, seqno) => {
        //                     const prefix = `(#${seqno}) `;
        //                     msg.on('body', (stream, info) => {
        //                         // List of mail we need:
        //                         simpleParser(stream, (err2, mail) => {
        //                             if (err2) {
        //                                 console.log('Read mail executor error …..', err2);
        //                                 //res.json(err2)
        //                                 // this.emit(EXECUTOR_EVENTS.STOPPED, { reason: END_REASON.ERROR, error: err2 });
        //                             }
        //                             // const fileName = `msg-${seqno}-body.txt`;
        //                             // const fullFilePath = path.join(workspace, dir, fileName);
        //                             let emailEnvolope = {};
        //                             emailEnvolope.from = mail.from.text;
        //                             emailEnvolope.date = mail.date;
        //                             emailEnvolope.to = mail.to.text;
        //                             emailEnvolope.subject = mail.subject;
        //                             emailEnvolope.text = mail.text;
        //                             emailEnvolope.attachments = [];
        //                             // write attachments
        //                             // for (let i = 0; i < mail.attachments.length; i += 1) {
        //                             //     const attachment = mail.attachments[i];
        //                             //     const { filename } = attachment;
        //                             //     emailEnvolope.attachments.push(filename);
        //                             //     fs.writeFileSync(path.join(workspace, dir, filename), attachment.content, 'base64'); // take encoding from attachment ?
        //                             // }
        //                             // Show list mail
        //                             // const contents = JSON.stringify(emailEnvolope);
        //                             listMail.push(emailEnvolope);
        //                             // fs.writeFileSync(fullFilePath, contents);
        //                             //console.log('processing mail done….');
        //                             //-------------------------------------------------------------
        //                             //console.log(emailEnvolope)
        //                             //console.log(listMail);
                                   
        //                         });
                
        //                     });
        //                     msg.once('attributes', (attrs) => {
        //                         // Mark the above mails as read
        //                         const { uid } = attrs;
        //                         imap.addFlags(uid, ['\\Seen'], (err2) => {
        //                             if (err2) {
        //                                console.log(err2);
        //                             } else {
        //                                 //console.log('Marked as read!');
        //                             }
        //                         });
        //                     });
        //                 })
        //                 f.once('end', () => {
        //                     imap.end()
        //                 })
        //                 // LIST MAIL-----------------------------------------------------
        //                 //console.log(listMail);
        //                 //res.json(listMail)
        //             } catch (error) {

        //             }
        //         })
        //     }) // close open mail box
        // })// close ready
        // // if error occurs in connection making;
        // imap.once('error', (err) => {
        //     console.log(err)
        // })
        // // Once it ends
        // imap.once('end', () => {
        //     console.log("Read mail executor finished.....")
        // })
        // // initiating connection:
        // imap.connect();
        // ----------------------------------------------------------------------------------------
        //console.log(listMail)
    }
}
module.exports = new SystemController()