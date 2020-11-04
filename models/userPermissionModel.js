const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let userPermissionModel = mongoose.Schema({

    userId: { type :String},
  
    blockUserId: {
         type: Schema.Types.ObjectId, ref: "user",
    },
    
},{
    timestamps: true
})


userPermissionModel.plugin(mongoosePaginate)
userPermissionModel.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('userPermissionModel', userPermissionModel, 'userPermissionModel');