const os = require("os");

function getSystemInfo() {
  const cpus = os.cpus();
  const totalMem = os.totalmem() / (1024 * 1024 * 1024); // GB
  const freeMem = os.freemem() / (1024 * 1024 * 1024);   // GB
  const memoryUsage = process.memoryUsage(); // heap memory

  console.log("==== System Information ====");
  console.log(`System Architecture: ${os.arch()}`);
  console.log(`Number of CPU Cores: ${cpus.length}`);
  console.log(`CPU Model: ${cpus[0].model}`);
  console.log(`CPU Speed: ${cpus[0].speed} MHz`);
  console.log(`Total Memory: ${totalMem.toFixed(2)} GB`);
  console.log(`Free Memory: ${freeMem.toFixed(2)} GB`);
  console.log(`Heap Memory Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`Operating System Type: ${os.type()}`);
  console.log("============================");
}

module.exports = getSystemInfo;
