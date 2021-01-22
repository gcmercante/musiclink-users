const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    'name': String,
    'email': String,
    'password': String,
    'location': String,
    'phone': String,
    'updated_at': Date,
    'created_at': Date,
    'hash': String,
    'status': Number
});

ProducerSchema.index({ 'email': 1 });
ProducerSchema.index({ 'email': 1, 'password': 1 });
ProducerSchema.index({ 'email': 1, 'hash': 1 });

module.exports = mongoose.model('Producer', ProducerSchema);