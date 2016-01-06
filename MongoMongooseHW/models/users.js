"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userSchema,
    User;

userSchema = new Schema({
    user: {
        type: String,
        required: true,
        index: {unique: true}
    },
    pass: {
        type: String,
        required: true
    }
});
userSchema.path('user').validate(function (v) {
    return v.length >= 3 && v.length < 25;
});
userSchema.path('pass').validate(function (v) {
    return v.length >= 3 && v.length < 25;
});

User = mongoose.model('User', userSchema);

module.exports = {
    User
};