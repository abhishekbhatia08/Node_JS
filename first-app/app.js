// const log = require("./logger");
require("dotenv").config();

hello(process.env.NAME);

function hello(name) {
    console.log("Hello " + name);
}

// To Exit Npm Programatically
process.exitCode = 0;

