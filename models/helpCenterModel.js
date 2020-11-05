const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var helpCenterKey = new schema({

    name: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    email: {
        type: String
    },
    subject : {
        type: String
    },
    description : {
        type: String
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

helpCenterKey.plugin(mongoosePaginate);
module.exports = mongoose.model("helpCenter", helpCenterKey)