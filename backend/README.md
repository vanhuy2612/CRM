# CRM
Hệ thống quản trị quan hệ khách hàng (Customer Relationship Management)

refs: https://www.inctouch.com/crmproduct?gclid=CjwKCAjw-YT1BRAFEiwAd2WRtpZ1SV1q9yujDBfTNyeEa4y7xoeeWyBXnYBBPZ8dDKUtyADitD7r3hoC2I8QAvD_BwE

+ dựng server nodejs
+ combine nodejs + mssql + react
+ kho dữ liệu và khai phá dữ liệu

git anh Tuan: trantuan94

CSDL : varchar(MAX) not nvarchar(..) because Sequelize.STRING = varchar(...)
        datetime2 because: Sequelize translates the Sequelize.DATE type into DATETIME2 for MSSQL, but then proceeds to format dates in this format: 'YYYY-MM-DD HH:mm:ss.SSS Z'.
Get only data in findAll :
        findAll({
                ...,
                raw: true
        },{ })
pop3, imap : get message from email.
smtp: send mail

