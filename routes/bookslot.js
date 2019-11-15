const router=require('express').Router();
const slotModel=require('../models/slot');
router.route('/saveSlot').post((req,res)=>{
    const {fullName,specialization,patientName,time,date}=req.body;
    const slot=new slotModel({
    doctorName:fullName,
    specialization,
    patientName,
    time,
    date
    })
    slot.save()
    .then(msg=>{
        res.end("saved successfully");
    })
    .catch(err=>{
        res.end("Some error occured");
    })
})
router.route("/ViewPatients").post((req,res)=>{
    console.log(req.body);
    const {docName}=req.body
    console.log(docName);
    slotModel.find({doctorName:docName})
    .then(patients=>{
        res.json(patients);
    })
    .catch(err=>{
        res.end(err);
    })
})
router.route("/:patient_id").get((req,res)=>{
    slotModel.findById(req.params.patient_id)
    .then(slot=>{
        //console.log("the result is"+slot);
        res.json(slot);
    })
    .catch(err=>{
        res.end("Some error occured");
    })
})
router.route("/getSlots").post((req,res)=>{
    const {doctor,date}=req.body;
    console.log(date);
    console.log(doctor);
    slotModel.find({$and:[{doctorName:doctor},{date:date}]})
    .then(slots=>{
        console.log(slots);
        res.json(slots);
    })
    .catch(err=>{
        res.end(err);
    })
})
module.exports=router;