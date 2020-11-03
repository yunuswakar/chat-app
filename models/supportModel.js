const mongoose = require('mongoose');
const schema = mongoose.Schema;

var supportPage = new schema(
    {
        Type: {
            type: String,
            default: 'SUPPORT'
        },
        Assistance: [{
            Phone: { type: Number },
            phoneStatus: {
                type: String,
                enum: ["ACTIVE", "INACTIVE"]
            },
            emailStatus: {
                type: String,
                enum: ["ACTIVE", "INACTIVE"]
            },
            email: { type: String },
            liveChat: {
                type: String,
                enum: ["ACTIVE", "INACTIVE"]
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('supportPage', supportPage);





mongoose.model('supportPage', supportPage).find((error, result) => {
    if (result.length == 0) {
        let obj = {
            "Type": "SUPPORT",
            "Assistance": [{ "Phone": 7979862051, "phoneStatus": "ACTIVE" }, { "email": 'no-aliahmad@mobiloitte.com', "emailStatus": "ACTIVE" }, { "liveChat": "ACTIVE" }]
        }
        mongoose.model('supportPage', supportPage).create(obj,
            (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Static about_us content saved succesfully.", success);
            })
    }
});


