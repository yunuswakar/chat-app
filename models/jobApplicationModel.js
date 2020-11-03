const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const jobApplication = new Schema({
    applicantId:{
        type:Schema.Types.ObjectId,
        ref: "userMedia"
    },
    jobId:{
        type:Schema.Types.ObjectId,
        ref:'jobs'
    },
    profilePic:{
        type: String,
    },
    applicantName:{
        type:String
    },
    name:String,
    mobile:String,
    email:String,
    gender:{
        type:String,
        enum:["MALE","FEMALE","OTHERS"]
    },
    country:String,
    countryCode:String,
    phoneNumber:String,
    state:String,
    city:String,
    zipCode:String,
    resume:[
        
    ],
    applicantStatus:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    appliedJobStatus:{
        type:String,
        enum:["PENDING","ACCEPTED","REJECTED"],
        default:"PENDING"
    }
},
{timestamps:true}) 

jobApplication.plugin(mongoosePaginate);
module.exports = mongoose.model("jobApplications", jobApplication);