const router=require('express').Router();
const medicineModel=require('../models/medicines');
const csvFilePath=__dirname+"/med.csv";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv=require('csvtojson');
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
router.route('/download').post((req,res)=>{
    const {onlymList}=req.body;
    console.log(onlymList);
    const csvWriter = createCsvWriter({
        path:'C:/Users/Hp/Desktop/E-Swasth/client/src/components/file.csv',
        header: [
            {id: 'type', title: 'TYPE'},
            {id: 'name', title: 'NAME'},
            {id: 'dosage', title: 'DOSAGE'}
        ]
    });
    console.log(onlymList);
    csvWriter.writeRecords(onlymList)
    .then(() => {
        console.log('...Done');
    })
    .catch(err=>{
        console.log(err);
    });
})
router.route('/convert').post((req,res)=>{
    const {symp}=req.body
    csv({
      noheader:false,
      headers:['sno','name','price']
    })
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      res.json(jsonObj);
    })
    .catch(err=>{
        res.end(err);
    })
  })
  router.route('/calculateCost').post((req,res)=>{
      const {medCost}=req.body;
      //console.log(medCost);
      var cost=0;
      medCost.map(medicine=>{
          return medicine.map(med=>{
              cost=cost+parseInt(med.price);
          })
      })
      console.log(cost);
      const strCost=cost.toString();
      console.log(strCost);
      res.end(strCost);
  })
module.exports=router;