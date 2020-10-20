const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const groupSchema = new Schema(
  {
    userId: {
     type:String
    },
    groupName: {
      type: String
    },
  
    status: {
      type: String,
      enum: ["ACTIVE","BLOCK", "DELETE"],
      default: "ACTIVE"
    },
    members: [
      {
        memberId: {
            type: String
        },
        status: {
          type: String,
          enum: ["ACTIVE", "DELETE", "BLOCK"],
          default: "ACTIVE"
        },
        role: {
          type: String,
          enum: ["GROUPADMIN", "GROUPUSER"],
          default: "GROUPUSER"
        }
      }
    ],
  },
  { timestamps: true }
);
groupSchema.plugin(mongoosePaginate);
var group = mongoose.model("group", groupSchema);
module.exports = group;