const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    ticket_bookedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    ticket_bookedbyname:{
        type:String,
    },
    ticket_of:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'touristsites'
    },
    ticket_ofname:{
        type:String,
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    adult:{
        type:Number,
    },
    children:{
        type:Number,
    },
    foreigner:{
        type:Number,
    },
    Totalpaid:{
        type:Number
    },
    Qr_id:{
        type:String,
    },
    Qr_generated:{
        type:String
    },
    booked_on:{
        type:String
    },
    valid_for:{
        type:String
    },
});
    



const User=mongoose.model('bookings',bookingSchema)

module.exports=User;