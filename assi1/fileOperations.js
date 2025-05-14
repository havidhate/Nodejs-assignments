const fs = require("fs");

function fun(){
    fs.readFile("./data.txt","utf8",(err,data)=>{
        if(err){
            console.error("Error reading the file:",err);
            return;
        }
        console.log("File content",data);
    });
}

function fun2(){
    fs.appendFile("./data.txt","new conetnt",(err)=>{
        if(err){
            console.error("error appending file",err);
            return;
        }
        console.log("data successfully appended");
    })
}

module.exports = {fun,fun2};