var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var bannerModel = new Schema({
  title: {
    type: String
  },
  bannerPic: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "DELETE"],
    default: "ACTIVE"
  }

}, { timestamps: true });

bannerModel.plugin(mongoosePaginate)
module.exports = mongoose.model("banners", bannerModel)