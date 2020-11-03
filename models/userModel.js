const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");
var bcrypt= require('bcrypt-nodejs')

var userModel = new schema({
    name:{
        type:String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },   
    country: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    postCode: {
        type: String
    },
    countryCode: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    password: {
        type: String
    },
   
    profilePic: {
        type: String,
        default: null
    },
    userType: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "CUSTOMER"],
        default: "CUSTOMER",
        uppercase: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    // cardDetails: [{
    //     nameOnCard: {
    //         type: String
    //     },
    //     number: {
    //         type: String,
    //         default: "0000000000000000"
    //     },
    //     cardType: {
    //         type: String
    //     },
    //     expMonth: {
    //         type: String,
    //     },
    //     expYear: {
    //         type: String,
    //     },
    // }],
    permissions: [{
        dashboard: {
            type: Boolean,
            default: false
        },
        customerManagement: {
            type: Boolean,
            default: false
        },
        subAdminManagement: {
            type: Boolean,
            default: false
        },
        packageManagement: {
            type: Boolean,
            default: false
        },
        bookingManagement: {
            type: Boolean,
            default: false
        },
        transferManagement: {
            type: Boolean,
            default: false
        },
        sightseeingManagement: {
            type: Boolean,
            default: false
        },
        transactionManagement: {
            type: Boolean,
            default: false
        },
        visaManagement: {
            type: Boolean,
            default: false
        },
        contentManagement: {
            type: Boolean,
            default: false
        },
        settingManagement: {
            type: Boolean,
            default: false
        },
        inquiryManagement: {
            type: Boolean,
            default: false
        },
        supportManagement: {
            type: Boolean,
            default: false
        }
    }]

}, { timestamps: true });

userModel.plugin(mongoosePaginate)
module.exports = mongoose.model("user", userModel); 

mongoose.model("user", userModel).find({ userType: "ADMIN" }, (err, result) => {
    if (err) {
        console.log("DEFAULT ADMIN ERROR", err);
    } else if (result.length != 0) {
        console.log("Default Admin.");
    } else {
        let obj = {
            userType: "ADMIN",
            firstName: "Rajat",
            lastName: "Pathak",
            country: "INDIA",
            profilePic: "https://res.cloudinary.com/dkoznoze6/image/upload/v1563943105/n7zdoyvpxxqhexqybvkx.jpg",
            verifyOtp: true,
            countryCode: "+91",
            mobileNumber: "9953313813",
            email: "no-aliahmad@mobiloitte.com",
            password: bcrypt.hashSync("Mobiloitte1"),
            permissions: [{
                dashboard: true,
                customerManagement: true,
                subAdminManagement: true,
                packageManagement: true,
                bookingManagement: true,
                transferManagement: true,
                sightseeingManagement: true,
                transactionManagement: true,
                visaManagement: true,
                contentManagement: true,
                settingManagement: true,
                inquiryManagement: true,
                supportManagement: true
            }]
        };
        mongoose.model("user", userModel).create(obj, (err1, result1) => {
            if (err1) {
                console.log("DEFAULT ADMIN  creation ERROR", err1);
            } else {
                console.log("DEFAULT ADMIN Created", result1);
            }
        });
    }
});