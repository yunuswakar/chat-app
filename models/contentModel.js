const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var contentModel = new schema(
    {
        title: {
            type: String,
        },
        categoryName: {
            type: String,
       },
        content:{
            type: String
        },
        postedBy: {
            type:String
           
        },
        contentImage: {
            type:String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        
    },
    {
        timestamps: true
    }
);

contentModel.plugin(mongoosePaginate);
module.exports = mongoose.model("contentModel", contentModel);