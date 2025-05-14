const express = require("express");
const app = express();

app.get("/home",(req,res)=>{
    res.send("this is home");
})

app.get("/about",(req,res)=>{
    res.send("this is about");
})

app.get("/contact",(req,res)=>{
    res.send("this is contact");
})

app.listen(3000,()=>{
    console.log("server gets started");
})
