const crypto = require("crypto");
const requestBodyParser = require("../util/body_parser");
const writeToFile = require("../util/write_to_file");

module.exports = async (req, res) => {
    if (req.url == "/api/movies") {
        try {
            let body = await requestBodyParser(req);
            console.log("Request Body: ", body);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, {"Content-Type": "Application/json"});
            res.end();
        } catch (er) {
            console.log(er);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Validation failed", message: `Request body is not Valid.`}));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found!", message: "Route not found" }));
    }
};
