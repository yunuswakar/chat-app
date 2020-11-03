const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var banner = new schema(
    {
        bannerName: {
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

banner.plugin(mongoosePaginate);
module.exports = mongoose.model("banner", banner);
