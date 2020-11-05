const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var activeInactiveKey = new schema({
    inactiveUser: {
        type: Number
    },
    inactiveRetailer: {
        type: Number
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
    activeInactiveKey.plugin(mongoosePaginate);
module.exports = mongoose.model("active-inactive", activeInactiveKey)