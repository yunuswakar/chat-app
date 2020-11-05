const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var activityModel = new schema({
    userId: {
        type: String
    },
    activity: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
},
    {
        timestamps: true
    })
    activityModel.plugin(mongoosePaginate);
module.exports = mongoose.model("activityModel", activityModel)