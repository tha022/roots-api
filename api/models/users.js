let mongoose = require('mongoose');
let crypto = require('crypto'); //provides cryptographic functionality
let jwt = require('jsonwebtoken'); //api send it as a response


let userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    hash: String, //created by combining the password provided by the user and the salt,
                    // and then applying one-way encryption
    salt: String  //string of characters unique to each user
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); // encryption the salt
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};

mongoose.model('User', userSchema);