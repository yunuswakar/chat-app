const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;

const subCategoryKey = new schema({

    image: {
        type: String,
    },
    subCategoryPriority: {
        type: Number
    },
    categoryId: {
        type: schema.Types.ObjectId,
        ref: "category"
    },
    subCategoryName: {
        type: String
    },
    categoryName:{type:String},
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
        users:[]
}, { timestamps: true })

subCategoryKey.plugin(mongoosePaginate);
module.exports = mongoose.model('subcategory', subCategoryKey)
