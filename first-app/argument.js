const minimist = require("minimist");

// To get Values from the CLI
const value = minimist(process.argv.slice(2));
console.log(value.name);