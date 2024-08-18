const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = (req, res, next) => {
    let token;
    const headers = req.headers.Authorization || req.headers.authorization;
    if (headers && headers.startsWith("Bearer")) {
        token = headers.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "User is not authorized" });
            }
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(401).json({ message: "User is not authorized or token is missing" });
        }
    }
}

module.exports = validateToken;