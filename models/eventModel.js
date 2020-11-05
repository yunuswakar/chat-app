const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const schema = mongoose.Schema;
const eventModel = new schema({
   
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    name:{
        type:String
    },
    profilePic:{
        type:String
    },
    // participant: [String],
    participant: [
        {
            participantId: {
                type: schema.Types.ObjectId,
                ref: "user"
            },
            name:{
                type:String
            },
            profilePic:{
                type:String
            }
        }
    ],
    eventCategoryId: {
        type: String
    
    },
    privacy: {
        type: String,
        enum: ["Only Selected friends", "Friends of Friends", "Friends","public"],
        //enum: ["Only Selected friends", "public", "Friends of Friends", "Friends"],
        default: "public"
    },
    timeLine: [String],
    eventType: {
        type: String,
        enum: ["OUTDOOR", "ORDER FOOD", "OFFLINE", "ONLINE_GENERAL", "ONLINE_ANTAKSHRI"],
        //default: ""
    },
    onlineEventType: {
        type: String,
        enum: ["VIDEO_MEET","LIVE_STREAM"],
        //default: ""
    },
    description: String,
    Address: String,
    date: {
        type:String
    },
    time:{
        type:String
    },
    refree: {
        type:String
    },
    refreePic:{
        type:String
    },
    suggestedThinkingTime:{
        type:String
    },
    votingSystem:{
        type:String
    },

    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
    joinRequest:
        [
            {
                requestedId: {
                    type: schema.Types.ObjectId,
                    ref: "user"
                },
                eventId: {
                    type: schema.Types.ObjectId,
                    ref: "event"
                },
                status:{
                    type:String,
                    enum:["PENDING","ACCEPTED","REJECTED"],
                    default:"PENDING"
                }

            }

        ]
    ,
    invite: {
        type: String,
        enum: ["Anyone", "Boy's Meetup", "Girly catch up", "Couples"],
        //default: ''
    },
    title:{
        type:String
    },
    MaxPersonCapacity: String,
    pricePerPerson: String,
    seeEvent: [String],
    image: [],
    video:[],
    temp_key:{
        type:String
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'BLOCK', 'DELETE', 'CANCEL'],
        default: 'ACTIVE'
    }
},
{timestamps: true })
eventModel.plugin(mongoosePaginate);
module.exports = mongoose.model("event", eventModel)





