const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Retweet = mongoose.Schema({

    
    postId: { type :Schema.Types.ObjectId,ref:"post"},
      
        retweeterId:{
            type:String
        },
        newPostId:{ type :Schema.Types.ObjectId,ref:"post"},
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


Retweet.plugin(mongoosePaginate)
Retweet.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('retwwet', Retweet, 'retwwet');