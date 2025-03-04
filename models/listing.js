const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:String,
    description:String,
    image:{  type:String,
        default:"https://www.google.com",
        set: (v)=>
            v===""? "https://www.google.com" : v,
        
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
