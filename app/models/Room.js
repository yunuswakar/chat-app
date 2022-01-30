const mongoose = require('mongoose');
const Utils = require('../utils');

const { Schema } = mongoose;

const RoomSchema = new Schema({
  roomName: {
    type: String,
  },
  liveStatus: {
    type: Number,
    default: 0,
  },
  filePath: {
    type: String,
    default: '',
  },
  likes:[
    {
    type:Schema.Types.ObjectId,
    ref:'User'
    }
  ],
  viewBy:[
    {
    type:Schema.Types.ObjectId,
    ref:'User'
    }
  ],
  messages: [
    {
      userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
      },
      message:String,
      createdAt: {
        type: Date,
        default: Utils.getCurrentDateTime(),
      },
      seenBy:[{type:Schema.Types.ObjectId,ref:'User'}]
    }
  ],
    
  countViewer: {
    type: Number,
    default: 0,
  },
  countHeart: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Utils.getCurrentDateTime(),
  },
  beginAt: {
    type: Date,
    default: Utils.getCurrentDateTime(),
  },
});

module.exports = mongoose.model('Room', RoomSchema, 'rooms');
