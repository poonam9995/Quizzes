
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
    admin_Id:{type:String},
    password:{type:String}
})

module.exports = mongoose.model('admin',admin);
