const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var userModel = new schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    profilePic: {
        type: String
    },
    country: {
        type: String
    },
    userType: {
        type: String,
        enum: ["ADMIN", "SUBADMIN", "USER"],
        default: "USER"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },


}, { timestamps: true });


module.exports = mongoose.model("user", userModel);

mongoose.model("user", userModel).find({ userType: "ADMIN" }, (err, result) => {
    if (err) {
        console.log("DEFAULT ADMIN ERROR", err);
    } else if (result.length != 0) {
        console.log("Default Admin.");
    } else {
        let obj = {
            userType: "ADMIN",
            name: "socket",
            country: "INDIA",
            profilePic: "https://res.cloudinary.com/dkoznoze6/image/upload/v1563943105/n7zdoyvpxxqhexqybvkx.jpg",
            email: "no-wakaryunus@mobiloitte.com",
            password: bcrypt.hashSync("Mobiloitte1"),
        };
        mongoose.model("user", userModel).create(obj, (err1, result1) => {
            if (err1) {
                console.log("DEFAULT ADMIN  creation ERROR", err1);
            } else {
                console.log("DEFAULT ADMIN Created", result1);
            }
        });
    }
});