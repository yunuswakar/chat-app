const express = require('express')
const bodyParser = require("body-parser");
const config = require('./config/config')
const db = require('./dbConnectivity/mongodb')
const chatSchema = require('./controllers/chatController')
const index = require('./routes/indexRoute')
const app = express()
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const http=require('http')
// const server = require("https").createServer(app, option);
const fs = require('fs');
let cert = fs.readFileSync('./SSL/orbistur.crt')
let key = fs.readFileSync('./SSL/orbistur.key')
app.use(cors());
const https = require('https');
///////////////////////////////////////////////////////////////Swagger//////////////////////////////////////////////////////////////////////////////
var options = {
    key: key,
    cert: cert
};
var server = http.createServer(options, app);
const io = require('socket.io')(server)



///////For HTTPS CERTIFICATE /////////



const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
    info: {
        title: 'Orbistur',
        version: '2.0.0',
        description: 'Documentation of Orbistur',
    },
    host: `${global.gConfig.swaggerURL}`,
    basePath: '/',
};
var option = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*/*.js']
};

var swaggerSpec = swaggerJSDoc(option);

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

app.use(express.static(path.join(__dirname, 'public/dist/orbisturAdminPanel')));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/dist/orbisturAdminPanel/index.html')
});

////////////////////////////////////////////////////////////////////////////////////////////////
var userCount = 0, users = {}, keys = {}, sockets = {}, onlineUsers = {};
io.sockets.on('connection', (socket) => {
    console.log("my socket id is >>>>>", socket.id)
    // console.log("my socket id is >>aCDFShdfhfd>>>",  socket.userId)

    // ...............online user.......................//
    socket.on('onlineUser', (data) => {
        console.log("data>>>>>>", data)
        console.log("socket.id??????>>>", socket.id)
        OnlineUser(data, socket.id);
        io.sockets.emit("onlineUser", onlineUsers)
    })
    //***************  send Chat one to one ******************** */
    socket.on('chattingAPI', async (data) => {
        console.log("104==>", data)
        OnlineUser(data.message[0].senderId, socket.id)
        let sendSocketId;
        let chatSend = await chatSchema.chattingAPI(data)
        console.log("I am here to send CHAT >>>>>", data.message)
        if (chatSend.result.status == "ACTIVE") {
            var socketUser = [data.adminId, data.customerId]
            console.log("socket users>?>", socketUser)
            socketUser.forEach(id => {
                console.log("sending>?>", id)
                if (id in onlineUsers) {
                    console.log("socketId>>>.>?>", onlineUsers[id].socketId)
                    sendSocketId = onlineUsers[id].socketId
                    io.sockets.in(sendSocketId).emit("chattingAPI", chatSend)
                }
            })
        }
        else {
            console.log("You cant chat")
        }
    })

    socket.on('markettingChatApi', async (data) => {
        console.log("125", data)
        OnlineUser(data.message[0].senderId, socket.id)
        let sendSocketId;

        let chatSend = await chatSchema.markettingChatAPI(data)
        console.log("123===>>>>>", chatSend, chatSend.result.status)

        if (chatSend.result.status == "ACTIVE") {
            console.log("1300000000000", chatSend, chatSend.result.status)
            console.log("I am here to send CHAT >>>>>", data.message)

            var socketUser = [data.adminId, data.customerId]
            console.log("socket users>?>", socketUser)
            socketUser.forEach(id => {
                console.log("sending>?>", id)
                if (id in onlineUsers) {
                    console.log("socketId>>>.>?>", onlineUsers[id].socketId)
                    sendSocketId = onlineUsers[id].socketId
                    io.sockets.in(sendSocketId).emit("markettingChatApi", chatSend)
                }
            })
        }
        else {
            console.log("You cant chat")
        }
        // io.sockets.emit("markettingChatApi", chatSend)
    })

    //******************chat History ***************************** */

    socket.on('chatHistory', async (data) => {
        let chatData = await chatSchema.chatHistory(data)
        console.log("server chat >>>>>>>>>", chatData)
        var socketUser = [data.adminId, data.customerId]
        console.log("socket users>?>", socketUser)

        io.sockets.in(socket.id).emit("chatHistory", chatData)
        // }
        // io.sockets.in(sendSocketId).emit("chatAPI",chatSend)

        //   io.sockets.emit('chatHistory', chatData)
    })
    //*****************************disconnect    ****************//

    socket.on('disconnect', async () => {
        userCount--;

        console.log("disconnected socketId", userCount, socket.id)
        // console.log("in disconnected >>>>>", +JSON.stringify(keys ))

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
        // var key1=key1
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
        console.log("socket.id??dgdfgdfggdf????>>>", data)
        users[data.userId] = socket;
            keys[socket] = data.userId
        console.log("User : " + JSON.stringify(users))
        console.log("key lists: " + JSON.stringify(keys))

        let userIdData = data
        console.log("get >>>>>>>", userIdData, socket)

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
            // for (var i = 0; i < onlineSocket.length;i++) {
            //     if (onlineUsers[userIdData].socketId[i] == socket) {
            //         // if (onlineSocket[i] == socket) {



            //         console.log('Same socket ID');
            //         temp_check = 0;
            //         break;
            //     }

            //     else {
            //         temp_check = 1
            //         break;
            //     }
            // }
            console.log('temp check value is', temp_check);
            if (temp_check == 0) {
                console.log('Same socket id');

            }
            else {

                console.log("before push ???????", onlineUsers[userIdData])
                onlineUsers[userIdData].socketId = []
                onlineUsers[userIdData].socketId.push(socket)
                console.log("after push ???????", onlineUsers[userIdData])

            }
        }
        console.log('Online Users are', JSON.stringify(onlineUsers))
        console.log('user id is', userIdData);

    }
    catch (e) {
        console.log(e);
    }
}

server.listen(global.gConfig.node_port, function () {

    console.log("Server is listening on", global.gConfig.node_port)

})



