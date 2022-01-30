const mongoose = require('mongoose');
const commonFunction = require('../../helpers/commonFunctions');

const { exec } = require('child_process');
const Room = mongoose.model('Room');
const User = require("../models/userModel");
const Utils = require('../utils');
const LiveStatus = require('../liveStatus');
const {pageSizes} = require('../liveStatus');
const _ = require("underscore");
var fs = require('fs');
const path = require('path');
const {CHATCONSTANTS,CHATS} = require("../models/chatModel");
const USERS = [];
const SOCKETPEOPLE = {};
var pageNovar=1;
var pageSizevar = pageSizes;
var files = {},
    struct = {
        fileName: null,
        type: null,
        size: 0,
        byteLength: 0,
        data: [],
        slice: 0,
    };
    // console.log(__dirname,"__dirname");
    
module.exports = (io) => {
  function emitListLiveStreamInfo() {
    return Room.find({liveStatus:1}, (error, results) => {
      io.emit('list-live-stream', results);
    });
  }

  io.on('connection', (socket) => {
    console.log('New connection');

    /**
     * Get list live stream information
     */
    socket.on('list-live-stream', () => {
      return Room.find({liveStatus:1}, (error, results) => {
        socket.emit('list-live-stream', results);
      });
    });

   /**
     * Get list users information
     */
    socket.on('list-users', () => {
      return Room.find({}, (error, results) => {
        socket.emit('list-users', results);
      });
    });

    /**
     * Join live stream room
     */
    socket.on('join-room', async(data) => {
      console.log('Join room', data);
      const { roomName,userId } = data;
      if (!userId || !roomName) return;
      socket.join(roomName);
    });

    socket.on('user-join-rooms', async(data) => {
      console.log('users Join room', data);
      const { roomName,userId } = data;
      let getDetail = await User.findOne({_id:userId}).select("-password")
      let joinMessage= getDetail.userName + ' has join stream'
      let addViewBy= await Room.findOneAndUpdate({ roomName },
        {
          $addToSet: { viewBy: userId }
        },
        { new: true, upsert:true });
        let getAllDetail= await User.find({_id:addViewBy.viewBy}).select("-password")
        let countViewer= addViewBy.viewBy.length;
      io.in(roomName).emit('user-join-rooms',{countViewer,joinMessage, getAllDetail});
    });

    /**
     * Leave live stream room
     */
    socket.on('leave-room', (data) => {
      console.log('Leave room', data);
      const { userId, roomName } = data;
      if (!userId || !roomName) return;
      socket.leave(roomName);
    });

    /**
     * Leave live stream room
     * Pull the User from User view Count
     */
    socket.on('user-leave-rooms', async(data) => {
      console.log('users leave room', data);
      const { roomName,userId } = data;
      let leaveRoom= await Room.findOneAndUpdate({ roomName },
        {
          $pull: { viewBy: userId }
        },
        { new: true, upsert:true });
        let getAllDetail= await User.find({_id:leaveRoom.viewBy}).select("-password")
        let countViewer= leaveRoom.viewBy.length;
      io.in(roomName).emit('user-leave-rooms',{countViewer,getAllDetail});
    });

    /**
     * The host join the room and prepare live stream
     */
    socket.on('prepare-live-stream', (data) => {
      console.log('Prepare live stream', data);
      const { userName, roomName } = data;
      if (!userName || !roomName) return;
      return Room.findOneAndUpdate(
        {  roomName },
        { liveStatus: LiveStatus.PREPARE, createdAt: Utils.getCurrentDateTime() },
        { new: true, useFindAndModify: false }
      ).exec((error, foundRoom) => {
        if (error) return;
        if (foundRoom) return emitListLiveStreamInfo();
        const condition = {
          userName,
          roomName,
          liveStatus: LiveStatus.PREPARE,
        };
        return Room.create(condition).then((createdData) => {
          emitListLiveStreamInfo();
        });
      });
    });

    /**
     * When user begin live stream
     */
    socket.on('begin-live-stream', (data) => {
      console.log('Begin live stream', data);
      const { userName, roomName } = data;
      if (!userName || !roomName) return;
      return Room.findOneAndUpdate(
        {  roomName },
        { liveStatus: LiveStatus.ON_LIVE, beginAt: Utils.getCurrentDateTime() },
        { new: true, useFindAndModify: false }
      ).exec((error, foundRoom) => {
        if (error) return;
        if (foundRoom) {
          io.in(roomName).emit('begin-live-stream', foundRoom);
          return emitListLiveStreamInfo();
        }
        const condition = {
          userName,
          roomName,
          liveStatus: LiveStatus.ON_LIVE,
        };
        return Room.create(condition).then((createdData) => {
          io.in(roomName).emit('begin-live-stream', createdData);
          emitListLiveStreamInfo();
        });
      });
    });

    /**
     * When user begin live stream
     */
    socket.on('begin-live-NOT-streams', (data) => {
      console.log('Begin live stream', data);
      const { userName, roomName } = data;
      if (!userName || !roomName) return;
      return Room.findOneAndUpdate(
        {  roomName },
        { liveStatus: LiveStatus.ON_LIVE, beginAt: Utils.getCurrentDateTime() },
        { new: true, useFindAndModify: false }
      ).exec((error, foundRoom) => {
        if (error) return;
        if (foundRoom) {
          io.in(roomName).emit('begin-live-stream', foundRoom);
          return emitListLiveStreamInfo();
        }
        const condition = {
          userName,
          roomName,
          liveStatus: LiveStatus.ON_LIVE,
        };
        return Room.create(condition).then((createdData) => {
          io.in(roomName).emit('begin-live-NOT-streams', createdData);
          emitListLiveStreamInfo();
        });
      });
    });


    /**
     * When user finish live stream action
     */
    socket.on('finish-live-stream', (data) => {
      try{
        const { roomName } = data;
        if (!roomName) return;
        let emptyMsg= Room.findOneAndUpdate(
          { roomName },
          { $set: { messages: [], likes: [], viewBy: [],liveStatus:2 }},
          { new: true, useFindAndModify: false }
        ).exec((error, updatedData) => {
          if (error) return;
          io.in(roomName).emit('finish-live-stream', {liveStatus:2});
          socket.leave(roomName);
          return emitListLiveStreamInfo();
        });

      }catch(err){
        console.log(err)
      }
    });

    /**
     * User send heart to room
     */
    socket.on('send-heart', async(data) => {
      console.log('Send heart',data);
      const { roomName,userId } = data;
      let addlikes= await Room.findOneAndUpdate({ roomName },
        {
          $addToSet: { likes: userId }
        },
        { new: true, upsert:true });
        let countHeart= addlikes.likes.length;
      io.in(roomName).emit('send-hearts',{countHeart});
    });

    

    /**
     * User send message to room
     */
    socket.on('send-message', async(data) => {
      console.log(data,"data")
      const { roomName, message } = data;
      let userId = data.userName;
      let createGroup =  await Room.findOneAndUpdate(
        { roomName },
        {
          $push: { messages: { message:message, userId:userId, createdAt: Utils.getCurrentDateTime() } },createdAt: Utils.getCurrentDateTime()
        },
        { new: true,upsert:true });
          let posts = await Room.findOne({roomName:roomName}).populate({path:'messages.userId',select:'userName profileImg'});
    if(posts){
      io.in(roomName).emit('send-message', posts);
    }
      
    });

    /**
     * Try to replay video
     */
    socket.on('replay', (data) => {
      console.log('Replay video');
      const { roomName, userName } = data;
      Room.findOne({ roomName }).exec((error, result) => {
        socket.emit('replay', result);
        const { filePath } = result;
        const commandExec = `ffmpeg -re -i ${filePath} -c:v libx264 -preset superfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv rtmp://localhost/live/${roomName}/replayFor${userName}`;
        // const commandExec = `ffmpeg -re -i ${filePath} -c:v libx264 -preset superfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv rtmp://localhost/live/${roomName}/replayFor${userName}`;
        
        console.log('Command execute : ', commandExec);
        exec(commandExec, (err, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
      });
    });

   /**
         * socket connect event.
         * check user is already in socket.
         * to connect user with socket manually.
         * emit to all user is connected user.
         */
        socket.on("connectUser", async (data) => {
          try{ 
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
              // check SOCKETPEOPLE array has id is uinque
              _.uniq(_(SOCKETPEOPLE).toArray());
              // broadcast to all users i.e. user is now online
              socket.broadcast.emit("userOnlineStatus", {
                  senderId: SOCKETPEOPLE[socket.id],
                  status: 1,
              });
              // response send to own user is online or connected with socket
              socket.emit("userOnlineStatus", {
                  senderId: SOCKETPEOPLE[socket.id],
                  status: 1,
              }); 
              console.log(USERS,SOCKETPEOPLE,"connection");
              
          }catch(err){
              socket.emit("userOnlineStatus", err?err:'something went wrong');
          }
      });

      socket.on('disconnect', async() =>{
        
        let socketId = SOCKETPEOPLE[socket.id];
        delete SOCKETPEOPLE[socket.id];
        let index = USERS.indexOf(socketId);
        USERS.splice(index,1);
        let updateUser = await User.findOneAndUpdate(
          { _id: socketId },
          { socketId: '',isOnline:false },
          { new: true }
          );
          socket.broadcast.emit("userOnlineStatus", {
            senderId: socketId,
            status: 0,
            });
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
                  SOCKETPEOPLE[socket.id] = data.senderId
                  if (SOCKETPEOPLE[socket.id] != undefined) {
                      var userindex = USERS.indexOf(SOCKETPEOPLE[socket.id]);
                      if (userindex > -1) {
                           let updateUser = await User.findOneAndUpdate(
                              { _id: data.senderId },
                              { socketId: '',isOnline:false },
                              { new: true }
                              );
                      // remove user from USERS array
                      if(updateUser){
                          // console.log(USERS.splice(userindex, 1),"USERS.splice(userindex, 1)")
                          USERS.splice(userindex, 1);

                      }
                      // broadcast to all users that is user is now offline.
                      socket.broadcast.emit("userOnlineStatus", {
                      senderId: SOCKETPEOPLE[socket.id],
                      status: 0,
                      });  
                      socket.emit("userOnlineStatus", {
                      senderId: SOCKETPEOPLE[socket.id],
                      status: 0,
                      });  
                  }
                  }
              }
          }catch(err){
            socket.emit("userOnlineStatus", err?err:'something went wrong');
          }
      });

      /**
       * check other user online status
       */
      socket.on("userOnlineStatus",(data)=>{
          if(USERS.includes(data.receiverId)){
              socket.emit('userOnlineStatus',{status:1})
          }else{
              socket.emit('userOnlineStatus',{status:0})
          }
      });

      /**
       * send message to other user
       * using join room
       */
      socket.on("sendMessage",async (data) => {
          if(data.senderId!=data.receiverId){
            let pageNo = parseInt(data.pageNo)||1;
            let pageSize = parseInt(data.pageSize) || pageSizes;
            if(data.type===1){
              data.file = Buffer.from(data.file,'base64');
              data.fileName = data.fileName.split("/");
              data.fileName = data.fileName.reverse()[0];
              // console.log(path.resolve()+'/uploads/image/',path.resolve()+ '/uploads/image/'+new Date().getTime()+data.fileName,"~~~~~~~~~~~~~~~~~~~~~");
              let fileName = new Date().getTime()+data.fileName;
              data.files = 'uploads/image/'+fileName;
               fs.writeFile(path.resolve()+ '/uploads/image/'+fileName, data.file, (err) => {
                if (err) return console.error(err)
                console.log('file saved to ', data.fileName)
              }); 
              
            }
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
            async (err, result) => {
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
                var userChat = new CHATS(data);
                userChat.save(async(err, results) => {
                if (err) throw err;
                let chatId = result._id;
                CHATCONSTANTS.findByIdAndUpdate(
                    result._id,
                    {
                      $set:{
                        lastmsgId: results._id,
                        updatedAt: Date.now(),
                        newDate: Date.now(),

                      }
                    },
                    (err, result) => {
                    if (err) throw err;
                    }
                );
                let otherUserDetails = await User.findOne({_id:data.receiverId}).select("socketId");
                let chatDetails = await CHATS.aggregate([
                  {
                      $match:{
                          chatId:mongoose.Types.ObjectId(result._id),
                      }
                  },
                   {
                      $lookup:{
                          from:"users",
                          localField:"senderId",
                          foreignField:'_id',
                          as:"senderId"
                      }
                  },
                  {
                      $unwind:"$senderId"
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },

                  {
                    $sort: { createdAt: -1 },
                }, 
                 { $skip: pageSize * (pageNo - 1) },
                { $limit: pageSize },
                  {
                      $project:{
                          _id:"$_id",
                          "type":"$type",
                          "message":1,
                          "isSeen":1,
                          "chatId":1,
                          files:1,
                          fileName:1,
                          thumbnail:1,
                          // // "createdAt":1,
                          "updatedAt":"$updatedAt",
                          "senderId._id":"$senderId._id",
                          "senderId.isOnline":"$senderId.isOnline",
                          "senderId.username":"$senderId.username",
                          "senderId.profileImg":"$senderId.profileImg",
                          "senderId.email":"$senderId.email",
                          "senderId.socketId":"$senderId.socketId",
                          "receiverId._id":"$receiverId._id",
                          "receiverId.isOnline":"$receiverId.isOnline",
                          "receiverId.username":"$receiverId.username",
                          "receiverId.profileImg":"$receiverId.profileImg",
                          "receiverId.email":"$receiverId.email",
                          "receiverId.socketId":"$receiverId.socketId",

                      }
                  }
                 
              ]);
                const chatList = await CHATCONSTANTS.aggregate([
                  {
                      $match:{
                          $or:[
                              {
                                  senderId:mongoose.Types.ObjectId(data.receiverId),
                              },
                              {
                                  receiverId:mongoose.Types.ObjectId(data.receiverId),
                              },
                          ],  
                      }
                  },
                  {
                    $lookup: {
                        from: "chats",
                        let: { userId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$chatId", "$$userId"] },isSeen:false,receiverId:mongoose.Types.ObjectId(data.receiverId) } },
                        ],
                        as: "msgsCount",
                    }
                  },
                   {
                    $addFields:{
                      unseenCount:{$size:"$msgsCount"}
                    }
                  }, 
                  {
                      $lookup:{
                          from:"chats",
                          localField:"lastmsgId",
                          foreignField:'_id',
                          as:"lastmsgId"
                      }
                  },
                  {
                      $unwind:"$lastmsgId"
                  },
                  {
                    $addFields:{
                      receiverId:{
                        $cond: {
                          if: {
                            $eq: [mongoose.Types.ObjectId(data.receiverId), "$lastmsgId.receiverId"]
                        },
                            then: "$lastmsgId.senderId",
                            else: "$lastmsgId.receiverId"
                        },
                      }
                    }
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },  
                   
                   {
                      $project:{
                          _id:"$_id",
                          "receiverId":"$receiverId",
                          "senderId":"$senderId",
                          "type":"$type",
                          "isTyping":1,
                          "unseenCount":1,
                          newDate:1,
                          "updatedAt":"$updatedAt",
                          "lastmsgId.receiverId._id":"$receiverId._id",
                          "lastmsgId.receiverId.message":"$lastmsgId.message",
                          "lastmsgId.receiverId.isOnline":"$receiverId.isOnline",
                          "lastmsgId.receiverId.files":"$lastmsgId.files",
                          "lastmsgId.receiverId.thumbnail":"$lastmsgId.thumbnail",
                          "lastmsgId.receiverId.userName":"$receiverId.userName",
                          "lastmsgId.receiverId.profileImg":"$receiverId.profileImg",
                          "lastmsgId.receiverId.email":"$receiverId.email",
                          "lastmsgId.receiverId.socketId":"$receiverId.socketId",
                      }
                  }, 
                  {
                    $project:{
                      "receiverId":0,
                    }
                  } , 
                  {
                      $sort: { newDate: -1 },
                  },
              ]);

              socket.broadcast.to(otherUserDetails.socketId).emit("chatLists", chatList);
              // broadcast into room
              socket.broadcast.to(otherUserDetails.socketId).emit("msgReceived", chatDetails);
              // receives to user own that msg is sent
              socket.emit("msgReceived", chatDetails);
              // console.log(`data`)
              let fcm = await User.findOne({_id:data.receiverId}).select("fcmToken");
              let fcmSender = await User.findOne({_id:data.senderId}).select("userName profileImg");

              fcm= JSON.parse(JSON.stringify(fcm));
              console.log(fcm.fcmToken)
              let pushNot=await commonFunction.pushNotification(fcm.fcmToken, `Check new message sent by ${fcmSender.userName}`, data.message,data.chatId,fcmSender.userName,fcmSender.profileImg,data.senderId,data.receiverId)
              // console.log(`pushNot`, pushNot)
                });
            }
            ); 
          }else{
            socket.emit("msgReceived",'you can not chat with yourself')
          }
      });

      /**
         * get single chat details of user
         */
        socket.on("chatDetails",async(data)=>{
          try{
            
              pageNovar = parseInt(data.pageNo)||1;
              pageSizevar = parseInt(data.pageSize) || pageSizes;
              if(data.chatId!=''){
              
              let chatDetails = await CHATS.aggregate([
                  {
                      $match:{
                          chatId:mongoose.Types.ObjectId(data.chatId),
                      }
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"senderId",
                          foreignField:'_id',
                          as:"senderId"
                      }
                  },
                  {
                      $unwind:"$senderId"
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },
                  {
                    $sort: { createdAt: -1 },
                },
                { $skip: pageSizevar * (pageNovar - 1) },
                { $limit: pageSizevar },  
                  {
                      $project:{
                          _id:"$_id",
                          "type":"$type",
                          "message":1,
                          "updatedAt":"$updatedAt",
                          "isSeen":1,
                          "chatId":1,
                          files:1,
                          fileName:1,
                          thumbnail:1,
                          // // "createdAt":1,
                          "senderId._id":"$senderId._id",
                          "senderId.isOnline":"$senderId.isOnline",
                          "senderId.username":"$senderId.username",
                          "senderId.profileImg":"$senderId.profileImg",
                          "senderId.email":"$senderId.email",
                          "senderId.socketId":"$senderId.socketId",
                          "receiverId._id":"$receiverId._id",
                          "receiverId.isOnline":"$receiverId.isOnline",
                          "receiverId.username":"$receiverId.username",
                          "receiverId.profileImg":"$receiverId.profileImg",
                          "receiverId.email":"$receiverId.email",
                          "receiverId.socketId":"$receiverId.socketId",
                      }
                  }
                
              ]);
               const chatList = await CHATCONSTANTS.aggregate([
                {
                    $match:{
                        $or:[
                            {
                                senderId:mongoose.Types.ObjectId(data.receiverId),
                            },
                            {
                                receiverId:mongoose.Types.ObjectId(data.receiverId),
                            },
                        ],  
                    }
                },
                {
                  $lookup: {
                      from: "chats",
                      let: { userId: "$_id" },
                      pipeline: [
                          { $match: { $expr: { $eq: ["$chatId", "$$userId"] },isSeen:false,receiverId:mongoose.Types.ObjectId(data.receiverId) } },
                      ],
                      as: "msgsCount",
                  }
                },
                 {
                  $addFields:{
                    unseenCount:{$size:"$msgsCount"}
                  }
                }, 
                {
                    $lookup:{
                        from:"chats",
                        localField:"lastmsgId",
                        foreignField:'_id',
                        as:"lastmsgId"
                    }
                },
                {
                    $unwind:"$lastmsgId"
                },
                {
                  $addFields:{
                    receiverId:{
                      $cond: {
                        if: {
                          $eq: [mongoose.Types.ObjectId(data.receiverId), "$lastmsgId.receiverId"]
                      },
                          then: "$lastmsgId.senderId",
                          else: "$lastmsgId.receiverId"
                      },
                    }
                  }
                },
                {
                    $lookup:{
                        from:"users",
                        localField:"receiverId",
                        foreignField:'_id',
                        as:"receiverId"
                    }
                },
                {
                    $unwind:"$receiverId"
                },  
                 
                 {
                    $project:{
                        _id:"$_id",
                        "receiverId":"$receiverId",
                        "senderId":"$senderId",
                        "type":"$type",
                        "isTyping":1,
                        "unseenCount":1,
                        newDate:1,
                        "updatedAt":"$updatedAt",
                        "lastmsgId.receiverId._id":"$receiverId._id",
                        "lastmsgId.receiverId.message":"$lastmsgId.message",
                        "lastmsgId.receiverId.files":"$lastmsgId.files",
                        "lastmsgId.receiverId.thumbnail":"$lastmsgId.thumbnail",
                        "lastmsgId.receiverId.isOnline":"$receiverId.isOnline",
                        "lastmsgId.receiverId.userName":"$receiverId.userName",
                        "lastmsgId.receiverId.profileImg":"$receiverId.profileImg",
                        "lastmsgId.receiverId.email":"$receiverId.email",
                        "lastmsgId.receiverId.socketId":"$receiverId.socketId",
                    }
                }, 
                {
                  $project:{
                    "receiverId":0,
                  }
                } , 
                {
                    $sort: { newDate: -1 },
                },
            ]); 
            let otherUserDetails = await User.findOne({_id:data.receiverId}).select("socketId");
              socket.emit("msgReceived",chatDetails);
              socket.broadcast.to(otherUserDetails.socketId).emit("msgReceived", chatDetails);
              socket.broadcast.to(otherUserDetails.socketId).emit("chatLists", chatList);
            }
          }catch(err){
              socket.emit("msgReceived",err?err:'something went wrong')
          }
      });

      /**
         * get chat history of user 
         * with any user(Helper, Seeker, Admin,Super-admin, other user)
         */
        socket.on("chatList",async(data)=>{
          try{
            
            let pageNo = parseInt(data.pageNo)||1;
            let pageSize = parseInt(data.pageSize) || pageSizes;
            if (pageNo <= 0) {
              throw responseMessage.PAGE_INVALID;
            }
            
            const chatList = await CHATCONSTANTS.aggregate([
                  {
                      $match:{
                          $or:[
                              {
                                  senderId:mongoose.Types.ObjectId(data.senderId),
                              },
                              {
                                  receiverId:mongoose.Types.ObjectId(data.senderId),
                              },
                          ],  
                      }
                  },
                  {
                    $lookup: {
                        from: "chats",
                        let: { userId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$chatId", "$$userId"] },isSeen:false,receiverId:mongoose.Types.ObjectId(data.senderId) } },
                        ],
                        as: "msgsCount",
                    }
                  },
                   {
                    $addFields:{
                      unseenCount:{$size:"$msgsCount"}
                    }
                  }, 
                  {
                      $lookup:{
                          from:"chats",
                          localField:"lastmsgId",
                          foreignField:'_id',
                          as:"lastmsgId"
                      }
                  },
                  {
                      $unwind:"$lastmsgId"
                  },
                  {
                    $addFields:{
                      receiverId:{
                        $cond: {
                          if: {
                            $eq: [mongoose.Types.ObjectId(data.senderId), "$lastmsgId.receiverId"]
                        },
                            then: "$lastmsgId.senderId",
                            else: "$lastmsgId.receiverId"
                        },
                      }
                    }
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },  
                   
                   {
                      $project:{
                          _id:"$_id",
                          "receiverId":"$receiverId",
                          "senderId":"$senderId",
                          "type":"$type",
                          "isTyping":1,
                          "unseenCount":1,
                          newDate:1,
                          "updatedAt":"$updatedAt",
                          "lastmsgId.receiverId._id":"$receiverId._id",
                          "lastmsgId.receiverId.message":"$lastmsgId.message",
                          "lastmsgId.receiverId.isOnline":"$receiverId.isOnline",
                          "lastmsgId.receiverId.files":"$lastmsgId.files",
                          "lastmsgId.receiverId.thumbnail":"$lastmsgId.thumbnail",
                          "lastmsgId.receiverId.userName":"$receiverId.userName",
                          "lastmsgId.receiverId.profileImg":"$receiverId.profileImg",
                          "lastmsgId.receiverId.email":"$receiverId.email",
                          "lastmsgId.receiverId.socketId":"$receiverId.socketId",
                      }
                  }, 
                  {
                    $project:{
                      "receiverId":0,
                    }
                  } ,
                  {
                      $sort: { newDate: -1 },
                  },
                  { $skip: pageSize * (pageNo - 1) },
                  { $limit: pageSize }, 
              ]);
              socket.emit("chatLists",chatList);
              // socket.broadcast.to(chatList[0].lastmsgId.receiverId.socketId).emit("chatLists", chatList);
          }catch(err){
              socket.emit("chatLists",err?err:'something went wrong');
          }
      });

      /**
       * user typing msg`s to other user
       */
      socket.on("typing", async(data)=>{
        
        let otherUserDetails = await User.findOne({_id:data.receiverId}).select("socketId isOnline");
        let getChatConstant = await CHATCONSTANTS.findOne({
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
        })
        let updateChatConstant = await CHATCONSTANTS.findOneAndUpdate(
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
        },{
          $set:{isTyping:data.isTyping },
        },{new:true}
        )
        socket.broadcast.to(otherUserDetails.socketId).emit("typingStatus", {senderId:data.senderId, isTyping:data.isTyping});
        let pageNo = parseInt(data.pageNo)||1;
              let pageSize = parseInt(data.pageSize) || 10;
              if (pageNo <= 0) {
              throw responseMessage.PAGE_INVALID;
              }
              const chatList = await CHATCONSTANTS.aggregate([
                  {
                      $match:{
                          $or:[
                              {
                                  senderId:mongoose.Types.ObjectId(data.receiverId),
                              },
                              {
                                  receiverId:mongoose.Types.ObjectId(data.receiverId),
                              },
                          ],  
                      }
                  },
                  {
                    $lookup: {
                        from: "chats",
                        let: { userId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$chatId", "$$userId"] },isSeen:false,receiverId:mongoose.Types.ObjectId(data.receiverId) } },
                        ],
                        as: "msgsCount",
                    }
                  },
                   {
                    $addFields:{
                      unseenCount:{$size:"$msgsCount"}
                    }
                  }, 
                  {
                      $lookup:{
                          from:"chats",
                          localField:"lastmsgId",
                          foreignField:'_id',
                          as:"lastmsgId"
                      }
                  },
                  {
                      $unwind:"$lastmsgId"
                  },
                  {
                    $addFields:{
                      receiverId:{
                        $cond: {
                          if: {
                            $eq: [mongoose.Types.ObjectId(data.receiverId), "$lastmsgId.receiverId"]
                        },
                            then: "$lastmsgId.senderId",
                            else: "$lastmsgId.receiverId"
                        },
                      }
                    }
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },  
                   
                   {
                      $project:{
                          _id:"$_id",
                          "receiverId":"$receiverId",
                          "senderId":"$senderId",
                          "type":"$type",
                          "isTyping":1,
                          "unseenCount":1,
                          newDate:1,
                          "updatedAt":"$updatedAt",
                          "lastmsgId.receiverId._id":"$receiverId._id",
                          "lastmsgId.receiverId.message":"$lastmsgId.message",
                          "lastmsgId.receiverId.isOnline":"$receiverId.isOnline",
                          "lastmsgId.receiverId.files":"$lastmsgId.files",
                          "lastmsgId.receiverId.thumbnail":"$lastmsgId.thumbnail",
                          "lastmsgId.receiverId.userName":"$receiverId.userName",
                          "lastmsgId.receiverId.profileImg":"$receiverId.profileImg",
                          "lastmsgId.receiverId.email":"$receiverId.email",
                          "lastmsgId.receiverId.socketId":"$receiverId.socketId",
                      }
                  }, 
                  {
                    $project:{
                      "receiverId":0,
                    }
                  } ,
                  {
                      $sort: { newDate: -1 },
                  },
              ]);
              let status  =2;
              let chatId;
              if(!data.isTyping){
                status = 1;
              }
              if(data.isTyping){
                chatId=getChatConstant._id
              }
              if(!otherUserDetails.isOnline){
                status = 0
              }
              socket.broadcast.to(otherUserDetails.socketId).emit('userOnlineStatus',{status:status,chatId})
              socket.broadcast.to(otherUserDetails.socketId).emit("chatLists", chatList);
              
      });

      /**
       * seen msgs
       */
      socket.on("seen", async(data)=>{
        try{
          // console.log(data,"~~~~~~~~~~~~~~~~~data~~~~~~~~~~~~~~");
          
          if(data.chatId!=''){
            let pageNo = parseInt(data.pageNo)||1;
            let pageSize = parseInt(data.pageSize) || pageSizes;
            let otherUserDetails = await User.findOne({_id:data.receiverId}).select("socketId");
            let updateChat = await CHATS.updateMany({chatId:data.chatId,
              receiverId:mongoose.Types.ObjectId(data.senderId)},{
                      $set: {
    
                          isSeen: true
                      }
                  }, 
              {
                  multi: true,
                  new:true
              }
            );
            let chatDetails = await CHATS.aggregate([
              {
                  $match:{
                      chatId:mongoose.Types.ObjectId(data.chatId),
                  }
              },
               {
                  $lookup:{
                      from:"users",
                      localField:"senderId",
                      foreignField:'_id',
                      as:"senderId"
                  }
              },
              {
                  $unwind:"$senderId"
              },
              {
                  $lookup:{
                      from:"users",
                      localField:"receiverId",
                      foreignField:'_id',
                      as:"receiverId"
                  }
              },
              {
                  $unwind:"$receiverId"
              },

              {
                $sort: { createdAt: -1 },
            },
             { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize }, 
              {
                  $project:{
                      _id:"$_id",
                      "type":"$type",
                      "message":1,
                      "updatedAt":"$updatedAt",
                      "isSeen":1,
                      "chatId":1,
                      files:1,
                      fileName:1,
                      thumbnail:1,
                      // // "createdAt":1,
                      "senderId._id":"$senderId._id",
                      "senderId.isOnline":"$senderId.isOnline",
                      "senderId.username":"$senderId.username",
                      "senderId.profileImg":"$senderId.profileImg",
                      "senderId.email":"$senderId.email",
                      "senderId.socketId":"$senderId.socketId",
                      "receiverId._id":"$receiverId._id",
                      "receiverId.isOnline":"$receiverId.isOnline",
                      "receiverId.username":"$receiverId.username",
                      "receiverId.profileImg":"$receiverId.profileImg",
                      "receiverId.email":"$receiverId.email",
                      "receiverId.socketId":"$receiverId.socketId",
                  }
              }
            
          ]);
          const chatList = await CHATCONSTANTS.aggregate([
            {
                $match:{
                    $or:[
                        {
                            senderId:mongoose.Types.ObjectId(data.receiverId),
                        },
                        {
                            receiverId:mongoose.Types.ObjectId(data.receiverId),
                        },
                    ],  
                }
            },
            {
              $lookup: {
                  from: "chats",
                  let: { userId: "$_id" },
                  pipeline: [
                      { $match: { $expr: { $eq: ["$chatId", "$$userId"] },isSeen:false,receiverId:mongoose.Types.ObjectId(data.receiverId) } },
                  ],
                  as: "msgsCount",
              }
            },
             {
              $addFields:{
                unseenCount:{$size:"$msgsCount"}
              }
            }, 
            {
                $lookup:{
                    from:"chats",
                    localField:"lastmsgId",
                    foreignField:'_id',
                    as:"lastmsgId"
                }
            },
            {
                $unwind:"$lastmsgId"
            },
            {
              $addFields:{
                receiverId:{
                  $cond: {
                    if: {
                      $eq: [mongoose.Types.ObjectId(data.receiverId), "$lastmsgId.receiverId"]
                  },
                      then: "$lastmsgId.senderId",
                      else: "$lastmsgId.receiverId"
                  },
                }
              }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"receiverId",
                    foreignField:'_id',
                    as:"receiverId"
                }
            },
            {
                $unwind:"$receiverId"
            },  
             
             {
                $project:{
                    _id:"$_id",
                    "receiverId":"$receiverId",
                    "senderId":"$senderId",
                    "type":"$type",
                    "isTyping":1,
                    "unseenCount":1,
                    newDate:1,
                    "updatedAt":"$updatedAt",
                    "lastmsgId.receiverId._id":"$receiverId._id",
                    "lastmsgId.receiverId.message":"$lastmsgId.message",
                    "lastmsgId.receiverId.files":"$lastmsgId.files",
                    "lastmsgId.receiverId.thumbnail":"$lastmsgId.thumbnail",
                    "lastmsgId.receiverId.isOnline":"$receiverId.isOnline",
                    "lastmsgId.receiverId.userName":"$receiverId.userName",
                    "lastmsgId.receiverId.profileImg":"$receiverId.profileImg",
                    "lastmsgId.receiverId.email":"$receiverId.email",
                    "lastmsgId.receiverId.socketId":"$receiverId.socketId",
                }
            }, 
            {
              $project:{
                "receiverId":0,
              }
            } ,
            {
                $sort: { newDate: -1 },
            },
        ]);
        socket.broadcast.to(otherUserDetails.socketId).emit("chatLists", chatList);
            socket.broadcast.to(otherUserDetails.socketId).emit("chatHistory", chatDetails);
            socket.emit("chatHistory", chatDetails);
          }
        }catch(err){
          console.log("err seen",err)
        }
      });

       socket.on("deleteChat",async(data)=>{
        let otherUserDetails = await User.findOne({_id:data.receiverId}).select("socketId");
        let deleteChat = await CHATS.findOneAndDelete({_id:data.id});
        socket.broadcast.to(otherUserDetails.socketId).emit("deletedChat", updateChat);
        socket.emit("deletedChat", updateChat);
      }) 

      


      socket.on("sendMessages",async (data) => {
        try{

        

          /* var readStreams = fs.createReadStream(path.resolve(__dirname,data.file.name),{
            encoding:'binary'
          }),chunks=[];
        return; */
          if(data.senderId!=data.receiverId){
            if(data.type===1){
                if (!files[data.fileName]) {
                  files[data.fileName] = Object.assign({}, struct, data);
                  files[data.fileName].data = [];
              }
            }
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
            async (err, result) => {
                if (err) throw err;
                // join room with room id
                socket.join(result._id);
                // for location save
                
                var timestamp = parseInt(new Date().getTime() / 1000, 10);
                var upload_path;
                if (data.type == 1 || data.type == 2) {
                  /* if (data.thumbnail) {
                      if (data.thumbnail.length > 70) {
                          thumbnail = 'thumbnails/thumb_' + timestamp + '.' + data.thumbext;
                          fs.writeFile(path.join(__dirname, './uploads/' + thumbnail), data.thumbnail, { encoding: 'base64' }, function(err) {
                              if (err) {

                                  console.log(err)
                              } else {
                                  thumbnail = thumbnail;
                              }

                          })
                      } else {
                          thumbnail = data.thumbnail
                      }
                  }

                  if (!data.message) {
                      data.message = '';
                  } else {
                      data.message = data.message;
                  }
                  if (data.type == 2) {
                      upload_path = path.join(__dirname, './uploads/image/');
                      media = 'image/' + data.fileName;
                  }
                  if (data.type == 3) {
                      upload_path = path.join(__dirname, './uploads/video/');
                      media = 'video/' + data.fileName;

                  } */
                  // console.log(new Uint8Array("data.file.length"),'data.file')
                  
                  // data.file = Buffer.from(data.file.toString());
                  // console.log(data.size,"data");
                  
                  data.file = Buffer.from(new Uint8Array(data.file),'base64');
                  data.fileName = data.fileName.split("/");
                  data.fileName = data.fileName.reverse()[0];
                  // console.log(path.resolve()+'/uploads/image/',path.resolve()+ '/uploads/image/'+new Date().getTime()+data.fileName,"~~~~~~~~~~~~~~~~~~~~~");
                  
                   /* fs.writeFile(path.resolve()+ '/uploads/image/'+new Date().getTime()+data.fileName, data.file, (err) => {
                    if (err) return console.error(err)
                    console.log('file saved to ', data.fileName)
                  }); 
                  return; */
                  files[data.fileName].data.push(data.file);
                  // let chunksData = data.file.toJSON();
                  files[data.fileName].slice++;
                  files[data.fileName].fileName = files[data.fileName].fileName.split("/");
                  files[data.fileName].fileName = files[data.fileName].fileName.reverse()[0];
                  // files[data.fileName].byteLength = Buffer.byteLength(data.file);
                  // files[data.fileName].size = chunksData.data.length;
                  console.log(data,"files[data.fileName].slice");return;
                  
                  var percentage = parseFloat(((files[data.fileName].slice * ((files[data.fileName].size) * 0.02) / files[data.fileName].size) * 100).toFixed(2))
                  // console.log(percentage,files[data.fileName].slice * ((files[data.fileName].size) * 0.02),
                  // files[data.fileName].slice * ((files[data.fileName].size) * 0.02) >= files[data.fileName].size,files[data.fileName].size,"percentage");
                  if (files[data.fileName].slice * ((files[data.fileName].size) * 0.02) >= files[data.fileName].size) {
                      var fileBuffer = Buffer.concat(files[data.fileName].data);
                      console.log(fileBuffer,"fileBuffer");return
                      fs.writeFile(upload_path + data.fileName, fileBuffer, (err) => {
                          if (err) {
                              socket.emit('error_message', err);
                              return;
                          }
                          console.log(data);
                          /* const requestData = {
                              chatConstant: check_for_read.toJSON().id,
                              sender: data.sender,
                              receiver: data.receiver,
                              messageType: data.messageType,
                              message: data.message,
                              savedPath: saved_path,
                              media: media,
                              latitude: data.latitude,
                              longitude: data.longitude,
                              thumbnail: thumbnail,
                              created: timestamp,
                              modified: timestamp,
                              fileName: data.fileName,
                              localImage: data.localImage,
                              localVideo: data.localVideo,
                              localAudio: data.localAudio,
                              messageId: data.messageId,
                              senderName: data.senderName,
                              senderProfileImage: data.senderProfileImage,
                              receiverName: data.receiverName,
                              receiverProfileImage: data.receiverProfileImage,
                              isFavSender: '0',
                              isFavReceiver: '0',
                          }
                          saveData(requestData) */

                      });
                  } else if (files[data.fileName].size < 10000) {
                      console.log('less than 100 kb')
                      var fileBuffer = Buffer.concat(files[data.fileName].data);
                      fs.writeFile(upload_path + data.fileName, fileBuffer, (err) => {
                          if (err) {
                              socket.emit('error_message', err);
                              return;
                          }
                          /* const requestData = {
                              chatConstant: check_for_read.toJSON().id,
                              sender: data.sender,
                              receiver: data.receiver,
                              messageType: data.messageType,
                              message: data.message,
                              savedPath: saved_path,
                              media: media,
                              latitude: data.latitude,
                              longitude: data.longitude,
                              thumbnail: thumbnail,
                              created: timestamp,
                              modified: timestamp,
                              messageId: data.messageId,
                              senderName: data.senderName,
                              senderProfileImage: data.senderProfileImage,
                              receiverName: data.receiverName,
                              receiverProfileImage: data.receiverProfileImage,
                              isFavSender: '0',
                              isFavReceiver: '0',
                              fileName: data.fileName,
                              localImage: data.localImage,
                              localVideo: data.localVideo,
                              localAudio: data.localAudio,
                              full_name: '',
                              contact_number: 0

                          }
                          saveData(requestData) */

                      });
                  } else {

                      /* socket.emit('request_slice_upload', {
                          currentSlice: files[data.fileName].slice,
                          chatConstantId: check_for_read.toJSON().id,
                          sender: data.sender,
                          receiver: data.receiver,
                          messageType: data.messageType,
                          message: data.message,
                          media: media,
                          latitude: data.latitude,
                          longitude: data.longitude,
                          thumbnail: thumbnail,
                          created: timestamp,
                          modified: timestamp,
                          is_receiver_online: false,
                          fileName: data.fileName,
                          localImage: data.localImage,
                          localVideo: data.localVideo,
                          localAudio: data.localAudio,
                          percentage: percentage,
                          messageId: data.messageId,
                          senderName: data.senderName,
                          senderProfileImage: data.senderProfileImage,
                          receiverName: data.receiverName,
                          receiverProfileImage: data.receiverProfileImage,
                          isFavSender: '0',
                          isFavReceiver: '0',
                      }); */
                  }
              }
return;
                if (data.type === 2) {
                  data.location = {
                    type: "Point",
                    coordinates: [data.longitude, data.latitude],
                  };
                }
                data.chatId = result._id;
                // create chat with chatConstant id
                var userChat = new CHATS(data);
                userChat.save(async(err, results) => {
                if (err) throw err;
                let chatId = result._id;
                CHATCONSTANTS.findByIdAndUpdate(
                    result._id,
                    {
                      $set:{
                        lastmsgId: results._id,
                        updatedAt: Date.now(),
                        newDate: Date.now(),

                      }
                    },
                    (err, result) => {
                    if (err) throw err;
                    }
                );
                let otherUserDetails = await User.findOne({_id:data.receiverId}).select("socketId");
                let chatDetails = await CHATS.aggregate([
                  {
                      $match:{
                          chatId:mongoose.Types.ObjectId(result._id),
                      }
                  },
                   {
                      $lookup:{
                          from:"users",
                          localField:"senderId",
                          foreignField:'_id',
                          as:"senderId"
                      }
                  },
                  {
                      $unwind:"$senderId"
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },
                  {
                      $project:{
                          _id:"$_id",
                          "type":"$type",
                          "message":1,
                          "isSeen":1,
                          "chatId":1,
                          "updatedAt":"$updatedAt",
                          "senderId._id":"$senderId._id",
                          "senderId.isOnline":"$senderId.isOnline",
                          "senderId.username":"$senderId.username",
                          "senderId.profileImg":"$senderId.profileImg",
                          "senderId.email":"$senderId.email",
                          "senderId.socketId":"$senderId.socketId",
                          "receiverId._id":"$receiverId._id",
                          "receiverId.isOnline":"$receiverId.isOnline",
                          "receiverId.username":"$receiverId.username",
                          "receiverId.profileImg":"$receiverId.profileImg",
                          "receiverId.email":"$receiverId.email",
                          "receiverId.socketId":"$receiverId.socketId",
                      }
                  },
                  {
                      $sort: { createdAt: -1 },
                  },
                  { $skip: 7 * (1 - 1) },
                  { $limit: 7 },  
              ]);
                
                let pageNo = parseInt(data.pageNo)||1;
                let pageSize = parseInt(data.pageSize) || 10;
                if (pageNo <= 0) {
                throw responseMessage.PAGE_INVALID;
                }
                const chatList = await CHATCONSTANTS.aggregate([
                  {
                      $match:{
                          $or:[
                              {
                                  senderId:mongoose.Types.ObjectId(data.receiverId),
                              },
                              {
                                  receiverId:mongoose.Types.ObjectId(data.receiverId),
                              },
                          ],  
                      }
                  },
                  {
                    $lookup: {
                        from: "chats",
                        let: { userId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$chatId", "$$userId"] },isSeen:false,receiverId:mongoose.Types.ObjectId(data.receiverId) } },
                        ],
                        as: "msgsCount",
                    }
                  },
                   {
                    $addFields:{
                      unseenCount:{$size:"$msgsCount"}
                    }
                  }, 
                  {
                      $lookup:{
                          from:"chats",
                          localField:"lastmsgId",
                          foreignField:'_id',
                          as:"lastmsgId"
                      }
                  },
                  {
                      $unwind:"$lastmsgId"
                  },
                  {
                    $addFields:{
                      receiverId:{
                        $cond: {
                          if: {
                            $eq: [mongoose.Types.ObjectId(data.receiverId), "$lastmsgId.receiverId"]
                        },
                            then: "$lastmsgId.senderId",
                            else: "$lastmsgId.receiverId"
                        },
                      }
                    }
                  },
                  {
                      $lookup:{
                          from:"users",
                          localField:"receiverId",
                          foreignField:'_id',
                          as:"receiverId"
                      }
                  },
                  {
                      $unwind:"$receiverId"
                  },  
                   
                   {
                      $project:{
                          _id:"$_id",
                          "receiverId":"$receiverId",
                          "senderId":"$senderId",
                          "type":"$type",
                          "isTyping":1,
                          "unseenCount":1,
                          newDate:1,
                          "updatedAt":"$updatedAt",
                          "lastmsgId.receiverId._id":"$receiverId._id",
                          "lastmsgId.receiverId.message":"$lastmsgId.message",
                          "lastmsgId.receiverId.isOnline":"$receiverId.isOnline",
                          "lastmsgId.receiverId.userName":"$receiverId.userName",
                          "lastmsgId.receiverId.profileImg":"$receiverId.profileImg",
                          "lastmsgId.receiverId.email":"$receiverId.email",
                          "lastmsgId.receiverId.socketId":"$receiverId.socketId",
                      }
                  }, 
                  {
                    $project:{
                      "receiverId":0,
                    }
                },
                {
                    $sort: { createdAt: -1 },
                }, 
            ]);
            console.log(otherUserDetails.socketId,"data")
              // broadcast into room
              socket.broadcast.to(otherUserDetails.socketId).emit("msgReceived", chatDetails);
              // receives to user own that msg is sent
              socket.emit("msgReceived", chatDetails);
                });
            }
            ); 
          }else{
            socket.emit("msgReceived",'you can not chat with yourself')
          }
        }catch(err){
          console.log(err,"err???????????")
        }
      });

     

  });
};