const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var transferType = new schema({

    type: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true });
transferType.plugin(mongoosePaginate)
module.exports = mongoose.model("transferType", transferType);

mongoose.model('transferType', transferType).find((error, result) => {
    if (result.length == 0) {
        let obj1 = {
            'type': "Private",
            'status': "ACTIVE"
        };
        let obj2 = {
            'type': "Seat in coach",
            'status': "ACTIVE"
        };


        mongoose.model('transferType', transferType).create(obj1, obj2,
            (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Category has been added successfully.", success);
            })
    }
});