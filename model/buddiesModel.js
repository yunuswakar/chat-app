const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var buddies = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "users"
        },
        buddies: [{
            name: {
                type: String
            },
            mobileNumber: {
                type: String
            },
            image: {
                type: String,
                default:null
            },
            relationshipType:{
                type: Number,
                enum:[1,2,3,4,5,6,7,8]
            },
            priorityType:{
                type: Number,
                enum:[1,2,3]
            },
            isBuddy:{
                type: Boolean,
                default: false
            }
        }],
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

buddies.plugin(mongoosePaginate);
module.exports = mongoose.model("buddies", buddies);