const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var sticker = new schema(
    {
        stickerName: {
            type: String
        },
        image: {
            type: String
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

sticker.plugin(mongoosePaginate);
module.exports = mongoose.model("sticker", sticker);