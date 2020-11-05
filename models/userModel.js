const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;
var userKey = new schema({

    firstName: {
        type: String
    },
    deviceUsed: { type: String },
    signUpMethod: { type: String },
    lastName: {
        type: String
    },
    paymentStatus: { type: Boolean, default: false },
    hasRegisteredBusiness: { type: Boolean, default: false },
    name: {
        type: String
    },
    roleName: { type: String },
    credit: {
        type: Number,
        default: 0
    },
    email: {
        type: String
    },
    countryCode: {
        type: String
    },
    popUpAddress: [{
        pinCode: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        address: {
            type: String
        },
    }],
    mobileNumber: {
        type: String
    },
    password: {
        type: String
    },
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
        type: Number
    },
    oneTimeSignUp: { type: Boolean, default: false },
    emailOtpVerify: { type: Boolean, default: false },
    mobileOtpVerify: { type: Boolean, default: false },
    dateOfAnniversary: { type: String },
    educationalLevel: { type: String },
    homeAddress: { type: String },
    ageRange: { type: String },
    roleId: {
        type: schema.Types.ObjectId,
        ref: "role"
    },
    martId: {
        type: schema.Types.ObjectId,
        ref: "mart"
    },
    assignedManagerId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    shopNumber: {
        type: String
    },
    retailerImages: [],
    shopName: {
        type: String
    },
    floorNumber: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"]
    },
    dateOfBirth: {
        type: String
    },
    occupation: {
        type: String
    },
    incomeRange: {
        type: String
    },
    homeOwnership: {
        type: String
    },
    educationLevel: {
        type: String
    },
    birthDate: {
        type: String
    },
    birthMonth: {
        type: String
    },
    anniversaryDate: {
        type: String
    },
    anniversaryMonth: {
        type: String
    },
    pinCode: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    weeklyEmail: {
        type: Boolean,
        default: false
    },
    twoFAEnable: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "USER", "RETAILER"],
        default: "USER"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    hasSignedUp: {
        type: Boolean,
        default: false
    },
    retailerStatus: {
        type: String,
        enum: ["INACTIVE", "PENDING REVIEW", "ACTIVE"],
        default: "INACTIVE"
    },
    loginStatus: {
        type: String,
        enum: ["UNBLOCK", "BLOCK"],
        default: "UNBLOCK"
    },
    emailOtp: {
        type: Number
    },
    users: [],
    lastActive: {
        type: Date
    },
    emailOtpTime: {
        type: Number
    },
    mobileOtp: {
        type: Number
    },
    mobileOtpTime: {
        type: Number
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    notificationStatus: {
        type: Boolean,
        default: false
    },
    websiteStatus: {
        type: String,
        enum: ["INACTIVE", "PENDING REVIEW","ACTIVE"],
        default: "INACTIVE"
    },
    qrCode: {
        type: String
    },
    managerName: { type: String },
    GSTIN: {
        type: String,
    },
    registeredBusinessName: {
        type: String
    },
    registeredBusinessPhoneNumber: {
        type: String
    },
    addressProof: {
        type: String
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
            firstName: "Pramod",
            lastName: "Giri",
            countryCode: "+91",
            mobileNumber: "8299547036",
            email: "me-pramod@mobiloitte.com",
            password: bcrypt.hashSync("Mobiloitte1"),
            userType: "ADMIN"
        };
        mongoose.model("user", userKey).create(obj, (error, adminResult) => {
            if (error) {
                console.log("Admin error", error);
            }
            else {
                console.log("Admin created>>>", adminResult)
            }
        })
    }
})