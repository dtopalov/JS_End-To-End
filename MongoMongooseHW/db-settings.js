"use strict";

let mongoose = require('mongoose'),
    connectionString = 'mongodb://localhost:27017',
    dbName = 'chat-db',
    db = mongoose.connect(connectionString + '/' + dbName);

module.exports = db;


