const postModel = require("../models/postModel");
const commonFunction = require("../helperFunctions/commonFunction");
const _ = require("lodash")
const user = require("../models/userModel");
const webNotification = require("../models/webNotification")
const notificationModel = require("../models/notificationModel")
const mongoose = require("mongoose")




module.exports = {

     createPost: (req, res) => {
          try {
               if (!req.body.userId) {
                    return res.send({ responseCode: 501, responseMessage: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" },
                         async (err, result) => {
                              if (err) {
                                   return res.send({ responseCode: 500, responseMessage: "Intrnal server error" })
                              } else if (!result) {
                                   return res.send({ responseCode: 404, responseMessage: "User not found" })
                              } else {

                                   if (req.body.image) {
                                        commonFunction.multipleImageUploadCloudinary(req.body.image, (err, success) => {
                                             if (err) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error ", err })
                                             }
                                             else {
                                                  req.body.image = success
                                                  var post = {
                                                       userId: result._id,
                                                       image: success,
                                                       text: req.body.caption,
                                                       tagFriends: req.body.friendsId
                                                  }
                                                  if (req.body.privacy == "FRIENDS") {
                                                       post.privacy = "FRIENDS",
                                                            post.timeLine = []
                                                       result.friendList.forEach(x => {
                                                            post.timeLine.push(x.friendId)
                                                       })
                                                  }
                                                  if (req.body.privacy == "FRIENDSEXCEPT") {
                                                       post.privacy = "FRIENDSEXCEPT"
                                                       post.timeLine = req.body.friendId;
                                                  }
                                                  if (req.body.privacy == "SPECIFICFRIENDS") {
                                                       post.privacy = "SPECIFICFRIENDS"
                                                       post.timeLine = req.body.friendId

                                                  }
                                                  if (req.body.privacy == "ONLYME") {
                                                       post.privacy = "ONLYME"
                                                  }
                                                  postModel.create(post, (error, success1) => {
                                                       if (error) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error " })
                                                       } else if (!success1) {
                                                            return res.send({ responseCode: 404, responseMessage: " Unable to post" })
                                                       } else {
                                                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", success1)
                                                            return res.send({ responseCode: 200, responseMessage: "post created ", success1 })
                                                       }
                                                  })
                                             }
                                        })

                                   }
                                   else if (req.body.video) {
                                        commonFunction.multipleImageUploadCloudinary(req.body.video, (err, success) => {
                                             if (err) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error ", err })
                                             }
                                             else {
                                                  req.body.video = success
                                                  var post = {
                                                       userId: result._id,
                                                       video: success,
                                                       text: req.body.caption,
                                                       tagFriends: req.body.friendsId
                                                  }
                                                  if (req.body.privacy == "FRIENDS") {
                                                       post.privacy = "FRIENDS",
                                                            post.timeLine = []
                                                       result.friendList.forEach(x => {
                                                            post.timeLine.push(x.friendId)
                                                       })
                                                  }
                                                  if (req.body.privacy == "FRIENDSEXCEPT") {
                                                       post.privacy = "FRIENDSEXCEPT"
                                                       post.timeLine = req.body.friendId;
                                                  }
                                                  if (req.body.privacy == "SPECIFICFRIENDS") {
                                                       post.privacy = "SPECIFICFRIENDS"
                                                       post.timeLine = req.body.friendId

                                                  }
                                                  if (req.body.privacy == "ONLYME") {
                                                       post.privacy = "ONLYME"
                                                  }
                                                  postModel.create(post, (error, success1) => {
                                                       if (error) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error " })
                                                       } else if (!success1) {
                                                            return res.send({ responseCode: 404, responseMessage: " Unable to post" })
                                                       } else {
                                                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", success1)
                                                       }
                                                  })
                                             }
                                        })

                                   }
                                   else if (req.body.GIF) {
                                                  var post = {
                                                       userId: result._id,
                                                       GIF:req.body.GIF,
                                                       text: req.body.caption,
                                                       tagFriends: req.body.friendsId
                                                  }
                                                  if (req.body.privacy == "FRIENDS") {
                                                       post.privacy = "FRIENDS",
                                                            post.timeLine = []
                                                       result.friendList.forEach(x => {
                                                            post.timeLine.push(x.friendId)
                                                       })
                                                  }
                                                  if (req.body.privacy == "FRIENDSEXCEPT") {
                                                       post.privacy = "FRIENDSEXCEPT"
                                                       post.timeLine = req.body.friendId;
                                                  }
                                                  if (req.body.privacy == "SPECIFICFRIENDS") {
                                                       post.privacy = "SPECIFICFRIENDS"
                                                       post.timeLine = req.body.friendId

                                                  }
                                                  if (req.body.privacy == "ONLYME") {
                                                       post.privacy = "ONLYME"
                                                  }
                                                  new postModel(post).save((error, success1) => {
                                                       if (error) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                       } else if (!success1) {
                                                            return res.send({ responseCode: 404, responseMessage: " Unable to post" })
                                                       } else {
                                                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", success1)
                                                            return res.send({ responseCode: 200, responseMessage: "post created ", success1 })
                                                       }
                                                  })
                                           
                                       
                                   }
                                   else if (req.body.feeling) {
                                        var post = {
                                             userId: result._id,
                                             feeling: req.body.feeling,
                                             text: req.body.caption,
                                             tagFriends: req.body.friendsId
                                        }
                                        if (req.body.privacy == "FRIENDS") {
                                             post.privacy = "FRIENDS",
                                                  post.timeLine = []
                                             result.friendList.forEach(x => {
                                                  post.timeLine.push(x.friendId)
                                             })
                                        }
                                        if (req.body.privacy == "FRIENDSEXCEPT") {
                                             post.privacy = "FRIENDSEXCEPT"
                                             post.timeLine = req.body.friendId;
                                        }
                                        if (req.body.privacy == "SPECIFICFRIENDS") {
                                             post.privacy = "SPECIFICFRIENDS"
                                             post.timeLine = req.body.friendId

                                        }
                                        if (req.body.privacy == "ONLYME") {
                                             post.privacy = "ONLYME"
                                        }
                                        postModel.create(post, (error, success1) => {
                                             if (error) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             } else if (!success1) {
                                                  return res.send({ responseCode: 404, responseMessage: " Unable to post" })
                                             } else {
                                                  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", success1)
                                                  return res.send({ responseCode: 200, responseMessage: "post created", success1 })
                                             }
                                        })
                                   }
                                   else if (req.body.location) {
                                        commonFunction.getLatLong(req.body.location, (error, location) => {
                                             if (error) {
                                                  console.log(" 121 Internal server error")
                                             } else if (!location) {
                                                  console.log("Unable to find", location)
                                             } else {
                                                  var result1 = { latitude: location[0].latitude, longitude: location[0].longitude }
                                                  console.log("pppppppppppppppppp", result1)
                                                  var post = {
                                                       userId: result._id,
                                                    
                                                       location: req.body.location,
                                                       latitude: location[0].latitude,
                                                       longitude: location[0].longitude,
                                                       text: req.body.caption,
                                                       tagFriends: req.body.tagFriends
                                                  }
                                                  if (req.body.privacy == "FRIENDS") {
                                                       post.privacy = "FRIENDS",
                                                            post.timeLine = []
                                                       result.friendList.forEach(x => {
                                                            post.timeLine.push(x.friendId)
                                                       })
                                                  }
                                                  if (req.body.privacy == "FRIENDSEXCEPT") {
                                                       post.privacy = "FRIENDSEXCEPT"
                                                       post.timeLine = req.body.friendId;
                                                  }
                                                  if (req.body.privacy == "SPECIFICFRIENDS") {
                                                       post.privacy = "SPECIFICFRIENDS"
                                                       post.timeLine = req.body.friendId

                                                  }
                                                  if (req.body.privacy == "ONLYME") {
                                                       post.privacy = "ONLYME"
                                                  }
                                                  postModel.create(post, (error, success1) => {
                                                       if (error) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                       } else if (!success1) {
                                                            return res.send({ responseCode: 404, responseMessage: " Unable to post" })
                                                       } else {
                                                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", success1)
                                                            return res.send({ responseCode: 200, responseMessage: "post created", success1 })
                                                       }
                                                  })
                                             }
                                        })
                                   }
                                   else {
                                        console.log("llllllllllllllllllllllllllll")
                                        var post = {
                                             userId: result._id,
                                             sticker: req.body.sticker,
                                             text: req.body.caption,
                                             tagFriends: req.body.friendsId
                                        }
                                        if (req.body.privacy == "FRIENDS") {
                                             post.privacy = "FRIENDS",
                                                  post.timeLine = []
                                             result.friendList.forEach(x => {
                                                  post.timeLine.push(x.friendId)
                                             })
                                        }
                                        if (req.body.privacy == "FRIENDSEXCEPT") {
                                             post.privacy = "FRIENDSEXCEPT"
                                             post.timeLine = req.body.friendId;
                                        }
                                        if (req.body.privacy == "SPECIFICFRIENDS") {
                                             post.privacy = "SPECIFICFRIENDS"
                                             post.timeLine = req.body.friendId

                                        }
                                        if (req.body.privacy == "ONLYME") {
                                             post.privacy = "ONLYME"
                                        }
                                        postModel.create(post, (error, success1) => {
                                             if (error) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             } else if (!success1) {
                                                  return res.send({ responseCode: 404, responseMessage: " Unable to post" })
                                             } else {
                                                  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", success1)
                                                  return res.send({ responseCode: 200, responseMessage: "post created ", success1 })
                                             }
                                        })
                                   }

                              }
                         })
               }
          } catch (error) {
               console.log("289===>",error)
               return res.send({ responseCode: 404, responseMessage: "Error in catch !" })
          }
     },

     activityLogInPost: (req, res) => {
          postModel.aggregate([
               { $match: { status: "ACTIVE" } },

               {
                    $project: {
                         _id: 1,
                         "clickBy": 1,
                         "viewers": 1,
                         "status": 1,
                         "userId": 1,
                         "title": 1,
                         "description": 1,
                         "image": 1,
                         "date": 1,
                         "expiryDate": 1,
                         "userName": 1,
                         "cardDetails": 1,
                         "sharedBy": 1,
                         "likes": 1,
                         "comments": 1,
                         "createdAt": 1,
                         "updatedAt": 1,

                         isLiked: {
                              $cond: { if: { $in: [mongoose.Types.ObjectId(req.headers.id), "$likes.likedId"] }, then: true, else: false }
                         },
                         isCommented: {
                              $cond: { if: { $in: [mongoose.Types.ObjectId(req.headers.id), "$comments.commentedUser"] }, then: true, else: false }
                         }
                    }
               },
               {
                    $match: {
                         $or: [{
                              isLiked: true
                         }, {
                              isCommented: true
                         }]
                    }
               }
          ], (err, advData) => {
               if (err) {
                    res.send({ responseCode: 404, responseMessage: "Internal server error", err })
               }
               if (advData) {
                    res.send({ responseCode: 200, responseMessage: "Get data", advData })
               }
          })
     },
     sharePost: (req, res) => {
          try {
               user.findOne({ _id: req.body.memberId, status: "ACTIVE", friendList: { $elemMatch: { friendId: req.body.sharedTo, status: "ACTIVE" } } }).populate({ path: 'friendList.friendId', match: { _id: { $in: req.body.sharedTo } }, select: 'fcmToken firstName' }).exec((err, listData) => {
                    if (err) {
                         res.send({ responseCode: 500, responseMessege: "Something went wrong" })
                    } else if (!listData) {
                         return res.send({ responseCode: 404, responseMessage: "User not found" })
                    } else {
                         postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err, classData) => {
                              if (err) {
                                   res.send({ responseCode: 500, responseMessege: "Something went wrong" })
                              } else if (!classData) {
                                   return res.send({ responseCode: 404, responseMessage: "Post not found" })
                              } else {
                                   var object = [{
                                        memberId: req.body.memberId,
                                        sharedTo: []
                                   }]
                                   var arr = req.body.sharedTo;
                                   arr.forEach(a => {
                                        object[0].sharedTo.push({ friendId: a })
                                   })
                                   console.log("My object to be saved is.....", object);
                                   listData.friendList.forEach((item, index) => {
                                        if (item.friendId != null && item.friendId.fcmToken == null) {
                                             var obj = {
                                                  userId: item.friendId,
                                                  senderId: req.body.memberId,
                                                  title: "Shared Post",
                                                  body: `${listData.firstName} shared a post with you`,
                                                  senderIdMessage: `${listData.firstName} shared post with ${item.friendId.firstName}`,

                                                  notificationType: "Post shared"
                                             };
                                             new webNotification(obj).save((saveErr, saveResult) => {
                                                  if (saveErr) {
                                                       console.log({ responseCode: 500, responseMessage: "Intrnal server error" });
                                                  }
                                                  else {
                                                       postModel.findOneAndUpdate({ _id: classData._id, postStatus: "ACTIVE" }, { $push: { sharedBy: object } }, { new: true }, (err, updateData) => {
                                                            if (err) {
                                                                 console.log({ responseCode: 500, responseMessege: "Something went wrong" })
                                                            }
                                                            else if (!updateData) {
                                                                 console.log({ responseCode: 404, responseMessage: "Failed to update the post shared post" })
                                                            }
                                                            else {
                                                                 console.log({ responseCode: 200, responseMessage: "Post shared successfully", updateData })
                                                            }
                                                       })
                                                  }
                                             })
                                        }
                                        else if (item.friendId != null && item.friendId.fcmToken != null) {
                                             commonFunction.pushNotification(item.friendId.fcmToken, "Shared Post", `${listData.firstName} shared a post with you`, (err, notificationResult) => {
                                                  if (err) {
                                                       console.log({ responseCode: 500, responseMessage: "Intrnal server error" })
                                                  }
                                                  else {
                                                       var obj = {
                                                            userId: item.friendId,
                                                            senderId: req.body.memberId,
                                                            title: "Shared Post",
                                                            body: `${listData.firstName} shared a post with you`,
                                                            senderIdMessage: `${listData.firstName} shared post with ${item.friendId.firstName}`,

                                                            notificationType: "Post shared"
                                                       };
                                                       new notificationModel(obj).save((saveErr, saveResult) => {
                                                            if (saveErr) {
                                                                 console.log({ responseCode: 500, responseMessage: "Intrnal server error" });
                                                            }
                                                            else {
                                                                 postModel.findOneAndUpdate({ _id: classData._id, postStatus: "ACTIVE" }, { $push: { sharedBy: object } }, { new: true }, (err, updateData) => {
                                                                      if (err) {
                                                                           console.log({ responseCode: 500, responseMessege: "Something went wrong" })
                                                                      } else if (!updateData) {
                                                                           console.log({ responseCode: 404, responseMessage: "Failed to update the post shared post" })
                                                                      } else {
                                                                           console.log({ responseCode: 200, responseMessage: "Post shared successfully", updateData })
                                                                      }
                                                                 })
                                                            }
                                                       })
                                                  }
                                             })
                                        }
                                        else {
                                             console.log({ responseCode: 404, responseMessage: "Data not found" });
                                        }
                                   })
                                   return res.send({ responseCode: 200, responseMessage: "Post successfully shared" })
                              }
                         })
                    }
               })
          } catch (error) {
               console.log("330=====>", error);

               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     tagFriendsPost: (req, res) => {
          try {
               if (!req.body.userId) {
                    return res.send({ responseCode: 501, responseMessage: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" },
                         (err, result) => {
                              if (err) {
                                   return res.send({ responseCode: 500, responseMessage: "Intrnal server error" })
                              } else if (!result) {
                                   return res.send({ responseCode: 404, responseMessage: "User not found" })
                              } else {
                                   user.findOne({ _id: req.body.userId, friendList: { $elemMatch: { friendId: req.body.friendId, status: "ACTIVE" } } }).populate({ path: 'friendList.friendId', match: { _id: { $in: req.body.friendId } }, select: 'fcmToken firstName' }).exec((err2, result2) => {
                                        if (err2) {
                                             return res.send({ responseCode: 500, responseMessage: "Intrnal server error" })
                                        } else if (!result2) {
                                             return res.send({ responseCode: 404, responseMessage: "Friend not found" })
                                        } else {
                                             result2.friendList.forEach((item, index) => {
                                                  if (item.friendId != null && item.friendId.fcmToken == null) {
                                                       var obj = {
                                                            userId: item.friendId,
                                                            senderId: req.body.userId,
                                                            title: "Tag Friend",
                                                            body: `${result.firstName} tagged you in the post`,
                                                            senderIdMessage: `${result.firstName} tagged ${item.friendId.firstName}`,
                                                            notificationType: "Tag friend"
                                                       };
                                                       new webNotification(obj).save((saveErr, saveResult) => {
                                                            if (saveErr) {
                                                                 console.log({ responseCode: 500, responseMessage: "Intrnal server error" });
                                                            }
                                                            else {
                                                                 postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                                                      { $push: { tagFriends: result2._id } },
                                                                      { new: true },
                                                                      (err1, result1) => {
                                                                           if (err1) {
                                                                                console.log({ responseCode: 500, responseMessage: "Intrnal server error" })
                                                                           } else {
                                                                                console.log({ responseCode: 200, responseMessage: "Friend tagged successfully", result1 })
                                                                           }
                                                                      })
                                                            }
                                                       })
                                                  }
                                                  else if (item.friendId != null && item.friendId.fcmToken != null) {
                                                       commonFunction.pushNotification(item.friendId.fcmToken, "Tag Friend", `${result.firstName} tagged you in the post`, (err, notificationResult) => {
                                                            if (err) {
                                                                 console.log({ responseCode: 500, responseMessage: "Intrnal server error" })
                                                            }
                                                            else {
                                                                 var obj = {
                                                                      userId: item.friendId,
                                                                      senderId: req.body.userId,
                                                                      title: "Tag Friend",
                                                                      body: `${result.firstName} tagged you in the post`,
                                                                      senderIdMessage: `${result.firstName} tagged ${item.friendId.firstName}`,
                                                                      notificationType: "Tag friend"
                                                                 };
                                                                 new notificationModel(obj).save((saveErr, saveResult) => {
                                                                      if (saveErr) {
                                                                           console.log({ responseCode: 500, responseMessage: "Intrnal server error" });
                                                                      }
                                                                      else {
                                                                           postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                                                                { $push: { tagFriends: result2._id } },
                                                                                { new: true },
                                                                                (err1, result1) => {
                                                                                     if (err1) {
                                                                                          console.log({ responseCode: 500, responseMessage: "Intrnal server error" })
                                                                                     } else {
                                                                                          console.log({ responseCode: 200, responseMessage: "Friend tagged successfully", result1 })
                                                                                     }
                                                                                })
                                                                      }
                                                                 })
                                                            }
                                                       })
                                                  }
                                                  else {
                                                       console.log({ responseCode: 404, responseMessage: "Data not found" });
                                                  }
                                             })
                                             return res.send({ responseCode: 200, responseMessage: "Friend tagged successfully" })
                                        }
                                   })
                              }
                         })
               }
          } catch (error) {
               return res.send({ responseCode: 404, responseMessage: "Error in catch !" })
          }
     },


     postLocation: (req, res) => {
          try {
               if (!req.body.userId) {
                    return res.send({ responseCode: 501, responseMessage: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" },
                         (err, result) => {
                              if (err) {
                                   return res.send({ responseCode: 500, responseMessage: "Intrnal server error" })
                              } else if (!result) {
                                   return res.send({ responseCode: 404, responseMessage: "User not found" })
                              } else {
                                   postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" },
                                        (err1, result1) => {
                                             if (err1) {
                                                  return res.send({ responseCode: 500, responseMessage: "Intrnal server error" })
                                             } else {
                                                  const lat = result1.latitude
                                                  const long = result1.longitude
                                                  commonFunction.getAddress({ lat, long }, (err2, result2) => {
                                                       if (err2) {
                                                            return res.send({ responseCode: 500, responseMessage: "Intrnal server error" })
                                                       } else {
                                                            return res.send({ responseCode: 200, responseMessage: "Post location found successfully", result2 })
                                                       }
                                                  })
                                             }
                                        })
                              }
                         })
               }
          } catch (error) {
               return res.send({ responseCode: 404, responseMessage: "Error in catch !" })
          }
     },
     postLikeAndComment: (req, res) => {
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessage: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                         if (err) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }).populate('userId').exec((err, postResult) => {
                                   if (err) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                   }
                                   else if (!postResult) {
                                        return res.send({ responseCode: 404, responseMessage: "Post not found" })
                                   }
                                   else {
                                        if (req.body.like == "true") {
                                             postModel.findOne({
                                                  _id: req.body.postId,
                                                  postStatus: "ACTIVE",
                                                  likes: { $elemMatch: { likedId: result._id } }
                                             }, (err3, result3) => {
                                                  if (err3) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  } else if (result3) {
                                                       return res.send({ responseCode: 404, responseMessage: "User already liked" })
                                                  } else {
                                                       var like = {
                                                            likedId: result._id,
                                                            userName: `${result.firstName} ${result.lastName}`,
                                                            userPic: result.profilePic
                                                       };
                                                       if (postResult.userId.fcmToken == null) {
                                                            var obj = {
                                                                 userId: postResult.userId,
                                                                 senderId: req.body.userId,
                                                                 title: "Post Liked",
                                                                 body: `${result.firstName} liked your post`,
                                                                 senderIdMessage: `${result.firstName} liked on ${postResult.userId.firstName}' post`,
                                                                 notificationType: "Post liked"
                                                            };
                                                            new webNotification(obj).save((saveErr, saveResult) => {
                                                                 if (saveErr) {
                                                                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                 }
                                                                 else {
                                                                      postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                                                           { $push: { likes: like } },
                                                                           { new: true },
                                                                           (err1, result1) => {
                                                                                if (err1) {
                                                                                     return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                                } else if (!result1) {
                                                                                     return res.send({ responseCode: 400, responseMessage: "Unable to like" })
                                                                                }
                                                                                else {
                                                                                     const count = result1.likes;
                                                                                     return res.send({ responseCode: 200, responseMessage: "Post liked successfully", likes: count })
                                                                                }
                                                                           }
                                                                      )
                                                                 }
                                                            })
                                                       }
                                                       else {
                                                            commonFunction.pushNotification(postResult.userId.fcmToken, "Post Liked", `${result.firstName} liked your post`, (err, notificationResult) => {
                                                                 if (err) {
                                                                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                 }
                                                                 else {
                                                                      var obj = {
                                                                           userId: postResult.userId,
                                                                           senderId: req.body.userId,
                                                                           title: "Post Liked",
                                                                           body: `${result.firstName} liked your post`,
                                                                           senderIdMessage: `${result.firstName} liked on ${postResult.userId.firstName}' post`,
                                                                           notificationType: "Post liked"
                                                                      };
                                                                      new notificationModel(obj).save((saveErr, saveResult) => {
                                                                           if (saveErr) {
                                                                                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                           }
                                                                           else {
                                                                                postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                                                                     { $push: { likes: like } },
                                                                                     { new: true },
                                                                                     (err1, result1) => {
                                                                                          if (err1) {
                                                                                               return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                                          } else if (!result1) {
                                                                                               return res.send({ responseCode: 400, responseMessage: "Unable to like" })
                                                                                          }
                                                                                          else {
                                                                                               const count = result1.likes;
                                                                                               return res.send({ responseCode: 200, responseMessage: "Post liked successfully", likes: count })
                                                                                          }
                                                                                     }
                                                                                )
                                                                           }
                                                                      })
                                                                 }
                                                            })
                                                       }
                                                  }
                                             })

                                        } else if (req.body.comments == "true") {
                                             var comment = {
                                                  commentedUser: result._id,
                                                  comment: req.body.comment,
                                                  userName: `${result.firstName} ${result.lastName}`,
                                                  userPic: result.profilePic,
                                                  commentedTime: new Date()
                                             };
                                             if (postResult.userId.fcmToken == null) {
                                                  var obj = {
                                                       userId: postResult.userId,
                                                       senderId: req.body.userId,
                                                       title: "Post Commented",
                                                       body: `${result.firstName} commented on your post`,
                                                       senderIdMessage: `${result.firstName} commented ${postResult.userId.firstName}'s post`,
                                                       notificationType: "Post commented"
                                                  };
                                                  new webNotification(obj).save((saveErr, saveResult) => {
                                                       if (saveErr) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                       }
                                                       else {
                                                            postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                                                 { $push: { comments: comment } },
                                                                 { new: true },
                                                                 (err2, result2) => {
                                                                      if (err2) {
                                                                           return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                      } else {
                                                                           return res.send({ responseCode: 200, responseMessage: "Comment added successfully", comments: result2 })
                                                                      }
                                                                 }
                                                            )
                                                       }
                                                  })
                                             }
                                             else {
                                                  commonFunction.pushNotification(postResult.userId.fcmToken, "Post Commented", `${result.firstName} commented on your post`, (err, notificationResult) => {
                                                       if (err) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                       }
                                                       else {
                                                            var obj = {
                                                                 userId: postResult.userId,
                                                                 senderId: req.body.userId,
                                                                 title: "Post Commented",
                                                                 body: `${result.firstName} commented on your post`,
                                                                 senderIdMessage: `${result.firstName} commented ${postResult.userId.firstName}'s post`,
                                                                 notificationType: "Post commented"
                                                            };
                                                            new notificationModel(obj).save((saveErr, saveResult) => {
                                                                 if (saveErr) {
                                                                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                 }
                                                                 else {
                                                                      postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                                                           { $push: { comments: comment } },
                                                                           { new: true },
                                                                           (err2, result2) => {
                                                                                if (err2) {
                                                                                     return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                                } else {
                                                                                     return res.send({ responseCode: 200, responseMessage: "Comment added successfully", comments: result2 })
                                                                                }
                                                                           }
                                                                      )
                                                                 }
                                                            })
                                                       }
                                                  })
                                             }
                                        } else if (req.body.like == "false") {
                                             postModel.findOne({
                                                  _id: req.body.postId,
                                                  postStatus: "ACTIVE",
                                                  likes: { $elemMatch: { likedId: result._id } }
                                             }, (err3, result3) => {
                                                  if (err3) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  } else if (!result3) {
                                                       return res.send({ responseCode: 404, responseMessage: "User havent liked yet" })
                                                  } else {
                                                       const dislike = _.filter(result3.likes, _.matches({ likedId: result._id }));
                                                       postModel.findByIdAndUpdate({ _id: req.body.postId }, { $pull: { likes: dislike[0] } }, { new: true }, (err4, result4) => {
                                                            if (err4) {
                                                                 return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                            } else if (!result4) {
                                                                 return res.send({ responseCode: 404, responseMessage: "Unable to update" })
                                                            } else {
                                                                 return res.send({ responseCode: 200, responseMessage: "Disliked sucessfully", result: result4 })
                                                            }

                                                       })

                                                  }
                                             })
                                        } else if (req.body.comments == "false") {
                                             postModel.findOne({
                                                  _id: req.body.postId,
                                                  postStatus: "ACTIVE",
                                                  comments: { $elemMatch: { _id: req.body.commentId } }
                                             }, (err3, result3) => {
                                                  if (err3) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  } else if (!result3) {
                                                       return res.send({ responseCode: 404, responseMessage: "User havent commented yet" })
                                                  } else {
                                                       console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK", req.body)
                                                       const deleteComment = _.filter(result3.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commentId) }));
                                                       console.log("lllllllllllllll", deleteComment)
                                                       postModel.findByIdAndUpdate({ _id: req.body.postId }, { $pull: { comments: deleteComment[0] } }, { new: true }, (err4, result4) => {
                                                            if (err4) {
                                                                 return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                            } else if (!result4) {
                                                                 return res.send({ responseCode: 404, responseMessage: "Unable to update" })
                                                            } else {
                                                                 return res.send({ responseCode: 200, responseMessage: "Comment deleted successfully", result: result4 })
                                                            }

                                                       })

                                                  }
                                             })
                                        }
                                   }
                              })

                         }
                    })
               }
          } catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },

     viewPostLikesAndComment: (req, res) => {
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (err, result) => {
                         if (err) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err1, result1) => {
                                   if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                   } else if (!result1) {
                                        return res.send({ responseCode: 404, responseMessage: "Post not found" })
                                   } else {
                                        if (req.body.show == "comments") {
                                             const comments = result1.comments;
                                             return res.send({ responseCode: 200, responseMessage: "Comments found successfully", comments: comments })
                                        } else if (req.body.show == "likes") {
                                             const likes = result1.likes;
                                             return res.send({ responseCode: 200, responseMessage: "Likes found successfully", likes: likes })
                                        }
                                        else if (req.body.show == "replyComments") {
                                             const replyComments = result1.replyComments;

                                             return res.send({ responseCode: 200, responseMessage: "Reply comments found successfully", replyComments: replyComments })
                                        }
                                   }
                              })
                         }
                    })
               }
          } catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     viewPost: (req, res) => {
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                         if (err) {
                              console.log("LLLLLLLLLLLLLLLwwLLLL", err)
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 5,
                                   // select: "title description picVideo likes comments",
                                   sort: {
                                        createdAt: -1
                                   },
                                   populate: { path: 'userId', select: 'profilePic firstName lastName', match: { status: "ACTIVE" } }
                              }
                              postModel.paginate({ postStatus: "ACTIVE", privacy: "PUBLIC" }, options
                                   , (err1, result1) => {
                                        if (err1) {
                                             console.log("LLLLLLLLLLLLLLLLeeLLL", err1)
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (result1.length == 0) {

                                             return res.send({ responseCode: 404, responseMessage: "Post not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "Post found successfully", result: result1 })
                                        }
                                   })
                         }
                    })
               }
          } catch (error) {
               console.log("626=====?",error)
               res.send({ responseCode: 500, responseMessege: "Something went wrong", error})
          }
     },

     myPost: (req, res) => {
          try {
               if (req.body.userId) {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                         if (err) {
                              console.log("LLLLLLLLLLLLLLLwwLLLL", err)
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              var allId=[result._id,...result.friendList.map(i=>i.friendId)];
                              console.log("The all ids are.......",allId)
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 100,
                                   // select: "title description picVideo likes comments",
                                   sort: {
                                        createdAt: -1
                                   },
                                   populate: { path: 'userId', select: 'profilePic', match: { status: "ACTIVE" } }
                              }
                              postModel.paginate({ "userId": { $in: allId }, postStatus: "ACTIVE" }, options
                                   , (err1, result1) => {
                                        if (err1) {
                                             console.log("LLLLLLLLLLLLLLLLeeLLL", err1)
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (result1.length == 0) {

                                             return res.send({ responseCode: 404, responseMessage: "Post not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "Post found successfully", result: result1 })
                                        }
                                      })
                         }
                    })
               }
          } catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     myAllPhoto: (req, res) => {
          postModel.aggregate([
               { $match: { postStatus: "ACTIVE" } },
               {
                    $project: {
                         _id: 1,
                         "image": 1,
                    }
               }
          ], (err, advData) => {
               if (err) {
                    res.send({ responseCode: 404, responseMessage: "Internal server error", err })
               }
               if (advData) {
                    res.send({ responseCode: 200, responseMessage: "Get data", ...advData })
               }
          })
     },
     hideAndDeletePost: (req, res) => {
          console.log("6551=====>>", req, res)
          try {
               if (!req.body.userId && !req.body.postId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (err, result) => {
                         console.log("6557====>", err, result)
                         if (err) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              if (req.body.type == "HIDE") {
                                   postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                        {
                                             $set: { postStatus: "HIDE" }
                                        },
                                        { new: true },
                                        (err1, result1) => {
                                             if (err1) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             } else {
                                                  return res.send({ responseCode: 200, responseMessage: "Post hide successfully", result: result1 })
                                             }
                                        })
                              }
                              if (req.body.type == "DELETE") {
                                   postModel.findOneAndUpdate({ _id: req.body.postId, userId: result._id, postStatus: "ACTIVE" },
                                        {
                                             $set: { postStatus: "DELETE" }
                                        },
                                        { new: true },
                                        (err1, result1) => {
                                             console.log("ggggggggggggggggggggggggggggggggggg", result, "dfdhgfjghkjhkhj", result1)
                                             if (err1) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             }
                                             else if (!result1) {
                                                  return res.send({ responseCode: 404, responseMessage: "Post not found" })
                                             } else {
                                                  return res.send({ responseCode: 200, responseMessage: "Post delete successfully", result: result1 })
                                             }
                                        })
                              }

                         }
                    })
               }
          } catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     editPostLikesAndComment: (req, res) => { 
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               }
               else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                         if (err) {
                              console.log("KKKKKKKKKKKKKKKKK0", err)
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })

                         }
                         else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         }
                         else {
                              postModel.findOne({ _id: req.body.postId, postStatus: { $ne: "DELETE" } }, (err1, result1) => {
                                   if (err1) {
                                        console.log("KKKKKKKKKKKKKKKKK088", err1)
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })

                                   }
                                   else if (!result1) {
                                        return res.send({ responseCode: 404, responseMessage: "Post not found" })

                                   }
                                   else {
                                        const editComments = _.filter(result1.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commentId) }));
                                        const newComment = {
                                             _id: editComments[0]._id,
                                             commentedUser: editComments[0].commentedUser,
                                             comment: req.body.comment,
                                             userName: editComments[0].userName,
                                             userPic: editComments[0].userPic,
                                             commentedTime: new Date()
                                        }
                                        postModel.findOneAndUpdate({ 'comments._id': req.body.commentId, postStatus: "ACTIVE" }, { $set: { "comments.$": newComment } }, { new: true }, (err2, result2) => {
                                             if (err2) {
                                                  console.log("KKKKKKKKKKKKKKKKK066", err2)
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })

                                             }
                                             else if (!result2) {
                                                  return res.send({ responseCode: 404, responseMessage: "Post not found" })

                                             }
                                             else {
                                                  return res.send({ responseCode: 200, responseMessage: "Comment successfully edited", result2 })
                                             }
                                        })
                                   }
                              })
                         }
                    })
               }
          }
          catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     postViewers: (req, res) => {
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               } else {
                    user.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (err, result) => {
                         if (err) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err2, result2) => {
                                   if (err2) {
                                        console.log("jjjjjjj", err2)
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                   } else if (!result2) {
                                        return res.send({ responseCode: 404, responseMessage: "Post not found" })
                                   } else {
                                        // var count =result2.viewers;
                                        // count=count+1
                                        postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" },
                                             {
                                                  $addToSet: { viewers: result._id }
                                             },
                                             { new: true },
                                             (err1, result1) => {
                                                  if (err1) {
                                                       console.log("jjjjjjj", err1)
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  } else {
                                                       let viewers = result1.viewers.length;
                                                       return res.send({ responseCode: 200, responseMessage: "Post view successfully", result: viewers })
                                                  }
                                             })

                                   }
                              })
                         }
                    })
               }
          } catch (error) {
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },
     replyCommentInPost: (req, res) => {
          try {
               user.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, result) => {
                    if (userError) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!result) {
                         return res.send({ responseCode: 404, responseMessage: "User not found" })
                    }
                    else {
                         postModel.findOne({ _id: req.body.postId, "comments._id": req.body.commentId, postStatus: "ACTIVE" }).populate('comments.commentedUser', 'fcmToken firstName').select({ 'comments.$._id': 1 }).exec((err, postResult) => {
                              if (err) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                              }
                              else if (!postResult) {
                                   return res.send({ responseCode: 404, responseMessage: "Post not found" })
                              }
                              else {
                                   var deviceToken = postResult.comments[0].commentedUser.fcmToken;
                                   var comment = {
                                        commentId: req.body.commentId,
                                        commentedUser: result._id,
                                        comment: req.body.comment,
                                        userName: `${result.firstName} ${result.lastName}`,
                                        userPic: result.profilePic,
                                        commentedTime: new Date()
                                   };
                                   if (deviceToken == null) {
                                        var obj = {
                                             userId: postResult.comments[0].commentedUser._id,
                                             senderId: req.body.userId,
                                             title: "Reply on comment",
                                             body: `${result.firstName} replied on your comment.`,
                                             senderIdMessage: `${result.firstName} replied on ${postResult.comments[0].commentedUser.firstName} comment`,
                                             notificationType: "Comment replied in post"
                                        };
                                        new webNotification(obj).save((saveErr, saveResult) => {
                                             if (saveErr) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             }
                                             else {
                                                  postModel.findOneAndUpdate({ _id: req.body.postId, "comments._id": req.body.commentId, postStatus: "ACTIVE" },
                                                       { $push: { replyComments: comment } },
                                                       { new: true },
                                                       (err2, result2) => {
                                                            if (err2) {
                                                                 console.log("13107======>", err2, result2)

                                                                 return res.send({ responseCode: 500, responseMessage: "Internal server error", err2 })
                                                            } else {
                                                                 return res.send({ responseCode: 200, responseMessage: "Comment added successfully", comments: result2 })
                                                            }
                                                       }
                                                  )
                                             }
                                        })
                                   }
                                   else {
                                        commonFunction.pushNotification(deviceToken, "Reply on comment", `${result.firstName} replied on your comment.`, (err, notificationResult) => {
                                             if (err) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             }
                                             else {
                                                  var obj = {
                                                       userId: postResult.comments[0].commentedUser._id,
                                                       senderId: req.body.userId,
                                                       title: "Reply on comment",
                                                       body: `${result.firstName} replied on your comment.`,
                                                       senderIdMessage: `${result.firstName} replied on ${postResult.comments[0].commentedUser.firstName} comment`,
                                                       notificationType: "Comment replied in post"
                                                  };
                                                  new notificationModel(obj).save((saveErr, saveResult) => {
                                                       if (saveErr) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                       }
                                                       else {
                                                            postModel.findOneAndUpdate({ _id: req.body.postId, "comments._id": req.body.commentId, postStatus: "ACTIVE" },
                                                                 { $push: { replyComments: comment } },
                                                                 { new: true },
                                                                 (err2, result2) => {
                                                                      if (err2) {
                                                                           console.log("13107======>", err2, result2)

                                                                           return res.send({ responseCode: 500, responseMessage: "Internal server error", err2 })
                                                                      } else {
                                                                           return res.send({ responseCode: 200, responseMessage: "Comment added successfully", comments: result2 })
                                                                      }
                                                                 }
                                                            )
                                                       }
                                                  })
                                             }
                                        })
                                   }

                              }
                         })
                    }
               })
          }
          catch (error) {
               console.log("1216====>",error)
               res.send({ responseCode: 500, responseMessege: "Something went wrong",error})
          }
     },
}
