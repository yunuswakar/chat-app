const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');


let messageModel = new schema({
  message:{
      type:String
  },
  help:{
    type:String
  },
  helpId:{
    type:String
  }

}, { timestamps: true })
messageModel.plugin(mongoosePaginate);
messageModel.plugin(mongooseAggregatePaginate);

var message = mongoose.model('message', messageModel);
module.exports = message

mongoose.model('message', messageModel).find((error, result) => {
  if (result.length == 0) {
      let obj = {
          'help': "money Transfer money Transfer money Transfer money Transfermoney Transfer",
          'helpId':"123"
         };
      mongoose.model('message', messageModel).create(obj, (error, success) => {
          if (error)
              console.log("Error is" + error)   
          else
              console.log("Static term & condition content saved succesfully.", success);
      })
  }
});