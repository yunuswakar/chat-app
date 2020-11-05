const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var categoryModel = new schema(
    {
        categoryName: {
            type: String,
        },
        addedOn: {
            type: String,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        publishStatus:{
            type: String,
            enum: ["true", "false"],
            default: "false"
        }
    },
    {
        timestamps: true
    }
);

categoryModel.plugin(mongoosePaginate);
module.exports = mongoose.model("categoryModel", categoryModel);