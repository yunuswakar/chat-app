const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate');
const paginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
     requestedId:{
         type:Schema.Types.ObjectId,
         ref:'users'
     },
     userId:{
       type:Schema.Types.ObjectId,
       ref:'users'
     },
    notifications:{
        type:String
    },
    requestType: {
        type: String,
        enum: ["CASH", "CREDITCARD"],
        default: "CREDITCARD"
    },
    usdAmount: {
        type: Number,
        default: "0"
    },

    amount:{
        type:String
    },
    convertedAmount:{
        type:Number
    },
    message:{
        type:String
    },
    status:{
        type:String,
        enum:["ACCEPTED","REJECTED","PENDING"]
    },
    notificationType:{
        type:String,
        enum:["ADD", "SEND","REQUEST", "WITHDRAW"]
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    otp:{
        type: String
    },
    recieverName:{
        type: String
    },
    recieverNumber:{
        type: String
    },
    senderCurrency:{
        type:String
    },
    receiverCurrency:{
        type:String
    },
    image:{
         type:String
    },
    transactionId:{
        type:String
    }
    },{
    timestamps:true,
   
    })
    notificationSchema.plugin(paginate);
    notificationSchema.plugin(aggregatePaginate);
    
    var notification=mongoose.model("notification",notificationSchema)
    module.exports=notification
    