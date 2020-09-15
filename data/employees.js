// // const mongoose = require('mongoose');
const mongoose = require("../database/db.js");
// // var {Employee} = require('../Models/Employee');
const Branch = require('../Models/Bank_Branch.js');
const Bank = require('../Models/Bank.js');
const Employee = require('../Models/Employee.js');
const e = require("cors");
// var ObjectId = require('mongodb').ObjectID;

// Employee.find({},(err, data)=>{
//     if(err) throw err;
//     return console.log(data);
// })

//  function getAllEmployees(){
//     const employee ={
//         emp_id:"",
//         emp_name:"",
//         emp_email:"",
//         emp_photo:"",
//         branch_name:"",
//         bank_name:""
//     }
    
//     var all =[];
    
//      Employee.find({},{emp_password:0})
//                     .populate('branch_id')
//                     .populate('bank_id')
//                         .exec((err, data)=>{
//                                 const arr =[];
//                                 if(err) console.log("Error", JSON.stringify(err,undefined,3));
//                                     // console.log("Data:",data);
//                                     data.forEach(e =>{
//                                         let emp = Object.create(employee); 
//                                         emp.emp_name = e.emp_name;
//                                         emp.emp_address = e.emp_address;
//                                         emp.emp_photo = e.emp_photo;
//                                         emp.emp_email = e.emp_email;
//                                         emp.branch_name = e.branch_id.branch_name;
//                                         emp.bank_name = e.bank_id.bank_name;
//                                         // console.log(emp);
//                                         arr.push(emp);
//                                     })
//                                     all.push(arr);      
//                                     console.log("data",all);
//                     })
           

// }

async function getAllEmployees(){
    const employee ={
        emp_id:"",
        emp_name:"",
        emp_email:"",
        emp_photo:"",
        branch_name:"",
        bank_name:""
    }
    
    var all =[];
    
     await Employee.find({},{emp_password:0})
                    .populate('branch_id')
                    .populate('bank_id')
                    .exec((err,data) =>{
                        if(err) throw console.log("Error", err);
                                // console.log("Data:",data);
                                var arr =[];
                                data.forEach(e =>{
                                    let emp = Object.create(employee); 
                                    emp.emp_name = e.emp_name;
                                    emp.emp_address = e.emp_address;
                                    emp.emp_photo = e.emp_photo;
                                    emp.emp_email = e.emp_email;
                                    emp.branch_name = e.branch_id.branch_name;
                                    emp.bank_name = e.bank_id.bank_name;
                                    // console.log(emp);
                                    arr.push(emp);
                                })
                            // console.log(arr);
                            all = arr.map(e =>{return e});
                            // console.log("All",all);  
                            return all;   
                    })
                    // }).catch(err =>{
                    //     console.log(Error,err);
                    // });         

}

// Employee.findOne({emp_name:"Ann", emp_password:12345})
//         .then(data =>{
//             if(data){
//             // res.status(200).send(`Login Successfule for user: ${username}`)
//             console.log("Login Successfule for user");
//         }else{
//             // res.status(204).send(`Credentials does not match`);
//             console.log("Login not found for user");
//         }
//     }).catch(err =>{
//         console.log("Error",err);
//     })






// var dataEmp = [
//     {
//         emp_name:"Ann",
//         emp_email:"Ann@mail.com",
//         emp_photo:"photo_url",
//         emp_address:"add_ann",
//         emp_password:"12345",
//     },
//     {
//         emp_name:"Sam",
//         emp_email:"Samn@mail.com",
//         emp_photo:"photo_url",
//         emp_address:"add_sam",
//         emp_password:"12345",
//     },
//     {
//         emp_name:"Lan",
//         emp_email:"Lan@mail.com",
//         emp_photo:"photo_url",
//         emp_address:"add_lan",
//         emp_password:"12345",
//     },
//     {
//         emp_name:"Jan",
//         emp_email:"Jan@mail.com",
//         emp_photo:"photo_url",
//         emp_address:"add_jan",
//         emp_password:"12345",
//     }
// ];

// var dataBranch = [
//     {
//         branch_name:"branch 1",
//         branch_address:"branch add 1",
//         employees:[]
//     },
//     {
//         branch_name:"branch 2",
//         branch_address:"branch add 2",
//         employees:[]
//     },
//     {
//         branch_name:"branch 3",
//         branch_address:"branch add 3",
//         employees:[]
//     },
//     {
//         branch_name:"branch 4",
//         branch_address:"branch add 4",
//         employees:[]
//     }
// ];

// var dataBank=[
//     {
//         _id:"bank 1",
//         bank_name:"bank One",
//     },
//     {
//         _id:"bank 2",
//         bank_name:"bank Two",
//     }
// ]


// // const createBank = function(bank) {
// //          Bank.create(bank).then(done_bank => {
// //             console.log("\n>> Created Tutorial:\n", done_bank);
// //             return done_bank;
// //           });
// // };

// // dataBank.forEach(bank=>{
// //     createBank(bank);
// // })


// // const createBranch = async function(bank_id,branch) {

// //     try{
// //      await Branch.create(branch).then(done_branch => {
// //       console.log("\n>> Created branch:\n", done_branch);
// //         console.log(ObjectId(done_branch._id));
// //         return Bank.findByIdAndUpdate(
// //         bank_id ,
// //         { $push: { branch_id: ObjectId(done_branch._id) } },
// //         { new: true, useFindAndModify: false }
// //       );
// //     });
// //     }catch(err){
// //         console.log(err);
// //     }
// //   };

// // dataBranch.forEach(branch=>{
// //     if(branch.branch_name==="branch 1" || branch.branch_name==="branch 2")
// //         createBranch("bank 1",branch);
// //     else{
// //         createBranch("bank 2",branch);
// //     }
// // })




//   const createEmployee = async function(branch_id, employee) {
//     try{
//         await Employee.create(employee).then(done_employee => {
//             console.log("\n>> Created Comment:\n", done_employee);
        
//             return Branch.findByIdAndUpdate(
//                 branch_id ,
//                 { $push: { employees:done_employee._id } },
//                 { new: true, useFindAndModify: false }
//             );
//             })
//     }catch(err){
//         console.log(err);
//     }
//   };


//   dataEmp.forEach(emp=>{
//     if(emp.emp_name === "Ann" || emp.emp_name === "Sam")
//          createEmployee(Branch.find({branch_name:"branch 1"}).get,emp);
//     else{
//         createEmployee(Branch.find({branch_name:"branch 2"})._id,emp);
//     }
// })


module.exports = {getAllEmployees}