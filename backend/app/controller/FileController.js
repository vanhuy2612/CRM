'use strict'

class FileController {
    constructor(){}

    async uploadFile(req, res, next){
    
        console.log('file:' + req.file);
        res.json(req.file);
    }
}
module.exports = new FileController()