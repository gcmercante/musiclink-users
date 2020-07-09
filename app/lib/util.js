const Promise = require('bluebird');

const util = {
    generateHash: (params) => {
        return btoa(params.email);
    }
}

Promise.promisifyAll(util);
module.exports = util;