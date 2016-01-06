"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    messageSchema,
    Message;

messageSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});
Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message
};