const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const schema = mongoose.Schema;
var rewardModel = new schema({

    referralOwnerId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    rewardPoint:{
        type:Number
    },
    title:{
        type:String
    },
    body:{
        type:String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "DELETE"],
        default: "ACTIVE"
    },

}, {
        timestamps: true
    });

rewardModel.plugin(mongoosePaginate);
rewardModel.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('reward', rewardModel);