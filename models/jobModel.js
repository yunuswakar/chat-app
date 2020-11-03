const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const aggregatePaginate = require("mongoose-aggregate-paginate")

var job = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "userMedia"
        },
        jobApplicationsId: {
            type: Schema.Types.ObjectId,
            ref: "jobApplications"
        },
        
        userName: {
            type: String
        },
        title: {
            type: String
        },
        addDetails: {
            type: String
        },
        totalVacancy: {
            type: String
        },
        industryType: {
            type: String
        },
        country: {
            type: String
        },
        jobStatus: {
            type: String,
            enum: ["ACTIVE", "DELETE","HIDE","ARCHIVE"],
            default: "ACTIVE"
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        pinCode: {
            type: String
        },
        jobPic: {
            type: String
        },
        jobType: {
            type: String,
            enum: ["FULLTIME", "PARTTIME"]
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        company: {
            type: String
        },
        roleExperience: {
            type: String
        },
        expiryDate:{
            type: Date
        },
        languages: {
            type: String
        },
        userName:{
            type: String
        },
        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHERS"]
        },
        address: {
            type: String
        },
        photoId: {
            type: String
        },
        applicants: [{
            type: Schema.Types.ObjectId,
            ref: "userMedia"
        }]
    },
    { timestamps: true }
)
job.plugin(aggregatePaginate)
job.plugin(mongoosePaginate);
module.exports = mongoose.model("jobs", job);