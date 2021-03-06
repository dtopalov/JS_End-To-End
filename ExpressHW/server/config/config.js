'use strict';

let path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/easyTrade',
        port: process.env.PORT || 3000
    }
};