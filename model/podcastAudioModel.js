const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var podcastAudio = new schema(
    {
        categoryId: {
            type: schema.Types.ObjectId,
            ref: "podcastCategory"
        },
        episodeId: {
            type: schema.Types.ObjectId,
            ref: "podcastEpisode"
        },
        categoryName: {
            type: String
        },
        audio: {
            type: String
        },
        audioName: {
            type: String
        },
        episodeName: {
            type: String
        },
        thumbnail:{
            type: String,
            default:null
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

podcastAudio.plugin(mongoosePaginate);
module.exports = mongoose.model("podcastAudio", podcastAudio);
