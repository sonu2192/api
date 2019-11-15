const router=require('express').Router();
const doctorModel=require('../models/doctor');
router.route("/RegisterDoctor").post((req,res)=>{
    req.body.question='Hello world';
    console.log(req.body);
    const {first_name,last_name,username,email,password,gender,address,specialization,worksat}=req.body;
    const doctor=new doctorModel({
        name:{
        first_name,
        last_name
        },
        username,
        email,
        password,
        fullName:first_name+last_name,
        gender,
        address,
        specialization,
        worksat,
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
router.route("/LoginDoctor").post((req,res,next)=>{
    //const {username,password}=req.body;
    doctorModel.findOne({$and:[{username:req.body.username},{password:req.body.password}]})
    .then((user,err)=>{
        if(user===null)
        {
            err='NULL Error';
            throw err;
        }
        console.log(user);
        res.json(user);
    })
    .catch(err=>{
        console.log(err);
        res.end("invalid username or password");
    })
})
router.route("/viewdocs").get((req,res)=>{
    doctorModel.find()
    .then(doctors=>{
        res.json(doctors);
    })
    .catch(err=>{
        res.end(err);
    })
})
router.route("/:doc_id").get((req,res)=>{
    doctorModel.findById(req.params.doc_id)
    .then(doctor=>{
        console.log(doctor);
        res.json(doctor);
    })
    .catch(err=>{
        res.end(err);
    })
})
module.exports=router;