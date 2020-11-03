const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var faq = new schema(
    {
        title: {
            type: String
        },
        description: {
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

faq.plugin(mongoosePaginate);
module.exports = mongoose.model("faq", faq);