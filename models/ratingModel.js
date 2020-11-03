const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var ratingModel = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    rating: {
        type:Number,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
},
    {
        timestamps: true
    })

    ratingModel.plugin(mongoosePaginate);
module.exports = mongoose.model("rating", ratingModel)