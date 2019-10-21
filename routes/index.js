const router=require('express').Router();
const patientModel=require('../models/patient');
router.route("/RegisterPatient").post((req,res)=>{
    req.body.question='Hello world';
    console.log(req.body);
    const {first_name,last_name,username,email,password,gender,address}=req.body;
    const patient=new patientModel({
        name:{
        first_name:first_name,
        last_name:last_name
        },
        username:username,
        email:email,
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
module.exports=router;