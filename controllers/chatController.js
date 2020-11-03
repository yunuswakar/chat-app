const chatSchema = require('../models/chatModel')
const user = require("../models/userModel");


module.exports = {

     chattingAPI: (req) => {
          var query = {clearStatus:"false"}, response;
          if (req.adminId && req.customerId) {
               query.$and = [{ $or: [{ adminId: req.adminId }, { adminId: req.customerId }] }, { $or: [{ customerId: req.customerId }, { userId: req.adminId }] }]
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
                              chatSchema.findByIdAndUpdate({ "_id": result._id }, { $push: { message: req.message[0] } }, { new: true }, (err2, succ1) => {
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
               if (req.adminId && !req.customerId) {
                    query.adminId = req.adminId
               }
               if (req.customerId && !req.adminId) {
                    query.customerId = req.customerId
               }
               if (req.customerId && req.adminId) {
                    query.$and = [{ $or: [{ customerId: req.customerId }, { customerId: req.adminId }] }, { $or: [{ adminId: req.adminId }, { adminId: req.customerId }] }]
               }
               if (req.chatId) {
                    query._id = req.chatId
               }
               console.log("query hit>>>>>>>>75", JSON.stringify(query))

               chatSchema.find(query).sort({ "message.createdAt": -1 }).populate("userId sellerId productId", "userId firstName profilePic").exec((err, result) => {
                    console.log("i am here >>>>>", err, result.length ? result[0].message.length : [])
                    if (err) {
                         response = { responseCode: 500, responseMessage: "Internal server error", err }
                         resolve(response)
                    }
                    else if (result.length == false) {
                         var query2 = {}
                         if (query.adminId != undefined) {
                              query2._id = query.adminId
                         }
                         if (query.customerId != undefined) {
                              query2._id = query.customerId
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

}


