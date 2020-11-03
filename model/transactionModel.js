const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');
let addTransactionModel = mongoose.Schema({

    transactionId: {
        type: String
    },
    chargeId: {
        type: String
    },
    Url: {
        type: String
    },
    paymentType: {
        type: String,
        enum: ["creditCard"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    number: {
        type: String
    },
    exp_month: {
        type: String
    },
    exp_year: {
        type: String
    },
    cvc: {
        type: String
    },
    currency: {
        type: String,
        default: "usd"
    },
    holdersName: {
        type: String
    },
    amount: {
        type: Number,
        default: "0"
    },
    usdAmount: {
        type: Number,
        default: "0"
    },
    email: {
        type: String
    },
    account: {
        type: String
    },

    transactionType: {
        type: String,
        enum: ["ADD", "WITHDRAW"]
    },
  
    bankName: {
        type: String
    },
    branchName: {
        type: String
    },
    bankImage: {
        type: String
    },
    
    nickName: {
        type: String
    },
    customerId:{
        type:String
    },
    routingNumber:{
        type:String
    },
    accountHolderType: {
        type:String
    },
    transactionStatus: {
        type: String,
        enum: ["ACCEPTED", "REJECTED"]
    },


}, {
        timestamps: true
    })

addTransactionModel.plugin(mongoosePaginate);
addTransactionModel.plugin(mongooseAggregatePaginate);
var addTransaction = mongoose.model('addTransaction', addTransactionModel);
module.exports = addTransaction;





// Today's task 
// 1) withdraw api given to frontend for integration - done with resolving issues
// 2) userBank account api