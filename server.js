const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config.js');
const cors = require('cors');
const db = require('./dbConnections/mongodb');
const index = require('./routes/indexRoute')
const app = express()
const server = require('http').createServer(app);
const path = require('path');
var expressValidator = require('express-validator');
app.use(expressValidator(console.log()))
var api = express.Router();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
var io = require('socket.io')(server)
var async = require("async")
var socketCommonFun = require('./helper/commonFunction');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.enable("trust proxy");
app.use(cors());
app.use('/api/v1', index);
app.use('/api/v1/transaction', require('./routes/transactionRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));
app.use('/api/v1/vendor', require('./routes/vendorRoutes.js'));


//////////////////////////Swagger Code///////////////////////////////
var swaggerDefinition = {
    info: {
        title: 'PixalApp',
        version: '2.0.0',
        description: 'Documentation of Pixal Application',
    },
    host: `localhost:${global.gConfig.node_port}`,
    basePath: '/',
  };
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/**.js'],
  };
  
  var swaggerSpec = swaggerJSDoc(options);
  
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  
  
  });
  
  // initialize swagger-jsdoc
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  




/////////////////////////////Send Money/////////////////////////////////

server.listen(global.gConfig.node_port, function () {
    console.log(' Server is listening on ', global.gConfig.node_port);
});
app.use("/", express.static(path.join(__dirname, '/public/dist')));
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/dist/index.html');
});
//............socket.io....................//
var userCount = 0, users = {}, keys = {}, sockets = {}, onlineUsers = {};
//.......................listen on every connection.........................//
io.sockets.on('connection', (socket) => {
    userCount++;
    console.log('New user connected', "totalUser>>>>", userCount, "socket Ids>>>", socket.id)
    console.log("connected socket online use lists>>>> ", JSON.stringify(onlineUsers))
    socket.on('online_user', async (data) => {
        try {
            users[data.userId] = socket.id,
                keys[socket.id] = data.userId
            // console.log("User : "+JSON.stringify(users) )
            // console.log("key lists: " +JSON.stringify(keys) )
            userIdData = data.userId
            console.log("get >>>>>>>", userIdData, socket.id)
            if (!(userIdData in onlineUsers)) {
                onlineUsers[userIdData] = {
                    socketId: [socket.id],
                    userId: userIdData,
                    status: "online"
                };
            }
            else {
                var temp_check;
                var onlineSocket = [... new Set(onlineUsers[userIdData].socketId.reverse())]
                console.log("reverse data>>>>>>>", onlineSocket, socket.id)
                for (var i = 0; i < onlineSocket.length; i++) {
                    if (onlineUsers[userIdData].socketId[i] == socket.id) {
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
                    console.log("before push ???????", onlineUsers[userIdData])
                    onlineUsers[userIdData].socketId = []
                    onlineUsers[userIdData].socketId.push(socket.id)
                    console.log("after push ???????", onlineUsers[userIdData])
                }
            }
            console.log('Online Users are', JSON.stringify(onlineUsers))

            // var userIds = Object.values(keys)
            //  console.log("selected Ids>>>>>>>",userIds);
            let userData = await socketCommonFun.getUserBalance(data.userId);
            // console.log("online userDetail>>>>>",userData)
            io.sockets.in(socket.id).emit('getBalance', userData)
        }
        catch (e) {
            throw e;
        }
    })
    //socket disconnection 
    socket.on('disconnect', async () => {
        userCount--;
        var online = onlineUsers
        var check = socket.id
        var key1;
        for (let [key, value] of Object.entries(online)) {
            if ((value.socketId).indexOf(check) != -1) {
                key1 = key;
                break;
            }
        }
        // var key1=key1
        console.log("remove ejabbered with socket id>>>>>", key1, "having socketId>>>>>", socket.id)
        if (onlineUsers[key1] != undefined) {
            console.log("true");
            delete onlineUsers[key1];
            delete sockets[socket.id];
        }
        console.log("Remaining online Users are=======>>>>>>>>>>>>>>", JSON.stringify(onlineUsers));
    })
    //.................  end socket.connection.........................//  
})