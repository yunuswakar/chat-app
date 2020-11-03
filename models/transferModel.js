const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var transferModel= new schema({
    destinationId:{
        type:String,
        ref:"country"
    },
    destination:{
        type:String
    },
    transferType:{
        type:Boolean
    },
    airportTransfer:[{
        onWard:[{
            bookingType:{
                type:String,
                enum:["PRIVATE","SEAT IN COACH"]
            },
            pickupFrom:{
                type:String
            },
            date:{
                type:String
            },
            time:{
                type:String
            },
            dropOff:{
                type:String
            },
            noOfAdults:{
                type:String
            },
            noOfChildren:{
                type:String
            },
            carTypeId:{
                type:String
            },
        }
        ],
        return:[{
            bookingType:{
                type:String,
                enum:["PRIVATE","SEAT IN COACH"]
            },
            pickupFrom:{
                type:String
            },
            date:{
                type:String
            },
            time:{
                type:String
            },
            dropOff:{
                type:String
            },
            noOfAdults:{
                type:String
            },
            noOfChildren:{
                type:String
            },
            carTypeId:{
                type:String
            },
        }
        ],
    }

    ],
    interCityTransfer:[{
        bookingType:{
            type:String,
            enum:["PRIVATE","SEAT IN COACH"]
        },
        pickupFrom:{
            type:String
        },
        date:{
            type:String
        },
        time:{
            type:String
        },
        dropOff:{
            type:String
        },
        noOfAdults:{
            type:String
        },
        noOfChildren:{
            type:String
        },
    }],
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE","DELETE"],
        default: "ACTIVE"
    },
}, { timestamps: true });
transferModel.plugin(mongoosePaginate)
module.exports = mongoose.model("transferModel", transferModel);