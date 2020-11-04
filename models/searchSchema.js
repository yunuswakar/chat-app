const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Search = mongoose.Schema({

       userId: { type :Schema.Types.ObjectId,ref:"User"},
  
      
        search:{
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


Search.plugin(mongoosePaginate)
Search.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('search', Search, 'search');