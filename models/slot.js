'use strict'
const mongoose = require('mongoose');
const SlotSchema = new mongoose.Schema({
    doctorName:String,
    specialization:String,
    patientName:String,
    time:String,
    date:String
});
const SlotModel = mongoose.model('slot', SlotSchema);

module.exports = SlotModel;