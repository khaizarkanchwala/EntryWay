const mongoose=require('mongoose')
const QRSchema=new mongoose.Schema({
    bought_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    siteid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'touristsites'
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    qrid:{
        type:String,
    },
    status:{
        type:String,
    },
    Total_paid:{
        type:Number,
    },
    qrurl:{
        type:String,
    },
});
    



const User=mongoose.model('qr_info',QRSchema)

module.exports=User;