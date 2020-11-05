const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var goalModel = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "user"
        },
        goalName: {
            type: String
        },
        aboutGoal: {
            type: String
        },
        tag:[],
        startDate: {
            type: String
        },
        goalCategory:{
            type:String
        },
        endDate: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        // storyPrivacy:{
        //     type:String,
        //     enum:['Private','Public','ContactsVisibleTo'],
        //     default:"PUBLIC"
        // }

    },
    {
        timestamps: true
    }
);

goalModel.plugin(mongoosePaginate);
module.exports = mongoose.model("goal", goalModel);