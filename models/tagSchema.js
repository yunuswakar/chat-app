const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Tag = mongoose.Schema({

    userId: { type :Schema.Types.ObjectId,ref:"user"},

    tag:[],
    
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
        enum:['ACTIVE','INACTIVE'],
        default:'ACTIVE'
    },
},{
    timestamps: true
})


Tag.plugin(mongoosePaginate)
Tag.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('tag', Tag, 'tag');