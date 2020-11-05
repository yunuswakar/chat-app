const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var eventModel = new schema(
    {
        eventName: {
            type: String,
        },
        categoryId: {
            type: schema.Types.ObjectId,
            ref: "categoryModel"
        },
        userId: {
            type: schema.Types.ObjectId,
            ref: "user"
        },
        eventType: {
            type: String,
            enum: ["Private", "Public"]
        },
        eventDescription: {
            type: String,
        },
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
        dateOfEvent: {
            type: String,
        },
        venue:{
            type: String,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
    },
    {
        timestamps: true
    }
);

eventModel.plugin(mongoosePaginate);
module.exports = mongoose.model("eventModel", eventModel);