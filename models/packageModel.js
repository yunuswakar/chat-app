const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const packageModel = new schema({
    countryId: {
        type: String,
        ref: "country"
    },
    country: {
        type: String
    },
    packagePicture:{
        type:String
    },
    destinationId: {
        type: String,
        ref: "contentDestination"
    },
    destination:{
        type:String
    },
    packageTypeId: {
        type: String,
        ref: "packageType"
    },
    packageTypeName:{
        type:String
    },
    packageName: {
        type: String
    },
    packageDays: {
        type: String
    },
    packageNights: {
        type: String
    },
    packageDescription: {
        type: String
    },
    itinery: [{
        arrive: {
            type: String
        },
        meal: {
            type: String
        },
        description: {
            type: String
        }
    }],
    packageInclusion: [String],
    exclusions: [String],
    termsAndConditions: [String],
    packageCost:[{
        hotelCategory:{
            type:String
        },
        hotelName:{
            type:String
        },
        pricePerAdult:{
            type:Number
        }
    }],
    cancellationCharge: [String],
    flightsIncluded: {
        type: String,
        enum: ["YES", "NO"]
    },
    description: {
        type: String
    },
    // packageInclusion: { 
    //     type: String 
    // },
    // exclusions: { 
    //     type: String 
    // },
    hotelsIncluded: {
        type: String,
        enum: ["YES", "NO"]
    },
    transferIncluded: {
        type: String,
        enum: ["YES", "NO"]
    },
    transferCategoryId: [{
        type: String,
        ref: "transferCategory"
    }],
    transferTypeId: [{
        type: String,
        ref: "transferType"
    }],
    carTypeId: [{
        type: String,
        ref: "carType"
    }],
    sightseeingIncluded: {
        type: String,
        enum: ["YES", "NO"]
    },
    ownerName: {
        type: String
    },
    ownerContact: {
        type: String
    },
    pricePerNight: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    paymentStatus: {
        type: String,
        enum: ["PAID", "UNPAID", "FAILED"],
        default: "UNPAID"
    }
}, { timestamps: true })
packageModel.plugin(mongoosePaginate)
module.exports = mongoose.model("packageModel", packageModel)