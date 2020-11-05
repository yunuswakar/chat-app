const express = require('express')
const bodyParser = require("body-parser");
const config = require('./config/config')
const db = require('./dbConnectivity/mongodb')
const index = require('./routes/indexRoute')
const app = express()
const morgan = require('morgan');

const https = require('https');
const http = require('http');
const server = require("http").createServer(app, options);
// var WebSocketServer = require('websocket').server;
const cron=require("node-cron")
const io = require('socket.io')(server)
const chatController = require('./controllers/chatController')
const myCron=require('./controllers/userController')


const cors=require('cors')
app.use(cors());
///////////////////////////////////////////////////////////////Swagger//////////////////////////////////////////////////////////////////////////////

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
  info: {
    title: 'Social_X',
    version: '2.0.0',
    description: 'Documentation of Pixal Application',
  },
  host: `${global.gConfig.swaggerURL}`,
  basePath: '/',
};
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);


});

// initialize swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan('dev'))

app.use('/api/v1', index)



//-----cron-----------------------


cron.schedule('0 0 */7 * *', () => {
    console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  myCron.publicPostExpire()
  })

cron.schedule('0 0 */7 * *', () => {
    console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  myCron.publicStoryExpire()
  })

//--------------------socket-------------------------



var userCount = 0, users = {}, keys = {}, sockets = {}, onlineUsers = {};
io.sockets.on('connection', (socket) => {
  console.log("my socket id is >>>>>", socket.id)

  // ...............online user.......................//
  socket.on('onlineUser', (data) => {
      console.log("data>>>>>>", data)
      console.log("socket.id??????>>>", socket.id)
      OnlineUser(data, socket.id);
      io.sockets.emit("onlineUser",onlineUsers)
  })
  //***************  send Chat one to one ******************** */
  socket.on('oneToOneChat',async(data) => {
    console.log("125", data)
    let sendSocketId,id

    let chatSend = await chatController.oneToOneChat(data)
    OnlineUser(data.messages[0].receiverId, socket.id)

        var socketUser = [data.senderId, data.receiverId]
        var nums1 = [undefined]
        console.log("socket users>?>", socketUser)
        socketUser.forEach(id => {
            console.log("sending>?>", id)
            if (id in onlineUsers) {
                console.log("socketId>>>.>?>", onlineUsers[id].socketId)
                sendSocketId = onlineUsers[id].socketId
                io.sockets.in(sendSocketId).emit("oneToOneChat", chatSend)
            }
        })
   
    // io.sockets.emit("markettingChatApi", chatSend)
})


socket.on('chattingHistory',async(data) => {
    console.log("113======>",data)
    let chatData = await chatController.ChattingHistory(data)
    console.log("server chat >>>>>>>>>", chatData)
    var socketUser = [data.senderId, data.receiverId]
    var nums1 = [undefined]
    console.log("socket users>?>", socketUser)

    io.sockets.in(socket.id).emit("chattingHistory", chatData)
    
})

socket.on('groupChat',async(data) => {
   
    let chatSend = await chatController.groupChat(data)
         io.to(socket.id).emit('groupChat',chatSend);

})

socket.on('groupChattingHistory', async (data) => {
    let chatData = await chatController.groupChattingHistory(data)
 
    io.to(socket.id).emit('groupChattingHistory',chatData);
    
})
  //*****************************disconnect    ****************//
  socket.on('disconnect', async () => {
      userCount--;
      console.log("disconnected socketId", userCount, socket.id)
      console.log("in disconnected online user>>>> >>>>>", +JSON.stringify(onlineUsers))
      var online = onlineUsers
      var check = socket.id
      var key1;
      for (let [key, value] of Object.entries(online)) {
          if ((value.socketId).indexOf(check) != -1) {
              key1 = key;
              break;
          }
      }
      console.log("remove ejabbered with socket id>>>>>", key1, socket.id)
      if (onlineUsers[key1] != undefined) {
          console.log("true");
          delete onlineUsers[key1];
          delete sockets[socket.id];
      }
      console.log("Remaining online Users are=======>>>>>>>>>>>>>>", JSON.stringify(onlineUsers));

  })
})

function OnlineUser(data, socket) {
  try {
      console.log("socket.id??dgdfgdfggdf????>>>", data.userId, socket)
      users[data.userId] = socket
          keys[socket] = data.userId
      console.log("User : " + JSON.stringify(users))
      console.log("key lists: " + JSON.stringify(keys))

      userIdData = data

      if (!(userIdData in onlineUsers)) {
          onlineUsers[userIdData] = {
              socketId: [socket],
              userId: userIdData,
              status: "online"
          };
      }
      else {
          var temp_check;
          var onlineSocket = [... new Set(onlineUsers[userIdData].socketId.reverse())]

          console.log("reverse data>>>>>>>", onlineSocket, socket)
          for (var i = 0; i < onlineSocket.length; i++) {
              if (onlineUsers[userIdData].socketId[i] == socket) {

                  console.log('Same socket ID');
                  temp_check = 0;
                  break;
              }

              else {
                  temp_check = 1
              }
              break;
          }
          console.log('temp check value is', temp_check);
          if (temp_check == 0) {
              console.log('Same socket id');

          }
          else {
              var temp = []

              console.log("before push ???????", onlineUsers[userIdData])
              onlineUsers[userIdData].socketId = []
              onlineUsers[userIdData].socketId.push(socket)
              console.log("after push ???????", onlineUsers[userIdData])

          }
      }
      console.log('Online Users are', JSON.parse(JSON.stringify(onlineUsers)))
      console.log('user id is', userIdData);

  }
  catch (e) {
      throw e;
  }
}   
server.listen(global.gConfig.node_port, function () {

  console.log("Server is listening on", global.gConfig.node_port)

})



