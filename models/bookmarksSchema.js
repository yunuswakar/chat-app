const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Bookmark = mongoose.Schema({


    postId: { type :Schema.Types.ObjectId,ref:"post"},
      
    bookMarkerId:{
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
        enum:['SAVED','UNSAVED']
    }

    
},{
    timestamps: true
})


Bookmark.plugin(mongoosePaginate)
Bookmark.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('bookmark', Bookmark, 'bookmark');