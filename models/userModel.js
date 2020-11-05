const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')
var Paginate = require('mongoose-paginate');

var userModel = new schema({
    pin: {
        type: String
    },

    name: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    hobbies: {
        type: String
    },
    deviceToken: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    DOB: {
        type: String
    },
    contentImage: {
        type: String
    },
    backImage:{
        type: String,
        default: null
    },
    gender: {
        type: String
    },
    otp: {
        type: Number
    },
    verifyOtp: {
        type: Boolean,
        default: false
    },

    otpTime: {
        type: Number
    },

    country: {
        type: String
    },
    loginWith: {
        type: String,
        enum: ['facebook', 'google', 'manual'],
        default: 'manual'
    },
    socialId: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    countryCode: {
        type: String
    },
    password: {
        type: String
    },
    profilePic: {
        type: String,
        default: ""
    },
    aboutMe: {
        type: String
    }, 
    referralCode: {
        type: String
    },
    rewardPoint:{
        type:Number,
        default:0
    },

    friends: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    // address:{
    //     type:String
    // },
    // location: {
    //     type: {
    //         type: String,
    //         default: "Point"
    //     },
    //     coordinates: [Number]
    // },
    chooseCategory: [{
        type: schema.Types.ObjectId,
        ref: "categoryModel"
    }],
    bookmark: [{
        type: schema.Types.ObjectId,
        ref: "post"
    }],
    userType: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "USER"],
        default: "USER",
        uppercase: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    blockedUser: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    mutedUser: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    requestSent: [
        {
            userId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            userName: {
                type: String
            },
            userPic: {
                type: String
            },
            status: {
                type: String,
                enum: ["SENT", "CANCEL", "ACCEPT", "REJECT"],
                default: "SENT"
            }
        }
    ],
    requests: [
        {
            senderId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            senderName: {
                type: String
            },
            senderPic: {
                type: String
            },
            status: {
                type: String,
                enum: ["REJECT", "CANCEL", "ACCEPT", "WAITING"],
                default: "WAITING"
            }
        }],
    followers: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    following: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    followRequestSent: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    followRequests: [{
        type: schema.Types.ObjectId,
        ref: "user"
    }],
    toggleButton:{
        type: Boolean,
            default: false
    },
    friendRequest_notification:{
        type: Boolean,
            default: false
    },
    visitProfile_notification:{
        type: Boolean,
            default: false
    },
    tag_notification:{
        type: Boolean,
            default: false
    },
    likeComment_notification:{
        type: Boolean,
         default: false
    },
    profile_notification:{
        type: Boolean,
            default: false
    },
    chatMessage_notification:{
        type: Boolean,
            default: false
    },
    invitationOnEvent_notification:{
        type: Boolean,
            default: false
    },
    admin_notification:{
        type: Boolean,
        default: false
    },
    permission: {
        dashboard: {
            type: Boolean,
            default: false
        },
        categoryManagement: {
            type: Boolean,
            default: false
        },
        subAdminManagement: {
            type: Boolean,
            default: false
        },
        contentPostManagement: {
            type: Boolean,
            default: false
        },
        userManagement: {
            type: Boolean,
            default: false
        },
        transactionManagement: {
            type: Boolean,
            default: false
        },
        communityManagement: {
            type: Boolean,
            default: false
        },

        reportManagement: {
            type: Boolean,
            default: false
        },
        eventManagement: {
            type: Boolean,
            default: false
        },
        staticContentManagement: {
            type: Boolean,
            default: false
        }
    },

}, { timestamps: true });

userModel.index({ location: "2dsphere" });
userModel.plugin(Paginate);

module.exports = mongoose.model("user", userModel);

mongoose.model("user", userModel).find({ userType: "ADMIN" }, (err, result) => {
    if (err) {
        console.log("DEFAULT ADMIN ERROR", err);
    } else if (result.length != 0) {
        console.log("Default Admin.");
    } else {
        let obj = {
            userType: "ADMIN",
            name: "SocialX",
            country: "INDIA",
            profilePic: "https://res.cloudinary.com/dkoznoze6/image/upload/v1563943105/n7zdoyvpxxqhexqybvkx.jpg",
            verifyOtp: true,
            countryCode: "+91",
            mobileNumber: "9953313818",
            email: "no-rajatpathak@mobiloitte.com",
            password: bcrypt.hashSync("Mobiloitte1"),
            permission: {
                dashboard: true,
                categoryManagement: true,
                subAdminManagement: true,
                contentPostManagement: true,
                userManagement: true,
                transactionManagement: true,
                communityManagement: true,
                reportManagement: true,
                eventManagement: true,
                staticContentManagement: true
            },
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