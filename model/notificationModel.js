const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');

let notificationModel = new schema({
   name:{
       type:String
   },
   agentId:{
       type:String
   },
   agent_Id:{  
    type:String
   },
   customer_Id:{
   type:String
   },
   superAgent_Id:{  
     type:String
   },
   requestedTime:{
    type:String,
      default: Date.now()
   },
   customer_MobileNumber:{
     type:String
   },
   notifications:{
    type:String
   },
   status:{
       type:String,
       enum:["requested","approved"],
       default:"requested" 
   },
     transferType:{
     type:String,
     enum:["Send","Withdraw","Receive"]
   },
   agent_MobileNumber:{
     type:String
   },
   amount:{
       type:Number
   },
   countryCode:{
   type:String
   },
   amountType:{
       type:String,
       enum:["USD","CDF"]
   },
   notificationType:{   
       type:String,
       enum:["Add","Send","Withdraw"]
   },
   transactionStatus:{   
    type:String,
    enum:["PENDING","COMPLETED"],
    default:"PENDING"  
},
 
}, { timestamps: true })
notificationModel.plugin(mongoosePaginate);
notificationModel.plugin(mongooseAggregatePaginate);

      
module.exports= mongoose.model('notification',notificationModel);

