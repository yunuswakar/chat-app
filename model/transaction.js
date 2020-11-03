const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');
let transaction = mongoose.Schema({

    fromUserId: {
        type: String
    },
    toUserId: {
        type: String
    },
    transactionId: {
        type: String
    },
    senderAmount: {
        type: String
    },

    toBalance: {
        type: String
    },
    toEmail: {
        type: String
    },
    toUserName: {
        type: String
    },
    toCountry: {
        type: String
    },
    toCountryCode: {
        type: String
    },
    toMobileNumber: {
        type: String
    },
    toFirstName: {
        type: String
    },
    toLastName: {
        type: String
    },
    toMiddleName: {
        type: String
    },
    toAccountId: {
        type: String
    },

    toAvailableAccountBalance: {
        type: String
    },

    fromMessage: {
        type: String
    },
    fromCountryAmount: {
        type: String
    },
    fromCountry: {
        type: String
    },
    Url: {
        type: String
    },
    usdAmount:{
        type:String
    },

    transactionType:{
        type:String,
        enum:["SEND" , "RECEIVE", "ADD", "WITHDRAW"]   /// change in add and withdraw
    },
    transactionStatus: {
        type: String,
        enum: ["ACCEPTED", "REJECTED"]
    },
////////////////////////////////////////////////

senderCurrency:{
    type: String,
    
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
email: {
    type: String
},
account: {
    type: String
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

}, {
        timestamps: true
    })

transaction.plugin(mongoosePaginate);
//transaction.plugin(mongooseAggregatePaginate);
var transactions = mongoose.model('transactions', transaction);
module.exports = transactions;


/////================================================================================================================================================================



