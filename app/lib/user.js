const User = require(__base + 'app/models/producer');
const util = require(__base + 'app/lib/util')

const user = {
    insertNewUser: async (params) => {
        return new Promise((resolve, reject) => {
            try {
                // let hash = await util.generateHash(params);
                User.collection.insert({
                    'name': params.name,
                    'email': params.email,
                    'password': params.password,
                    'location': params.location,
                    'phone': params.phone,
                    'created_at': new Date(),
                    'updated_at': new Date(),
                    'status': 1, //Ativo
                    // 'hash': hash
                }).then(() => {
                    resolve();
                }).catch(e => {
                    reject(e);
                });
            } catch(e) {
                reject(e);
            }
        })
    },

    updateUser: (params) => {
        return new Promise((resolve, reject) => {
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
                    resolve();
                })
                .catch( e => {
                    reject(e);
                });
            } catch (e) {
                reject(e);
            }
        })
    },

    validateToDisableUser: (params) => {
        return new Promise((resolve, reject) => {
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
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
            } catch(e) {
                reject(e);
            }
        })
    }
}

module.exports = user;
