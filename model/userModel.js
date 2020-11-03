const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs");
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var userModel = new schema({
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  dateOfBirth: {
    type: String
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHERS"]
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  postCode: {
    type: String
  },
  countryCode: {
    type: String
  },
  mobileNumber: {
    type: String
  },
  password: {
    type: String
  },
  pin: {
    type: String
  },
  otp: {
    type: Number
  },
  otpTime: {
    type: Number
  },
  otpVerification: {
    type: Boolean,
    default: false
  },
  isSubscription: {
    type: Boolean,
    default: false
  },
  maxUsersForPlan: {
    type: String
  },
  profilePic: {
    type: String,
    default: null
  },
  maxBuddies: {
    type: Number
  },
  universityName: {
    type: String
  },
  universityCode: {
    type: String
  },
  userType: {
    type: String,
    enum: ["ADMIN", "SUBADMIN", "INDIVIDUAL", "COMPANY ADMIN", "COMPANY"],
    default: "INDIVIDUAL",
    uppercase: true
  },
  status: {
    type: String,
    enum: ["ACTIVE", "BLOCK", "DELETE"],
    default: "ACTIVE"
  },
  userId: {
    type: schema.Types.ObjectId,
    ref: "users"
  },
  deviceToken: {
    type: String
  },
  deviceType: {
    type: String,
    enum: ["iOS", "android"]
  },
  feedback: [{
    rating: {
      type: String
    },
    comments: {
      type: String
    }
  }],
  permissions: [{
    dashboard: {
      type: Boolean,
      default: false
    },
    userManagement: {
      type: Boolean,
      default: false
    },
    subAdminManagement: {
      type: Boolean,
      default: false
    },
    animationManagement: {
      type: Boolean,
      default: false
    },
    podcastManagement: {
      type: Boolean,
      default: false
    },
    mentalHealthCampaign: {
      type: Boolean,
      default: false
    },
    medicalConditionKnowledge: {
      type: Boolean,
      default: false
    },
    contactUsManagement: {
      type: Boolean,
      default: false
    },
    subscriptionManagement: {
      type: Boolean,
      default: false
    },
    transactionManagement: {
      type: Boolean,
      default: false
    },
    staticContentManagement: {
      type: Boolean,
      default: false
    },
  }]

}, { timestamps: true });

userModel.plugin(mongoosePaginate)
var users = mongoose.model("users", userModel);
module.exports = users;

mongoose.model("users", userModel).find({ userType: "ADMIN" }, (err, result) => {
  if (err) {
    console.log("DEFAULT ADMIN ERROR", err);
  } else if (result.length != 0) {
    console.log("Default Admin.");
  } else {
    let obj = {
      userType: "ADMIN",
      firstName: "Tanya",
      lastName: "Chandwani",
      country: "INDIA",
      profilePic: "https://res.cloudinary.com/dkoznoze6/image/upload/v1563943105/n7zdoyvpxxqhexqybvkx.jpg",
      verifyOtp: true,
      countryCode: "+91",
      mobileNumber: "7840006886",
      email: "no-tanyachandwani@mobiloitte.com",
      password: bcrypt.hashSync("Mobiloitte1"),
      permissions: [{
        dashboard: true,
        userManagement: true,
        subAdminManagement: true,
        animationManagement: true,
        podcastManagement: true,
        mentalHealthCampaign: true,
        medicalConditionKnowledge: true,
        contactUsManagement: true,
        subscriptionManagement: true,
        transactionManagement: true,
        staticContentManagement: true
      }]
    };
    mongoose.model("users", userModel).create(obj, (err1, result1) => {
      if (err1) {
        console.log("DEFAULT ADMIN  creation ERROR", err1);
      } else {
        console.log("DEFAULT ADMIN Created", result1);
      }
    });
  }
});

