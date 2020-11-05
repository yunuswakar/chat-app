const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var reatilerWebsites = new schema({
    webSiteImages: [],
    retailerId: {
       
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    basicInformation: [{
        shopName: {
            type: String,
        },
        shopNumber: {
            type: String
        },
        floorNumber: {
            type: String
        },
        shopPhoneNumber: {
            type: String
        },
        martName: {
            type: String
        },
        martAddress: {
            type: String
        }
    }
    ],
    productServiceDetails: [{
        categoryId: {
            type: String,
            ref: 'category'
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subcategory'
        },
        itemType: {
            type: String
        },
        brand: {
            type: String
        },
        itemName: {
            type: String
        },
        price: {
            type: String
        }

    }],
    shopTiming: [{
        sunday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }],
        monday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }],
        tuesday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }],
        wednesday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }],
        thursday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }],
        friday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }],
        saturday: [{
            startTime: {
                type: String
            },
            endTime: {
                type: String
            },
            closeDay: {
                type: Boolean
            }
        }]
    }],
    aboutUs: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }
},
    {
        timestamps: true
    })
reatilerWebsites.plugin(mongoosePaginate);
module.exports = mongoose.model("retailerWebsites", reatilerWebsites)