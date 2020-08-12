const express = require('express');
const body_parser = require('body-parser');

const {mongoose} = require("./database/db.js");
const empController = require('./Controllers/EmployeeController.js')
const cors = require('cors');

var app = express();

app.use(body_parser.json());
app.use(cors({origin:"http://localhost:3001"}));

app.listen(3000, () => {
    console.log("Server Started");
});

app.use('/employees',empController);