const chatSchema = require('../../models/chatingModel')
const markettingModel = require('../../models/markettingChatSchema')
const commonFunction = require("../../helperFunctions/commonFunction");
const user = require("../../models/userModel");
const friendSchema = require('../../models/friendChattingModel')


module.exports = {

     chattingAPI: (req) => {

          var query = { clearStatus: "false" }, response;
          if (req.sellerId && req.userId) {
               query.$and = [{ $or: [{ sellerId: req.sellerId }, { sellerId: req.userId }] }, { $or: [{ userId: req.userId }, { userId: req.sellerId }] }]
          }
         
          return new Promise((resolve, reject) => {
               chatSchema.findOne(query).exec((err, result) => {
                    if (err) {
                         response = ({ responseCode: 500, responseMessage: 'Internal server error', err })
                         resolve(response)
                    }
                    else if (!result) {
                         new chatSchema(req).save((err1, succ) => {
                              if (err1) {
                                   response = ({ responseCode: 500, responseMessage: "Internal server error", err1 })
                                   resolve(response)
                              }
                              else {
                                   response = ({ responseCode: 200, responseMessage: 'Message send successfully', result: succ })
                                   resolve(response)
                              }
                         })
                    }
                    else {
                         if (result.status == "ACTIVE") {
                              chatSchema.findByIdAndUpdate({ "_id": result._id }, { $push: { messages: req.messages[0] } }, { new: true }, (err2, succ1) => {
                                   if (err2) {
                                        response = ({
                                             responseCode: 500,
                                             responseMessage: "Internal server error", err2
                                        })
                                        resolve(response)

                                   }
                                   else if (!succ1) {
                                        response = ({
                                             responseCode: 404,
                                             responceMessage: "Data not found"
                                        })
                                        resolve(response)

                                   }
                                   else {
                                        response = ({ responseCode: 200, responseMessage: 'Message send successfully', result: succ1 })
                                        resolve(response)
                                   }
                              })
                         }
                         else {
                              response = ({ responseCode: 404, responseMessage: 'You cant chat', result: result })
                              resolve(response)
                         }
                    }
               })
          })
     },
    
     chatHistory: (req) => {

          let query = {};

          let response = {}

          console.log("i am here>>>> chat API")

          return new Promise((resolve, reject) => {
               if (req.sellerId && !req.userId) {
                    query.sellerId = req.sellerId
               }
               if (req.userId && !req.sellerId) {
                    query.userId = req.userId
               }
               if (req.userId && req.sellerId) {
                    query.$and = [{ $or: [{ userId: req.userId }, { userId: req.sellerId }] }, { $or: [{ sellerId: req.sellerId }, { sellerId: req.userId }] }]
               }
               if (req.chatId) {
                    query._id = req.chatId
               }
               console.log("query hit>>>>>>>>75", JSON.stringify(query))

               chatSchema.find(query).sort({ "messages.createdAt": -1 }).populate("userId sellerId productId", "userId firstName profilePic").exec((err, result) => {
                    console.log("i am here >>>>>", err, result.length ? result[0].message.length : [])
                    if (err) {
                         response = { responseCode: 500, responseMessage: "Internal server error", err }
                         resolve(response)
                    }
                    else if (result.length == false) {
                         var query2 = {}
                         if (query.sellerId != undefined) {
                              query2._id = query.sellerId
                         }
                         if (query.userId != undefined) {
                              query2._id = query.userId
                         }
                         user.findOne(query2, (userError, userResult) => {
                              console.log("94====>", userError, userResult)
                              if (userError) {
                                   response = { responseCode: 500, responseMessage: "Internal server error" }
                                   resolve(response)
                              }
                              else {
                                   var Data = {
                                        firstName: userResult.firstName,
                                        profilePic: userResult.profilePic
                                   }
                                   response = { responseCode: 200, responseMessage: "Data found successfully.....9", result: Data }
                                   resolve(response)
                              }
                         })
                    }
                    else {
                         response = { responseCode: 200, responseMessage: "Chat lists", result: result }
                         resolve(response)

                    }
               })
          })
     },
     markettingChatAPI: (req) => {
          var query = { clearStatus: "false" }, response;
          if (req.userId && req.sellerId) {
               query.$and = [{ $or: [{ userId: req.userId }, { userId: req.sellerId }] }, { $or: [{ sellerId: req.sellerId }, { sellerId: req.userId }] }]
          }
        
          return new Promise((resolve, reject) => {
               markettingModel.findOne(query).populate("productId", "userId").exec((err, result) => {
                    console.log("110====>", err, result)
                    if (err) {
                         response = ({ responseCode: 500, responseMessage: 'Internal server error3', err })
                         resolve(response)
                    }
                    else if (!result) {
                         new markettingModel(req).save((err1, succ) => {
                              console.log("244===>", err1, succ)
                              if (err1) {
                                   response = ({ responseCode: 500, responseMessage: "Internal server error" })
                                   resolve(response)

                              }
                              else {
                                   response = ({ responseCode: 200, responseMessage: 'Message send successfully', result: succ })
                                   resolve(response)
                              }
                         })
                    }
                    else {
                         if (result.status == "ACTIVE") {

                              markettingModel.findByIdAndUpdate({ "_id": result._id }, { $push: { messages: req.messages[0] } }, { new: true }, (err2, succ1) => {
                                   console.log("264======>", err2, succ1)
                                   if (err2) {
                                        response = ({
                                             responseCode: 500,
                                             responseMessage: "Internal server error", err2
                                        })
                                        resolve(response)

                                   }
                                   else if (!succ1) {
                                        response = ({
                                             responseCode: 404,
                                             responceMessage: "Data not found"
                                        })
                                        resolve(response)

                                   }
                                   else {
                                        response = ({ responseCode: 200, responseMessage: 'Message send successfully', result: succ1 })
                                        resolve(response)
                                   }
                              })
                         }
                         else {
                              response = ({ responseCode: 404, responseMessage: 'You cant chat', result: result })
                              resolve(response)
                         }
                    }
               })
          })
     },
     markettingChatHistory: (req) => {
          let query = {};
          let response = {}
          console.log("i am here>>>> chat APImarkettingChatHistory", req.body)
          return new Promise((resolve, reject) => {
               if (req.sellerId && !req.userId) {
                    query.sellerId = req.sellerId
               }
               if (req.userId && !req.sellerId) {
                    query.userId = req.userId
               }
               if (req.userId && req.sellerId) {
                    query.$and = [{ $or: [{ userId: req.userId }, { userId: req.sellerId }] }, { $or: [{ sellerId: req.sellerId }, { sellerId: req.userId }] }]
               }
               if (req.chatId) {
                    query._id = req.chatId
               }
               markettingModel.find(query).sort({ "messages.createdAt": -1 }).populate("userId sellerId productId", "userId firstName profilePic").exec((err, result) => {
                    if (err) {
                         response = { responseCode: 500, responseMessage: "Internal server error", err }
                         resolve(response)
                    }
                    else if (result.length == false) {
                         var query2 = {}
                         if (query.sellerId != undefined) {
                              query2._id = query.sellerId
                         }
                         if (query.userId != undefined) {
                              query2._id = query.userId
                         }
                         user.findOne(query2, (userError, userResult) => {
                              if (userError) {
                                   response = { responseCode: 500, responseMessage: "Internal server error" }
                                   resolve(response)
                              }
                              else {
                                   var Data = {
                                        firstName: userResult.firstName,
                                        profilePic: userResult.profilePic
                                   }
                                   response = { responseCode: 200, responseMessage: "Data found successfully", result: Data }
                                   resolve(response)
                              }
                         })
                    }
                    else {
                         response = { responseCode: 200, responseMessage: "Chat list", result: result }
                         resolve(response)

                    }
               })
          })
     },

     uploadImage: (req, res) => {
          try {
               if (!req.body.image) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })

               } else {
                    commonFunction.uploadImg(
                         req.body.image,
                         
                         (error, result) => {
                              if (error) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                              } else {
                                   return res.send({ responseCode: 200, responseMessage: "Image upload successfully", result })
                              }
                         }
                    );
               }
          } catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     updateStatus: (req, res) => {
          markettingModel.findOne({ userId: req.body.userId, sellerId: req.body.sellerId }, (chatError, chatUpdate) => {
               if (chatError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
               }
               else if (!chatUpdate) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    markettingModel.findOneAndUpdate({ userId: chatUpdate.userId, sellerId: chatUpdate.sellerId }, { $set: { status: req.body.status } }, { new: true }, (updateError, UpdateResult) => {
                         if (updateError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         }
                         else {
                              return res.send({ responseCode: 200, responseMessage: "Status changed successfully", UpdateResult })
                         }
                    })
               }
          })
     },
     updateBiddingChatStatus: (req, res) => {
          chatSchema.findOne({ userId: req.body.userId, sellerId: req.body.sellerId }, (chatError, chatUpdate) => {
               if (chatError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
               }
               else if (!chatUpdate) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    chatSchema.findOneAndUpdate({ userId: chatUpdate.userId, sellerId: chatUpdate.sellerId }, { $set: { status: req.body.status } }, { new: true }, (updateError, UpdateResult) => {
                         if (updateError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         }
                         else {
                              return res.send({ responseCode: 200, responseMessage: "Status changed successfully", UpdateResult })
                         }
                    })
               }
          })
     },
     clearChat: (req, res) => {
          var query = {
               $and: [
                    {
                         $or: [
                              { userId: req.body.userId },

                              { sellerId: req.body.sellerId }
                         ]
                    },
                    { _id: req.body.chatId }
               ]
          };
          markettingModel.findOne(query, (chatError, chatUpdate) => {
               if (chatError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", chatError })
               }
               else if (!chatUpdate) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    markettingModel.findOneAndUpdate(chatUpdate.query, { $set: { "clearStatus": req.body.clearStatus } }, { new: true }, (updateError, UpdateResult) => {
                       
                         if (updateError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error", updateError })
                         }
                         else {
                              return res.send({ responseCode: 200, responseMessage: "Message cleared successfully", UpdateResult })
                         }
                    })
               }
          })
     },
    
     bidderClearChat: (req, res) => {
          var query = {
               $and: [
                    {
                         $or: [
                              { bidderId: req.body.bidderId },

                              { sellerId: req.body.sellerId }
                         ]
                    },
                    { _id: req.body.chatId }
               ]
          };
          chatSchema.findOne(query, (chatError, chatUpdate) => {
               if (chatError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", chatError })
               }
               else if (!chatUpdate) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    chatSchema.findOneAndUpdate(chatUpdate.query, { $set: { "clearStatus": req.body.clearStatus } }, { new: true }, (updateError, UpdateResult) => {
                      
                         if (updateError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error", updateError })
                         }
                         else {
                              return res.send({ responseCode: 200, responseMessage: "Message cleared successfully", UpdateResult })
                         }
                    })
               }
          })
     },


     //********************************************************************************************************/
     //*****************************************Friend to Friend chatting*************************************/
     friendChatting: (req) => {

          var query = { clearStatus: "false" }, response;
          if (req.senderId && req.receiverId) {
               query.$and = [{ $or: [{ senderId: req.senderId }, { senderId: req.receiverId }] }, { $or: [{ receiverId: req.receiverId }, { receiverId: req.senderId }] }]
          }
         
          return new Promise((resolve, reject) => {
               friendSchema.findOne(query).exec((err, result) => {
                    console.log("387===========>",err,result)
                    if (err) {
                         response = ({ responseCode: 500, responseMessage: 'Internal server error', err })
                         resolve(response)
                    }
                    else if (!result) {
                         user.findOne({ _id:req.senderId }, (userErr, userResutl) => {
                            
                              if (userErr) {
                                   response = ({
                                        responseCode: 500,
                                        responseMessage: "Internal server error", userErr
                                   })
                                   resolve(response)

                              }
                              else if (!userResutl) {
                                   response = ({
                                        responseCode: 404,
                                        responceMessage: "Data not found"
                                   })
                                   resolve(response)
                              }
                              else {
                                   userResutl.friendList.forEach(a => {
                                        if (a.friendId == req.receiverId ) {
                                             new friendSchema(req).save((err1, succ) => {
                                                  if (err1) {
                                                       console.log("Internal server error", err1)
                                                  }
                                                  else {
                                                       response = ({ responseCode: 200, responseMessage: 'Message send successfully', result: succ })
                                                       resolve(response)
                                                  }
                                             })
                                        }
                                        else {
                                             response = ({ responseCode:404, responseMessage: 'Sorry you cant sent message'})
                                             resolve(response)
                                        }
                                   })
                              }
                         })
                    }
                    else {
                         if (result.status == "ACTIVE") {
                              friendSchema.findOneAndUpdate({ "_id": result._id }, { $push: { messages: req.messages[0] } }, { new: true }, (err2, succ1) => {
                                   if (err2) {
                                        response = ({
                                             responseCode: 500,
                                             responseMessage: "Internal server error", err2
                                        })
                                        resolve(response)

                                   }
                                   else if (!succ1) {
                                        response = ({
                                             responseCode: 404,
                                             responceMessage: "Data not found"
                                        })
                                        resolve(response)

                                   }
                                   else {
                                        response = ({ responseCode: 200, responseMessage: 'Message send successfully', result: succ1 })
                                        resolve(response)
                                   }
                              })
                         }
                         else {
                              response = ({ responseCode: 404, responseMessage: 'You cant chat', result: result })
                              resolve(response)
                         }
                    }
               })
          })  
     },
     friendChattingHistory: (req) => {
          let query = {};
          let response = {}

          return new Promise((resolve, reject) => {
               if (req.senderId && !req.receiverId) {
                    query.senderId = req.senderId
               }
               if (req.receiverId && !req.senderId) {
                    query.receiverId = req.receiverId
               }
               if (req.receiverId && req.senderId) {
                    query.$and = [{ $or: [{ receiverId: req.receiverId }, { receiverId: req.senderId }] }, { $or: [{ senderId: req.senderId }, { senderId: req.receiverId }] }]
               }
               if (req.chatId) {
                    query._id = req.chatId
               }
               console.log("query hit>>>>>>>>75", JSON.stringify(query))

               friendSchema.find(query).sort({ "message.createdAt": -1 }).populate("senderId receiverId", "firstName profilePic").exec((err, result) => {
                    if (err) {
                         response = { responseCode: 500, responseMessage: "Internal server error", err }
                         resolve(response)
                    }
                    else if (result.length == false) {
                         var query2 = {}
                         if (query.senderId != undefined) {
                              query2._id = query.senderId
                         }
                         if (query.receiverId != undefined) {
                              query2._id = query.receiverId
                         }
                         user.findOne(query2, (userError, userResult) => {
                              console.log("94====>", userError, userResult)
                              if (userError) {
                                   response = { responseCode: 500, responseMessage: "Internal server error" }
                                   resolve(response)
                              }
                              else {
                                   var Data = {
                                        firstName: userResult.firstName,
                                        profilePic: userResult.profilePic
                                   }
                                   response = { responseCode: 200, responseMessage: "Data found successfully.....9", result: Data }
                                   resolve(response)
                              }
                         })
                    }
                    else {
                         response = { responseCode: 200, responseMessage: "Chat lists", result: result }
                         resolve(response)

                    }
               })
          })
     },
     clearChatForFriend: (req, res) => {
          var query = {
               $and: [
                    {
                         $or: [
                              { senderId: req.body.senderId },

                              { receiverId: req.body.receiverId }
                         ]
                    },
                    { _id: req.body.chatId }
               ]
          };
          friendSchema.findOne(query, (chatError, chatUpdate) => {
               if (chatError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", chatError })
               }
               else if (!chatUpdate) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    friendSchema.findOneAndUpdate(chatUpdate.query, { $set: { "clearStatus": req.body.clearStatus } }, { new: true }, (updateError, UpdateResult) => {
                        
                         if (updateError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error", updateError })
                         }
                         else {
                              return res.send({ responseCode: 200, responseMessage: "Message cleared successfully", UpdateResult })
                         }
                    })
               }
          })
     },
     //**************************************end friend to friend chatting*************************************/
}


