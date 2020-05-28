'use strict'
const imapConfig = require('../../config/imapConfig');
const Imap = require('imap')
const inspect = require('util').inspect;
const { simpleParser} = require('mailparser')
const path = require('path')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class MailService {
    constructor () {
        this.imap = new Imap(imapConfig.imap);
        // if error occurs in connection making;
        this.imap.once('error', (err) => {
            console.log(err)
        })
        // Once it ends
        this.imap.once('end', () => {
            console.log("Read mail executor finished.....")
        })
    }


    async getAllMail () {
        // initiating connection:
        this.imap.connect();
        return new Promise((resolve, reject) => {
            let listMail = [];
            this.imap.once('ready', () => {
                this.imap.openBox('INBOX', false, (err, box) => {
                    if (err) {
                        reject(err);
                    }
                    //if (err)  console.log(err);
                    this.imap.search(['ALL'], (err1, results) => {
                        if (err1) reject(err1);
                        try {
                            const f =  this.imap.fetch(results, {
                                bodies: '',
                                struct: true
                            })
                            f.on('message', (msg, seqno) => {
                                const prefix = `(#${seqno}) `;
                                msg.on('body', (stream, info) => {
                                    //console.log(stream)
                                    // List of mail we need:
                                    simpleParser(stream, {
                                        skipHtmlToText:true, 
                                        //skipTextToHtml: true
                                    }, (err2, mail) => {
                                        if (err2) {
                                            console.log('Read mail executor error …..', err2);
                                            //res.json(err2)
                                            // this.emit(EXECUTOR_EVENTS.STOPPED, { reason: END_REASON.ERROR, error: err2 });
                                        }
                                        // const fileName = `msg-${seqno}-body.txt`;
                                        // const fullFilePath = path.join(workspace, dir, fileName);
                                        let emailEnvolope = {
                                            from: mail.from.text,
                                            date: mail.date,
                                            to: mail.to.text,
                                            subject: mail.subject,
                                            html: mail.html,
                                            text: mail.text,
                                            attachments: []
                                        };
                                        // write attachments
                                        // for (let i = 0; i < mail.attachments.length; i += 1) {
                                        //     const attachment = mail.attachments[i];
                                        //     const { filename } = attachment;
                                        //     emailEnvolope.attachments.push(filename);
                                        //     fs.writeFileSync(path.join(workspace, dir, filename), attachment.content, 'base64'); // take encoding from attachment ?
                                        // }                                       
                                        // const contents = JSON.stringify(emailEnvolope);
                                        listMail.push(emailEnvolope);
                                        // fs.writeFileSync(fullFilePath, contents);
                                        //console.log('processing mail done….');
                                    });
                                });
                                msg.once('attributes', (attrs) => {
                                    // Mark the above mails as read
                                    const { uid } = attrs;
                                    this.imap.addFlags(uid, ['\\Seen'], (err2) => {
                                        if (err2) {
                                           console.log(err2);
                                        } else {
                                            //console.log('Marked as read!');
                                        }
                                    });
                                });
                            })
                            f.once('end', () => {
                                this.imap.end();
                                resolve(listMail); // resolve tại đây vì sự kiện kết thúc tại vị trí này.
                            })
                            // LIST MAIL-----------------------------------------------------
                            //console.log(listMail);
                            //res.json(listMail)
                        } catch (error) {
                            reject(error);
                        }
                    }) // close search
                }) // close open mail box
            })// close ready
        })
    }
}
module.exports = MailService
