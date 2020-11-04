const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
let Post = mongoose.Schema({

    userId: { type :Schema.Types.ObjectId,ref:"user"},

    videoTitle:{
        type:String
    },
    videosDescription:{
        type:String
    },
    videosTag:[
    ],
    visibility:{
        type:String,
        enum:['PUBLIC','PRIVATE'],
        default:'PUBLIC'
    },
    video:{
        type:String
    },
    thumbImage:{
        type:String
    },
    duration:{
        type:String
    },
    publicId:{
        type:String
    },
     createdAt: {
        type: Date,
        default:new Date()
    },
    updatedAt: {
        type: Date
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
    commentCount:{
        type:String,
        default:0
    },
    likeCount:{
        type:String,
        default:0
    },
    rateAvg:{
        type:String,
        default:0
    },
    viewCount:{
        type:String,
        default:0
    },
    bookMarksCount:{
        type:String,
        default:0
    },
    followerCount:{
        type:String,
        default:0
    },
    followingCount:{
        type:String,
        default:0
    },
    retweetCount:{
        type:String,
        default:0
    },
    reportCount:{
        type:String,
        default:0
    },
    shareCount:{
        type:String,
        default:0
    },
    likes:[{
        userId:{
            type:String
        },
        isLike:{
            type:Boolean
           
        }
    }],
    comments:[{
        userId:{
            type:String
        },
        isComment:{
            type:Boolean
        }
    }],
    bookMarks:[{
        userId:{
            type:String
        },
        isBookmark:{
            type:Boolean
        }
    }],
    retweets:[{
        userId:{
            type:String
        },
        isRetweet:{
            type:Boolean
        }
    }],
    shares:[{
        userId:{
            type:String
        },
        isShare:{
            type:Boolean
        }
    }],
    views:[{
        userId:{
            type:String
        },
        isView:{
            type:Boolean
           
        }
    }],
    postUserId:{
        type:String,
    },
     actionTime:{
        type: Date
    },
     videoSize:{
        type: Number
    },
    

    
},{
    timestamps: ''
})


Post.plugin(mongoosePaginate)
Post.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('post', Post, 'post');