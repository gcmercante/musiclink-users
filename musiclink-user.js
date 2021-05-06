global.__base = __dirname + '/';
require('dotenv').config();
require(__base + 'app/server/server');
require(__base + 'app/mongo/connection')()

const redis = require(__base + 'app/lib/redis');

(async () => {
    try {
        await redis.connect();
    } catch(e) {
        console.log(e);
    }
})();