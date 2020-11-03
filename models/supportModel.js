const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var supportModel = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    selectPurpose: {
        type: String,
    },
    title: {
        type: String,
    },
    message: {
        type: String,
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

supportModel.plugin(mongoosePaginate);
module.exports = mongoose.model("support", supportModel)