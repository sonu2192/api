const router=require('express').Router();
const patientModel=require('../models/patient');
router.route("/RegisterPatient").post((req,res)=>{
    req.body.question='Hello world';
    console.log(req.body);
    const {first_name,last_name,username,number,password,gender,address}=req.body;
    const patient=new patientModel({
        name:{
        first_name:first_name,
        last_name:last_name
        },
        username:username,
        number:number,
        password:password,
        fullName:first_name+last_name,
        gender:gender,
        address:address,
        type:'patient'
    })
    patient.save()
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.status(400).json("Some error has occured"+err);
    })
})
router.route("/LoginPatient").post((req,res,next)=>{
    //const {username,password}=req.body;
    patientModel.findOne({$and:[{username:req.body.username},{password:req.body.password}]})
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
router.route("/account").post((req,res)=>{
    const {username}=req.body;
    patientModel.findOne({username:username})
    .then(patient=>{
        console.log(patient);
        res.json(patient);
    })
    .catch(err=>{
        res.end(err);
    })
})
router.route("/update").post((req,res)=>{
    const {number,address,username,fullName}=req.body;
    patientModel.update({username:username},
        {$set:
            {number:number,
            address:address,
            fullName:fullName
        }
        })
        .then(msg=>{
            res.end("changed successfully");
        })
        .catch(err=>{
            res.end(err);
        })
})
module.exports=router;