const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var FAQKey = new schema({

    topic: {
        type: String
    },
    question: {
        type: String
    },
    answer: {
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

FAQKey.plugin(mongoosePaginate);
module.exports = mongoose.model("FAQ", FAQKey)