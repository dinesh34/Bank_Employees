const mongoose = require('mongoose');

var Bank = mongoose.model("Bank",

        {
            _id:{type:String},
            bank_name:{type:String},
            branch_id:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "Branch"
                }
            ]
        }

);

module.exports= Bank