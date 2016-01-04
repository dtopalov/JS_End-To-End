'use strict';

let http = require('http'),
    fs = require('fs'),
    frd = require('formidable'),
    filestore = require('fs-extra'),
    path = require('path'),
    crypto = require('crypto'),
    url = require('url'),
    mime = require('mime'),
    jade = require('jade');

let server = http.createServer(function (req, resp) {

    if (req.url.includes('/upload')) {
        let type = mime.lookup(req.url.substring(req.url.lastIndexOf('.') + 1)),
            filename = req.url.substring(req.url.lastIndexOf('/') + 1),
            filestream = fs.createReadStream('./uploads/' + filename);
        resp.setHeader('Content-disposition', 'attachment; filename=' + filename);
        resp.setHeader('Content-type', type);

        filestream.pipe(resp);
        return;
    }

    if (req.method.toLowerCase() === 'post') {
        let fmr = new frd.IncomingForm();
        fmr.parse(req, function (err, fields, files) {
            resp.writeHead(200, { 'content-type': 'text/plain' });
        });

        fmr.on('end', function (fields, files) {

            let tempPath = this.openedFiles[0].path,
                fileName = this.openedFiles[0].name,
                guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = crypto.randomBytes(1)[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                }),
                newFileName = './uploads/FileUpload_' + guid + '_' + fileName;

            filestore.copy(tempPath, newFileName, function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    }

    if(req.url === '/allFiles') {
        fs.readFile('./views/uploads.jade', function (err, jadeTemplate) {
            if(err) {
                res.end(err);
                return;
            }

            fs.readdir('./uploads/', function (error, files) {
                if(error) {
                    resp.end(error);
                    return;
                }

                let output = jade.compile(jadeTemplate)({
                    files: files
                });

                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(output);
                resp.end();
            })
        });
    }

    if(req.url === '/'){
        fs.readFile("./views/home.html", function (error, pgResp) {

            if (error) {
                resp.writeHead(404);
                resp.write('Not Found');
            } else {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
            }

            resp.end();
        });
    }
});
server.listen(5050);
console.log('Server Started.. on port 5050');