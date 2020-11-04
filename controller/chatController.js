const chatSchema = require('../model/chatingModel')
const commonFunction = require('../helper/commonFunction')


module.exports={

    chattingAPI: (req) => {

        var query = { clearStatus: "false" }, response;
        if (req.senderId && req.receiverId) {
             query.$and = [{ $or: [{ senderId: req.senderId }, { senderId: req.receiverId }] }, { $or: [{ receiverId: req.receiverId }, { receiverId: req.senderId }] }]
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

   chattingHistory: (req) => {
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

          chatSchema.find(query).sort({ "message.createdAt": -1 }).populate("senderId receiverId", "firstName profilePic").exec((err, result) => {
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
                    response = { responseCode: 200, responseMessage: "Chatting history", result: result }
                    resolve(response)
               }
          })
     })
},
uploadDocument: (req, res) => {
     try {
          if (!req.body.image) {
               res.send({ responseCode: 401, responseMessege: "Parameter missing" })

          } else {
               commonFunction.uploadImage(
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
}