const router=require('express').Router();
const medicineModel=require('../models/medicines');
router("/ViewMedicine").get((req,res)=>{
    medicineModel.find({})
    .then(medicines=>{
        res.json(medicines);
    })
    .catch(error=>
    {
        res.end(error);
    })
})