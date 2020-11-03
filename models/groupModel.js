const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const groupSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userMedia"
    },
    category: [{
      categoryName: {
        type: String,
      },
      categoryImage: {
        type: String,
        default:"assets/imgs/grouppic.png"
      }
    }],
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
          ref: 'userMedia'
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
    privacy: {
      type: String,
      enum: ["PUBLIC", "CLOSED", "SECRET"],
      default: "PUBLIC"
    },
    coverPic: {
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
