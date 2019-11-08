const router=require('express').Router();
const Nexmo=require('nexmo');
var otp;
const nexmo=new Nexmo(
    {
        apiKey:'b4cacecf',
        apiSecret:'9UbVQ85CuCz8YNxs'
    },{debug:true}
);
router.route('/send').post((req,res)=>{

    otp=Math.floor(Math.random()*10000);
    console.log('request acquired');
    console.log(req.body);
    const {number,message}=req.body;
    let num='91'+number;
    nexmo.message.sendSms(
        "NEXMO" ,num,message+otp,{type:'unicode'},
        (err,responseData)=>{
            if(err){
                console.log(err);
            }
            else
            {
                console.dir(responseData);
            }
        }
    )
})
router.route('/verify').post((req,res)=>{
    const {resAuth}=req.body;
    console.log(otp);
    console.log(resAuth);
    if(resAuth==otp)
    {
        res.end('true');
    }
    else
    {
        res.end('false');
    }
})
module.exports=router;