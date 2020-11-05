
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var couponKey = new schema({
    
    userId: {
        type: String,
        ref: "user"
    },
   
    couponId: {
        type: String,
        ref:"retailerCoupon"
    },
   
   // -------
   retailerId: {
    type: schema.Types.ObjectId,
    ref: "user"
},

categoryName: { type: String },

productServiceType: {
    type: String
   
},
martName: { type: String },
mobileNumber: {
    type: String
},


subCategoryName: { type: String },

categoryId: {
    type: schema.Types.ObjectId,
    ref: "category"
},
subCategoryId: {
    type: schema.Types.ObjectId,
    ref: "subcategory"
},
rejectionComment: {
    type: String
},
mobileNumber: { type: String },
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
couponAppliedOn: {
    type: String
},
ExpiryDate: {
    type: Date
},

restrictions: {
    type: String
},
itemType: {
    type: String
},
itemName: {
    type: String
},
brandName: {
    type: String
},
oneTimeCoupon: {
    type: Boolean,
    default: false
},
Inside_Mart_Notifications: {
    type: String,
    enum: ["targetAll", "wishlistBased", "None"],
    default: "None"
},
outside_Mart_Notifications: {
    type: String,
    enum: ["targetAll", "wishlistBased", "None"],
    default: "None"
},
status: {
    type: String,
    enum: ["ACTIVE", "BLOCK", "DELETE"],
    default: "ACTIVE"
},
couponStatus: {
    type: String,
    enum: ["PENDING", "SAVED", "SUBMITTED", "PUBLISHED", "REJECTED", "WITHDRAWN", "EXPIRED", "REDEEMED"],
    default: "SUBMITTED"
},
appovalStatus: {
    type: String,
    enum: ["PENDING", "APPROVED", "WITHDRAW", "REJECTED"],
    default: "PENDING"
},
//******************** extra but no need .....direct populate on retailerId && nested populate on martId*********** */
martId: {
    type: schema.Types.ObjectId,
    ref: "mart"
},
shopPhoneNumber: {
    type: String
},
shopName: {
    type: String
},
floorNumber: {
    type: String
},

}, {
    timestamps: true
})


couponKey.plugin(mongoosePaginate);
module.exports = mongoose.model("userCoupon", couponKey)
