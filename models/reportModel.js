const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var reportModel = new schema({
    patientId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    resourceType: {
        type:String,
    },
    identifier:[],
    status:{type:String},
    category:{type:String},
    code:{type:String},
    subject:{type:String},
    encounter:{type:String},
    effectiveDateTime:{type:Date},
    effectivePeriod:{type:String},
    issued:{type:String},
    performer:{type:String},
    request:[],
    specimen:[],
    result:[],
    imagingStudy:[],
    image:[],
    conclusion:{type:String},
    codedDiagnosis:[],
    presentedForm:[]
},
    {
        timestamps: true
    })

    reportModel.plugin(mongoosePaginate);
module.exports = mongoose.model("reports", reportModel)