const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var schema = mongoose.Schema;
var credit = new schema({
    retailerId: {
        type: String,
        ref: 'user'
    },
    credit:{
        type:Number
    },
    creditType:{
        type:String
    },
    creditNature:{
        type:String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE","DELETE"],
        default: "ACTIVE"
    }
},
    {
        timestamps: true
    })
credit.plugin(mongoosePaginate);
credit.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("credit", credit)