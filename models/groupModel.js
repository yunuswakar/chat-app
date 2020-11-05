const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const groupSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    groupName: {
      type: String
    },
    userName: {
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
          type: Schema.Types.ObjectId,
          ref: 'user'
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
    groupPic: {
      type: String

    },
    description: {
      type: String,
      default: "Describe Group"
    },
    welcomePost: {
      type: String,
    }
   
  },
  { timestamps: true }
);
groupSchema.plugin(mongoosePaginate);
var group = mongoose.model("group", groupSchema);
module.exports = group;
