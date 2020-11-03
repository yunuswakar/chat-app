
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var auctionCategory = new schema(
  {
    categoryId: {
      type: schema.Types.ObjectId,
      ref: "auction"
    },

    subCategoryId: {
      type: schema.Types.ObjectId,
      ref: "auction"
    },
    auctionSubCategoryName: {
      type: String
    },
    auctionCategoryName: {
      type: String
    },
    auctionProductName: {
      type: String
    },
    auctionProductDescription:{
      type: String
    },
    image: {
      type: String
    },
    categoryType: {
      type: String,
      enum: ["CATEGORY", "SUBCATEGORY"],
      default:"CATEGORY"
    },
    location:{
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

auctionCategory.plugin(mongoosePaginate);
module.exports = mongoose.model("auction", auctionCategory);
// module.exports = category;
