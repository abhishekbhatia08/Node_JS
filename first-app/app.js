// const log = require("./logger");

// Import this as we require to get variable values for ".env" file
require("dotenv").config();

// Or we can run a command
// node -r dotenv/config env.js

hello(process.env.NAME);

function hello(name) {
    console.log("Hello " + name);
}

// To Exit Npm Programatically
process.exitCode = 0;
