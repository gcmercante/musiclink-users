const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    'name': String,
    'email': String,
    'password': String,
    'location': String,
    'phone': String
});

ProducerSchema.index({ 'email': 1 });
ProducerSchema.index({ 'email': 1, 'password': 1 })

module.exports = mongoose.model('Producer', ProducerSchema);