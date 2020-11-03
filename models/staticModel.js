const mongoose = require('mongoose');
const schema = mongoose.Schema;

var staticPage = new schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        },
        Type: {
            type: String,
            default: 'NONE'
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('staticPage', staticPage);

mongoose.model('staticPage', staticPage).find((error, result) => {
    if (result.length == 0) {
        let obj1 = {
            'title': "Terms and Conditions",
            'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
            'Type': 'TERMS'

        };
        let obj2 = {
            'title': "About Us",
            'description': "Travel is the main thing you purchase that makes you more extravagant”. We, at Orbistur.com, swear by this and our cutting edge technology fulfils your travel dreams that make you perpetually rich constantly. We have been moving excellent encounters for a considerable length of time through our easy to plan by own holiday packages as well as readymade special price offered Holiday Packages and other fundamental travel administrations where you can book your own holiday package with simple clicks as pe your preferences and choices. The powerful inclination of global voyagers to travel more nowadays is something that keeps us inspired to satisfy your vacation necessities. Our Key Points Realtime inventory and confirmation.24 X 7 support at all the destinations locally through personal assistance of our dedicated Tour Co-ordinators.Safe and secure payment through leading payment gateways like PayPal, PayUMoney, Razor Pay, Stripe & CC Avenue.Flights, Hotels, Transfers (Airport & Intercity), Sightseeing, Visas, Insurance & Foreign Exchange booking all together in some clicks.Detailed Costing for each and every element of service to make it more transparent.We serve 24 X 7 X 365 due to different time zones to give you a hassle free assistance.Free Visa & Foreign Exchange assistance.",
            'Type': 'ABOUT_US'

        };
        let obj3 = {
            'title': "Vision",
            'description': "At Orbistur.com we seek to enhance the travel management tools to improve the service while reducing your travel costs. We manage almost every type of travel needs, from simplest to the complex, and through our Travel Booking Engine we create an unparalleled experience that our customers could rely on. We aim to maintain our vision of high class travel services at reasonable prices through our cutting edge technology, consistent leadership, controlled growth and excellent commitment.Our Mission Orbistur.com seeks to manage the travel requirements of yours through its high end Booking Engine to add value to your travel spend. We tend to focus on the customers’ requirements to come up with effective strategies for meeting their demands in an efficient manner.",
            'Type': 'VISION'

        };
        let obj4 = {
            'title': "Help",
            'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
            'Type': 'HELP'

        };
        let obj5={
            'title': "Contact Us",
            'description': "Mumbai 15th Floor, Dev Corpora, Pokhran Road No.1, Eastern Express Highway, Thane, Mumbai -  400601 Phone No.: +91 22 506 4747 1 Mail : support@orbistur.com Delhi / NCR 2/F, Elegance, Jasola District Centre Old Mathura Road, New Delhi, 110025 Phone No.: +91 11 715 6868 1 Mail : support@orbistur.com Kolkata RDB Boulevard, 5th Floor Sector - V, Salt Lake, Kolkata, West Bengal-700091 Phone No.: +91 33 716 4646 1 Mail : support@orbistur.com Bangalore Ground Floor, Beech, E-1 Manyata Embassy Business Park, Outer Ring Road, Nagawara, Karnataka, Bangalore - 560045 Phone No.: +91 80 47 48 4949 Mail : support@orbistur.com"
        };


        mongoose.model('staticPage', staticPage).create(obj1, obj2, obj3, obj4,obj5,
            (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Static about_us content saved succesfully.", success);
            })
    }
});


