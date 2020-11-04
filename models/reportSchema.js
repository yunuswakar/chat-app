const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Report = mongoose.Schema({

       postId: { type :Schema.Types.ObjectId,ref:"post"},
       reportBy: { type :Schema.Types.ObjectId,ref:"user"},
        report:{
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


Report.plugin(mongoosePaginate)
Report.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('report', Report, 'report');