const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');


let commissionModel = new schema({
    transactionFee: {
        type: Number
    },
    monthlyFee: {
        type: Number
    },
    annuallyFee: {
        type: Number
    },
    depositFee: {
        type: Number
    },
    withdrawalFee: {
        type: Number
    },
    commisionFee: {
        type: Number
    },
    amount: {
        type: Number
    },
    amountType: {
        type: String
    },
    deposit_admin_commission: {
        type: Number
    },
    send_amount: {
        type: Number,
    },
    receive_amount: {
        type: Number,
    },
    deposit_agent_Commission: {
        type: Number,
    },
    sender_UserType: {
        type: String,
    },
    withdraw_admin_commission: {
        type: Number
    },
    withdraw_agent_commission: {
        type: Number
    },
    receiver_UserType: {
        type: String,
    },
    admin_commission: {
        type: String
    },
    agent_Commission:{
        type:String
    },
    status: {
        type: String,  
    },
}, { timestamps: true })
commissionModel.plugin(mongoosePaginate);
commissionModel.plugin(mongooseAggregatePaginate);

var commission = mongoose.model('commission', commissionModel);
module.exports = commission

mongoose.model('commission', commissionModel).find((error, result) => {
    if (result.length == 0) {
        let obj = {
            'status': "ACTIVE",
            'deposit_admin_commission': 1,
            'deposit_agent_Commission': 1,
            'withdraw_admin_commission': 2,
            'withdraw_agent_commission': 2,
        };
        mongoose.model('commission', commissionModel).create(obj, (error1, success) => {
            if (error1)
                console.log("Error is" + error1)
            else
                console.log("saved succesfully.", success);
        })
    }
});