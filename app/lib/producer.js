const Producer = require(__base + 'app/models/producer');

const producer = {
    insertNewProducer: async (params) => {
        return new Promise((resolve, reject) => {
            try {
                // let hash = await util.generateHash(params);
                Producer.collection.insert({
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

    updateProducer: (params) => {
        return new Promise((resolve, reject) => {
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

    validateToDisableProducer: (params) => {
        return new Promise((resolve, reject) => {
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

module.exports = producer;
