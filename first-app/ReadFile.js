const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const filePath = "/Users/abhishek/Documents/Code/Node_JS/first-app/files/sample.txt";

// Reading from a File - Async 
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw new Error("Something went wrong");
    console.log("Async: ", data);
}); 

// Reading From a File - sync
try {
    const data = fs.readFileSync(path.join(__dirname, "files", "sample.txt"), "utf-8");
    console.log("Sync: ", data);
} catch (err) {
    console.log(err);
}

// Reading from a File Promises
const readFile = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, "files", "sample.txt"), { encoding: "utf-8" });
        console.log("File Promises: ", data);
    } catch (err) {
        console.log(err);
    }
}

readFile();