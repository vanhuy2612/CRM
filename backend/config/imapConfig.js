'use strict'
const {IMAP_USER, IMAP_PASSWORD, IMAP_HOST, IMAP_PORT, IMAP_TLS, IMAP_AUTHTIMEOUT} = process.env

module.exports = {
    imap: {
        user: IMAP_USER,
        password: IMAP_PASSWORD,
        host: IMAP_HOST,
        port: IMAP_PORT,
        tls: IMAP_TLS,
        authTimeout: IMAP_AUTHTIMEOUT
    }
}