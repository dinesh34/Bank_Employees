
const mongoose = require('mongoose');

var Employee = mongoose.model(
    'Employee',
    {
        emp_name:{type:String},
        emp_email:{type:String},
        emp_photo:{type:String},
        emp_address:{type:String},
        emp_password:{type:String},
        bank_id:{
            type:mongoose.Schema.Types.String,
            ref:"Bank"
        },
        branch_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Branch"
        },
        roles:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role"
        }]
    },
    
    "employees"
);

module.exports = Employee