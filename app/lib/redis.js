const redisLib = require('redis');
const { promisify } = require('util');

const redis = {
    async connect() {
        this.client = redisLib.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });

        this.client.on('connect', () => {
            this.existsAsync = promisify(this.client.exists).bind(this.client);
            this.setAsync = promisify(this.client.set).bind(this.client);
        });

        await new Promise(resolve => {
            this.client.on('ready', () => {
                console.log(`redis connected at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
                resolve();
            });

            this.client.on('error', err => console.log(err));
            this.client.on('end', () => console.log('redis client disconnected'));
        });
    }
}

module.exports = redis;