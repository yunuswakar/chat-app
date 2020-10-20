const mongoose = require('mongoose')
global.Promise=mongoose.Promise;
const config = require('../config/config')
const db_name = `${global.gConfig.database}`;
const host = `${global.gConfig.host}`;
const DB_URL = `mongodb://${host}/${db_name}`

mongoose.set('useFindAndModify', false);
mongoose.connection.openUri(DB_URL,{ useNewUrlParser: true , useUnifiedTopology:true})

mongoose.connection.on('connected',()=>{
console.log('success', 'Mongoose default connection open to ' +DB_URL)
});

mongoose.connection.on('error',(err)=>{
     console.log('error', 'Mongoose default connection error')
});

mongoose.connection.on('disconnected',()=>{
     console.log('disconnected', 'Mongoose detault connection is disconnected')
})

process.on('SIGINT',()=>{
   mongoose.connection.close(()=>{
      console.log('warning','Mongoose default connection disconnected through app termination')
    });
});