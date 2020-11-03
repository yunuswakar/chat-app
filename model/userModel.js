const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');
// const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');
//const stripe = require('stripe')('sk_test_TGvQ13w637wJ9LFYyiU41Il5001YD56Bbn');
const stripe=require("stripe")("sk_test_ZHansZT1CxkNml9BUCNZhTVG00fV4GVpBw");
let userModel = new schema({
    userName: {
        type: String,
    },
    firstName: {
        type: String
    },

    balance: {
        type: Number,
        default: "0"
    },

    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
    },
    country: {
        type: String,
    },

    storeNo: {
        type: String
    },
    street: {
        type: String
    },
    area: {
        type: String
    },
    landMark: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: String
    },
    mobileNumber: {
        type: String,
    },
    tempMobileNumber: {
        type: String,
    },
    // tempCountryCode:{
    //     type: String,
    // },
    password: {
        type: String,
    },
    pin: {
        type: String
    },
    otp: {
        type: String
    },
    verifyOtp: {
        type: Boolean,
        default: false
    },
    socialId: {
        type: String
    },
    socialType: {
        type: String
    },
    profilePic: {
        type: String
    },
    userType: {
        type: String,
        enum: ["ADMIN", "USER", "VENDOR"],
        default: "USER"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCKED", "DELETED"],
        default: "ACTIVE"
    },


    hitKey: {
        type: Number,
        default: 5
    },
    login: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    },
    forgotToken: {
        type: String
    },
    loginTime: {
        type: String,
        default: Date.now()
    },
    loginTimeMail: {
        type: Date,
        default: Date.now()
    },
    accountId: {
        type: String
    },
    countryCode: {
        type: String
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    availableBalance: {
        type: Number,
        default: "0"
    },
    transfer: {
        type: String,
        enum: ["Sender", "Receiver"],
        default: "Receiver"
    },
    requestFor: {
        type: String
    },
    notificationId: [{
        type: schema.Types.ObjectId,
        ref: 'notification'
    }],
    escrowMoney: {
        type: Number,
        default: 0
    },
    customerId: {
        type: String
    },
    message: {
        type: String
    },

    receivers: [{

        // balance: {
        //     type: String
        // },
        // availableBalance: {
        //     type: String
        // },
        // id: {
        //     type: String
        // },
        // email: {
        //     type: String
        // },
        // userName: {
        //     type: String
        // },
        // countryCode: {
        //     type: String
        // },
        // country: {
        //     type: String
        // },
        // mobileNumber: {
        //     type: String
        // },
        // firstName: {
        //     type: String
        // },
        // lastName: {
        //     type: String
        // },
        // middleName: {
        //     type: String
        // },
        // accountId: {
        //     type: String
        // },
        // sender: {
        //     type: String
        // },

        // createdAt: {
        //     type: Date,
        //     default: Date.now()
        // }
    }],

    sender: [{
        message: {
            type: String
        },
        fromUser: {
            type: String
        },
        senderAmount: {
            type: Number
        },

    }],


    sameCountry: {
        type: String
    },
    fcmToken: {
        type: String
    },
    amountSent: {
        type: Number
    },

    // default:"0"
    transactionFee:
    {
        type: Number
        // default:"0"
    },
    conversionFee:
    {
        type: Number
        // default:"0"
    },
    splitMobileNumber: {
        type: String
    }

}, {
        timestamps: true
    })
userModel.plugin(mongoosePaginate);
userModel.plugin(mongooseAggregatePaginate);
var users = mongoose.model('users', userModel);
module.exports = users;


//////////////////////////////////////////////////ADMIN CREATED /////////////////////////////////////////////////////////////////////////////////

(function init() {
    stripe.accounts.create({
        type: 'custom',
        email: "remi@gmail.com",
        country: 'US',
        requested_capabilities: ['card_payments'],
    }, (error, result1) => {
        // console.log("account id ====>>>",result1)
        if (error) {
            console.log("i m inside error", error)
            // res.send({ responseCode: 500, responseMessage: "Internal server error", error })
        }
        else {
            let obj = {
                userName: "Remittance",
                password: "Mobiloitte1",
                userType: "ADMIN",
                email: "remittance1234@gmail.com",
                accountId: 'acct_1EIG3MAWX9DP7PgU',
            };
            // let salt = bcrypt.genSaltSync(10);
            obj.password = bcrypt.hashSync(obj.password, 10)
            mongoose.model('users', userModel).findOne({ userType: "ADMIN" }, (err, result) => {
                if (err) console.log(" Admin created## ", err);
                else if (!result) {
                    mongoose.model('user', userModel).create(obj, (err, success) => {
                        if (err) console.log("Admin created@@@@", err);
                        else
                            console.log(" Admin created $$$$ ", success);
                    })
                } else {
                    console.log("Admin");
                }
            })
        }
    })
})
    ();