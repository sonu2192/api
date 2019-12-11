const router=require('express').Router();
const doctorModel=require('../models/doctor');
const tempModel=require('../models/temp');
router.route("/save").post((req,res)=>{
    req.body.question='Hello world';
    console.log(req.body);
    const {first_name,last_name,username,email,password,gender,address,specialization,worksat,registration_no}=req.body;
    const doctor=new tempModel({
        name:{
        first_name,
        last_name
        },
        username,
        email,
        password,
        fullName:first_name+" "+last_name,
        gender,
        address,
        specialization,
        worksat,
        registration_no,
        type:'doctor'
    })
    doctor.save()
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.status(400).json("Some error has occured"+err);
    })
})
router.route("/viewtemp").get((req,res)=>{
    tempModel.find()
    .then(doctors=>{
        res.json(doctors);
    })
    .catch(err=>{
        res.end(err);
    })
})
router.route("/:doc_id").get((req,res)=>{
    tempModel.findById(req.params.doc_id)
    .then(doctor=>{
        console.log(doctor);
        res.json(doctor);
    })
    .catch(err=>{
        res.end(err);
    })
})
router.route("/delete/:doc_id").get((req,res)=>{
    tempModel.deleteOne({_id:req.params.doc_id})
    .then(user=>{
        res.end("Successfully updated");
    })
})
module.exports=router;