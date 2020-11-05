const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var roleKey = new schema({
    roleName: {
        type: String
    },
    permissions: [{
        dashboard: {
            type: Boolean,
            default: false
        },
        retailerManagement: {
            type: Boolean,
            default: false
        },
        staticContentManagement: {
            type: Boolean,
            default: false
        },
        faqManagement: {
            type: Boolean,
            default: false
        },
        transactionManagement: {
            type: Boolean,
            default: false
        },
        contactUsManagement: {
            type: Boolean,
            default: false
        },
        userManagement: {
            type: Boolean,
            default: false
        },
        categoryManagement: {
            type: Boolean,
            default: false
        },
        couponManagement: {
            type: Boolean,
            default: false
        },
        subCategoryManagement: {
            type: Boolean,
            default: false
        },
        martManagement: {
            type: Boolean,
            default: false
        },
    }],
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }
},
    {
        timestamps: true
    })
roleKey.plugin(mongoosePaginate);
module.exports = mongoose.model("role", roleKey)