const {NodeMediaServer} = require('node-media-server');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const commonFunction = require('./helpers/commonFunctions');

const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require("multer");// for file save on server
const utils = require('./app/utils');
const Room = require("./app/models/Room");
const User = require("./app/models/userModel");
const shopmodelsPath = `${__dirname}/app/models/`;
var _dirname = path.resolve();
const dir = "./uploads/image/";
const maxSize = 30*1024*1024;
const {CHATCONSTANTS,CHATS} = require("./app/models/chatModel");
// app.use("/uploads/image/",express.static(_dirname+"/uploads/image/"));
app.use('/uploads/',express.static(path.join(__dirname, '/uploads/')))
fs.readdirSync(shopmodelsPath).forEach((file) => {
  if (~file.indexOf('.js')) {
    require(`${shopmodelsPath}/${file}`);
  }
});
app.get("/",async(req, res)=>{
  try{
    console.log(_dirname+'/uploads/image/','``~~~~~~~~~~~~~~~~~~~~~~~~~~~``');
     let posts = await Room.findOne({roomName:'roomName'}).populate({path:'messages.userId',select:'userName profileImg'});
      res.json(posts) 
  }catch(err){
    console.log(err, "err")
  }
})

app.post("/",async(req, res)=>{
  let postData = await Room.findOne(
    { roomName:"roomsName" },
     { $push:{'messages.$.message':"5fdc3c6238ae49208125434f"}} ,
    { new: true, useFindAndModify: false } 
  );
res.json(postData)

});

app.post("/socket/fileUpload",(req, res)=>{
  try{
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).send({
          message:err.message
        });
        return;
      } else {
        // console.log(req.body, req.files,"@@@@@@@@@@@@");
        
        CHATCONSTANTS.findOneAndUpdate(
          {
              // match with sender and receiver id with and, or case
              $or: [
              {
                  $and: [
                  {
                      senderId: req.body.senderId,
                  },
                  {
                      receiverId: req.body.receiverId,
                  },
                  ],
              },
              {
                  $and: [
                  {
                      senderId: req.body.receiverId,
                  },
                  {
                      receiverId: req.body.senderId,
                  },
                  ],
              },
              ],
          },
          {
              // upsert sender and receiver if record not exist
              senderId: req.body.senderId,
              receiverId: req.body.receiverId,
          },
          {
              // take upsert and new true for record new detail and
              upsert: true,
              new: true,
          },
          async (err, result) => {
            if(err){
              res.status(400).send({
                message:err.message
              });
              return;
            }else{
              req.body.chatId = result._id;
                // create chat with chatConstant id
                  let chatSaveArr=[];
                  if(req.files){
                    console.log(req.body.type,"req.body.type");
                    
                    if(req.body.type=='1' || req.body.type.includes("1")){
                      for(let i=0;i<req.files.file.length;i++){
                        chatSaveArr.push({
                          files : req.files.file[i].path,
                          message : req.body.message,
                          type:1,
                          senderId:req.body.senderId,
                          receiverId:req.body.receiverId,
                          chatId: result._id
                        })
                      }
                      let fcm = await User.findOne({_id:req.body.receiverId}).select("fcmToken");
                      console.log(`fcm`, fcm)
                      let fcmSender = await User.findOne({_id: req.body.senderId}).select("userName profileImg");
                      console.log(`fcmSender`, fcmSender)
        
                      fcm= JSON.parse(JSON.stringify(fcm));
                      console.log(fcm.fcmToken)
                      let pushNot=await commonFunction.pushNotification(fcm.fcmToken, `Check new photo sent by ${fcmSender.userName}`, "Photo", req.body.chatId,fcmSender.userName,fcmSender.profileImg, req.body.senderId,req.body.receiverId)
                      // console.log(`pushNot`, pushNot)
                    }


                    if(req.body.type=='4' || req.body.type.includes("4")){
                      for(let i=0;i<req.files.audio.length;i++){
                        chatSaveArr.push({
                          files : req.files.audio[i].path,
                          message : req.body.message,
                          type:4,
                          senderId:req.body.senderId,
                          receiverId:req.body.receiverId,
                          chatId: result._id
                        })
                      }

                    }
                    if(req.body.type=='5' ||  req.body.type.includes("5")){
                      for(let i=0;i<req.files.other.length;i++){
                        chatSaveArr.push({
                          files : req.files.other[i].path,
                          message : req.body.message,
                          type:4,
                          senderId:req.body.senderId,
                          receiverId:req.body.receiverId,
                          chatId: result._id
                        })
                      }

                    }
                    
                    if(req.body.type=='3' || req.body.type.includes("3")){
                      for(let i=0;i<req.files.video.length;i++){
                        chatSaveArr.push({
                          files : req.files.video[i].path,
                          thumbnail : req.files.thumbnail[i].path,
                          message : req.body.message,
                          type:3,
                          senderId:req.body.senderId,
                          receiverId:req.body.receiverId,
                          chatId: result._id
                        })
                      }

                      let fcm = await User.findOne({_id:req.body.receiverId}).select("fcmToken");
                      console.log(`fcm`, fcm)
                      let fcmSender = await User.findOne({_id: req.body.senderId}).select("userName profileImg");
                      console.log(`fcmSender`, fcmSender)
        
                      fcm= JSON.parse(JSON.stringify(fcm));
                      console.log(fcm.fcmToken)
                      let pushNot=await commonFunction.pushNotification(fcm.fcmToken, `Check new video sent by ${fcmSender.userName}`, "Video", req.body.chatId,fcmSender.userName,fcmSender.profileImg, req.body.senderId,req.body.receiverId)
                      // console.log(`pushNot`, pushNot)

                    }
                  }
                  
                  CHATS.create(chatSaveArr).then(resp=>{
                    resp = resp.reverse();
                    CHATCONSTANTS.findByIdAndUpdate(
                       result._id,
                       {
                         $set:{
                           lastmsgId: resp[0]._id,
                           updatedAt: Date.now(),
                           newDate: Date.now(),
                           type:resp[0].type   
                         }
                       },
                       (err, result) => {
                         if(err) {
                           res.status(400).send({
                             message:err.message
                           });
                           return;
                         }else{
                           res.send({
                             success:true,
                             data:result._id
                           })
                         }
                       }
                   ); 

                  }).catch(err=>{
                    res.status(400).send({
                      message:err.message
                    });
                  })
                  
                  
            }
            
            
          }
        );
      }
    });
  }catch(err){
    console.log(err,"err")
  }
}) 
var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage}).fields([{name:"file"},{name:"thumbnail"},{name:"video"}]);
const server = http.createServer(app);
/* eslint-disable-next-line */
const io = require('socket.io')(server);
require('./app/controllers/socketIO')(io);

mongoose.Promise = global.Promise;
global.appRoot = path.resolve(__dirname);

mongoose.connect('mongodb://localhost:27017/fambase',{useFindAndModify:false,useNewUrlParser: true,useUnifiedTopology: true}, (err) => {
  if (err) {
    console.log('....................... ERROR CONNECT TO DATABASE');
    console.log(err);
  } else {
    console.log('....................... CONNECTED TO DATABASE');
  }
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.set('socketio', io);
app.set('server', server);
app.use(express.static(`${__dirname}/public`));

server.listen(3333, (err, resp) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port 3333`);
  }
});

const nodeMediaServerConfig = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*',
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        ac: 'aac',
        mp4: true,
        mp4Flags: '[movflags=faststart]',
      },
    ],
  },
};

const nms = new NodeMediaServer(nodeMediaServerConfig);
nms.run();

nms.on('getFilePath', (streamPath, oupath, mp4Filename) => {
  console.log('---------------- get file path ---------------');
  console.log(streamPath);
  console.log(oupath);
  console.log(mp4Filename);
  utils.setMp4FilePath(`${oupath}/${mp4Filename}`);
});

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on postPublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on prePlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on postPlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});
