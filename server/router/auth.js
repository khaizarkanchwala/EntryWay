const express=require('express');
const bcrypt=require('bcryptjs')
const cors =require('cors')
const jwt =require('jsonwebtoken')
const router=express.Router();
require('../db/conn')
const userModel=require('../model/userSchema')
const touristModel=require('../model/addtouristschema')
const bookingModel=require('../model/bookingschema')
const qrmModel=require('../model/qrschema')
const authenticate=require("../middleware/aurhenticate")
const cookieparser=require("cookie-parser")
router.use(cors())
router.use(cookieparser())
// var now = new Date();

router.get('/api/generateqr/:id/',(req,res)=>{
    const id=req.params.id
    var datavisit=bookingModel.find({ticket_bookedby:id})
    datavisit.exec(function(err,data){
        if(err) throw err
        res.render('../public/views/check.ejs',{title:"ENTRY WAY",visitdata:data,success:""})
    })
})

router.get('/api/visited/:id',async(req,res)=>{
    const id=req.params.id
    var data=await bookingModel.findById(id)
    // console.log(data)
    const updateqr= qrmModel.updateOne({$and:[{bought_by:data.ticket_bookedby},{siteid:data.ticket_of},{qrid:data.Qr_id}]},{
        $set:{
            status:"USED ON"+" "+[new Date().getFullYear(),
                '-',
                new Date().getMonth() + 1,
                '-',
                new Date().getDate(),
                ' ',
                new Date().getHours(),
                ':',
                new Date().getMinutes(),
              ].join(''),
              Total_paid:data.Totalpaid
        }
    })
    updateqr.exec()
    var del=bookingModel.findByIdAndDelete(id)
    del.exec(function(err){
        if(err)throw err
            res.render('../public/views/final.ejs')
        })
    })

    router.post('/api/qrdata',authenticate,async(req,res)=>{
        const bought_by=req.body.bought_by
        const siteid=req.body.siteid
        const qrid=req.body.qrid
        const qrurl=req.body.qrurl
        var data=await touristModel.findOne({_id:siteid})
    try{
            const user=new qrmModel({
                bought_by:bought_by,
                siteid:siteid,
                adminID:data.Adminid,
                status:"NOT USED",
                Total_paid:0,
                qrid:qrid,
                qrurl:qrurl,

            })
            const updateqr=await bookingModel.updateOne({$and:[{ticket_bookedby:bought_by},{ticket_of:siteid},{booked_on:[
                new Date().getFullYear(),
                '-',
                new Date().getMonth() + 1,
                '-',
                new Date().getDate(),
                ' ',
                new Date().getHours(),
                ':',
                new Date().getMinutes(),
              ].join(''),}]},{
                $set:{
                    Qr_generated:qrurl,
                    Qr_id:qrid
                }
            })
            await user.save();
            // return res.json({message:"user ticket booked"})
            // res.send(req.userID)
    }catch(err){
        console.log(err)
        return res.status(422).json({error:"some error"})
    }
})


router.post('/api/register',async(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const phone=req.body.phone
    const password=req.body.password
    const cpassword=req.body.cpassword
    const role=req.body.role
    console.log(name)
    if(!name || !email || !phone || !password || !cpassword){
        return res.status(422).json({error:"fill the empty fields or correctly"})
    }
    try{
       const userExist =await userModel.findOne({email:email})
       if(userExist){
        return res.status(422).json({error:"Email exist"})
    }
            else if(password !=cpassword){
                return res.status(422).json({error:"password not matched"})
            }
            else if(role!='user' && role!='admin'){
                return res.status(422).json({error:"role cannot be differ"})
            }
            else{
            const user=new userModel({name:name,email:email,phone:phone,password:password,cpassword:cpassword,role:role})
            await user.save();
            return res.json({message:"user registered success"})
            }
    }catch(err){
        console.log(err);
    }

})
router.post('/api/addsite',async(req,res)=>{

    const name=req.body.name
    const _id=req.body._id
    const emailuser=req.body.emailuser
    const siteName=req.body.siteName
    const siteType=req.body.siteType
    const siteDescription=req.body.siteDescription
    const country=req.body.country
    const state=req.body.state
    const city=req.body.city
    const zip=req.body.zip
    const zone=req.body.zone
    const phoneno=req.body.phoneno
    const email=req.body.email
    const adult=req.body.adult
    const children=req.body.children
    const foreigner=req.body.foreigner
    const open=req.body.open
    const close=req.body.close
    const Availability=req.body.Availability
    const Bestseasonvisit=req.body.Bestseasonvisit
    const image=req.body.image
    if(!siteName || !siteType || !siteDescription || !country || !state || !city || !zone || !zip || !phoneno || !email || !adult || !children || !foreigner || !open || !close || !Availability || !Bestseasonvisit){
        return res.status(422).json({error:"fill the empty fields or correctly"})
    }
    try{
        if(open==close){
            return res.status(422).json({error:"fill the empty fields or correctly"})
        }
        else{
            const user=new touristModel({
                Adminid:_id,
                siteID:((siteName).split(" ").join(""))+Math.floor(Math.random()*1001),
                siteName:siteName,
                siteType:siteType,
                siteDescription:siteDescription,
                siteAddress:{
                    country:country,
                    state:state,
                    city:city,
                    zip:zip,
                    zone:zone,
                },
                contact:{
                    phoneno:phoneno,
                    email:email,
                },
                ticketfair:{
                    adult:adult,
                    children:children,
                    foreigner:foreigner,
                },
                timings:{
                    open:open,
                    close:close,
                },
                Availability:Availability,
                image:image,
                Bestseasonvisit:Bestseasonvisit,
                site_added_by:{
                    _id:_id,
                    name:name,
                    email:emailuser,
                },
                
            })
            await user.save();
            return res.json({message:"user registered success"})
        }
    }catch(err){
        console.log(err)
    }
})

router.post('/api/booking',authenticate,async(req,res)=>{
        const data=req.rootUser
        const ticket_of=req.body.ticket_of
        const adminID=req.body.adminID
        const Totalpaid=req.body.Totalpaid
        const ticket_ofname=req.body.ticket_ofname
        const adult=req.body.adults
        const children=req.body.children
        const foreigner=req.body.foreigner
    try{
            const user=new bookingModel({
                ticket_bookedby:data._id,
                ticket_bookedbyname:data.name,
                ticket_of:ticket_of,
                ticket_ofname:ticket_ofname,
                adminID:adminID,
                adult:adult,
                children:children,
                foreigner:foreigner,
                Totalpaid:Totalpaid,
                Qr_generated:"",
                booked_on:[
                    new Date().getFullYear(),
                    '-',
                    new Date().getMonth() + 1,
                    '-',
                    new Date().getDate(),
                    ' ',
                    new Date().getHours(),
                    ':',
                    new Date().getMinutes(),
                  ].join(''),
                valid_for:"24 hr"

            })
            await user.save();
            // return res.json({message:"user ticket booked"})
            res.send(req.userID)
    }catch(err){
        console.log(err)
        return res.status(422).json({error:"some error"})
    }
})

router.post('/api/signin',async(req,res)=>{
    try{
        let token
        const email=req.body.email
        const password=req.body.password
        if(!email || !password){
            return res.status(400).json({error:"fill data"})
        }
        const userLogin=await userModel.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password)
           token= await userLogin.generateAuthToken()
            res.cookie("jwtoken",token,{expires:new Date(Date.now()+25892000000),httpOnly:true})
            if(!isMatch){
                res.status(400).json({error:"invalid credential"})
            }
            else{
                
                // res.json({message:"user login success"})
                res.send(userLogin)
            }
        }else{
            res.status(400).json({error:"invalid credential"})
        }

    }catch(err){
        console.log(err)
    }
})

router.get('/api/about',authenticate,(req,res)=>{
    res.send(req.rootUser)
})

router.get('/api/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser)
})

router.get('/api/getdataofsite/:id',authenticate,(req,res)=>{
    var id=req.params.id
    touristModel.findOne({_id:id},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

router.get('/api/read/:id',(req,res)=>{
    var id=req.params.id
     touristModel.find({Adminid:id},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

router.get('/api/bookingdataadmin/:id',(req,res)=>{
    var id=req.params.id
     qrmModel.find({adminID:id},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

router.get('/api/bookingdata',authenticate,(req,res)=>{
    var data=req.rootUser
    bookingModel.find({ticket_bookedby:data._id},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

router.get('/api/readdata',(req,res)=>{
     touristModel.find({},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

router.put('/api/update',async(req,res)=>{
    const id=req.body.id
    const name=req.body.name
    const _id=req.body._id
    const emailuser=req.body.emailuser
    const siteName=req.body.siteName
    const siteType=req.body.siteType
    const siteDescription=req.body.siteDescription
    const country=req.body.country
    const state=req.body.state
    const city=req.body.city
    const zip=req.body.zip
    const zone=req.body.zone
    const phoneno=req.body.phoneno
    const email=req.body.email
    const adult=req.body.adult
    const children=req.body.children
    const foreigner=req.body.foreigner
    const open=req.body.open
    const close=req.body.close
    const Availability=req.body.Availability
    const Bestseasonvisit=req.body.Bestseasonvisit
    const image=req.body.image
    if(!siteName || !siteType || !siteDescription || !country || !state || !city || !zone || !zip || !phoneno || !email || !adult || !children || !foreigner || !open || !close || !Availability || !Bestseasonvisit){
        return res.status(422).json({error:"fill the empty fields or correctly"})
    }
    try{
        if(open==close){
            return res.status(422).json({error:"fill the empty fields or correctly"})
        }
        else{
            const user=new touristModel({
                siteID:((siteName).split(" ").join(""))+Math.floor(Math.random()*1001),
                siteName:siteName,
                siteType:siteType,
                siteDescription:siteDescription,
                siteAddress:{
                    country:country,
                    state:state,
                    city:city,
                    zip:zip,
                    zone:zone,
                },
                contact:{
                    phoneno:phoneno,
                    email:email,
                },
                ticketfair:{
                    adult:adult,
                    children:children,
                    foreigner:foreigner,
                },
                timings:{
                    open:open,
                    close:close,
                },
                Availability:Availability,
                image:image,
                Bestseasonvisit:Bestseasonvisit,
                site_added_by:{
                    _id:_id,
                    name:name,
                    email:emailuser,
                },
                
            })
            await user.save();
            return res.json({message:"user registered success"})
        }
    }catch(err){
        console.log(err)
    }
})

router.delete("/api/delete/:id",async(req,res)=>{
    var id=req.params.id

    await touristModel.findByIdAndDelete(id).exec()
    res.send('deleted')
})

router.get('/api/moreinfo/:id',(req,res)=>{

    var id=req.params.id
    touristModel.findOne({_id:id},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

router.get('/api/getupdate/:id',authenticate,(req,res)=>{

    var id=req.params.id
    touristModel.findOne({_id:id},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})


router.post('/api/contact',authenticate,async(req,res)=>{
    try{
    const name=req.body.name
    const email=req.body.email
    const phone=req.body.phone
    const message=req.body.message
    if(!name || !email || !phone || !message){
        return res.json({error:"plzz fill the contact form"})
    }
    const usercontact= await userModel.findOne({_id:req.userID})
    console.log(usercontact)
    if(usercontact){
        const usermessage= await usercontact.addMessage(name,email,phone,message)
        await usercontact.save()
        res.status(201).json({message:"user contact successful"})
    }
    }catch(error){
        console.log(error)
    }
})

router.post('/api/search',(req, res) => {
    const fltrname = req.body.sitename;  
     touristModel.find({siteName: fltrname.toUpperCase()},(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
  })

router.post('/api/logout', (req, res) => {
    res.clearCookie('jwtoken');
    res.status(200).json({ message: 'Logout successful' });
  });

module.exports=router
