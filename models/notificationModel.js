const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var schema = mongoose.Schema;
var notifications = new schema({
    userId: {
        type: String,
        ref: 'user'
    },
    couponId: {
        type: String,
        ref: "retailerCoupon"
    },
    comment: {
        type: String
    },
    notificationType: { type: String },
    title: { type: String },
    body: { type: String },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    coupon: [{
        image: {
            type: String
        },
        title: {
            type: String
        },
        couponCode: {
            type: String
        },
        discount: {
            type: String
        },

        ExpiryDate: {
            type: Date
        },

        itemName: {
            type: String
        },
        martId: {
            type: String
        },
        categoryId: {
            type: String
        },
        subCategoryId: {
            type: String
        },
        retailerId: {
            type: String,
            ref: "user"
        },
    }]
},
    {
        timestamps: true
    })
notifications.plugin(mongoosePaginate);
notifications.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("notifications", notifications)