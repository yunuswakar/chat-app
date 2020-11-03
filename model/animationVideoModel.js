var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema
var animationKey = new schema({

    categoryId: {
        type: schema.Types.ObjectId,
        ref: "animation_category"
    },
    categoryName: {
        type: String
    },
    episodeId: {
        type: schema.Types.ObjectId,
        ref: "animation_episode"
    },
    episodeName: {
        type: String
    },
    videoName: {
        type: String
    },
    video: {
        type: String
    },
    thumbnail:{
        type: String,
        default: "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1577708738/ixuoiwiiuzwwd2ybqygt.jpg"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true })

animationKey.plugin(mongoosePaginate);
module.exports = mongoose.model('animation_video', animationKey);