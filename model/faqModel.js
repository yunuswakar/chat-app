const mongoose = require('mongoose');
const schema = mongoose.Schema;
let faqModel = new schema({
            
    question:
    {
        type: String
    },
    answer:
    {
        type: String
    },

    status: {
        type: String,
        default: "ACTIVE"
    },
    userId:
    {
        type: schema.Types.ObjectId,
        ref:"users"
    }

},
{ timestamps: true }
);
module.exports = mongoose.model('FAQ', faqModel);

