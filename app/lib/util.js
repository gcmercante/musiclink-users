const redis = require('./redis');

const util = {
    validateEmail: async (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await redis.existsAsync(email);
                if(result) {
                    resolve('invalid');
                }
                resolve('valid');
            } catch(e) {
                reject(e);
            }
        })
    },
    
    insertEmailRedis: async (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await redis.setAsync(email, 1);
                resolve(result);
            } catch(e) {
                reject(e);
            }
        })
    }
}

module.exports = util;