const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Like = mongoose.Schema({


    postId: { type :Schema.Types.ObjectId,ref:"post"},
      
    likeBy:{
        type:String
    },
    createdAt: {
        type: Date,
        default:new Date()
    },
    createdAt1: {
        type: String,
        default: Date.now()
    },
    status:{
        type:String,
        enum:['LIKE','DISLIKE']
    }

    
},{
    timestamps: true
})


Like.plugin(mongoosePaginate)
Like.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('like', Like, 'like');