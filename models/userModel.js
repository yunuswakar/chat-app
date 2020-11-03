const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;
var userKey = new schema({

    firstName: {
        type: String
    },
    fcmToken:{
        type: String
    },
    lastName: {
        type: String
    },
    patientId: { type: String },
    name: { type: String },
    email: {
        type: String
    },
    profilePic: { type: String },
    userAppId: { type: String },
    passCodeStatus: {
        type: Boolean,
        default: false
    },
    notificationStatus:{type:Boolean},
    passCode: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    },
    birthday: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    gender: {
        type: String
    },
    zipCode: {
        type: String
    },
    qrCode:{type:String},
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String
    },

    userDetail: [
        {
            userId: {
                type: String
            },
            birthday: {
                type: String
            },
            gender: {
                type: String
            },
            zipCode: {
                type: String
            },
            addressLine1: {
                type: String
            },
            addressLine2: {
                type: String
            },
            state: {
                type: String
            },
            city: {
                type: String
            },
        }
    ],
    otp: {
        type: Number
    },
    otpVerification: {
        type: Boolean,
        default: false
    },
    retailerReferralCode: {
        type: String
    },
    otpTime: {

        type: String
    },
    rating: {

        type: Number
    },
    countryCode: {
        type: String
    },
    address: {
        type: String
    },
    csv: {
        type: String
    },
    shareApp: {
        type: String
    },
    userType: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },

    addressProof: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
}, {
    timestamps: true
})

userKey.index({ location: "2dsphere" });
userKey.plugin(mongoosePaginate);
module.exports = mongoose.model("user", userKey)

mongoose.model("user", userKey).find({
    userType: "ADMIN"
}, (err, result) => {
    if (err) {
        console.log("Default admin error", err);
    } else if (result.length != 0) {
        console.log("Default Admin");
    } else {
        var obj = {
            name: "Ali Ahmad",
            countryCode: "+91",
            mobileNumber: "7979862051",
            email: "no-aliahmad@mobiloitte.com",
            password: bcrypt.hashSync("Mobiloitte1"),
            userType: "ADMIN"
        };
        mongoose.model("user", userKey).create(obj, (error, adminResult) => {
            if (error) {
                console.log("Admin error", error);
            }
            else {
                console.log("Admin created>>>")
            }
        })
    }
})