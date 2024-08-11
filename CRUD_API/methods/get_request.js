module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") +1);
    let movieId = req.url.split("/")[3];
    let regexv4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (req.url === "/api/movies") {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "application/json");
        res.write(JSON.stringify(
            {
                "statusCode": 200,
                "success" : true,
                "message" : "Movies list fetched successfully",
                "data" : req.movies
            }
        ));
        res.end();
    } else if (baseUrl == "/api/movies/") {
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

            let movie = req.movies.find(movie => movie.id === movieId);
            if (movie) {
                res.write(JSON.stringify(
                    {
                        "statusCode": 200,
                        "success": true,
                        "message": "Movies list fetched successfully",
                        "data": movie
                    }
                ));
                res.end();
            }
            else {
                res.statusCode = 400;
                res.write(JSON.stringify({ title: "Not Found!", message: "Movie Not Found" }));
                res.end();
            }
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found!", message: "Route not found" }));
    }
};