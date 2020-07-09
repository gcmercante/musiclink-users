const User = require(__base + 'app/models/user');
const Producer = require(__base + 'app/models/producer');
const Promise = require('bluebird');
const moment = require('moment-timezone');

const update  = {
    updateUserProducer: (params, callback) => {
        if(params.type == 'user') {
            User.collection.find({
                'email': params.email,
                'hash': params.hash
            }).updateOne({ '$set': params.update })
        } else if(params.type == 'producer') {
            Producer.collection.find({
                'email': params.email,
                'hash': params.hash
            }).updateOne({ '$set': params.update })
        }

        return callback(false);
    }
}

Promise.promisifyAll(update);
module.exports = update;