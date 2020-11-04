const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Comment = mongoose.Schema({

   
    postId: { type :Schema.Types.ObjectId,ref:"post"},
    commentBy: { type :Schema.Types.ObjectId,ref:"user"},
    message:{
        type:String
    },
    commentHeadline:{
        type:String
    },
    rate:{
        type:Number
    },
    createdAt: {
        type: Date,
        default:new Date()
    },
    createdAt1: {
        type: String,
        default: Date.now()
    },

    
},{
    timestamps: true
})


Comment.plugin(mongoosePaginate)
Comment.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('comment', Comment, 'comment');