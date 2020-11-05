const mongoose = require('mongoose');
var schema = mongoose.Schema;
var couponTemplateModel = new schema({

    couponTemplate: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },

},
    {
        timestamps: true
    })

module.exports = mongoose.model("couponTemplateModel", couponTemplateModel)
mongoose.model("couponTemplateModel", couponTemplateModel).find({}, (err, result) => {
    if (err) {
        console.log("Default static content error", err);
    }
    else if (result.length != 0) {
        console.log("Default static content");
    }
    else {
        var obj1 = {
            "couponTemplate" : "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1587969438/emzmghfb7l3ibwdnnpew.png"
        };
        var obj2 = {
            "couponTemplate" : "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1587969462/giqhaln5inwlgoqzzcrd.png"
        };
        var obj3 = {
            "couponTemplate" :  "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1587969488/yorgt6n6gdifdlofjfsf.png"
        };
        var obj4 = {
            "couponTemplate" : "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1587969504/bjujxwkoidwgg3wamnum.png"
        };
        var obj5 = {
            "couponTemplate" :  "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1587969512/uayu00jufenpah1worq9.png"
        };

        mongoose.model("couponTemplateModel", couponTemplateModel).create(obj1, obj2, obj3, obj4, obj5, (error, staticResult) => {
            if (error) {
                console.log("coupon content error.", err);
            }
            else {
                console.log("coupon content created.", staticResult)
            }
        })
    }
})