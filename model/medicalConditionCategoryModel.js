var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema=mongoose.Schema
var medicalCondition= new schema({

    categoryName:{
        type:String
    },
    image:{
        type:String
    },
    status:{
        type:String,
        enum:["ACTIVE", "BLOCK", "DELETE"],
        default:"ACTIVE"
    },


}, { timestamps: true })

medicalCondition.plugin(mongoosePaginate);
module.exports = mongoose.model('medicalConditionCategory', medicalCondition);