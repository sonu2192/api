const router=require('express').Router();
const medicineModel=require('../models/medicines');
router.route("/StoreMedicine").post((req,res)=>{
    const {medicines,date,patientName,doctorName}=req.body;
    const medicineRecord=new medicineModel({
        doctor:doctorName,
    patient:patientName,
    date:date,
    medicineList:medicines
    })
    medicineRecord.save()
    .then(msg=>{
        //console.log(msg);
        res.end("Submitted Sucessfully")
    })
    .catch(err=>{
        res.end(err)
    })
})
router.route('/ViewMedicine').post((req,res)=>{
    const {patientName}=req.body;
    medicineModel.find({patient:patientName})
    .then(medics=>{
        res.json(medics);
    })
    .catch(err=>{
        res.end(err);
    })
})
router.route('/medicineList').post((req,res)=>{
    const {patientName}=req.body;
    medicineModel.find({patient:patientName})
    .then(medicinesList=>{
        res.json(medicinesList);
    })
    .catch(err=>{
        res.end(err);
    })
})
module.exports=router;