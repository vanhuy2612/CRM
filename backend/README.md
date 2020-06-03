# CRM
Hệ thống quản trị quan hệ khách hàng (Customer Relationship Management)

refs: https://www.inctouch.com/crmproduct?gclid=CjwKCAjw-YT1BRAFEiwAd2WRtpZ1SV1q9yujDBfTNyeEa4y7xoeeWyBXnYBBPZ8dDKUtyADitD7r3hoC2I8QAvD_BwE

+ dựng server nodejs
+ combine nodejs + mssql + react
+ kho dữ liệu và khai phá dữ liệu

git anh Tuan: trantuan94
-------------------------------- CSDL -------
CSDL : varchar(MAX) not nvarchar(..) because Sequelize.STRING = varchar(...)
        datetime2 because: Sequelize translates the Sequelize.DATE type into DATETIME2 for MSSQL, but then proceeds to format dates in this format: 'YYYY-MM-DD HH:mm:ss.SSS Z'.
Get only data in findAll :
        findAll({
                ...,
                raw: true
        },{ })
INNER JOIN: require: true
----------------------------- Mail-----------
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' // insert to server.js fix TLSSocket.onConnectSecure

cài đặt tài khoản google cho phép truy cập của ứng dụng kém an toàn.

setup Redis as a Window service: go to the file and run the comment: redis-server — service-install or if fasle redis-server — service-install redis.windows.conf — loglevel verbose 

pop3, imap : get message from email.
smtp: send mail : bull + redis + nodemailer

Bull and Redis ( task queue): 
        job in queue and queue is handled by process.

        creating queue,
        add job to queue,
        processing job in the queue
defind our job to send an email with nodemailer.
we need Redis to be installed.

------------------------- make a call
call with messenger.