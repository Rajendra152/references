var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) { console.log(stdout) }
console.log("*******************");
console.log("\n\n\n");
console.log("OS is " + os.type());
console.log("\n\n\n");
console.log("*******************");
// Run command depending on the OS
if (os.type() === 'Linux')
    exec("yarn start-redis-mac", puts);
else if (os.type() === 'Darwin')
    exec("yarn start-redis-mac", puts);
else if (os.type() === 'Windows_NT')
    exec("yarn start-redis-win", puts);
else
    throw new Error("Unsupported OS found: " + os.type());