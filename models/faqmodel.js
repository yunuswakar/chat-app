const mongoose = require('mongoose');
const schema = mongoose.Schema;

var faq = new schema(
    {
        question: {
            type: String
        },
        answer: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('faq', faq);



mongoose.model('faq', faq).find((error, result) => {
    if (result.length == 0) {
        let obj1 = {
            'question': "question1",
            'answer': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet."
        };
        let obj2 = {
            'question': "question 2",
            'answer': "Travel is the main thing you purchase that makes you more extravagan"
        };
        let obj3 = {
            'question': "question 3",
            'answer': "At Orbistur.com we seek to enhance the travel management tools to improve the service while reducing your travel costs"

        };
        let obj4 = {
            'question': "question4",
            'answer': "Lorem ipsum dolor sit amet, consectetur adipiscing elit"

        };
        let obj5={
            'question': "question 5",
            'answer':  "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        };


        mongoose.model('faq', faq).create(obj1, obj2, obj3, obj4,obj5,
            (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Static faq saved succesfully.", success);
            })
    }
});
