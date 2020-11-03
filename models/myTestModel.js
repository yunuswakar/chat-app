const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var myTest = new schema({

  patientId:{
    type: String

  },
    testData: [],
     
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
     
},
    {
        timestamps: true
    })

    myTest.plugin(mongoosePaginate);
module.exports = mongoose.model("myTest", myTest)