const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const { runInNewContext } = require("vm");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
main()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
});
 async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/project')
 }

app.listen("8080",()=>{
    console.log("app listening on port 8080");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


app.get("/testlisting",async (req,res)=>{
    let samplelisting=new Listing({
        title:"Ambience",
        description:"Gated Community",
        image:"",
        price:1200,
        location:"Hyderabad",
        country:"India"
    })

    await samplelisting.save();
    console.log("sample was saved");
    res.send("success")
});


app.get("/listings", async (req,res)=>{
     const allListings=await Listing.find({})
        res.render("./listings/index.ejs",{allListings})

});
app.get("/",(req,res)=>{
    res.send("working");
});


app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

app.post("/listings",async (req,res)=>{
    const newlisting=new Listing(req.body.listing);
    await newlisting.save();
    console.log(newlisting);
    res.redirect("/listings")



})


app.get("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing})

})
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})

})
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
});


app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
})
