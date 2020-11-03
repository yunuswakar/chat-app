const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var product = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "userMedia"
        },
        categoryId: {
            type: schema.Types.ObjectId,
            ref: "category"
        },
        subCategoryId: {
            type: schema.Types.ObjectId,
            ref: "category"
        },
        productName: {
            type: String
        },
        categoryName: {
            type: String
        },
        subCategoryName: {
            type: String

        },
        description: {
            type: String
        },

        sellerName: {
            type: String
        },
       
        quantity: {
            type: Number
        },
        uploadDate: {
            type: String
        },
        productCost:
        {
            type: Number
        },
        deliveryCharge: {
            type: Number
        },
        productSize: [
            {
                size: {
                    type: Number
                },
                quantity: {
                    type: Number

                }
            },

        ],

        address: {
            type: String
        },

        country: {
            type: String
        },
        state: {
            type: String
        },

        location: {
            type: String
        },
        cardDetails: [{
            firstName: String,
            lastName: String,
            email: String,
            phoneNumber: String,
            countryCode: String,
            mobile: String,
            bankName: String,
            cardNumber: String,
            expiryDate: String,
            cvvNumber: String,
            country: String,
            address: String,
            city: String,
            state: String,
            zipCode: String,
            expMonth: String,
            expYear: String,
            stripAccountId: String,
            cvvNumber: String
        }],
        productImages: [
            {
                image: {
                    type: String,
                }
            }
        ],
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        },
        sellStatus: {
            type: String,
            enum: ["AVAILABLE", "SOLD", "PENDING", "RETURN"],
            default: "AVAILABLE"
        }
    },
    {
        timestamps: true
    }
);

product.plugin(mongoosePaginate);
module.exports = mongoose.model("product", product);


