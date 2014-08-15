'use strict';


var crypto = require('crypto');

var SECRET = 'csrfSecret';
var LENGTH = 10;



function create(req) {
    var session = req.session,
        secret = session[SECRET];
    Object.keys(session).forEach(function (key) {
        console.log(key);
    });
    //console.log('session', session);
    // Save the secret for validation
    if (!secret) {
        console.log('create');
        session[SECRET] = crypto.pseudoRandomBytes(LENGTH).toString('base64');
        secret = session[SECRET];
    }
    // console.log('token', tokenize(salt(LENGTH), secret));
    // console.log('secret', secret);
    return tokenize(salt(LENGTH), secret);
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
    //console.log(token, tokenize(token.slice(0, LENGTH), req.session[SECRET]));
    return token === tokenize(token.slice(0, LENGTH), req.session[SECRET]);
}




module.exports = {
    create: create,
    validate: validate
};