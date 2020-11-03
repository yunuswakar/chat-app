const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbConnections/mongodb');
const cors = require('cors')
const config = require('./config/config');
const app = express();
const morgan = require('morgan')
const chatController = require('./webServices/controllers/chatController')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const chatSchema = require('./webServices/controllers/chatController')
const myCron=require('./webServices/controllers/userController')

const path = require('path');


const server = require("http").createServer(app, options);
// var WebSocketServer = require('websocket').server;
const cron=require("node-cron")
const io = require('socket.io')(server)
app.use(cors());
//------------------swaggerr----------------------------------


var swaggerDefinition = {
    info: {
        title: 'PixalApp',
        version: '2.0.0',
        description: 'Documentation of Pixal Application',
    },
    host: 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1501/api-docs/',
    basePath: '/',
};


// cron.schedule('*/1 * * * *', () => {
//     console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//     myCron.paymentTransfer();
//     myCron.productDelivered();

// })



var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/userRouter.js'],
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);

});

// initialize swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//--------------------------------------endSwagger-----------------------------------




app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(morgan('dev'))

app.use('/api/v1/admin', require('./routes/adminRouter'))
app.use('/api/v1/user', require('./routes/userRouter'))
app.use('/api/v1/reportProblem', require('./routes/reportProblemRouter'))
app.use('/api/v1/staticPage', require('./routes/staticPageRouter'))
app.use('/api/v1/chat', require('./routes/chatRouter'))


// app.use(express.static(path.join(__dirname, 'dist/BayiseWeb')));
// app.get('/website/', (req, res) => {
//     res.sendFile(__dirname + '/dist/BayiseWeb/index.html')
// });

app.use(express.static(path.join(__dirname, 'dist/socialAdminpanel')));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/socialAdminpanel/index.html')
});
app.get("/test", (req, res) => {
    return res.send("Server connection is setup with project Social media ")
})


var options = {
    key: fs.readFileSync('./ssl/ssl.KEY'),
    cert: fs.readFileSync('./ssl/serverssl.CRT')
};

var userCount = 0, users = {}, keys = {}, sockets = {}, onlineUsers = {};

io.sockets.on('connection', (socket) => {
    console.log("my socket id is >>>>>", socket.id)
    // console.log("my socket id is >>aCDFShdfhfd>>>",  socket.userId)

    // ...............online user.......................//
    socket.on('onlineUser', (data) => {
        console.log("data>>>>>>", data)
        console.log("socket.id??????>>>", socket.id)
        OnlineUser(data, socket.id);
        io.sockets.emit("onlineUser",onlineUsers)
    })
    //***************  send Chat one to one ******************** */
    socket.on('chattingAPI', async(data) => {
        console.log("104==>",data)
        OnlineUser(data.messages[0].senderId, socket.id)
        let sendSocketId, id
        let chatSend = await chatSchema.chattingAPI(data)
        console.log("I am here to send CHAT >>>>>", data.message)
        if (chatSend.result.status == "ACTIVE") {
            var socketUser = [data.sellerId, data.userId]
            var nums1 = [undefined]
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
        OnlineUser(data.messages[0].senderId, socket.id)
        let sendSocketId, id

        let chatSend = await chatSchema.markettingChatAPI(data)
        console.log("123===>>>>>", chatSend, chatSend.result.status)

        if (chatSend.result.status == "ACTIVE") {
            console.log("1300000000000", chatSend, chatSend.result.status)
            console.log("I am here to send CHAT >>>>>", data.message)

            var socketUser = [data.userId, data.sellerId]
            var nums1 = [undefined]
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

    //********************friend to friend chat*******************/

    socket.on('friendChatting', async (data) => {
        console.log("125", data)
        OnlineUser(data.messages[0].receiverId, socket.id)
        let sendSocketId, id

        let chatSend = await chatSchema.friendChatting(data)
        // console.log("123===>>>>>", chatSend, chatSend.result.status)

            // console.log("1300000000000", chatSend, chatSend.result.status)
            // console.log("I am here to send CHAT >>>>>", data.message)

            var socketUser = [data.senderId, data.receiverId]
            var nums1 = [undefined]
            console.log("socket users>?>", socketUser)
            socketUser.forEach(id => {
                console.log("sending>?>", id)
                if (id in onlineUsers) {
                    console.log("socketId>>>.>?>", onlineUsers[id].socketId)
                    sendSocketId = onlineUsers[id].socketId
                    io.sockets.in(sendSocketId).emit("friendChatting", chatSend)
                }
            })
       
        // io.sockets.emit("markettingChatApi", chatSend)
    })

    //***********************************************************/

    //******************chat History ***************************** */

    socket.on('chatHistory', async (data) => {
        let chatData = await chatSchema.chatHistory(data)
        console.log("server chat >>>>>>>>>", chatData)
        var socketUser = [data.sellerId, data.userId]
        var nums1 = [undefined]
        console.log("socket users>?>", socketUser)

        io.sockets.in(socket.id).emit("chatHistory", chatData)
        // }
        // io.sockets.in(sendSocketId).emit("chatAPI",chatSend)

        //   io.sockets.emit('chatHistory', chatData)
    })
    socket.on('friendChattingHistory', async (data) => {
        let chatData = await chatSchema.friendChattingHistory(data)
        console.log("server chat >>>>>>>>>", chatData)
        var socketUser = [data.senderId, data.receiverId]
        var nums1 = [undefined]
        console.log("socket users>?>", socketUser)

        io.sockets.in(socket.id).emit("friendChattingHistory", chatData)
        // }
        // io.sockets.in(sendSocketId).emit("chatAPI",chatSend)

        //   io.sockets.emit('chatHistory', chatData)
    })
    socket.on('markettingChatHistory', async (data) => {
        let chatData = await chatSchema.markettingChatHistory(data)
        console.log("server chat >>>>>>>>>", chatData)
        var socketUser = [data.userId, data.sellerId]
        var nums1 = [undefined]
        console.log("socket users>?>", socketUser)

        io.sockets.in(socket.id).emit("markettingChatHistory", chatData)
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
        console.log("socket.id??dgdfgdfggdf????>>>", data.userId, socket)
        users[data.userId] = socket,
            keys[socket] = data.userId
        console.log("User : " + JSON.stringify(users))
        console.log("key lists: " + JSON.stringify(keys))

        userIdData = data
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
            for (var i = 0; i < onlineSocket.length; i++) {
                if (onlineUsers[userIdData].socketId[i] == socket) {
                    // if (onlineSocket[i] == socket) {



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

//------------------------------------server---------------------------------------------------------------------------
server.listen(gConfig.node_port, (error, serverCreated) => {      
    if (error) {
        console.log('Error In Server Creation');
    } else {
        console.log(`My Server is running on ${gConfig.node_port}`);
    }
})





