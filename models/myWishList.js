const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var myWishListKey = new schema({

    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    shopName: {
        type: String
    },
    retailerId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String
    },
    martId: {
        type: String
    },
    martName: {
        type: String
    },
    martImage: [String],
    categoryId: {
        type: schema.Types.ObjectId,
        ref: 'category'
    },
    categoryName: {
        type: String
    },
    retailerImage: { type: String },
    uniqueId: {
        type: schema.Types.ObjectId,
        ref: 'retailerCoupon'
    },
    categoryImage: {
        type: String
    },
    subCategoryId: {
        type: String
    },
    subCategoryName: {
        type: String
    },
    subCategoryImage: {
        type: String
    },
    martUsers:[],
    categoryUsers:[]

},
    {
        timestamps: true
    })

myWishListKey.plugin(mongoosePaginate)
module.exports = mongoose.model("myWishList", myWishListKey)