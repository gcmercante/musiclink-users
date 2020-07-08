const User = require(__base + 'app/models/user');
const Producer = require(__base + 'app/models/producer');
const Promise = require('bluebird');
const moment = require('moment-timezone');

const insert = {
    insertNewUser: (params, callback) => {
        User.collection.insert({
            'name': params.name,
            'email': params.email,
            'password': params.password,
            'birthday': moment(new Date(params.birthday)).format('DD/MM/YYYY'),
            'role': params.role,
            'phone': params.phone
        }).then(() => {
            return callback(false);
        }).catch(e => {
            return callback(e);
        })
    },

    insertNewProducer: (params, callback) => {
        Producer.collection.insert({
            'name': params.name,
            'email': params.email,
            'password': params.password,
            'location': params.location,
            'phone': params.phone
        }).then(() => {
            return callback(false);
        }).catch(e => {
            return callback(e);
        })
    }
}

Promise.promisifyAll(insert);
module.exports = insert;