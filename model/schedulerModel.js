const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var scheduler = new schema(
    {
        userId:{
            type: schema.Types.ObjectId,
            ref: "users"
        },
        eventName: {
            type: String
        },
        date: {
            type: String
        },
        time: {
            type: String
        },
        setTime: {
            type: String
        },
        note:{
            type: String
        },
        isRecurring:{
            type: Boolean,
            default: false
        },
        isImportant:{
            type: Boolean,
            default: false
        },
        isCompleted:{
            type: Boolean,
            default: false
        },
        eventType: {
            type: String,
            enum:["Mindfulness Meditation", "Bedtime", "Mood Track", "Medication", "Supplements", "Class", "Exercise", "Others"]
        },
        scheduleStatus:{
            type: String,
            enum:["PENDING","IMPORTANT","COMPLETED"],
            default:"PENDING",
            uppercase: true
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

scheduler.plugin(mongoosePaginate);
module.exports = mongoose.model("scheduler", scheduler);