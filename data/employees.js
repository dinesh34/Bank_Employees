// const mongoose = require('mongoose');
const {mongoose} = require("../database/db.js");
// var {Employee} = require('../Models/Employee');
const Branch = require('../Models/Bank_Branch.js');
const Bank = require('../Models/Bank.js');
const Employee = require('../Models/Employee.js');
var ObjectId = require('mongodb').ObjectID;

var dataEmp = [
    {
        emp_name:"Ann",
        emp_email:"Ann@mail.com",
        emp_photo:"photo_url",
        emp_address:"add_ann",
        emp_password:"12345",
    },
    {
        emp_name:"Sam",
        emp_email:"Samn@mail.com",
        emp_photo:"photo_url",
        emp_address:"add_sam",
        emp_password:"12345",
    },
    {
        emp_name:"Lan",
        emp_email:"Lan@mail.com",
        emp_photo:"photo_url",
        emp_address:"add_lan",
        emp_password:"12345",
    },
    {
        emp_name:"Jan",
        emp_email:"Jan@mail.com",
        emp_photo:"photo_url",
        emp_address:"add_jan",
        emp_password:"12345",
    }
];

var dataBranch = [
    {
        branch_name:"branch 1",
        branch_address:"branch add 1",
        employees:[]
    },
    {
        branch_name:"branch 2",
        branch_address:"branch add 2",
        employees:[]
    },
    {
        branch_name:"branch 3",
        branch_address:"branch add 3",
        employees:[]
    },
    {
        branch_name:"branch 4",
        branch_address:"branch add 4",
        employees:[]
    }
];

var dataBank=[
    {
        _id:"bank 1",
        bank_name:"bank One",
    },
    {
        _id:"bank 2",
        bank_name:"bank Two",
    }
]


// const createBank = function(bank) {
//          Bank.create(bank).then(done_bank => {
//             console.log("\n>> Created Tutorial:\n", done_bank);
//             return done_bank;
//           });
// };

// dataBank.forEach(bank=>{
//     createBank(bank);
// })


// const createBranch = async function(bank_id,branch) {

//     try{
//      await Branch.create(branch).then(done_branch => {
//       console.log("\n>> Created branch:\n", done_branch);
//         console.log(ObjectId(done_branch._id));
//         return Bank.findByIdAndUpdate(
//         bank_id ,
//         { $push: { branch_id: ObjectId(done_branch._id) } },
//         { new: true, useFindAndModify: false }
//       );
//     });
//     }catch(err){
//         console.log(err);
//     }
//   };

// dataBranch.forEach(branch=>{
//     if(branch.branch_name==="branch 1" || branch.branch_name==="branch 2")
//         createBranch("bank 1",branch);
//     else{
//         createBranch("bank 2",branch);
//     }
// })




  const createEmployee = async function(branch_id, employee) {
    try{
        await Employee.create(employee).then(done_employee => {
            console.log("\n>> Created Comment:\n", done_employee);
        
            return Branch.findByIdAndUpdate(
                branch_id ,
                { $push: { employees:done_employee._id } },
                { new: true, useFindAndModify: false }
            );
            })
    }catch(err){
        console.log(err);
    }
  };


  dataEmp.forEach(emp=>{
    if(emp.emp_name === "Ann" || emp.emp_name === "Sam")
         createEmployee(Branch.find({branch_name:"branch 1"}).get,emp);
    else{
        createEmployee(Branch.find({branch_name:"branch 2"})._id,emp);
    }
})