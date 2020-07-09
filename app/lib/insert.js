const User = require(__base + 'app/models/user');
const Producer = require(__base + 'app/models/producer');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const util = require(__base + 'app/lib/util')

const insert = {
    insertNewUser: (params, callback) => {
        let hash = await util.generateHash(params);
        User.collection.insert({
            'name': params.name,
            'email': params.email,
            'password': params.password,
            'birthday': moment(new Date(params.birthday)).format('DD/MM/YYYY'),
            'role': params.role,
            'phone': params.phone,
            'created_at': new Date(),
            'updated_at': new Date(),
            'status': 1, //Ativo
            'hash': hash
        }).then(() => {
            return callback(false);
        }).catch(e => {
            return callback(e);
        })
    },

    insertNewProducer: (params, callback) => {
        let hash = await util.generateHash(params);
        Producer.collection.insert({
            'name': params.name,
            'email': params.email,
            'password': params.password,
            'location': params.location,
            'phone': params.phone,
            'created_at': new Date(),
            'updated_at': new Date(),
            'status': 1, //Ativo
            'hash': hash
        }).then(() => {
            return callback(false);
        }).catch(e => {
            return callback(e);
        })
    }
}

Promise.promisifyAll(insert);
module.exports = insert;