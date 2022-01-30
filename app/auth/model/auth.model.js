

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
    firstName: {
        type: String,
        default:""
    },
    lastName: {
        type: String,
        default:""
    },
    displayName: {
        type: String,
    },
    token:{
        type: String,
    },
    guId: {
        type: String,
    },
    deviceId: {
        type: String,
    },
    deviceType: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK"],
        default: "ACTIVE",
    },
    profileImg: {
        type: String,
    },
    dob: {
        type: Date,
    },
    tob: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    isTrial: {
        type:Boolean,
        default:true
    },
    distribution:{
    type:String,
    enum:["Subscribe","Unsubscribe","NotSubscribed"],
    default:"NotSubscribed"
    },
    trialEndDate: {
        type:Date
    },
    completeProfile: {
        type:Boolean,
        default:false
    },
    isVerified: {
        type:Boolean,
        default:false
    },
    resetToken: {
        type: String,
    },
    isUser:{
        type: Boolean,
        default:true
    },
    fcmToken:{
        type: String,
    },
    toggleStatus:{
        type: Boolean,
        default:true
    }
}, { timestamps: true });

module.exports = mongoose.model("user", user);
