const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var category = new schema(
  {
    categoryId: {
      type: schema.Types.ObjectId,
      ref: "category"
    },
    subCategoryName: {
      type: String
    },
    categoryName: {
      type: String
    },
    image: {
      type: String
    },
    categoryType: {
      type: String,
      enum:["CATEGORY","SUBCATEGORY"],
      default:"CATEGORY"

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

category.plugin(mongoosePaginate);
module.exports = mongoose.model("category", category);
// module.exports = category;
