const fs  = require("fs");
const os = require("os");
const dns = require("dns");

function read(){
    fs.readFile("/data.txt",(err,data)=>{
        if(err){
            console.error("erroe while reading");
        }
        console.log(data);
    })
}

function getSystemDetails() {
  return {
    platform: os.platform(),
    totalMemoryGB: (os.totalmem() / (1024 ** 3)).toFixed(2),
    freeMemoryGB: (os.freemem() / (1024 ** 3)).toFixed(2),
    cpuModel: os.cpus()[0].model,
  };
}

function getIPAddress(callback) {
  dns.lookup("masaischool.com", (err, address) => {
    if (err) return callback(err, null);
    callback(null, address);
  });
}

module.exports = { getSystemDetails, getIPAddress, read };