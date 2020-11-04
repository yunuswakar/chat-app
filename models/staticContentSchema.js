const mongoose = require('mongoose');
const schema = mongoose.Schema;
let static_content = new schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    status: {
        type: String,
        default: "ACTIVE"
    },
    Type:
    {
        type: String
    },
    createdAt: {
        type: Date,
        default:new Date()
    },
    createdAt1: {
        type: String,
        default: Date.now()
    }, 
    },
    { timestamps: true }
    );


module.exports = mongoose.model('static_content', static_content);
mongoose.model('static_content', static_content).find((error, result) => {
if (result.length == 0) {
    let obj = {
        'title': "Terms of Condition",
        'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        'Type': 'TermCondition'
       
    };
    mongoose.model('static_content', static_content).create(obj, (error, success) => {
        if (error)
            console.log("Error is" + error)
        else
            console.log("Terms of Service saved succesfully.", success);
    })
}
});
mongoose.model('static_content', static_content).find((error, result) => {
if (result.length == 0) {
    let obj1 = {
        'title': "Privacy Policy",
        'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        'Type': 'PrivacyPolicy'
       
    };
    mongoose.model('static_content', static_content).create(obj1, (error, success) => {
        if (error)
            console.log("Error is" + error)
        else
            console.log("Static contact_us content saved succesfully.", success);
    })
}
});




