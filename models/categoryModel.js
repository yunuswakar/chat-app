const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;

const categoryKey = new schema({

    image: {
        type: String,
    },
    productServiceType: {
        type: String,
        enum: ["PRODUCT", "SERVICE"]
    },
    categoryName: {
        type: String
    },
    users: [],
    categoryPriority: {
        type: Number
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    favourites: []
}, {
    timestamps: true
})

categoryKey.plugin(mongoosePaginate);
module.exports = mongoose.model('category', categoryKey)