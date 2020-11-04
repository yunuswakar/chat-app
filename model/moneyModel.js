const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');
let money = new schema({
    customerNoOfTransaction: {
        type: Number
    },
    customerWithdrowalMoreThan: {
        type: Number
    },
    customerWithdrowalLessThan: {
        type: Number
    },
    customerSendMoreThan: {
        type: Number
    },
    customerSendLessThan: {
        type: Number
    },
    customerDepositMoreThan: {
        type: Number
    },
    customerDepositLessThan: {
        type: Number
    },
    agentNoOfTransaction: {
        type: Number
    },
    agentWithdrowalMoreThan: {
        type: Number
    },
    agentWithdrowalLessThan: {
        type: Number
    },
    agentSendMoreThan: {
        type: Number
    },
    agentSendLessThan: {
        type: Number
    },
    agentDepositMoreThan: {
        type: Number
    },
    agentDepositLessThan: {
        type: Number
    }
}, { timestamps: true })

money.plugin(mongoosePaginate);  
money.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('money', money)

mongoose.model('money', money).find((error, result) => {
    if (result.length == 0) {
        let obj = {
            'customerNoOfTransaction': 5,
            'customerWithdrowalMoreThan': 3000,
            'customerWithdrowalLessThan': 1000,
            'customerSendMoreThan': 5000,
            'customerSendLessThan': 1000,
            'customerDepositMoreThan': 10000,
            'customerDepositLessThan': 500,
            'agentNoOfTransaction': 3,
            'agentWithdrowalMoreThan':5000,
            'agentWithdrowalLessThan':2000,
            'agentSendMoreThan':5000,  
            'agentSendLessThan':1000,
            'agentDepositMoreThan':10000,
            'agentDepositLessThan': 1000

        };
        mongoose.model('money', money).create(obj, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("saved succesfully.", success);
        })
    }
});