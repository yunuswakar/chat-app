const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');
let transactionModel = new schema({

    agentId: {
        type: String
    },
    agent_id: {
        type: String
    },
    sendMoneyBy: {
        type: String
    },
    receiveMoneyBy: {
        type: String
    },
    customer_id: {
        type: String
    },
    amount: {
        type: String
    },
    amountType: {
        type: String
    },
    sender_customer_id: {
        type: String
    },
    receiver_customer_id: {
        type: String
    },
    sender_mobileNumber: {
        type: String
    },
    receiver_mobileNumber: {
        type: String
    },
    transactionStatus: {
        type: String
    },
    transectionType: {
        type: String
    },

    sender_id: {
        type: String
    },
    receiver_id: {
        type: String
    },
    sender_UserType: {
        type: String
    },
    receiver_UserType: {
        type: String
    },
    send_amount: {
        type: String
    },
    receive_amount: {
        type: String
    },
    commission: {
        type: Number
    }



}, { timestamps: true })

transactionModel.plugin(mongoosePaginate);
transactionModel.plugin(mongooseAggregatePaginate)
module.exports = mongoose.model('transaction', transactionModel);
//module.exports = securityQuestion