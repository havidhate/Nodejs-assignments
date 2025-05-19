const express = require("express");
const app = express();
app.use(express.json());

app.get("/home",(req,res)=>{
    res.send("Welcome to home page");
})

app.get("/aboutus",(req,res)=>{
    res.josn({"msg:":"welcome to about us"});
})

app.get("/contactus",(req,res)=>{
    res.send("hi there");
})

app.get((req,res)=>{
    res.status(404).send("this is route with no more");
})

app.listen(3000,()=>{
    console.log("Server is live");
})