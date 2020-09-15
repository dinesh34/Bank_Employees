const express = require('express');
const body_parser = require('body-parser');

const mongoose= require("./database/db.js");
const empController = require('./Controllers/EmployeeController.js')
const cors = require('cors');

mongoose.ROLES  

var app = express();

app.use(body_parser.json());
app.use(cors({origin:"http://localhost:3001"}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
  });
  
  
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server Started");
});

app.use('/employees',empController);