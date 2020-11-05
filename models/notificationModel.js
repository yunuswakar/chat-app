const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt= require('bcrypt-nodejs')
var mongoosePaginate = require('mongoose-paginate');

var notificationModel = new schema({
    senderId:{
        type:schema.Types.ObjectId,
        ref:"USER"
    },
    userId:{
        type:schema.Types.ObjectId,
        ref:"USER"
    },
    requestedId:{
        type:schema.Types.ObjectId,
        ref:"USER"
    },
    eventId:{
        type:schema.Types.ObjectId,
        ref:"event"
    },
    messege:{
        type:String
    },
    joinRequest:{
        type:String,
        enum:["PENDING","ACCEPT","REJECT"],
        //default:"ACTIVE"
    },
    requestType:{
        type:String,
        enum:["REQUESTED","ACCEPT"],
        //default:"ACTIVE"
    },
    status:{
        type:String,
        enum:["ACTIVE","DELETE"],
        default:"ACTIVE"
    }

}, { timestamps: true });
notificationModel.plugin(mongoosePaginate);
module.exports = mongoose.model("notification", notificationModel); 