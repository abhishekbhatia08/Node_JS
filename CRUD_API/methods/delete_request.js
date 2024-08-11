const writeToFile = require('../util/write_to_file');

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let movieId = req.url.split("/")[3];
    let regexv4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (baseUrl == "/api/movies/") {
        if (!regexv4.test(movieId)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify(
                    {
                        title: "Validation Failed!",
                        message: "UUID is not valid",
                    }
                ));
        } else if (regexv4.test(movieId)) {
            res.setHeader("Content-Type", "application/json");
            let index = req.movies.findIndex((movie) => {
                return movie.id === movieId;
            });
            if (index == -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not Found!", message: "Movie Not Found" }));
                res.end();
            } else {
                req.movies.splice(index,1);
                writeToFile(req.movies);
                console.log(req.movies);

                res.statusCode = 200;
                res.write(JSON.stringify(
                    {
                        "statusCode": 200,
                        "success": true,
                        "message": "Movie deleted successfully",
                    }
                ));
                res.end();
            } 
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found!", message: "Route not found" }));
    }
};