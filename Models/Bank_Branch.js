const mongoose = require('mongoose');

var BankBranch = mongoose.model(
    
    'Branch',
        {
            branch_name:{type:String},
            branch_address:{type:String},
            bank_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Bank"
            },
            employees:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Employee"
            }]
        },
        "branches"

);

module.exports = BankBranch