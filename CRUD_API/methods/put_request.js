const writeToFile = require('../util/write_to_file');
const crypto = require("crypto");
const requestBodyParser = require("../util/body_parser");

module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    let regexv4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    // If the base URL matches
    if (baseUrl == "/api/movies/") {
        // If the movie ID is not a valid UUID
        if (!regexv4.test(id)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify(
                    {
                        title: "Validation Failed!",
                        message: "UUID is not valid",
                    }
                ));
        } else if (regexv4.test(id)) {
            try {
                let body = await requestBodyParser(req);
                let index = req.movies.findIndex((movie) => {
                    return movie.id === id;
                }); 
                if (index === -1) {
                    res.statusCode = 404;
                    res.write(JSON.stringify({ title: "Not Found!", message: "Movie Not Found" }));
                    res.end();
                }
                else {
                   req.movies[index] = {id,...body};
                    writeToFile(req.movies);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify(
                            {
                                title: "Movie Updated!",
                                message: "Movie Updated Successfully",
                            }
                        ));
                }
            } catch (error) {
                console.log(error);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ title: "Validation failed", message: `Request body is not Valid.` }));
            }
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found!", message: "Route not found" }));
    }
};