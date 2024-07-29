// const log = require("./logger");

// Import this as we require to get variable values for ".env" file
require("dotenv").config();
// Lodash is used to provide utility functions for common programming tasks using the functional programming
const _ = require("lodash");

// Or we can run a command
// node -r dotenv/config env.js

hello(process.env.NAME);

function hello(name) {
    console.log("Hello " + name);
}

// To Exit Npm Programatically
process.exitCode = 0;

const arr = [1,2,3,4];
const result = _.chunk(arr, 2);
console.log(result);
