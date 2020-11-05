const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var reportModel = new schema(
    {
        reportedBy: {
            type: schema.Types.ObjectId,
            ref: "user"
        },
        reportedById: {
            type: schema.Types.ObjectId,
            ref: "user"
        },

        postId: {
            type: schema.Types.ObjectId,
            ref: "post"
        },

        reportReason: {
            type: String

        },
        reportType:{
            type: String
        },
        reportImage: {
            type: String
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

reportModel.plugin(mongoosePaginate);
module.exports = mongoose.model("reportModel", reportModel);