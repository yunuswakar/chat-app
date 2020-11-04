const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Viewpost = mongoose.Schema({


    postId: { type :Schema.Types.ObjectId,ref:"post"},
      
        viewBy:{
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


Viewpost.plugin(mongoosePaginate)
Viewpost.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('view', Viewpost, 'view');