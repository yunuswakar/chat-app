const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var userReport = new schema(
  {
    userId :{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'userMedia'
    },
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    problemStatement:{
        type : String
    },
    query:{
      type:String
    },
   
    phoneNumber:{
      type:String
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DELETE"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

userReport.plugin(mongoosePaginate);
module.exports = mongoose.model("reportMedia", userReport);
