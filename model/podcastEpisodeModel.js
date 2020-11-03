const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var podcastEpisode = new schema(
    {
        categoryId: {
            type: schema.Types.ObjectId,
            ref: "podcastCategory"
        },
        categoryName: {
            type: String
        },
        image: {
            type: String
        },
        episodeName: {
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

podcastEpisode.plugin(mongoosePaginate);
module.exports = mongoose.model("podcastEpisode", podcastEpisode);
