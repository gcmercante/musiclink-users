const Producer = require(__base + 'app/models/producer');
const Promise = require('bluebird');
const util = require(__base + 'app/lib/util')

const producer = {
    insertNewProducer: (params, callback) => {
        try {
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
            });
        } catch(e) {
            throw e;
        }
    },

    updateProducer: (params, callback) => {
        try {
            params.update.updated_at = new Date();
            Producer.collection.findOne({
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

    validateToDisableProducer: (params, callback) => {
        try {
            Producer.collection.find({
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

Promise.promisifyAll(producer);
module.exports = producer;
