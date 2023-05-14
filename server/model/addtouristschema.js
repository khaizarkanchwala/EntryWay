const mongoose=require('mongoose')
const touristSchema=new mongoose.Schema({
    Adminid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    siteID:String,
    siteName:{
        type:String,
        required:true,
        uppercase:true,
        trim:true,
        minlength:[2,"invalid name"],
        maxlength:[30,"too long"]
    },
    siteType:{
        type:String,
        required:true,
        uppercase:true,
        enum:["MONUMENT","MUSEUM","HOLYPLACE","ARTGALLERY"]
    },
    siteDescription:String,
    siteAddress:{

        country:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        zip:{
            type:String
        },
        zone:{
            type:String,
            required:true,
            enum:["NORTH","SOUTH","EAST","WEST","CENTRAL"]
        },   
    },
    contact:{
        phoneno:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true
        },
    },
    ticketfair:{
        adult:{
            type:Number,
            required:true,
            validate(value){
                if(value < 0){
                    throw new Error("Cost cannot be -ve");
                }
            }
        },
        children:{
            type:Number,
            required:true,
            validate(value){
                if(value < 0){
                    throw new Error("Cost cannot be -ve");
                }
            }
        },
        foreigner:{
            type:Number,
            required:true,
            validate(value){
                if(value < 0){
                    throw new Error("Cost cannot be -ve");
                }
            }
        },
    },
    timings:{
        open:{
            type:String,
            required:true
            
        },
        close:{
            type:String,
            required:true
        },
    },
    Availability:{
        type:String,
        required:true,
        uppercase:true,
        enum:["YES","NO"]
    },
    image:{
        type:String,
    },
    Bestseasonvisit:{
        type:String,
        required:true
    },
    site_added_by:{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    },
});
    



const User=mongoose.model('touristsites',touristSchema)

module.exports=User;