const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Notification = mongoose.Schema({

    userId: { 
        type: String
    },
    notiBy: { type :Schema.Types.ObjectId,ref:"user"},
        createdAt: {
            type: Date,
            default:new Date()
        },
        createdAt1: {
            type: String,
            default: Date.now()
        },
        message:{
            type:String
        },
        isRead:{
            type:Boolean,
            default:0
        },
        title:{
            type:String
        },
        postId:{
            type:String
        },
        postTitle:{
            type:String
        },
        status:{
            type:String,
            default:0
        }
    
},{
    timestamps: true
})


Notification.plugin(mongoosePaginate)
Notification.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('notification', Notification, 'notification');