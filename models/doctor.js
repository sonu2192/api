'use strict'
const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
    name: {
        first_name: String,
        last_name: String
    },
    username:String,
    number:String,
    password: String,
    fullName: String,
    gender:String,
    address:String,
    worksat:String,
    specialization:String,
    type:String
});
const DoctorModel = mongoose.model('doctors', DoctorSchema);
module.exports = DoctorModel;