const nodemailer = require('nodemailer');
const smtptransport = require('nodemailer-smtp-transport');

const transport = smtptransport({
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: false,
    port: 465
})

const Mailsender = nodemailer.createTransport(transport)
module.exports = Mailsender

