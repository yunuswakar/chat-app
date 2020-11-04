const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bcrypt = require("bcrypt-nodejs");

var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongoosePaginate = require('mongoose-paginate');


let exchangeModel = new schema({
    unitUSD: {
        type: Number
    },
    unitCDF: {
        type: Number
    },  
    status: {
        type: String,  
    },
   
}, { timestamps: true })
exchangeModel.plugin(mongoosePaginate);
exchangeModel.plugin(mongooseAggregatePaginate);

var exchange = mongoose.model('exchange', exchangeModel);
module.exports = exchange

mongoose.model('exchange', exchangeModel).find((error, result) => {
    if (result.length == 0) {
        let obj = {
            'status': "ACTIVE",
            'unitUSD': 1,
            'unitCDF': 1,
        };
        mongoose.model('exchange', exchangeModel).create(obj, (error1, success) => {
            if (error1)
                console.log("Error is" + error1)
            else
                console.log("saved succesfully.", success);
        })
    }
});