const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var transferManagement= new schema({
    countryId:{
        type:String
    },
    destinationId:{
        type:String,
        ref:"country"
    },
    transferCategoryId:[],
    transferTypeId:[],
    carTypeId:[],
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE","DELETE"],
        default: "ACTIVE"
    },
}, { timestamps: true });
transferManagement.plugin(mongoosePaginate)
module.exports = mongoose.model("transferManagement", transferManagement);