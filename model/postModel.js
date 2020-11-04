const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');

let postModel = new schema({

    name: {
        type: String
    },
    userId: {
        type: String
    },
    count:{
        type:String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    content: {
        type: String
    },
    like: [{
        type: String
    }],
    images: [{
        type: String
    }],
    comment: [{
        commentUser: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        comment: {
            type: String
        },
        profilePic: {
            type: String
        }

    }],
    replayComment: [{
        commentUser: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        commentId: {
            type: String
        },
        comment: {
            type: String
        },
        profilePic: {
            type: String
        }

    }],

    statusDate: {
        type: Number,
        default: Date.now()
    },
    postedDate: {
        type: Number,
        default: Date.now()
    },
    profilePic: {
        type: String
    },
    statusTime: {
        type: Number,
        default: Date.now()
    },
    postedTime: {
        type: Number,
        default: Date.now()
    },
    report: [{
        report: {
            type: String
        },
        userId:{
            type:String
        }
    }],
    tag:[{
        type:String
    }],
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }

}, { timestamps: true })
postModel.plugin(mongoosePaginate);
postModel.plugin(mongooseAggregatePaginate);

var post = mongoose.model('post', postModel);
module.exports = post