const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var countries = new schema(
     {
         country:{
               type: String,
         },
         states:[],
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

countries.plugin(mongoosePaginate);
module.exports = mongoose.model("countries", countries);