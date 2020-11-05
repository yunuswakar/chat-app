const userModel = require('../models/userModel');
const eventModel = require('../models/eventModel')
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction')
const mongoose = require("mongoose")
const notiicationModel = require('../models/notificationModel')
const roomModel = require('../models/roomModel')
var multiparty = require("multiparty");
const eventCategoryModel = require('../models/eventCategoryModel')
const bcrypt = require("bcrypt-nodejs");
const _ = require("lodash")

var jwt = require('jsonwebtoken');


module.exports = {



    /**
   * Function Name :createEvent
   * Description   : Create post by user
   *
   * @return response
  */

    createEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                console.log("JDJJFJ", err, result)

                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (req.body.eventType == "OFFLINE") {
                        
                        var event = {
                            userId: result._id,
                            profilePic: result.profilePic,
                            name: result.name,
                            eventType: req.body.eventType,
                            eventCategoryId: req.body.eventCategoryId,
                            title: req.body.title,
                            participant: req.body.participant,
                            date: req.body.date,
                            time: req.body.time,
                            //invite:req.body.invite,
                            pricePerPerson: req.body.pricePerPerson,
                            location: {
                                type: "Point",
                                coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                            }
                        }
                       
                        if (req.body.privacy == "Friends") {
                            console.log("i am in", result.friends)
                            event.privacy = "Friends"
                            event.timeLine = []
                            result.friends.forEach(x => {
                                event.timeLine.push(x.friendId)
                            })
                        }
                        if (req.body.privacy == "Friends of Friends") {
                            event.privacy = "Friends of Friends"
                            event.timeLine = req.body.friendId;
                        }
                        if (req.body.privacy == "Only Selected friends") {
                            event.privacy = "Only Selected friends"
                            event.timeLine = req.body.friendId

                        }
                        if (req.body.privacy == "ONLYME") {
                            event.privacy = "ONLYME"
                        }


                        eventModel.create(event, async (error, eventData) => {
                            console.log("gagagagg", error, eventData)
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.EVENT_CREATED)
                            }
                        })
                    }
                    else if (req.body.eventType == "ONLINE_GENERAL") {


                        var event1 = {
                            userId: result._id,
                            name: result.name,
                            profilePic: result.profilePic,
                            eventType: "ONLINE_GENERAL",
                            onlineEventType: req.body.onlineEventType,
                            title: req.body.title,
                            participant: req.body.participant,
                            date: req.body.date,
                            time: req.body.time,
                        }

                        if (req.body.privacy == "Friends") {
                            console.log("i am in", result.friends)
                            event1.privacy = "Friends"
                            event1.timeLine = []
                            result.friends.forEach(x => {
                                event1.timeLine.push(x.friendId)
                            })
                        }
                        if (req.body.privacy == "Friends of Friends") {
                            event1.privacy = "Friends of Friends"
                            event1.timeLine = req.body.friendId;
                        }
                        if (req.body.privacy == "Only Selected friends") {
                            event1.privacy = "Only Selected friends"
                            event1.timeLine = req.body.friendId

                        }

                        eventModel.create(event1, async (error, eventData) => {
                            console.log("gagagagg", error, eventData)
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.EVENT_CREATED)
                            }
                        })

                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
   * Function Name :editEvent
   * Description   : edit event by host
   *
   * @return response
  */

    editEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                console.log("JDJJFJ", err, result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    eventModel.findOne({ _id: req.body.eventId, userId: result._id, status: "ACTIVE" }, async (error, eventData) => {
                        console.log("i am in post", error, eventData)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!eventData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            var set = {}
                            if (req.body.description) {
                                set["description"] = req.body.description
                            }
                            if (req.body.eventCategoryId) {
                                set["eventCategoryId"] = req.body.eventCategoryId
                            }
                            if (req.body.location) {
                                set["location"] = req.body.location
                            }
                            if (req.body.pricePerPerson) {
                                set["pricePerPerson"] = req.body.pricePerPerson
                            }
                            if (req.body.participant) {
                                set["participant"] = req.body.participant
                            }
                            if (req.body.privacy) {
                                set["privacy"] = req.body.privacy
                            }
                            eventModel.findOneAndUpdate({ _id: req.body.eventId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, async (updateErr, updateData) => {
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_UPDATE);
                                }
                            })

                        }
                    })
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
* Function Name :editEvent
* Description   : edit event by host
*
* @return response
*/

    editOnlineEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                console.log("JDJJFJ", err, result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    eventModel.findOne({ _id: req.body.eventId, userId: result._id, status: "ACTIVE" }, async (error, eventData) => {
                        console.log("i am in post", error, eventData)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!eventData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            var set = {}
                            if (req.body.title) {
                                set["title"] = req.body.title
                            }
                            if (req.body.eventCategoryId) {
                                set["eventCategoryId"] = req.body.eventCategoryId
                            }
                            if (req.body.location) {
                                set["location"] = req.body.location
                            }
                            if (req.body.pricePerPerson) {
                                set["pricePerPerson"] = req.body.pricePerPerson
                            }
                            if (req.body.participant) {
                                set["participant"] = req.body.participant
                            }
                            if (req.body.privacy) {
                                set["privacy"] = req.body.privacy
                            }
                            if (req.body.date) {
                                set["date"] = req.body.date
                            }
                            if (req.body.time) {
                                set["time"] = req.body.time
                            }


                            eventModel.findOneAndUpdate({ _id: req.body.eventId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, async (updateErr, updateData) => {
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_UPDATE);
                                }
                            })

                        }
                    })
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
         * Function Name :deleteEvent
         * Description   : own event delete by user
         *
         * @return response
        */
    deleteEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    eventModel.findOneAndUpdate({ _id: req.body.eventId, userId: userData._id, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (eventErr, eventData) => {
                        if (eventErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!eventData) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.EVENT_DELETE);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    addEventCategory: (req, res) => {
        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
            console.log("i am in user", UserErr, userData)
            if (UserErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            } else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            } else {
                eventCategoryModel.findOne({ eventCategoryName: req.body.eventCategoryName, status: { $ne: "DELETE" } }, async (error, eventCategory) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    }
                    else if (eventCategory) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.ALREADY_EXITS)
                    }
                    else {
                        if (req.body.image) {
                            var pic = await convertImage()
                        }
                        var data = {
                            eventCategoryName: req.body.eventCategoryName,
                            image: pic
                        }
                        var obj = new eventCategoryModel(data)
                        obj.save((saveError, save) => {
                            if (saveError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED)
                            }
                        })
                        //*********************Function for profile pic upload *************************************/
                        function convertImage() {
                            return new Promise((resolve, reject) => {
                                commonFunction.uploadImage(req.body.image, (imageError, upload) => {
                                    if (imageError) {
                                        console.log("Error uploading image")
                                    }
                                    else {
                                        resolve(upload)
                                    }
                                })
                            })
                        }
                    }
                })
            }
        })
    },

    /**
         * Function Name :eventCategoryList
         * Description   : event Category List of seen by user
         *
         * @return response
        */
    eventCategoryList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var query = {};
                    var options = {
                        page: req.body.pageNumber || 1,
                        sort: { createdAt: -1 },
                        limit: req.body.limit || 5
                    };
                    eventCategoryModel.paginate(query, options, (err, paginateData) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (paginateData.docs.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, paginateData, SuccessMessage.DETAIL_GET)

                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    /**
             * Function Name :cancelEvent
             * Description   : own event cancle by host
             *
             * @return response
            */
    cancelEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    eventModel.findOneAndUpdate({ _id: req.body.eventId, userId: userData._id, status: "ACTIVE" }, { $set: { status: "CANCEL" } }, { new: true }, (eventErr, eventData) => {
                        if (eventErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!eventData) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.EVENT_DELETE);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    joinEventRequest: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    eventModel.findOne({ _id: req.body.eventId, status: "ACTIVE" }, (eventErr, eventData) => {
                        if (eventErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!eventData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            var event = {
                                requestedId: userData._id,
                                eventId: eventData._id,
                                status: "PENDING"
                            }
                            eventModel.findOneAndUpdate({ _id: req.body.eventId, status: "ACTIVE" }, { $push: { joinRequest: event } }, { new: true }, (updateErr, updateData) => {
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                } else if (!updateData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                } else {

                                    var notification = new notiicationModel({
                                        requestedId: userData._id,
                                        eventId: eventData._id,
                                        messege: "requested for join event",
                                        joinRequest: "PENDING"
                                    })
                                    notification.save((saveErr, savedData) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_JOIN_REQUEST);

                                        }
                                    })
                                    // response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_JOIN_REQUEST);
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
* Function Name :createAntakshriEvent
* Description   : Create post by user
*
* @return response
*/
    createAntakshriEvent: (req, res) => {
        //console.log("immmmmmmmmmm11",req.body)
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                // console.log("JDJJFJ", err, result)

                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    var event = {
                        userId: result._id,
                        name: result.name,
                        refreePic: result.profilePic,
                        profilePic: result.profilePic,
                        temp_key: "101",// this for uniqueness  while getting list of all events
                        eventType: "ONLINE_ANTAKSHRI",
                        title: req.body.title,
                        participant: req.body.participant,
                        date: req.body.date,
                        time: req.body.time,
                        refree: req.body.refree,
                        suggestedThinkingTime: req.body.suggestedThinkingTime,
                        votingSystem: req.body.votingSystem

                    }

                    if (req.body.privacy == "Friends") {
                        console.log("i am in", result.friends)
                        event.privacy = "Friends"
                        event.timeLine = []
                        result.friends.forEach(x => {
                            event.timeLine.push(x.friendId)
                        })
                    }
                    if (req.body.privacy == "Friends of Friends") {
                        event.privacy = "Friends of Friends"
                        event.timeLine = req.body.friendId;
                    }
                    if (req.body.privacy == "Only Selected friends") {
                        event.privacy = "Only Selected friends"
                        event.timeLine = req.body.friendId

                    }

                    eventModel.create(event, async (error, eventData) => {
                        console.log("gagagagg", error, eventData)
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.EVENT_CREATED)
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


                // createAntakshriEvent: (req, res) => {
                //     //console.log("immmmmmmmmmm11",req.body)
                //     try {
                //         userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                //            // console.log("JDJJFJ", err, result)

                //             if (err) {
                //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                //             }
                //             else if (!result) {
                //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                //             }
                //             else {

                //                 if (req.body.image) {
                //                     var imageUrl = await convertImage()
                //                 }
                //                 if (req.body.video) {
                //                     var videoUrl = await convertVideo()
                //                 }

                //                 var event = {
                //                     userId: result._id,
                //                     name:result.name,
                //                     refreePic:result.profilePic,
                //                     profilePic:result.profilePic,
                //                     temp_key: "101",// this for uniqueness  while getting list of all events
                //                     eventType: "ONLINE_ANTAKSHRI",
                //                     image: imageUrl,
                //                     video: videoUrl,
                //                     title: req.body.title,
                //                     participant: req.body.participant,
                //                     date: req.body.date,
                //                     time: req.body.time,
                //                     refree: req.body.refree,
                //                     suggestedThinkingTime: req.body.suggestedThinkingTime,
                //                     votingSystem: req.body.votingSystem

                //                 }

                //                 if (req.body.privacy == "Friends") {
                //                     console.log("i am in", result.friends)
                //                     event.privacy = "Friends"
                //                     event.timeLine = []
                //                     result.friends.forEach(x => {
                //                         event.timeLine.push(x.friendId)
                //                     })
                //                 }
                //                 if (req.body.privacy == "Friends of Friends") {
                //                     event.privacy = "Friends of Friends"
                //                     event.timeLine = req.body.friendId;
                //                 }
                //                 if (req.body.privacy == "Only Seleted friends") {
                //                     event.privacy = "Only Seleted friends"
                //                     event.timeLine = req.body.friendId

                //                 }
                //                 if (req.body.privacy == "ONLYME") {
                //                     event.privacy = "ONLYME"
                //                 }

                //                 eventModel.create(event, async (error, eventData) => {   
                //                     console.log("gagagagg", error, eventData)
                //                     if (error) {
                //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                //                     }
                //                     else {
                //                         response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.EVENT_CREATED)
                //                     }
                //                 })


                //                 //*************************function for image upload*****************************/

                //                 function convertImage() {
                //                     return new Promise((resolve, reject) => {
                //                         commonFunction.multipleImageUploadCloudinary(req.body.image, (error, upload) => {
                //                             if (error) {
                //                                 console.log("Error uploading image")
                //                             }
                //                             else {
                //                                 resolve(upload)
                //                             }
                //                         })
                //                     })
                //                 }
                //                 //*************************function for video upload*****************************/
                //                 function convertVideo() {
                //                     return new Promise((resolve, reject) => {
                //                         commonFunction.multipleVideoUploadCloudinary(req.body.video, (videoErr, uploadData) => {
                //                             console.log("i am in video")
                //                             if (videoErr) {
                //                                 console.log("error while video Uploading")
                //                             }
                //                             else {
                //                                 resolve(uploadData)
                //                             }
                //                         })
                //                     })
                //                 }
                //             }
                //         })
                //     }
                //     catch (error) {
                //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                //     }
                // },

                acceptRejectJoinRequest: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                eventModel.findOne({ _id: req.body.eventId, status: "ACTIVE" }, (eventError, eventData) => {
                                    if (eventError) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    } else if (!eventData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                    }
                                    else {
                                        if (req.body.response == "ACCEPT") {
                                            console.log("KDJDHD333333H", eventData.participant.length)
                                            if (eventData.participant.length <= 10) {
                                                const request = _.filter(eventData.joinRequest, _.matches({ _id: mongoose.Types.ObjectId(req.body.joinId) }));
                                                console.log("hdhdhshsg44hgssgsg", request[0]._id)
                                                const newJoinReq = {
                                                    _id: request[0]._id,
                                                    requestedId: request[0].requestedId,
                                                    eventId: request[0].eventId,
                                                    status: "ACCEPTED"
                                                    // userPic:editComments[0].userPic,
                                                    // commentedTime:new Date()
                                                }
                                                eventModel.findOneAndUpdate({ "joinRequest._id": req.body.joinId }, { $set: { "joinRequest.$": newJoinReq } }, { new: true }, (updateError, updateData) => {
                                                    if (updateError) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    } else if (!updateData) {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                                    }
                                                    else {
                                                        const newObj = ({
                                                            joinRequest: "ACCEPT",
                                                            messege: "request for event join accepted"
                                                        })
                                                        notiicationModel.findOneAndUpdate({ eventId: eventData._id }, { $set: newObj }, { new: true }, (notErr, notData) => {
                                                            console.log("ddhdhdhdgdgdgdg666", notErr, notData)
                                                            if (notErr) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            } else if (!notData) {
                                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                                            }
                                                            else {
                                                                response(res, SuccessCode.SUCCESS, [notData], SuccessMessage.EVENT_JOIN_ACCEPT);

                                                            }
                                                        })
                                                        // response(res, SuccessCode.SUCCESS, [updateData], SuccessMessage.EVENT_JOIN_ACCEPT);

                                                    }
                                                })

                                            }
                                            else {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.EVENT_LIMIT);
                                            }
                                        }

                                        else {
                                            const request = _.filter(eventData.joinRequest, _.matches({ _id: mongoose.Types.ObjectId(req.body.joinId) }));
                                            console.log("hdhdhshsg44hgssgsg", request[0])

                                            eventModel.findOneAndUpdate({ _id: req.body.eventId }, { $pull: { joinRequest: request[0] } }, { new: true }, (updateError, updateData) => {
                                                if (updateError) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                } else if (!updateData) {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                                }
                                                else {
                                                    const newObj = ({
                                                        joinRequest: "REJECT",
                                                        messege: "request for event join rejected"
                                                    })
                                                    notiicationModel.findOneAndUpdate({ eventId: eventData._id }, { $set: newObj }, { new: true }, (notErr, notData) => {
                                                        console.log("ddhdhdhdgdgdgdg666", notErr, notData)
                                                        if (notErr) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        } else if (!notData) {
                                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                                        }
                                                        else {
                                                            response(res, SuccessCode.SUCCESS, [updateData], SuccessMessage.EVENT_JOIN_REJECT);

                                                        }
                                                    })
                                                    // response(res, SuccessCode.SUCCESS, [updateData], SuccessMessage.EVENT_JOIN_REJECT);

                                                }
                                            })


                                        }
                                    }
                                })
                            }
                        })
                    }
                    catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

                    }
                },


                notificationList: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                            console.log("dhdgddgdg", error, userData)
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                notiicationModel.find({ userId: userData._id }).sort({ createdAt: -1 }).exec((notificationErr, notificationData) => {
                                    console.log("dhdgdd7777777gdg", notificationErr, notificationData)
                                    if (notificationErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (notificationData.length == 0) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, [notificationData], SuccessMessage.DATA_FOUND);

                                    }
                                })
                            }
                        })
                    } catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

                    }
                },

                myEventList: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                            console.log("dhdgddgdg", error, userData)
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                var options = {
                                    sort: { created_at: -1 },
                                    page: req.body.pageNumber || 1,
                                    limit: req.body.limit || 10
                                };
                                eventModel.paginate({ userId: userData._id }, options, (eventErr, eventData) => {
                                    if (eventErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (eventData.docs == 0) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.DATA_FOUND);

                                    }
                                })
                            }
                        })
                    } catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

                    }
                },
                /**
            * Function Name :viewEvent
            * Description   : viewEvent by user
            *
            * @return response
            */

                viewEvent: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                eventModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (eventErr, eventData) => {
                                    if (eventErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!eventData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.DATA_FOUND);

                                    }
                                })
                            }
                        })
                    } catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

                    }
                },
                /**
            * Function Name :createRoom
            * Description   : Create Room by user
            *
            * @return response
            */

                createRoom: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                            console.log("JDJJFJ", err, result)

                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {

                                var room = {
                                    title: req.body.title,
                                    gender: req.body.gender,
                                    ageRange: req.body.ageRange,
                                    joinStatus: true

                                }
                                roomModel.create(room, (error, roomData) => {
                                    console.log("iam", error, roomData)
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, roomData, SuccessMessage.VIDEO_CALL)
                                    }
                                })
                            }
                        })
                    }
                    catch (error) {
                        console.log("i am in catch", error)
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    }
                },
                /**
               * Function Name :editAntakshri
               * Description   : edit event by host
               *
               * @return response
              */

                editAntakshri: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                            console.log("JDJJFJ", err, result)
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                eventModel.findOne({ _id: req.body.eventId, eventType: "ONLINE_ANTAKSHRI", userId: result._id, status: "ACTIVE" }, async (error, eventData) => {
                                    console.log("i am in post", error, eventData)
                                    if (error) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!eventData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                    }
                                    else {
                                        var set = {}
                                        if (req.body.title) {
                                            set["title"] = req.body.title
                                        }
                                        if (req.body.date) {
                                            set["date"] = req.body.date
                                        }
                                        if (req.body.time) {
                                            set["tine"] = req.body.time
                                        }
                                        if (req.body.suggestedThinkingTime) {
                                            set["suggestedThinkingTime"] = req.body.suggestedThinkingTime
                                        }
                                        if (req.body.votingSystem) {
                                            set["votingSystem"] = req.body.votingSystem
                                        }
                                        if (req.body.refree) {
                                            set["refree"] = req.body.refree
                                        }
                                        if (req.body.participant) {
                                            set["participant"] = req.body.participant
                                        }
                                        if (req.body.privacy) {
                                            set["privacy"] = req.body.privacy
                                        }
                                        eventModel.findOneAndUpdate({ _id: req.body.eventId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, async (updateErr, updateData) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_UPDATE);
                                            }
                                        })

                                    }
                                })
                            }
                        })

                    }
                    catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    }
                },


               


                // networkEventList: (req, res) => {
                //     userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                //         console.log("JDJJFJ", err, result)
                //         if (err) {
                //             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                //         }
                //         else if (!result) {
                //             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                //         }
                //         else {
                //                    //response(res, SuccessCode.SUCCESS, result1, SuccessMessage.DATA_FOUND);
                //                     eventModel.findOne({ timeLine: { $in: req.headers._id },eventType:{$in:["ONLINE_ANTAKSHRI","ONLINE_GENERAL"]},status:"ACTIVE"}, (err2, result2) => {
                //                         if(err2){
                //                             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                //                         }
                //                         else if(!result2){
                //                             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                //                         }
                //                         else{
                //                            // response(res, SuccessCode.SUCCESS, result1, SuccessMessage.DATA_FOUND);
                //                            let options = {
                //                             page: req.body.pageNumber || 1,
                //                             limit: req.body.limit || 5,
                //                             sort: {
                //                                 createdAt: -1
                //                             },
                //                         }
                //                            eventModel.paginate({ userId:result._id },options, (err3, result3) => {
                //                             if(err3){
                //                                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                //                             }
                //                             else if(!result3){
                //                                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                //                             }
                //                             else{
                //                                 //const newArr = result2.concat(result2);
                //                                response(res, SuccessCode.SUCCESS, result2,result3, SuccessMessage.DATA_FOUND)


                //                             }
                //                         })

                //                         }

                //                     })

                //         }
                //     })
                // },
                networkEventList: (req, res) => {
                    userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                        console.log("JDJJFJ", err, result)
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            eventModel.find({ status: "ACTIVE" }).sort({ createdAt: -1 }).exec({ eventType: { $in: ["ONLINE_ANTAKSHRI", "ONLINE_GENERAL"] } }, (err1, result1) => {
                                console.log("im here", result1)
                                if (err1) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!result1) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, result1, SuccessMessage.DATA_FOUND);
                                    
                                }
                            })
                        }
                    })
                },
                uploadImageAndVideo: async(req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                            console.log("JDJJFJ", err, result)
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                var form = new multiparty.Form();
                                //console.log("reqqqqqqqqqqq",req)
                                form.parse(req,async (error, field, files) => {
                                    //console.log("the uploading information....", files);
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    }
                                    else {   
                                        console.log("the uploading information....", files);
                                           var set = {}
                                           if(files.image){
                                            var imgArray =files.image.map((item)=>(item.path))
                                            // console.log(">>>>>>>>>>>>>>>>>>>>>>>11",imgArray)
                                               function convertImage() {
                                            return new Promise((resolve, reject) => {
                                               // console.log("in promise",imgArray)
                                                commonFunction.multipleImageUploadCloudinary(imgArray, (imageError, upload) => {
                                                   // console.log("i m in cloudinary",imageError,upload)
                                                    if (imageError) {
                                                        console.log("Error uploading image",)
                                                    }
                                                    else {
                                                        resolve(upload)
                                                    }
                                                })
                                            })
                                        }}
                                    if(files.video){
                                        var videoArray =files.video.map((item)=>(item.path))                                   
                                      function convertVideo() {
                                          return new Promise((resolve, reject) => {
                                              commonFunction.multipleVideoUploadCloudinary(videoArray, (videoErr, uploadData) => {
                                                 // console.log("i am in video",videoErr,uploadData)
                                                  if (videoErr) {
                                                      console.log("error while video Uploading")
                                                  }
                                                  else {
                                                      resolve(uploadData)
                                                  }
                                              })
                                          })
                                      }

                                    }
                                           
                                       
                                        if (files.image) {
                                           // console.log(">>>>>>>44",files.image)
                                            set["image"] = await convertImage()
                                           // console.log(">>>>>>>>>>>>>55",set.image)
                                        }
                                        if (files.video) {
                                            set["video"] = await convertVideo()
                                        }
                                      // console.log("im set",set)
                                        
                                        eventModel.findOneAndUpdate({ _id: req.headers.media_id}, { $set: set }, { new: true }, async (updateErr, updateData) => {
                                            console.log("here in update",updateErr,updateData)
                                            if (updateErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if(!updateData){
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_UPDATE);
                                            }
                                        })
                                      
                                    }
                                })
            
                                    }
                                })
            
                            }
                    catch (error) {
                        console.log("i m in catch",error)
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            
                            }
                        },
                // test:(req, res) => {
                //     userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async(err, result) => {
                //         console.log("JDJJFJ", err, result)
                //         if (err) {
                //             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                //         }
                //         else if (!result) {
                //             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                //         }
                //         else {
                //             var form = new multiparty.Form();
                //             form.parse(req, (error, field, files) => {
                //                 console.log("the uploading information....",files);
                //                 if (error) {
                //                     response( res, ErrorCode.SOMETHING_WRONG,[], ErrorMessage.SOMETHING_WRONG);
                //                 }
                //                 else{
                //                     let imgArray =files.image.map((item)=>(item.path))
                //                     console.log("i mmmm",imgArray)
                //                     commonFunction.multipleImageUploadCloudinary( imgArray,(imgErr,imgData)=>{
                //                         console.log("i am here",imgErr,imgData)
                //                         if(imgErr){
                //                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                //                         }
                //                         else{
                //                             var event1 = {
                //                                 userId: result._id,
                //                                 eventType: "ONLINE_GENERAL",
                //                                 image: imgData
                //                             }
                //                             eventModel.create(event1, async (error1, eventData) => {
                //                                 console.log("gagagagg", error, eventData)
                //                                 if (error1) {
                //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                //                                 }
                //                                 else {
                //                                     response(res, SuccessCode.SUCCESS, eventData, SuccessMessage.EVENT_CREATED)
                //                                 }
                //                             })

                //                         }
                //                     })




                //                 //*************************function for image upload*****************************/

                //                 }
                //         })
                //     }
                //     })
                // },

                joinEventRequestList: (req, res) => {
                    try {
                        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (err, result) => {
                            console.log("JDJJFJ", err, result)

                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                eventModel.findOne({ _id: req.body.eventId, userId: result._id, status: "ACTIVE" }, (eventErr, eventData) => {
                                    if (eventErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!eventData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        var arr = eventData.joinRequest
                                        var arr1 = [];
                                        var arr2 = [];
                                        arr.forEach(x => {
                                            console.log("3290>>>>>>>>>>>", x);
                                            if (x.status == "PENDING") {
                                                arr1.push(x.requestedId);
                                                arr2.push(x._id);
                                            }
                                        });
                                        let options = {
                                            page: req.body.pageNumber || 1,
                                            limit: req.body.limit || 5,
                                            sort: {
                                                createdAt: -1
                                            }
                                        }
                                        userModel.paginate({ _id: arr1 }, options, (err1, success11) => {
                                            if (err1) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            } else if (!success11) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                            } else {
                                                var result1 = {
                                                    joinRequestedUserId: arr1,
                                                    requestedId: arr2,
                                                    joinRequest: arr

                                                };
                                                response(res, SuccessCode.SUCCESS, result1,successMessage.DATA_FOUND);
                                            }
                                        }
                                        );
                                    }
                                })


                            }
                        })
                    }
                    catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    }
                },
                titleSearch: (req, res) => {
                    try {

                        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (err, result) => {
                            console.log("JDJJFJ", err, result)

                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                if (req.query.title) {
                                    var query = { title: new RegExp('^' + req.query.title, "i"), status: "ACTIVE" }
                                }
                                var options = {
                                    page: req.body.pageNumber || 1,
                                    limit: req.body.limit || 10,
                                    select: "title"
                                }
                                eventModel.paginate(query, options, (error, titleData) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    } else if (titleData.docs == 0) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    } else {

                                        response(res, SuccessCode.SUCCESS, titleData, SuccessMessage.DATA_FOUND);
                                    }
                                })
                            }
                        })

                    }
                    catch (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                },


}


