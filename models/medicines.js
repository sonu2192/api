'use strict'
const mongoose = require('mongoose');
const MedicineSchema=new mongoose.Schema({
    doctor:String,
    patient:String,
    date:String,
    medicineList:[]
})
const MedicineModel=new mongoose.model('medicine',MedicineSchema);
module.exports=MedicineModel;
