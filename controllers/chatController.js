const chatSchema = require('../models/chatingModel')
const groupChatSchema=require('../models/groupChatModel')

const user = require('../models/userModel');



module.exports = {
    oneToOneChat: (req) => {
         console.log("9=======>",req)

     var query = { clearStatus: "false" }, response;
     if (req.senderId && req.receiverId) {
          query.$and = [{ $or: [{ senderId: req.senderId }, { senderId: req.receiverId }] }, { $or: [{ receiverId: req.receiverId }, { receiverId: req.senderId }] }]
     }
       
        return new Promise((resolve, reject) => {
             chatSchema.findOne(query).exec((err, result) => {
                  console.log("18=========>",err,result)
                  if (err) {
                       response = ({ response_code: 500, response_message: 'Internal server error', err })
                       resolve(response)
                  }
                  else if (!result) {
                       new chatSchema(req).save((err1, succ) => {
                            if (err1) {
                                 response = ({ response_code: 500, response_message:"Internal server error", err1 })
                                 resolve(response)
                            }
                            else {
                                 response = ({ response_code: 200, response_message:'Message send successfully', result: succ })
                                 resolve(response)
                            }
                       })
                  }
                  else {
                       if (result.status == "ACTIVE") {
                            chatSchema.findByIdAndUpdate({ "_id": result._id }, { $push: { messages: req.messages[0] } }, { new: true }, (err2, succ1) => {
                                 console.log("38======>",err2,succ1)
                                 if (err2) {
                                      response = ({
                                        response_code: 500,
                                        response_message: "Internal server error", err2
                                      })
                                      resolve(response)

                                 }
                                 else if (!succ1) {
                                      response = ({
                                           response_code: 404,
                                           response_message: "Data not found"
                                      })
                                      resolve(response)

                                 }
                                 else {
                                      response = ({ response_code: 200, response_message: 'Message send successfully', result: succ1 })
                                      resolve(response)
                                 }
                            })
                       }
                       else {
                            response = ({ response_code: 404, response_message: 'You cant chat', result: result })
                            resolve(response)
                       }
                  }
             })
        })
   },
  
   ChattingHistory: (req) => {
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

          chatSchema.find(query).sort({ "messages.createdAt": -1 }).populate("senderId receiverId", "name profilePic").exec((err, result) => {
               if (err) {
                    response = { response_code: 500, response_message: "Internal server error.", err }
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
                              response = { response_code: 500, response_message: "Internal server error." }
                              resolve(response)
                         }
                         else {
                              var Data = {
                                   name: userResult.name,
                                   profilePic: userResult.profilePic
                              }
                              response = { response_code: 200, response_message: "Data found successfully.", result: Data }
                              resolve(response)
                         }
                    })
               }
               else {
                    response = { response_code: 200, response_message: "Data found successfully", result: result }
                    resolve(response)

               }
          })
     })
},
groupChat: (req) => {

     var query = { clearStatus: "false" }, response;
     if (req.senderId && req.groupId) {
          query.$and = [{ senderId: req.senderId }, { groupId: req.groupId  }]
     }
       
        return new Promise((resolve, reject) => {
          groupChatSchema.findOne(query).exec((err, result) => {
                  if (err) {
                       response = ({ response_code: 500, response_message: 'Internal server error', err })
                       resolve(response)
                  }
                  else if (!result) {
                       new groupChatSchema(req).save((err1, succ) => {
                            if (err1) {
                                 response = ({ response_code: 500, response_message:"Internal server error", err1 })
                                 resolve(response)
                            }
                            else {
                                 response = ({ response_code: 200, response_message:'Message send successfully', result: succ })
                                 resolve(response)
                            }
                       })
                  }
                  else {
                       if (result.status == "ACTIVE") {
                         groupChatSchema.findByIdAndUpdate({ "_id": result._id }, { $push: { messages: req.messages[0] } }, { new: true }, (err2, succ1) => {
                                 if (err2) {
                                      response = ({
                                        response_code: 500,
                                        response_message: "Internal server error", err2
                                      })
                                      resolve(response)

                                 }
                                 else if (!succ1) {
                                      response = ({
                                           response_code: 404,
                                           response_message: "Data not found"
                                      })
                                      resolve(response)

                                 }
                                 else {
                                      response = ({ response_code: 200, response_message: 'Message send successfully', result: succ1 })
                                      resolve(response)
                                 }
                            })
                       }
                       else {
                            response = ({ response_code: 404, response_message: 'You cant chat', result: result })
                            resolve(response)
                       }
                  }
             })
        })
   },
   groupChattingHistory: (req) => {  
     let query = {};
     let response = {}
     return new Promise((resolve, reject) => {
          if (req.senderId && !req.groupId) {
               query.senderId = req.senderId
          }
          if (req.groupId && !req.senderId) {
               query.groupId = req.groupId
          }
          if (req.groupId && req.senderId) {
               query.$and = [{ senderId: req.senderId }, { groupId: req.groupId  }]
          }
          if (req.chatId) {
               query._id = req.chatId
          }

          groupChatSchema.find(query).sort({ "messages.createdAt": -1 }).exec((err, chatData) => {
               if (err) {
                    response = { responseCode: 500, responseMessage: "Internal server error", err }
                    resolve(response)
               }
               else if (chatData.length == false) {
                    response = { responseCode: 200, responseMessage: "Data not found" }
                    resolve(response)
               }
               else {
                    response = { responseCode: 200, responseMessage: "Data found successfully", chatData }
                    resolve(response)
               }
          })
     })
},
clearOneToOneChat: (req, res) => {
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
     chatSchema.findOne(query, (chatError, chatUpdate) => {
          if (chatError) {
               return res.send({ response_code: 500, response_message: "Internal server error", chatError })
          }
          else if (!chatUpdate) {
               return res.send({ response_code: 404,  response_message: "Data not found" })
          }
          else {
               chatSchema.findOneAndUpdate(chatUpdate.query, { $set: { "clearStatus": req.body.clearStatus } }, { new: true }, (updateError, UpdateResult) => {
                   
                    if (updateError) {
                         return res.send({ response_code: 500,  response_message: "Internal server error", updateError })
                    }
                    else {
                         return res.send({ response_code: 200,  response_message: "Message cleared successfully", UpdateResult })
                    }
               })
          }
     })
},
clearGroupChat: (req, res) => {
     var query = {
          $and: [
               {
                   status:"ACTIVE"
               },
               { _id: req.body.chatId }
          ]
     };
     groupChatSchema.findOne(query, (chatError, chatUpdate) => {
          if (chatError) {
               return res.send({ response_code: 500, response_message: "Internal server error", chatError })
          }
          else if (!chatUpdate) {
               return res.send({ response_code: 404,  response_message: "Data not found" })
          }
          else {
               groupChatSchema.findOneAndUpdate(chatUpdate.query, { $set: { "clearStatus": req.body.clearStatus } }, { new: true }, (updateError, UpdateResult) => {
                   
                    if (updateError) {
                         return res.send({ response_code: 500,  response_message: "Internal server error", updateError })
                    }
                    else {
                         return res.send({ response_code: 200,  response_message: "Message cleared successfully", UpdateResult })
                    }
               })
          }
     })
},
}



// {
//      "messages": [
//        {
//          "message": "hello buddy",
//          "receiverId": "5f55faf33a397c6acbd58781"
//        }
//      ],
//      "receiverId":"5f55faf33a397c6acbd58781",
//      "senderId": "5f55eb8a1b79b50752dfb3ff"
//    }


//    {
//      "messages": [
//        {
//          "message": "jgjgjgjh",
//          "receiverId": "5f55faf33a397c6acbd58781"
//        }
//      ],
//      "receiverId": "5f55faf33a397c6acbd58781",
//      "senderId": "5f55eb8a1b79b50752dfb3ff"
//    }