const express = require('express');

var app = express();

var Employee = require("../Models/Employee.js");
const { json } = require('body-parser');
const { restart } = require('nodemon');

app.get('/all', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    Employee.find({},(err,data)=>{
       
        if(!data) console.log("Data");
        if (!err) res.send(JSON.stringify(data));
        else console.log("Error", JSON.stringify(err,undefined,3));
    });

})

app.post('/login',(req,res)=>{

    var username = req.body.username;
    var password = req.body.password;

    Employee.findOne({"emp_name":username, "emp_password":password}, (err, user) =>{
        if(err) throw err;
        if(user){
            res.status(200).send(`Login Successfule for user: ${username}`)
        }else{
            res.status(204).send(`Credentials does not match`);
        }
    });
    // if(user){
    //     if(Employee.find({"emp_password":password}).equals(user)){
    //         res.status(200).send(`Login Successfule for user: ${username}`);
    //     }else{
            
    //     }
    // }else{
    //     res.send("User not available");
    // }
});

module.exports = app;