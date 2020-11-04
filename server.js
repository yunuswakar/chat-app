const express = require('express')
const app = express();
const config = require('./config/config')
const mongoose = require('mongoose')
let userRoutes = require('./routes/userRoutes');
let adminRoutes = require('./routes/adminRoutes');
let adminHandler=require('./fileHandler/userHandler.js')
let func=require('./fileHandler/function.js')
const bodyParser = require('body-parser');
const morgan = require('morgan')
var cors = require('cors')
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/VideoPosting",{useNewUrlParser: true,useCreateIndex: true,});
app.use(cors())
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)


app.use(express.static(__dirname + '/public/dist/VideoPostingAdmin'));
app.get('/*', function (req, res) {
  res.sendFile(__dirname +'/public/dist/VideoPostingAdmin/index.html');
});


app.listen(config.server_port,()=>{
	console.log("\x1b[32m","\x1b[33m","\x1b[5m","\x1b[1m","test server connected on port ==>",config.server_port)
})



