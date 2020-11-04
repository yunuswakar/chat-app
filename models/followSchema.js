const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Follow = mongoose.Schema({

       followBy: { type :Schema.Types.ObjectId,ref:"user"},
       followTo: { type :Schema.Types.ObjectId,ref:"user"},
        status:{
            type:String,
            enum:['FOLLOW','UNFOLLOW']
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


Follow.plugin(mongoosePaginate)
Follow.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('follow', Follow, 'follow');