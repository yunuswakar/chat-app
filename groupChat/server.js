
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config.js');
const cors = require('cors')
const db = require('./dbConnectivity/mongodb')
const index = require('./routes/indexRoute')
const app = express();
const path = require('path');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const chatController=require('./controllers/userController')
const server = require("http").createServer(app, options);
const io = require('socket.io')(server)

var swaggerDefinition = {
  info: {
    title: 'PixalApp',
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
app.use(bodyParser.json({limit:'50mb'}));

app.use(morgan('dev'))
app.use(cors());
app.use('/api/v1', index);
app.use('/', express.static(path.join(__dirname, 'public')));


//-----------socket-----------------------------------------//

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
    console.log(' Server is listening on ', global.gConfig.node_port);
});