const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');

let userModel = new schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    accountType:{
        type: String
     },
     recoveryDocument:{
        type: String
     },
    fullName: {
        type: String
    },
    name: {
        type: String
    },
    emailId: {
        type: String
    },
    country: {
        type: String,
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    answer: {
        type: String,
    },
    region: {
        type: String
    },
    countryCode: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    otpTime: {
        type: Number,
        default: Date.now()
    },
    profilePic: {
        type: String,
    },
    qrCode: {
        type: String
    },
    agent_Id: {
        type: String
    },
    otp: {
        type: Number
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
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHERS"]
    },
    dob: {
        type: String
    },
    fcmToken: {
        type: String
    },
    accountId: {
        type: String
    },
    customerId: {
        type: String
    },
    balance: {
        type: Number,
        default: "0"
    },
    amountUSD: {
        type: Number,
        default: "0"
    },
    amountCDF: {
        type: Number,
        default: "0"
    },
    commissionUSD: {
        type: Number,
        default: "0"
    },
    commissionCDF: {
        type: Number,
        default: "0"
    },
    userType: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "CUSTOMER", "AGENT"],
        default: "CUSTOMER"
    },

    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    subAdmin_Id: {
        type: String
    },
    agentId: {
        type: String
    },
    transactionType: {
        type: String,
        enum: ["withdraw", "Send", "Add"]
    },
    adminId: {
        type: String
    },
    notificationToggle: {
        type: Boolean,
        default: true
    },
    userStatus: {
        type: String
    },
    superAgentId: {
        type: String
    },
    blockAgentList: [{
        type: String
    }],
    blockCustomerList: [{
        type: String
    }],
    kycImage: {
        type: String
    },
    kyc: {
        type: String
    },
    addStatus: {
        type: String
    },
    kycStatus: {
        type: String,
        enum: ["verified", "unverified"],
        default: "unverified"
    },
    questionId: {
        type: String
    },
    count: {
        type: Number
    },
    buy: {
        type: Number,
    },
    sell: {
        type: Number
    },
    // location: {
    //     type: {
    //         type: String,
    //         default: "Point"
    //     },
    //     coordinates: [Number]
    // },
    permissions: [{
        dashboard: {
            type: Boolean,
            default: false
        },
        userManagement: {
            type: Boolean,
            default: false
        }, subAdminManagement: {
            type: Boolean,
            default: false
        },
        agentManagement: {
            type: Boolean,
            default: false
        }, kycManagement: {
            type: Boolean,
            default: false
        }, transactionManagement: {
            type: Boolean,
            default: false
        }, agentTransactionManagement: {
            type: Boolean,
            default: false
        }, qrCodeManagement: {
            type: Boolean,
            default: false
        }, commissionManagement: {
            type: Boolean,
            default: false
        }, journalManagement: {
            type: Boolean,
            default: false
        }, chatManagement: {
            type: Boolean,
            default: false
        }, generalsettingManagement: {
            type: Boolean,
            default: false
        }, staticContentManagement: {
            type: Boolean,
            default: false
        }, moneyManagement: {
            type: Boolean,
            default: false
        }

    }],
    cardDetails: [{
        name: {
            type: String
        },
        bankName: {
            type: String
        },
        cardNumber: {
            type: String,
            default: "0000000000000000000000000000000"
        },
   
        expMonth: {
            type: String,
        },
        expYear: {
            type: String,
        },
        cvvNumber: {
            type: String
        },
        stripeAccountId: {
            type: String
        }
    }],
    paymentStatus: {
        type: String,
        enum: ["PENDING", "COMPLETED"],
        default: "PENDING"
    },


}, { timestamps: true })
userModel.index({ location: "2dsphere" });
userModel.plugin(mongoosePaginate);
userModel.plugin(mongooseAggregatePaginate);
var users = mongoose.model('user', userModel);
module.exports = users;

(function init() {
    let obj1 = {
        firstName: "Harish",
        lastName: "Prajapati",
        password: bcrypt.hashSync("Mobiloitte1"),
        emailId: "no-harishprajapati@mobiloitte.com",
        userType: "ADMIN",
        adminId: "1234",
        profilePic: "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1556880003/r6hq5rvhfzxokipn6usi.png",
        countryCode: "+91",
        mobileNumber: "7678660787",
        country: "INDIA",
        state: "UP",
        permissions: [{
            dashboard: true,
            userManagement: true,
            subAdminManagement: true,
            agentManagement: true,
            kycManagement: true,
            transactionManagement: true,
            agentTransactionManagement: true,
            moneyManagement: true,
            qrCodeManagement: true,
            commissionManagement: true,
            journalManagement: true,
            chatManagement: true,
            generalsettingManagement: true,
            staticContentManagement: true
        }],
    }
    let obj2 = {
        firstName: "Harish",
        lastName: "Prajapati",
        password: bcrypt.hashSync("Mobiloitte1"),
        emailId: "no-wakaryunus@mobiloitte.com",
        userType: "ADMIN",
        adminId: "12345",
        accountType:"RECOVERY",
        profilePic: "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1556880003/r6hq5rvhfzxokipn6usi.png",
        countryCode: "+91",
        mobileNumber: "9318473963",
        country: "INDIA",
        state: "UP",
        permissions: [{
            dashboard: true,
            userManagement: true,
            subAdminManagement: true,
            agentManagement: true,
            kycManagement: true,
            transactionManagement: true,
            agentTransactionManagement: true,
            moneyManagement: true,
            qrCodeManagement: true,
            commissionManagement: true,
            journalManagement: true,
            chatManagement: true,
            generalsettingManagement: true,
            staticContentManagement: true
        }],
    }
 

    mongoose.model('user', userModel).findOne({ userType: "ADMIN" }, (err, result) => {
        if (err) {
            console.log("ERROR>>", err);
        }
        else if (!result) {
            mongoose.model('user', userModel).create(obj1,obj2, (err1, result1) => {
                if (err) {
                    console.log("ADMIN ERROR>>", err1);
                }
                else
                    console.log("Result1>>>", result1);
            })
        }
        else {
            console.log("Default Admin.");
        }

    })
})

    ();