const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var notification = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "users"
        },
        buddyId: {
            type: schema.Types.ObjectId,
            ref: 'buddies'
        },
        notifications: {
            type: String
        },
        title: {
            type: String
        },
        body: {
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

notification.plugin(mongoosePaginate);
module.exports = mongoose.model("notification", notification);