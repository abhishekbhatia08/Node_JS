const readLine = require("readline");

// For getting input from CLI
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("What is your name? ->", name => {
    console.log(`Hello! ${name}`);
    rl.close();
})