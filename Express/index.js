const express = require('express');
const app = express();

const port = 3001;

app.get("/", (req,res) => {
    res.json({ message: "Hello, World!"});
});

app.get("/users", (req,res) => {
    res.json({ message: "Get all the users."});
});

app.get("/users/:id", (req,res) => {
    res.json({ message: `Get user with ID ${req.params.id}`});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 