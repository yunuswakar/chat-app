


const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");


const addedCrystal = new schema({
    crystalName: {
        type: String,
        default:""
    },
    identification: {
        type: Boolean   //true=
    },
    noIdReason:{
    type:String,
    enum:["NoMatch","NoConnection","disagree","NoAPI"]
    },
    name: {
        type: String,
        default: ""
    },
    image1:{
        type: String,
        default: ""
    },
    image2:{
        type: String,
        default: ""
    },
    image3:{
        type: String,
        default: ""
    },
    finish: {
        type: String,
        default: ""
    },
    crystalId: {
        type:mongoose.Types.ObjectId,
        ref: "crystalLibrary",
        default:null
    },
    added_by: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    collections: {
        type: Boolean,
        default: false
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    isNote: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default:""
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("addedCrystal", addedCrystal);