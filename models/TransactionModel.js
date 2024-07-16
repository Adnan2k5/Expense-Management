const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema(
    {
        userid:{
            type: String,
            required: [true, "User Id is required"]
        },

        amount: {
            type: Number,
            required: [true,"Amount is required"],
        },
        type: {
            type: String,
            required: [true,"Type is required"],
        },
        category:{
            type: String,
            required: [true, "Cateory is required"],
        },
        reference:{
            type: String
        },
        description:{
            type: String,
        },
        date: {
            type: Date,
            required: [true,"date is required"]
        },
    },
    {timestamps: true}
);


const TransactionModel = mongoose.model('Transaction', TransactionSchema)
module.exports  = TransactionModel;