const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var contactUs= new schema({
  
    name:{
        type:String
    },
    email:{
        type: String
    },
    countryId:{
        type:String,
        ref:"country"
    },
    countryName:{
        type: String
    },
    message:{
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK","DELETE"],
        default: "ACTIVE"
    },

    
}, { timestamps: true });
contactUs.plugin(mongoosePaginate)
module.exports = mongoose.model("contactUs", contactUs); 