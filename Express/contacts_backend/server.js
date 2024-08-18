const express = require('express');
const errorHandler = require('./middleware/error_handler');
const dotenv = require('dotenv').config(); 
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); 
app.use("/api/contacts", require("./routes/contact_routes"));
app.use(errorHandler);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});  