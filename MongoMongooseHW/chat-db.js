"use strict";

let mongoose = require('mongoose'),
    db = require('./db-settings'),
    Schema = mongoose.Schema,
    userSchema,
    messageSchema,
    User,
    Message;

userSchema = new Schema({
    user: {
        type: String,
        required: true,
        index: { unique: true }
    },
    pass: {
        type: String,
        required: true
    }
});
userSchema.path('user').validate(function(v) {
    return v.length >= 3 && v.length < 25;
});
userSchema.path('pass').validate(function(v) {
    return v.length >= 3 && v.length < 25;
});

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

User = mongoose.model('User', userSchema);
Message = mongoose.model('Message', messageSchema);

function registerUser(userObj){
    if(!userObj || typeof userObj !== 'object'){
        console.log('Invalid user');
        return;
    }

    let newUser = new User(userObj);
    newUser.save(function (err, addedUser) {
        if (err) return console.error(err);
        console.log(`${addedUser.user} registered successfully!`)
    });
}

function sendMessage(messageObj){
    if(!messageObj || typeof messageObj !== 'object'){
        console.log('Invalid message');
        return;
    }

    let newMessage = new Message(messageObj);
    newMessage.save(function (err, addedMessage) {
        if (err) return console.error(err);
        console.log(`Message with ID ${addedMessage._id} sent successfully!`)
    });
}

function getMessages(members){
    if(!members ||
        typeof members !== 'object' ||
        !members.with ||
        !members.and){
        console.log('Invalid user');
        return;
    }

    return Message.find()
        .where('from').in([members.with, members.and])
        .where('to').in([members.with, members.and])
        .exec(function(err, receivedMessages){
            if(err){
                console.log(err);
                return
            }

            console.log(`${receivedMessages.length} messages between ${members.with} and ${members.and} received.`)
        })
}

module.exports = {
    registerUser,
    sendMessage,
    getMessages
};