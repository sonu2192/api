const router=require('express').Router();
const doctorModel=require('../models/doctor');
const slotModal=require('../models/slot');
const medicineModal=require('../models/medicines');
router.route("/RegisterDoctor").post((req,res)=>{
    req.body.question='Hello world';
    console.log(req.body);
    const {doctor}=req.body;
    const doc=new doctorModel({
        name:doctor.name,
            username:doctor.username,
            password:doctor.password,
            fullName:doctor.fullName,
            gender:doctor.gender,
            address:doctor.address,
            specialization:doctor.specialization,
            worksat:doctor.worksat,
            number:doctor.number,
            registration_no:doctor.registration_no,
            type:'doctor'
    })
    doc.save()
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
router.route("/update").post((req,res)=>{
    const {oldName,number,address,username,fullName}=req.body;
    doctorModel.update({username:username},
        {$set:
            {number:number,
            address:address,
            fullName:fullName,
        }
        })
        .then(msg=>{
            slotModal.updateMany({doctorName:oldName},{$set:{doctorName:fullName}})
            .then(item=>{
                medicineModal.updateMany({doctor:oldName},{$set:{doctor:fullName}})
                .then(it=>{
                    console.log(oldName);
                    res.end("Updated successfully");
                })
                .catch(err=>{
                    console.log("it");
                })
            })
            .catch(item=>{
                console.log("item");
            })
        })
        .catch(err=>{
            res.end(err);
        })
})
router.route("/account").post((req,res)=>{
    const {username}=req.body;
    doctorModel.findOne({username:username})
    .then(doctor=>{
        console.log(doctor);
        res.json(doctor);
    })
    .catch(err=>{
        res.end(err);
    })
})
module.exports=router;