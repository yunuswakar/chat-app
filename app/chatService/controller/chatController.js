/*@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.*/

"use strict";
const _ = require("underscore");
const mongoose =require("mongoose");
const User = require("../../userServices/model/userModel");
const USERS = [];
const SOCKETPEOPLE = {};

module.exports = (io) => {
    /**
   * socket default connection
   */
    io.sockets.on("connection", (socket) => {
        console.log("dere","data")
        /**
         * socket connect event.
         * check user is already in socket.
         * to connect user with socket manually.
         * emit to all user is connected user.
         */
        socket.on("connectUser", async (data) => {
            try{
                console.log(data,"data")
                 var userindex = USERS.indexOf(data.senderId);
                 //check user index i.e. user id exist in users array or not
                 if (userindex > -1) {
                     for (var id in SOCKETPEOPLE) {
                         // user already exist in socket
                         if (SOCKETPEOPLE[id] == data.senderId) {
                             delete SOCKETPEOPLE[id];
                             USERS.splice(userindex, 1);
                             SOCKETPEOPLE[socket.id] = data.senderId;
                             USERS.push(data.senderId);
                            }
                        }
                    } else {
                        // create new socket id with senderId
                        SOCKETPEOPLE[socket.id] = data.senderId;
                    USERS.push(data.senderId);
                    let updateUser = await User.findOneAndUpdate(
                        { _id: data.senderId },
                        { socketId: socket.id,isOnline:true },
                        { new: true }
                        ); 
                }
                console.log(USERS,"USERS")
                // check SOCKETPEOPLE array has id is uinque
                _.uniq(_(SOCKETPEOPLE).toArray());
        
                // broadcast to all users i.e. user is now online
                socket.broadcast.emit("onlineStatus", {
                    senderId: SOCKETPEOPLE[socket.id],
                    status: 1,
                });
                // response send to own user is online or connected with socket
                socket.emit("onlineStatus", {
                    senderId: SOCKETPEOPLE[socket.id],
                    status: 1,
                }); 
            }catch(err){
                socket.emit("onlineStatus", err?err:'something went wrong');
            }
        });

        /**
         * socket disconnect
         * disconnect manually
         */
        socket.on("disconnectUser", async(data) => {
            try{
            // maually check user is in SOCKETPEOPLE array
            for (var id in SOCKETPEOPLE) {
                    // check if socket.id is exist or not
                    console.log(SOCKETPEOPLE,"userindexin")
                    SOCKETPEOPLE[socket.id] = data.senderId
                    if (SOCKETPEOPLE[socket.id] != undefined) {
                        console.log(SOCKETPEOPLE,SOCKETPEOPLE[socket.id],USERS,"userindex")
                        var userindex = USERS.indexOf(SOCKETPEOPLE[socket.id]);
                        console.log(userindex,userindex > -1,"userindexuserindexuserindexuserindex")
                        if (userindex > -1) {
                            console.log("disconnect",USERS)
                             let updateUser = await User.findOneAndUpdate(
                                { _id: data.senderId },
                                { socketId: '',isOnline:false },
                                { new: true }
                                );
                                console.log(updateUser,SOCKETPEOPLE[socket.id],userindex,"updateUser")
                        // remove user from USERS array
                        if(updateUser){
                            // console.log(USERS.splice(userindex, 1),"USERS.splice(userindex, 1)")
                            USERS.splice(userindex, 1);

                        }
                        // broadcast to all users that is user is now offline.
                        socket.broadcast.emit("onlineStatus", {
                        senderId: SOCKETPEOPLE[socket.id],
                        status: 0,
                        });  
                        socket.emit("onlineStatus", {
                        senderId: SOCKETPEOPLE[socket.id],
                        status: 0,
                        });  
                    }
                    }
                }
            }catch(err){
                console.log(err,"err")
            }
        });

        /**
         * check other user online status
         */
        socket.on("userOnlineStatus",(data)=>{
            if(USERS.includes(data.otherUserId)){
                socket.emit('userOnlineStatus',{status:1})
            }else{
                socket.emit('userOnlineStatus',{status:0})
            }
        });

        /**
         * send message to other user
         * using join room
         */
        socket.on("sendMessage", (data) => {
            // check with CHATCONSTANT or upsert
            CHATCONSTANTS.findOneAndUpdate(
            {
                // match with sender and receiver id with and, or case
                $or: [
                {
                    $and: [
                    {
                        senderId: data.senderId,
                    },
                    {
                        receiverId: data.receiverId,
                    },
                    ],
                },
                {
                    $and: [
                    {
                        senderId: data.receiverId,
                    },
                    {
                        receiverId: data.senderId,
                    },
                    ],
                },
                ],
            },
            {
                // upsert sender and receiver if record not exist
                senderId: data.senderId,
                receiverId: data.receiverId,
                type:data.type
            },
            {
                // take upsert and new true for record new detail and
                upsert: true,
                new: true,
            },
            (err, result) => {
                if (err) throw err;
                // join room with room id
                socket.join(result._id);
                // for location save
                if (data.type === 2) {
                data.location = {
                    type: "Point",
                    coordinates: [data.longitude, data.latitude],
                };
                }
                data.chatId = result._id;
                // create chat with chatConstant id
                var userChat = new CHAT(data);
                userChat.save((err, results) => {
                if (err) throw err;
                let chatId = result._id;
                CHATCONSTANTS.findByIdAndUpdate(
                    result._id,
                    {
                    lastmsgId: results._id,
                    updatedAt: Date.now(),
                    },
                    (err, result) => {
                    if (err) throw err;
                    }
                );
                // broadcast into room
                socket.broadcast.to(chatId).emit("msgReceived", results);
                // receives to user own that msg is sent
                socket.emit("msgReceived", results);
                });
            }
            );
        });

    });
}