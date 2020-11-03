var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var countryModel = new Schema({

  country: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "DELETE"],
    default: "ACTIVE"
  }

}, { timestamps: true });

countryModel.plugin(mongoosePaginate)
module.exports = mongoose.model("country", countryModel)