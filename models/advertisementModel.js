const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var advertisement = new schema(
     {
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          clickBy:[
               String
          ],
          title: {
               type: String
          },
          description: {
               type: String
          },
          image: [String],
          text:{
               type: String
          },
         video:[String],
          date: {
               type: String
          },
          time: {
               type: String
          },
          location: {
               type: String
          },
          expiryDate:{
               type: Date

          },
          userName:{
               type: String
          },
          sharedBy: [{
               memberId: {
                    type: String
               },
               sharedTo: [{
                    friendId: {
                         type: String
                    }
               }]
          }],
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

          viewers: [String],
         
          likes: [{
               likedId: {
                    type: schema.Types.ObjectId
               },
               userName: {
                    type: String
               },
               userPic: {
                    type: String
               }
          }],
          replyComments: [{
               commentedUser: {
                    type: schema.Types.ObjectId,
                    ref: "userMedia"
               },
               userName: {
                    type: String
               },
               commentId: {
                    type: String
               },
               userPic: {
                    type: String
               },
               comment: {
                    type: String
               },
               commentedTime: {
                    type: String
               }
          }],
          comments: [{
               commentedUser: {
                    type: schema.Types.ObjectId,
                    ref: "userMedia"
               },
               userName: {
                    type: String
               },
               userPic: {
                    type: String
               },
               comment: {
                    type: String
               },
               commentedTime: {
                    type: String
               },
                 commentId: {
                    type: String
               },
          }],
         
          status: {
               type: String,
               enum: ["ACTIVE", "DELETE", "ARCHIVE", "HIDE"],
               default: "ACTIVE"
          },
          price: {
               type: Number
          },
     },
     {
          timestamps: true
     }
);

advertisement.plugin(mongoosePaginate);
module.exports = mongoose.model("advertisement", advertisement);
