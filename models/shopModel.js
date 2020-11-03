const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var shop= new schema(
     {
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
         productId:{
              type: schema.Types.ObjectId,
              ref: "product"
         },
          productName: {
               type: String
          },
          categoryName: {
               type: String
          },
          subCategoryName: {
               type: String

          },
          description: {
               type: String
          },
          image: {
               type: String
          },
          sellerName: {
               type: String
          },
          productCost: {
               type: String
          },
          enetrStockQuantity: {
               type: Number
          },
          uploadDate: {
               type: String
          },
          productCost:
          {
               type: Number
          },
          deliveryCharge: {
               type: Number
          },
          size: [
               String
          ],
          productImages: [
               String
          ],
          address: {
               type: String
          },
          wishListUser: [
               schema.Types.ObjectId
          ],
          country: {
               type: String
          },
          state: {
               type: String
          },
          city: {
               type: String
          },
          location: {
               type: String
          },

          status: {
               type: String,
               enum: ["ACTIVE", "BLOCK", "DELETE"],
               default: "ACTIVE"
          },
          sellStatus: {
               type: String,
               enum: ["AVAILABLE", "SOLD", "PENDING", "RETURN"],
               default: "AVAILABLE"
          }
     },
     {
          timestamps: true
     }
);

product.plugin(mongoosePaginate);
module.exports = mongoose.model("shop", shop);


