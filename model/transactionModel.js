var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema=mongoose.Schema
var transaction= new schema(
    {
    userId:{
        type: schema.Types.ObjectId,
        ref:"users"
    },
    firstName:{
        type:String,
    },
    amount:{
        type:Number
    },
    paymentDate:{
        type:String
    },
    chargeId:{
        type: String
    },
    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },
    paymentStatus:{
        type: String,
        enum:["FAILURE","PENDING","SUCCESS"],
        default: "PENDING"
    },

}, { 
    timestamps: true 
})

transaction.plugin(mongoosePaginate);
module.exports = mongoose.model('transaction', transaction);