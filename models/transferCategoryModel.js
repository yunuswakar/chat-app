const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var transferCategory = new schema({

    category: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true });
transferCategory.plugin(mongoosePaginate)
module.exports = mongoose.model("transferCategory", transferCategory);

mongoose.model('transferCategory', transferCategory).find((error, result) => {
    if (result.length == 0) {
        let obj1 = {
            'category': "Airport Transfer",
            'status': "ACTIVE"
        };
        let obj2 = {
            'category': "Intercity Transfer",
            'status': "ACTIVE"
        };


        mongoose.model('transferCategory', transferCategory).create(obj1, obj2,
            (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Category has been added successfully.", success);
            })
    }
});
