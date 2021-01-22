const mongoose = require('mongoose');
const { config } = require('bluebird');
mongoose.Promise = require('bluebird');

let config_string = '';
if(process.env.MONGO_AUTH) {
    config_string += '?authSource=admin';
}
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_SCHEMA + config_string, (err) => {
    if(err) {
        console.log(err);
    }
    console.log('Connected on MongoDB: ', process.env.MONGO_HOST);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + process.env.MONGO_HOST);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});