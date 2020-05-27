const Bull = require('@app/Services/Bull');
const sendGrid = require('@sendgrid/mail');
const appConfig = require('@config/app');
const dbConfig = require('@config/database');
const execFile = require('child_process').execFile;
const ChildProcess = require('child_process');
const moment = require('moment');
const fs = require('fs');
const path = require('path');


sendGrid.setApiKey(appConfig.SEND_GRID.API_KEY);

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: appConfig.MAIL_SENDER.host,
  port: appConfig.MAIL_SENDER.port,
  secure: appConfig.MAIL_SENDER.secure, // true for 465, false for other ports
  auth: {
    user: appConfig.MAIL_SENDER.user, // generated ethereal user
    pass: appConfig.MAIL_SENDER.password // generated ethereal password
  }
});

const thread = {
  sendMail: 10,
  backupDB: 1,
  restoreDB: 1
}

var makeProcess = function () {
  //process điều khiển việc gửi mail
  Bull.createProcess("sendMail", async (job) => {
    const { to, subject, content, type } = job.data
    let response;
    if (type == "grid") {
      response = sendGrid.send({
        to: to,
        from: appConfig.SEND_GRID.FROM,
        subject: subject,
        html: content
      })
    }
    else {
      response = await transporter.sendMail({
        from: appConfig.MAIL_SENDER.from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content // html body
      });
    }
    return Promise.resolve(response)
  }, thread.sendMail);

  // Create job to backup database
  Bull.createProcess('BackupDB', async (job) => {
    const backupDirPath = path.join( process.cwd(), 'backups');
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath);
    }
    const currentTime = moment().format('YYYY_MM_DD_HH_mm_ss');
    const backupFileName = `backup_${currentTime}.sql`;
    const backupFilePath = path.join(backupDirPath, backupFileName);
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = dbConfig;
    let backupScript = `pg_dump -c -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -p ${DB_PORT}`;
    let script = execFile(path.join(process.cwd(), 'scripts/backup.sh'), [backupScript, backupFilePath, DB_PASS],
    (error, stdout, stderr) => {
      if (error !== null) {
        console.log('backup Err: ', error);
        throw error;
      } else {
        console.log('Backup complete!')
        Promise.resolve('Backup done!')
      }
    });
    Promise.resolve('Backup done!')
  }, thread.backupDB);

  // Create job to restore database.
  Bull.createProcess('RestoreDB', async (job) => {
    const { backupFile } = job.data;
    const backupFilePath = path.join(process.cwd(), 'backups', backupFile);
    const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = dbConfig;
    if (fs.existsSync(backupFilePath)) {
      let restoreScript = `psql -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -p ${DB_PORT}`;
      console.log('restore script', restoreScript);
      console.log('file backup', backupFilePath);
      let script = execFile(path.join(process.cwd(), 'scripts/restoredb.sh'), [restoreScript, backupFilePath, DB_PASS],
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log('Restore DB Err: ', error);
            Promise.reject(error);
          } else {
            console.log('Restore DB complete!');
            Promise.resolve('Restore DB done!');
          }
        })
    } else {
      console.log('backup file', backupFile , ' is not exist.')
    }
    Promise.resolve('Restored DB!')
    
  }, thread.restoreDB);
}

var makeQueue = function () {
  Bull.createQueue('sendMail');
  Bull.createQueue('BackupDB');
  // Bull.createQueue('RestoreDB');
  console.log("Queue is ready...")
}

module.exports = { makeProcess, makeQueue }
