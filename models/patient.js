'use strict'
const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
    name: {
        first_name: String,
        last_name: String
    },
    username:String,
    email: String,
    password: String,
    fullName: String,
    gender:String,
    address:String,
    type:String
});
const PatientModel = mongoose.model('patient', PatientSchema);

module.exports = PatientModel;