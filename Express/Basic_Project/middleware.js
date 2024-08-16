const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('morgan');
const multer = require('multer');
const upload = multer({dest: "./public/uploads"})
const app = express();

const port = 3001;

// Built in MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, 'public')));

// Application Level Middleware
const logMiddleware = (req, res, next) => {
    console.log(`${new Date()} --- METHOD: ${req.method} URL: ${req.url}`);
    next();
}

/// Router Level Middleware
app.use(logMiddleware);
app.use(logger('combined'));

app.use("/api/users", router);

const fakeAuth = (req, res, next) => {
    const authStatus = true;
    if (authStatus) {
        console.log("Auth Status : ", authStatus);
        next();
    } else {
        res.status(401);
        throw new Error("User is not authorized");
    }
}

app.get("/", (req,res) => {
    res.json({ message: "Hello, World!"});
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file, req.body);
    res.send(req.file);
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message });
});

const getUsers = (req, res) => {
    res.json({ message: "Get all users"});
}

const createUser = (req, res) => {
    console.log("Body recieved from the user: ", req.body);
    res.json({ message: "Create a new user"});
} 

router.use(fakeAuth);
router.route("/").get(getUsers).post(createUser);

// Error Handling middleware

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 404:
            res.json({
                title: "Not Found",
                message: err.message
            });
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message
            });
            break;
        case 500:
            res.json({
                title: "Internal Server Error",
                message: err.message
            });
        default:
            break;
    }
}

app.all("*", (req, res) => {
    res.status(404);
    throw new Error("Route not found");
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 