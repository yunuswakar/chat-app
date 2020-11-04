const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var sessionModel = new schema({

    sessionId:String,    
      
    token:String,
            
}, { timestamps: true });

module.exports = mongoose.model("session", sessionModel);