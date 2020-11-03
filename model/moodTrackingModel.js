const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var moodTracking = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "users"
        },
        moodTrack: [{
            mood: {
                type: String,
                enum:["AWESOME","HAPPY","POSITIVE","RELAXED","OK","ANXIOUS","STRESSED","SAD","AWFUL"]
            },
            time: {
                type: String
            },
            note: {
                type: String
            }
        }],
        date: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

moodTracking.plugin(mongoosePaginate);
module.exports = mongoose.model("moodTracking", moodTracking);