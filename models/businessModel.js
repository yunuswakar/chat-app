const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;

const businessModel = new schema({
    retailerId:{
        type:String,
        ref:'user'
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }
}, {
    timestamps: true
})

businessModel.plugin(mongoosePaginate);
module.exports = mongoose.model('category', businessModel)