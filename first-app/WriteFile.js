const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const filePath = "/Users/abhishek/Documents/Code/Node_JS/first-app/files/text.txt";
const fileContent = "Hello, World!";

// // Writing using a File - Async 
fs.writeFile(filePath, fileContent, (err, data) => {
    if (err) throw new Error("Something went wrong");
    console.log("File Wrie Completed1");
}); 

// // Writing using a File - sync
try {
    fs.writeFileSync(path.join(__dirname, "files", "text.txt"), fileContent);
    console.log("File Wrie Completed2");
} catch (err) {
    console.log(err);
}

// Reading from a File Promises
const readWriteFile = async () => {
    try {
        await fsPromises.writeFile(path.join(__dirname, "files", "text.txt"), fileContent);
        await fsPromises.appendFile(path.join(__dirname, "files", "text.txt"), "\n123");
        const data = await fsPromises.readFile(path.join(__dirname, "files", "text.txt"), {encoding: "utf-8"});
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

readWriteFile();