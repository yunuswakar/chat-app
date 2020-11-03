const mongoose = require('mongoose');
const schema = mongoose.Schema;
let static_content = new schema(
    {
        title:
        {
            type: String
        },
        uniqueId:{ type: String},
        description:
        {
            type: String
        },
        status: {
            type: String,
            default: "ACTIVE"
        },
        type:
        {
            type: String,
            default: 'NONE'
        },
        FAQ: [{
            
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
                created_At: {
                    type: Date,
                    default: Date.now()
                },
                category:String
            
        }],
    },
    { timestamps: true }
);
module.exports = mongoose.model('static_content', static_content);
mongoose.model('static_content', static_content).find((error, result) => {
    if (result.length == 0) {
        let obj = {
            'title': "Terms and Conditions",
            'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            'type': 'term_condition'

        };
        mongoose.model('static_content', static_content).create(obj, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("Static term & condition content saved succesfully.", success);
        })
    }
});
mongoose.model('static_content', static_content).find((error, result) => {
    if (result.length == 0) {
        let obj1 = {
            'title': "About Us",
            'description': "Coins \n Bazaar (CB) is a digital platform for exchanging your crypto currency called  Bitcoin  It  works on person to person contact and advanced Cyber Technology .This Transaction platform has no affiliation to any authority and banks .The platform works through collaborations and through collective efforts.  Coins Bazaar is a Seamless, Public Domain crypto currency Transaction Platform. Every individual who fulfills the transaction and trading terms can be a part of the Coins Bazaar digital trading virtual platform."+"\n"+"Coins Bazaar with its transparent and multi utility efficiency system  covers a lot more than what  other payment systems have to offer. Traders from different countries can exchange their  Bitcoin currency through their Local Coins Bazaar Wallet .The Coins Bazaar systems works through advertisements placed by traders where the exchange rates of Bitcoin are mentioned along with payment modes for buying or selling Bitcoin currency."+"\r\n"+"So visit Coins Bazaar and experience a whole new way of futuristic trading now.",
            'type': 'about_us'

        };
        mongoose.model('static_content', static_content).create(obj1, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("Static about_us content saved succesfully.", success);
        })
    }
});
mongoose.model('static_content', static_content).find((error, result) => {
    if (result.length == 0) {
        let obj3 = {
            'title': "Privacy Policy",
            'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            'type': 'privacy_policy'

        };
        mongoose.model('static_content', static_content).create(obj3, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("Static privacy content saved succesfully.", success);
        })
    }
});

mongoose.model('static_content', static_content).find((error, result) => {
    if (result.length == 0) {
        let obj6 = {
            'title': "Contact Us",
            'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "email": "admin@gmail.com",
            "phoneNumber": "+911111111111",
            'type': 'contact_us'

        };
        mongoose.model('static_content', static_content).create(obj6, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("Static about_us content saved succesfully.", success);
        })
    }
});
mongoose.model('static_content', static_content).find((error, result) => {
    if (result.length == 0) {
        let obj8 = {
            FAQ: [
                {

                    "question": " This is just a demo question?",
                    "answer": "2 This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "trade"
                }, {

                    "question": "This is just a demo question?",
                    "answer": "This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "trade"


                },


                {
                    "question": "This is just a demo question?",
                    "answer": "This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "security"

                }, {

                    "question": "This is just a demo question?",
                    "answer": "This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "security"


                },
                {
                    "question": "This is just a demo question?",
                    "answer": "This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "feedback"

                }, {

                    "question": "This is just a demo question?",
                    "answer": "This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "feedback"


                },

                {

                    "question": "This is just a demo question?",
                    "answer": " This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "transfer"
                },

                {

                    "question": "This is just a demo question?",
                    "answer": "This is just a demo Answer.",
                    status: "ACTIVE",
                    category: "transfer"

                }
            ],

            'type': 'FAQ',
        };
        mongoose.model('static_content', static_content).create(obj8, (error, success) => {
            if (error)
                console.log("Error is" + error)
            else
                console.log("Static faq content saved succesfully.", success);
        })
    }
});
