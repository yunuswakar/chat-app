const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var contentDestination= new schema({
  
    countryId:{
        type:String,
        ref:"country"
    },
    countryName:{
        type: String
    },
    destination:{
        type:String
    },
    insurance:{
        type: String
    },
    insuranceAmount:{
        type:Number,
        default:1000
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE","DELETE"],
        default: "ACTIVE"
    },

    
}, { timestamps: true });
contentDestination.plugin(mongoosePaginate)
module.exports = mongoose.model("contentDestination", contentDestination); 