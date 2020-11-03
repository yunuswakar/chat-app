const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var podcastCategory = new schema(
     {
         
          categoryName: {
               type: String
          },
          image: {
               type: String
          },
       
          status: {
               type: String,
               enum: ["ACTIVE", "DELETE", "BLOCK"],
               default: "ACTIVE"
          }
     },
     {
          timestamps: true
     }
);

podcastCategory.plugin(mongoosePaginate);
module.exports = mongoose.model("podcastCategory", podcastCategory);
// module.exports = category;