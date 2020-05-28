'use strict'

class Imap {
    async setConn(conn){
        this.conn = conn
    }
    async getConn(){
        return this.conn
    }
    async connectToImap(imaps, imapConfig) {
        let conn = imaps.connect(imapConfig)
        this.setConn(conn)
    }
}
module.exports = new Imap();

