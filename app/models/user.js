const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    'name': String,
    'email': String,
    'password': String,
    'birthday': Date,
    'role': String,
    'phone': String
});

UserSchema.index({ 'email': 1 });
UserSchema.index({ 'email': 1, 'password': 1 })

module.exports = mongoose.model('User', UserSchema);