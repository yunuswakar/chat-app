const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var visa= new schema({
  
    country:{
        type:String,
        ref:"country"
    },
    visaForms:{
        type:String
    },
    guidelines:{
        type: String
    },
    documentRequired:{
        type: String
    },
    photoSpecification:{
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE","DELETE"],
        default: "ACTIVE"
    },

    
}, { timestamps: true });
visa.plugin(mongoosePaginate)
module.exports = mongoose.model("visa", visa); 