const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');


let kycModel = new schema({
    VoterID_Name: {
        type: String
    },
    VoterID_Number: {
        type: String
    },
    passport_Name: {
        type: String
    },
    passport_Number: {
        type: String
    },
    panCard_Name: {
        type: String
    },
    panCard_Number: {
        type: String
    },
    DrivingLicence_Name: {
        type: String
    },
    DrivingLicence_Number: {
        type: String
    },
    customer_Id :{
      type:String
    },
    name: {
        type: String
    },

    emailId: {
        type: String
    },   
    uploadDate: {
        type: Number,
        default: Date.now()
    },
    updateDate: {
        type: Number,
        default: Date.now()
    },
    userId: {
        type: String
    },   
    customer_mobileNumber:{
        type:String
       },

    kycStatus: {
        type: String,
        enum: ["approved", "requested"],
        default:"requested"
    },
    approvedDate: {
        type: String
    },
   status: {
        type: String,
        enum: ["ACTIVE", "DELETE"],
        default: "ACTIVE"
    },

}, { timestamps: true })
kycModel.plugin(mongoosePaginate);
kycModel.plugin(mongooseAggregatePaginate);

var kyc = mongoose.model('kyc', kycModel);
module.exports = kyc   