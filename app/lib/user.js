const User = require(__base + 'app/models/user');
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const util = require('./util');

const user = {
    insertNewUser: async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const password = await bcrypt.hash(params.password, 10);
                User.collection.insertOne({
                    'name': params.name,
                    'email': params.email,
                    'password': password,
                    'phone': params.phone,
                    'role': params.role,
                    'created_at': new Date(),
                    'updated_at': new Date(),
                    'status': 1, //Ativo
                }).then(async () => {
                    await util.insertEmailRedis(params.email);
                    resolve();
                }).catch(e => reject(e));

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
                    'email': params.email
                })
                .updateOne({ 
                    '$set': params.update 
                })
                .then(() => resolve())
                .catch( e => reject(e));
            } catch (e) {
                reject(e);
            }
        })
    },

    validateToDisableUser: (params) => {
        return new Promise((resolve, reject) => {
            try {
                User.collection.find({
                    'email': params.email
                })
                .updateOne({
                    '$set': {
                        'updated_at': new Date(),
                        'status': 2 //Inativo
                    }
                })
                .then(() => resolve())
                .catch(e => reject(e));
            } catch(e) {
                reject(e);
            }
        })
    },

    validateUser: (params) => {
        return new Promise(async (resolve, reject) => {
            try{
                const result = await User.collection.findOne({ 'email': params.email }, { _id: 0, password: 1 });

                if(!result) {
                    resolve('invalid');
                }

                const match = await bcrypt.compare(params.password, result.password);
                if(match) {
                    resolve('valid');
                } else {
                    resolve('invalid');
                }
            } catch(e) {
                reject(e);
            }
        })
    }
}

module.exports = user;
