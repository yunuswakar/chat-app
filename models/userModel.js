const mongoose = require('mongoose');
const schema = mongoose.Schema;
const paginate = require("mongoose-paginate")
var bcrypt = require('bcrypt-nodejs')

var userModel = new schema({
    name: {
        type: String
    },
    surName: {
        type: String
    },
    countryId: {
        type: schema.Types.ObjectId,
        ref: "countryModel"
    },
    roleId: {
        type: schema.Types.ObjectId,
        ref: "role"
    },
    customerName: {
        type: String
    },
    userStatus:{type:String},
    phone: { type: String },
    countryName: { type: String },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    nickName: {
        type: String
    },
    isFirstTime:{
     type:Boolean,
     default:false
    },
    verifyStatus:{
        type: String,
        default: 'false'
   },
    email: {
        type: String,
        lowercase: true
    },
    gender: {
        type: String
    },
    otp: {
        type: String
    },
    otpTime: {
        type: Number,
        default: Date.now()
    },
    verifyOtp: {
        type: Boolean,
        default: false
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
    backImage:{
        type:String,
        default:null
    },
    description: {

        type: String
    },
    aboutMe: {

        type: String
    },
    location: {

        type: String
    },
    profile: {
        type: String
    },
    age: {
        type: String
    },
    reward:{
      type:String,
      default:null
    },
    rewardStatus:{
        type:Boolean,
        default:false
      },
    intersts: [
        String
    ],
    favoriteFood: [
        String
    ],
    language: [
        String
    ],
    speak:[
        String
    ],
    favorite:[
        String
    ],
    blockedUser: [
        String
    ],
    profilePrivacy: {
        type: String,
        enum: ["PUBLIC", "FRIENDS", "FRIENDSEXCEPT", "SPECIFICFRIENDS", "ONLYME"],
        default: "PUBLIC"
    },
    friends: [
        {
            friendId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            name: {
                type: String
            },
            profilePic: {
                type: String
            },
            addTime: {
                type: Date,
                default: Date.now()
            },
            status: {
                type: String,
                enum: ["ACTIVE", "BLOCK", "DELETE"],
                default: "ACTIVE"
            }
        }
    ],
    socialId: {
        type: String
    },
    mirrorFlyId: {
        type: String
    },
    loginType: {
        type: String,
        enum: ["FACEBOOK", "GOOGLE", "NORMAL", "INSTAGRAM", "WECHAT", "LINE"],
        default: "NORMAL"
    },
    friendsRequest: [{
        friendsRequestUserId: {
            type: schema.Types.ObjectId,
            ref: "user"
        },
        status: {
            type: String,
            enum: ["CONFIRM", "DELETE", "WAITING"],
            default: "WAITING"
        }
    }],
    friendRequestSentList: [
        {
            friendRequestSentId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            addTime: {
                type: Date,
                default: Date.now()
            },
            status: {
                type: String,
                enum: ["SENT", "REMOVE", "DELETE", "BLOCK", "ACCEPT"],
                default: "SENT"
            }
        }
    ],
    follower: [
        {
            followerId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            status: {
                type: String,
                enum: ["CONFIRM", "DELETE", "WAITING"],
                default: "WAITING"
            }
        }
    ],
    following: [
        {
            followingId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            status: {
                type: String,
                enum: ["ACTIVE", "BLOCK", "DELETE"],
                default: "ACTIVE"
            }
        }
    ],
    userType: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "CUSTOMER", "USER"],
        default: "USER",
        uppercase: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    onlineStatus: {
        type: Boolean,
        default: false
    },
    permissions: [{
        dashboard: {
            type: Boolean,
            default: false
        }

    }]

}, { timestamps: true });
userModel.plugin(paginate);
module.exports = mongoose.model("user", userModel);

mongoose.model("user", userModel).find({ userType: "ADMIN" }, (err, result) => {
    if (err) {
        console.log("DEFAULT ADMIN ERROR", err);
    } else if (result.length != 0) {
        console.log("Default Admin.");
    } else {
        let obj = {
            userType: "ADMIN",
            name: "Umair khan",
            country: "INDIA",
            profilePic: "https://res.cloudinary.com/dkoznoze6/image/upload/v1563943105/n7zdoyvpxxqhexqybvkx.jpg",
            verifyOtp: true,
            countryCode: "+91",
            mobileNumber: "9560440056",
            email: "no-umairkhan@mobiloitte.com",
            password: bcrypt.hashSync("Mobiloitte1"),
            permissions: [{
                dashboard: true
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