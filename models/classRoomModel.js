const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const classSchema = new Schema(
  {
    userId:{
        type : Schema.Types.ObjectId,
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
    classRoomName: {
      type: String
    },
    userName:{
      type: String
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default : "ACTIVE"
    },
  
    members: [
      {
        memberId :{
            type: Schema.Types.ObjectId,
            ref:'userMedia'
        },
        status: {
          type: String,
          enum: ["ACTIVE", "DELETE", "BLOCK"],
          default : "ACTIVE"
        },
        role: {
          type: String,
          enum: ["CLASSADMIN", "CLASSUSER"],
          default : "CLASSUSER"
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
      default: "Dscribe moto of class"
    },
    welcomePost: {
        type: String,
      }
    // setting : [{

    // }]
  },
  { timestamps: true }
);
classSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("class", classSchema);
