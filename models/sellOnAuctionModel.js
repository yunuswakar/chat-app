
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var auctionCategory = new schema(
     {
          categoryId: {
               type: schema.Types.ObjectId,
               ref: "auction"
          },
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          subCategoryId: {
               type: schema.Types.ObjectId,
               ref: "auction"
          },

          startTime: {
               type: Number
               
          },
          endTime: {
               type: Number
          },
          productImages: [
               {
                    image: {
                         type: String,
                    }
               }
          ],
          auctionSubCategoryName: {
               type: String
          },
          auctionCategoryName: {
               type: String
          },
          location: {
               type: String
          },
          cardDetails: [{
               firstName: String,
               lastName: String,
               email: String,
               phoneNumber: String,
               countryCode: String,
               mobile: String,
               bankName: String,
               cardNumber: String,
               expiryDate: String,
               cvvNumber: String,
               country: String,
               address: String,
               city: String,
               state: String,
               zipCode: String,
               expMonth: String,
               expYear: String,
               stripAccountId: String,
               cvvNumber: String
          }],
          auctionProductName: {
               type: String
          },
          start:{
               type: Date

          },
          auctionProductDescription: {
               type: String
          },
          productInitialCost: {
               type: Number
          },
          country: {
               type: String
          },
          city: {
               type: String
          },
          state: {
               type: String
          },
          image: {
               type: String
          },

          categoryType: {
               type: String,
               enum: ["CATEGORY", "SUBCATEGORY"]
          },

          docStatus: {
               type: String,
               enum: ["ACTIVE", "BLOCK", "DELETE"],
               default: "ACTIVE"
          },

          status: {
               type: String,
               enum: ["Pending", "Completed", "Cancel"],
               default: "Pending"
          },
          startTime: {
               type: Date
          },
          endTime: {
               type: Date
          },
          sellerName:{
               type: String
          },
     },
     {
          timestamps: true
     }
);

auctionCategory.plugin(mongoosePaginate);
module.exports = mongoose.model("sellOnAuction", auctionCategory);
// module.exports = category;
