const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Share = mongoose.Schema({

    
    postId: { type :Schema.Types.ObjectId,ref:"post"},
      
        shareBy:{
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

    
},{
    timestamps: true
})


Share.plugin(mongoosePaginate)
Share.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('share', Share, 'share');