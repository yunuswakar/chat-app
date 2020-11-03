var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var schema = mongoose.Schema
var mentalHealth = new schema({

    categoryId: {
        type: schema.Types.ObjectId,
        ref: "mentalHealthCategory"
    },
    categoryName:{
        type: String
    },
    subjectName: {
        type: String
    },
    description: {
        type: String
    },
    favourites:[{ 
        type: String,
        ref: "users"
    }],
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true })

mentalHealth.plugin(mongoosePaginate);
mentalHealth.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('mentalHealth', mentalHealth);