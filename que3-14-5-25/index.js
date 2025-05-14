const express = require("express");
const { getSystemDetails, getIPAddress } = require("./read");
const app = express();

app.get("/test",(req,res)=>{
    app.send("this is test");
})

app.get("/readfile",(req,res)=>{
    res.send(read());
})

app.get("/systemdetails", (req, res) => {
  const sysDetails = getSystemDetails();
  res.json(sysDetails);
});

app.get("/getip", (req, res) => {
  getIPAddress((err, ip) => {
    if (err) {
      return res.status(500).send("Error fetching IP");
    }
    res.send(`IP address of masaischool.com is: ${ip}`);
  });
});

app.listen(3000,()=>{
    console.log("server is started");
})