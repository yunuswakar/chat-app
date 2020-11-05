const mongoose = require('mongoose');
var schema = mongoose.Schema;
var couponTemplate = new schema({

    coupon: {
        type: String
    },
    template: {},
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },

},
    {
        timestamps: true
    })

module.exports = mongoose.model("couponTemplate", couponTemplate)
