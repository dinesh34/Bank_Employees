const express = require('express');

var app = express();

const Employee = require("../Models/Employee.js");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const Services = require("../data/employees.js");
const { json } = require('body-parser');
const { restart } = require('nodemon');

dotenv.config();

var refreshTokens=[];

const authenticate = (req, res, next) =>{

    const authHeader  = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.MY_SECRET,(err, user)=>{
            if(err) res.send("Error occured");

            req.user = user;
            next();
        });
    }else{
        res.send("Access denied! token not found")
    }

}



app.get('/all', authenticate, (req,res)=>{

    res.setHeader('Content-Type', 'application/json');

    let employee ={
        emp_id:"",
        emp_name:"",
        emp_email:"",
        emp_photo:"",
        branch_name:"",
        bank_name:""
    }

    let dataFound = [];

    Employee.find({},{emp_password:0}).populate('bank_id').populate('branch_id').exec()
            .then(data =>{
                data.forEach(e =>{
                               let emp = Object.create(employee);
                               emp.emp_id = e.id; 
                               emp.emp_name = e.emp_name;
                               emp.emp_address = e.emp_address;
                               emp.emp_photo = e.emp_photo;
                               emp.emp_email = e.emp_email;
                               emp.branch_name = e.branch_id.branch_name;
                               emp.bank_name = e.bank_id.bank_name;
                            //    console.log(emp);
                               dataFound.push(emp);
                           })
                           res.send(JSON.stringify(dataFound));
                           console.log("Data Found",dataFound);
            }).catch(err =>{
                console.log(err);
            });

})


app.post('/login', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');

    var username = req.body.username;
    var password = req.body.password;

    Employee.findOne({emp_name:username, emp_password:password})
        .then(data =>{
            if(data){
                // res.status(200).send("Login Successfule for user");
                console.log("Login Successful for user");

                const accesstoken = jwt.sign(
                    {
                        username,
                        password
                    },
                    process.env.MY_SECRET
                    ,
                    {expiresIn:'1m'}
                );

                const refreshtoken = jwt.sign(
                    {
                        username,
                        password
                    },
                    process.env.REF_SECRET
                )

                res.json({
                    accesstoken: accesstoken,
                    refreshtoken: refreshtoken
                });

            }else{
                res.status(204).send("Credentials does not match");
                console.log("Login not found for user");
        }
    }).catch(err =>{
        console.log("Error",err);
    });
})

app.post('/token',(req, res)=>{

    const {token} = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REF_SECRET, (err, user) =>{
        if(err) res.sendStatus(403);

        const accessToken= jwt.sign({username:user.emp_name, password:user.emp_password}, process.env.MY_SECRET,{expiresIn:'1m'});

        res.json({accesstoken: accessToken});
    });
});

app.post('/logout',(req, res)=>{
    const {token} = req.body;
    refreshTokens = refreshTokens.filter(t => {
         t !== token;
    });
    res.send("Logout success");
});


module.exports = app;