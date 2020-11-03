const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var bidding = new schema(
     {
          auctionId: {
               type: schema.Types.ObjectId,
               ref:"sellOnAuction"

          },
          bidderId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          bidderName:{
           type:String
          },
          profilePic:{
               type: String
          },
          wishlistType: {
               type: String,
               enum: ["liked", "disliked"],

          },
          productInitialCost:{
               type: Number
          },
          startTime: {
               type: Number

          },
          email:{
               type: String

          },
          endTime: {
               type: Number
          },
          auctionCategoryName: {
               type: String
          },
          auctionSubCategoryName: {
               type: String
          },
          enterBidding: {
               type: Number
          },
          userId:{
               type: String

          },
          docStatus: {
               type: String,
               enum: ["ACTIVE", "BLOCK", "DELETE"],
               default: "ACTIVE"
          },
          status: {
               type: String,
               enum: ["Approved", "Pending","Cancel"],
               default:"Pending"
          },
          
          location: {
               type: String
          },
          country:{
               type: String
          },
          state:{
               type: String
          },
          city:{
               type: String
          },
          auctionProductName: {
               type: String
          },
          images: [
               {
                    image: {
                         type: String,
                    }
               }
          ],
        
          description: {
               type: String
          },

     },
     {
          timestamps: true
     }
);
bidding.plugin(mongoosePaginate);
module.exports = mongoose.model("bidding", bidding);
// module.exports = category;
