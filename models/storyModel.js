const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var storyModel = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "user"
        },
        userName:{
            type:String
        },
        userPic:{
            type:String
        },
        text:{
            type:String
        },
        timeLine :[],
        categoryId: {
            type: schema.Types.ObjectId,
            ref: "categoryModel"
    
        },
        categoryName: {
            type: String
        },
        image:[],
        video:[],

        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        storyPrivacy:{
            type:String,
            enum:['PUBLIC','PRIVATE'],
            default:"PUBLIC"
        }

    },
    {
        timestamps: true
    }
);

storyModel.plugin(mongoosePaginate);
module.exports = mongoose.model("story", storyModel);