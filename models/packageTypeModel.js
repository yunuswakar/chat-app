const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var packageTypeModel= new schema({
  
    type:{
        type:String
    },
    countryId:{
        type:String,
        ref:"country"
    },
    countryName:{
        type:String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE","DELETE"],
        default: "ACTIVE"
    },

    
}, { timestamps: true });
packageTypeModel.plugin(mongoosePaginate)
module.exports = mongoose.model("packageType", packageTypeModel); 