"use strict";

let db = require('./db-settings'),
    models = require('./models'),
    User = models.users.User,
    Message = models.messages.Message;

function registerUser(userObj) {
    if (!userObj || typeof userObj !== 'object') {
        console.log('Invalid user');
        return;
    }

    let newUser = new User(userObj);
    newUser.save(function (err, addedUser) {
        if (err) return console.error(err);
        console.log(`${addedUser.user} registered successfully!`)
    });
}

function sendMessage(messageObj) {
    if (!messageObj || typeof messageObj !== 'object') {
        console.log('Invalid message');
        return;
    }

    let newMessage = new Message(messageObj);
    newMessage.save(function (err, addedMessage) {
        if (err) return console.error(err);
        console.log(`Message with ID ${addedMessage._id} sent successfully!`)
    });
}

function getMessages(members) {
    if (!members ||
        typeof members !== 'object' || !members.with || !members.and) {
        console.log('Invalid user');
        return;
    }

    return Message.find()
        .where('from').in([members.with, members.and])
        .where('to').in([members.with, members.and])
        .exec(function (err, receivedMessages) {
            if (err) {
                console.log(err);
                return
            }

            console.log(`${receivedMessages.length} messages between ${members.with} and ${members.and} received.`)
        })
}

module.exports = {
    registerUser,
    sendMessage,
    getMessages,
    db
};