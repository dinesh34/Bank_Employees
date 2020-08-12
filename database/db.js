const  mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Kong_Bank", 

            {useUnifiedTopology:true, useNewUrlParser:true},

            (err) =>{
                if(!err){
                    console.log("Database Connection successfull.");
                }
                else{
                    console.log("Error occured while connectiong database: unsuccessfull:", err);
                }

            }

)

module.exports = mongoose;