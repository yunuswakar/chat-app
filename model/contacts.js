const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate');
const paginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let contactSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    number: {
        type: String
    },
    countryCode: {
        type: String
    },
    splitMobileNumber: {
        type: String
    }
}, {
        timestamps: true,

    })
contactSchema.plugin(paginate);
contactSchema.plugin(aggregatePaginate);

var contact = mongoose.model("contact", contactSchema)
module.exports = contact
