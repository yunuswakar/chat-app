const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate")


const jsonKey = new schema({

    retailerId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    templateId:{
        type: String

    },
    categoryImage: {
        type: String
    },
    categoryPriority: {
        type: Number

    },
    radius:{
        type: Number

    },
    categoryName: { type: String },
    martImage: [String],
      
    productServiceType: {
        type: String

    },
    martName: { type: String },
    mobileNumber: [Number],
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: []
    },

    subCategoryName: { type: String },

    categoryId: {
        type: schema.Types.ObjectId,
        ref: "category"
    },
    subCategoryPriority: {
        type: Number
    },
    subCategoryId: {
        type: schema.Types.ObjectId,
        ref: "subcategory"
    },
    rejectionComment: {
        type: String
    },
    mobileNumber:[{
        mobileNumber:{type:String}
    }],
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
    couponImage: {
        type: String
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
        enum: ["SAVED", "SUBMITTED", "PUBLISHED", "REJECTED", "WITHDRAWN", "EXPIRED"],
        default: "SAVED"
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
jsonKey.index({ location: "2dsphere" });
jsonKey.plugin(mongoosePaginate);
jsonKey.plugin(aggregatePaginate)


module.exports = mongoose.model('retailerSavedCoupon', jsonKey, 'retailerSavedCoupon')