'use strict';


var crypto = require('crypto');

var SECRET = '_csrfSecret';
var LENGTH = 10;



function create(req) {
    var session = req.session,
        secret = session[SECRET];

    // Save the secret for validation
    if (!secret) {
        console.log('setting SSSEEECRET');
        session[SECRET] = crypto.pseudoRandomBytes(LENGTH).toString('base64');
        secret = session[SECRET];
    }
    var tkn = tokenize(salt(LENGTH), secret);
    console.log('tkn', tkn);
    return tkn;
}


function tokenize(salt, secret) {
    return salt + crypto.createHash('sha1').update(salt + secret).digest('base64');
}


function salt(len) {
    var str = '',
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }

    return str;
}


function validate(req, token) {
    if (typeof token !== 'string') {
        return false;

    }
    console.log('Session Secret', req.session[SECRET]);
    console.log('token', token);
    return token === tokenize(token.slice(0, LENGTH), req.session[SECRET]);
}




module.exports = {
    create: create,
    validate: validate
};