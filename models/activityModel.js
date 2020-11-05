const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const schema = mongoose.Schema;
var activityModel = new schema({

    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    name:{
        type:String
    },
    profilePic:{
        type:String
    },
    time: {
        type: Date,
        default: Date.now()
   },
    activity: {
        type: String
    },
    postId: {
        type: String,
        ref: "post"
    },
    communityId: {
        type: String,
        ref: "communitySchema"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "DELETE"],
        default: "ACTIVE"
    },

}, {
        timestamps: true
    });

activityModel.plugin(mongoosePaginate);
activityModel.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('activity', activityModel);