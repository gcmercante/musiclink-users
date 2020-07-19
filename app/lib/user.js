const User = require(__base + 'app/models/producer');
const Promise = require('bluebird');
const util = require(__base + 'app/lib/util')

const user = {
    insertNewUser: (params, callback) => {
        try {
            let hash = await util.generateHash(params);
            User.collection.insert({
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
            });
        } catch(e) {
            throw e;
        }
    },

    updateUser: (params, callback) => {
        try {
            params.update.updated_at = new Date();
            User.collection.findOne({
                'email': params.email,
                'hash': params.hash
            })
            .updateOne({ 
                '$set': params.update 
            })
            .then(() => {
                return callback(false);
            })
            .catch( e => {
                return callback(e);
            });
        } catch (e) {
            throw e;
        }
    },

    validateToDisableUser: (params, callback) => {
        try {
            User.collection.find({
                'email': params.email,
                'hash': params.hash
            })
            .updateOne({
                '$set': {
                    'updated_at': new Date(),
                    'status': 2 //Inativo
                }
            })
            .then(() => {
                return callback(false);
            })
            .catch(e => {
                return callback(e);
            });
        } catch(e) {
            throw e;
        }
    }
}

Promise.promisifyAll(user);
module.exports = user;
