
const user = require('../models/userModel')
const chattingModel = require('../models/chattingModel')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs')

const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/messgae');
const { SuccessMessage } = require('../helper/messgae');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const groupModel = require('../models/groupModel')
const commonFunction=require('../helper/commonFunction')

module.exports = {
     login: (req, res) => {
          try {
               user.findOne({ email: req.body.email, userType: "ADMIN" }, (error, adminData) => {
                    if (error) {
                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!adminData) {
                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                    }
                    else {
                         const check = bcrypt.compareSync(req.body.password, adminData.password)
                         if (check) {
                              var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socket_server', { expiresIn: '24h' });
                              var result = {
                                   userId: adminData._id,
                                   token: token,
                                   userType: adminData.userType
                              };
                              response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                         }
                         else {
                              response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
                         }
                    }
               })
          }
          catch (error) {
               response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
          }
     },
     createGroup: (req, res) => {
          try {
               user.findOne({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" }, (UserErr, userData) => {
                    if (UserErr) {
                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (!userData) {
                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    } else {
                         let admin = {
                              memberId: userData._id,
                              role: "GROUPADMIN"
                         };
                         req.body.members.push(admin);
                         var obj = {
                              members: req.body.members,
                              groupName: req.body.groupName,
                              userId: userData._id
                         }
                         var data = new groupModel(obj);
                         data.save((err1, result) => {
                              if (err1) {
                                   response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                              } else {
                                   response(res, SuccessCode.SUCCESS, result, SuccessMessage.GROUP_CREATED)
                              }
                         })
                    }
               })
          } catch (error) {
               response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
          }
     },
     groupChat: (req) => {

          var query = { clearStatus: "false" }, response;
          if (req.senderId && req.groupId) {
               query.$and = [{ senderId: req.senderId }, { groupId: req.groupId }]
          }

          return new Promise((resolve, reject) => {
               chattingModel.findOne(query).exec((err, result) => {
                    if (err) {
                         response = ({ response_code: 500, response_message: 'Internal server error', err })
                         resolve(response)
                    }
                    else if (!result) {
                         req.messages = [{
                              message: req.message
                         }]
                         new chattingModel(req).save((err1, succ) => {
                              if (err1) {
                                   response = ({ response_code: 500, response_message: "Internal server error", err1 })
                                   resolve(response)
                              }
                              else {
                                   var reversed_array = succ.messages[0]

                                   response = ({ response_code: 200, response_message: 'Message send successfully.', result: reversed_array })
                                   resolve(response)
                              }
                         })
                    }
                    else {
                         if (result.status == "ACTIVE") {
                              var messages = [{
                                   message: req.message,
                                   groupId: req.groupId
                              }]
                              chattingModel.findByIdAndUpdate({ "_id": result._id }, { $push: { messages: messages } }, { new: true }, (err2, succ1) => {
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
                                        var reversed_array = succ1.messages.reverse();

                                        response = ({ response_code: 200, response_message: 'Message send successfully.', result: reversed_array[0] })
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
                    query.$and = [{ senderId: req.senderId }, { groupId: req.groupId }]
               }
              
               chattingModel.find(query).sort({ "messages.createdAt": -1 }).exec((err, result) => {
                    if (err) {
                         response = { responseCode: 500, responseMessage: "Internal server error", err }
                         resolve(response)
                    }
                    else if (result.length == false) {
                         response = { responseCode: 200, responseMessage: "Data found successfully.", result: [] }
                         resolve(response)
                    }
                    else {
                         response = { responseCode: 200, responseMessage: "Data found successfully.", result }
                         resolve(response)
                    }
               })
          })
     },
     chatUserList: (req, res) => {
          try {
               chattingModel.find({ senderId: req.body.userId }).populate({ path: "groupId", select: "groupName" }).exec((error, data) => {
                    if (error) {
                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                    }
                    else {
                         var result = data.map(o => {
                              o.messages = o.messages[o.messages.length - 1];
                              return o;
                         })
                         groupModel.find({ status: "ACTIVE", members: { $elemMatch: { memberId: req.body.userId } } },(groupErr, groupResult) => {
                              if (groupErr) {
                                   response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                              }
                              else {
                                   var array = result.concat(groupResult);
                                   let newArray = []
                                   array.forEach(x => {
                                        var obj = {
                                             status: x.status,
                                             clearStatus: x.clearStatus,
                                             _id: x._id,
                                             senderId: x.senderId,
                                             groupId: x.groupId,
                                             messages: x.messages,
                                             chatType: x.chatType,
                                             createdAt: x.createdAt,
                                             updatedAt: x.updatedAt,
                                             members: x.members,
                                             groupName: x.groupName,
                                             userId: x.userId
                                        }
                                        newArray.push(obj);
                                   })
                                   newArray.map((e) => {
                                        if (e.chatType == "groupChat") {
                                             e["type"] = "groupChat";
                                             console.log("4329", e.type)
                                             return e;
                                        }
                                   })
                                 
                                    var limit = req.body.limit || 5,
                                        length = newArray.length,
                                        page = req.body.pageNumber || 1;
                                    var docs = commonFunction.Paging(newArray, limit, page);                             
                                    length != 0 && page <= Math.ceil(length / limit) ? res.send({
                                        response_code: 200,
                                        response_message: "Data found successfully", result: { docs }, page: page, limit: limit, TotalPage: Math.ceil(length / limit)
                                    })
                                   :response(res, ErrorCode.NOT_FOUND, [], ErrorMessage. NOT_FOUND)

                              }
                         })
                    }
               })
          } catch (error) {
               response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
          }
     },
}