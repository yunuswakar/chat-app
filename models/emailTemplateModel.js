const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;

const templateKey = new schema({

    image: {
        type: String,
    },
    subject: {
        type: String
    },
    time: {
        type: String
    },
    day: {
        type: String,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    radius: {
        type: String
    },
    header: {
        type: String
    },
    footer: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "INACTIVE"
    }
}, {
    timestamps: true
})

templateKey.plugin(mongoosePaginate);
module.exports = mongoose.model('email-template', templateKey)