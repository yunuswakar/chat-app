const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;

const guestUser = new schema({

    popUpAddress:[{
        pinCode:{
           type: String
        },
        state:{
           type: String
        },
        city:{
           type: String
        },
        address:{
           type: String
        },
       }],
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }
}, { timestamps: true })

guestUser.plugin(mongoosePaginate);
module.exports = mongoose.model('guestUser', guestUser)