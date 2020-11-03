const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const newsSchema = new Schema(
  {
    addedBy:{
          type:String,
          default:"ADMIN"
      },
   newsPic:[
     {
       image:{
       type: String,
       }
     }
   ],
   title:{
       type:String
   },
   description:{
       type:String
   },
   date:{
       type:Number
   },
   status:{
       type:String,
       enum:["ACTIVE","DELETE"],
       default:"ACTIVE"
    }
  },
  { timestamps: true }
);
newsSchema.plugin(mongoosePaginate);
var news = mongoose.model("news", newsSchema);
module.exports = news;
