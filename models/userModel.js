const mongoose = require("mongoose");
//const stripe = require('stripe')('sk_live_qUId0fHSCzpArYVBunb0IUpP');
//const stripe = require('stripe')('sk_test_TGvQ13w637wJ9LFYyiU41Il5001YD56Bbn');
const stripe = require('stripe')('sk_test_L8oA9O5IOgtmflzWMndmmEhR')
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const bcrypt = require("bcrypt-nodejs");

var userMember = new schema(
  {
    firstName: {
      type: String
    },
    fcmToken: {
      type: String,
      default:null
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    secondaryEmail: {
      type: String
    },
    country:{
      type: String

    },
    countryCode: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    mergePhoneNumber: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
      default: "MALE"
    },
    password: {
      type: String
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default: "ACTIVE"
    },
    userType: {
      type: String,
      enum: ["ADMIN", "USER", "SUBADMIN"],
      default: "USER"
    },
    emailOtp: {
      type: String
    },
    secondaryEmailOtp: {
      type: String
    },
    secondaryEmailOtpVerify: {
      type: String
    },
    emailOtpVerify: {
      type: Boolean,
      default: false
    },
    emailOtpExpireTime: {
      type: Date
    },
    secondaryEmailOtpExpireTime: {
      type: Date
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/dl2d0v5hy/image/upload/v1556880003/r6hq5rvhfzxokipn6usi.png"
    },
    token: {
      type: String
    },
    languageList: {
      type: String
    },
    selectedLanguage: {
      type: String,
      enum: ["ENGLISH", "GERMAN", "SPANISH", "FRENCH", "MANDARIN"],
      default: "ENGLISH"
    },
    socialId: {
      type: String
    },
    loginType: {
      type: String,
      enum: ["FACEBOOK", "GMAIL", "NORMAL"],
      default: "NORMAL"
    },
    friendList: [
      {
        friendId: {
          type: schema.Types.ObjectId,
          ref: "userMedia"
        },
        addTime: {
          type: Date,
          default: Date.now()
        },
        status: {
          type: String,
          enum: ["ACTIVE", "BLOCK", "DELETE"],
          default: "ACTIVE"
        }
      }
    ],
    friendRequestSentList: [
      {
        friendRequestSentId: {
          type: schema.Types.ObjectId,
          ref: "userMedia"
        },
        addTime: {
          type: Date,
          default: Date.now()
        },
        status: {
          type: String,
          enum: ["SENT", "REMOVE", "DELETE", "BLOCK", "ACCEPT"],
          default: "SENT"
        }
      }
    ],
    friendRequistList: [
      {
        friendRequistId: {
          type: schema.Types.ObjectId,
          ref: "userMedia"
        },
        addTime: {
          type: Date,
          default: Date.now()
        },
        status: {
          type: String,
          enum: ["WAITING", "ACCEPT", "BLOCK", "DELETE"],
          default: "WAITING"
        }
      }
    ],
    stripAccountId: {
      type: String
    },
    walletBalance: {
      type: Number
    },
    amount: {
      type: String
    },
    cardDetails: [{
      firstName: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      countryCode: String,
      mobile: String,
      bankName: String,
      cardNumber: String,
      expiryDate: String,
      cvvNumber: String,
      country: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      expMonth: String,
      expYear: String,
      stripAccountId: String,
      cvvNumber: String
    }],
    personalDetail: [
      {
        name: {
          type: String
        },
        contactNumber: {
          type: Number
        },
        userId: {
          type: schema.Types.ObjectId,
          ref: "userMedia"
        },
        addressDetail: {
          type: String
        },
        city: {
          type: String
        },
        pinCode: {
          type: Number
        },
        addressType: {
          type: Boolean,
          default: false

        },
        landMark: {
          type: String
        },
        alternatePhoneNumber: {
          type: Number
        },
      }
    ],

    permission: {
      dashboard: {
        type: Boolean,
        default: false
      },

      userManagement: {
        type: Boolean,
        default: false
      },
      bannerManagement: {
        type: Boolean,
        default: false
      },
      staticContentManagement: {
        type: Boolean,
        default: false
      },
      stickerManagement: {
        type: Boolean,
        default: false
      },
      gifManagement: {
        type: Boolean,
        default: false
      },
      industryManagement: {
        type: Boolean,
        default: false
      },

      categoryManagement: {
        type: Boolean,
        default: false
      },
      subCategoryManagement: {
        type: Boolean,
        default: false
      },
      buyingSellingProductManagement: {
        type: Boolean,
        default: false
      },
      auctionCategoryManagement: {
        type: Boolean,
        default: false
      },
      auctionSubCategoryManagement: {
        type: Boolean,
        default: false
      },
      auctionProductManagement: {
        type: Boolean,
        default: false
      },
      orderManagement: {
        type: Boolean,
        default: false
      },
      jobManagement: {
        type: Boolean,
        default: false
      },
      groupManagement: {
        type: Boolean,
        default: false
      },
      videoGameManagement: {
        type: Boolean,
        default: false
      },
      advertiseManagement: {
        type: Boolean,
        default: false
      },
      nonProfitManagement: {
        type: Boolean,
        default: false
      },
      eventManagement: {
        type: Boolean,
        default: false
      },
      classRoomManagement: {
        type: Boolean,
        default: false
      },
      discussionForumManagement: {
        type: Boolean,
        default: false
      },
      newsManagement: {
        type: Boolean,
        default: false
      },
      paymentManagement: {
        type: Boolean,
        default: false
      },
      jobTransactionManagement: {
        type: Boolean,
        default: false
      },
      buyingSellingTransactionManagement: {
        type: Boolean,
        default: false
      },
      reportManagement: {
        type: Boolean,
        default: false
      },
      generalReportManagement: {
        type: Boolean,
        default: false
      },
      auctionOrderManagement: {
        type: Boolean,
        default: false
      },
      faqManagement: {
        type: Boolean,
        default: false
      },
      pageManagement: {
        type: Boolean,
        default: false
      },
      auctionTransactionManagement:{
        type: Boolean,
        default: false
      }
    },
    bio: {
      type: String
    },

    education: {
      type: String
    },
    job: {
      type: String
    },
    city: {
      type: String
    },
    addDetails: [{
      coverPhoto: {
        type: String
      },
      userId: {
        type: schema.Types.ObjectId,
        ref: "userMedia"
      },
      image: {
        type: String
      },
      bioData: {
        type: String
      },
      designation: {
        type: String
      },
      metric: {
        type: String
      },
      inter: {
        type: String
      },
      graduate: {
        type: String
      },
      liveIn: {
        type: String
      },
      from: {
        type: String
      },
      mariedStatus: {
        type: String
      },
      gender: {
        type: String
      },
    }]

  },

  {
    timestamps: true
  }
);

userMember.plugin(mongoosePaginate);
module.exports = mongoose.model("userMedia", userMember);

(function init() {
  mongoose.model("userMedia", userMember).findOne({ userType: "ADMIN" }, (error, result) => {
    if (error) {
      console.log("internal server error");
    } else if (result) {
      console.log("we have admin");
      stripe.balance.retrieve({ stripe_account: result.stripAccountId }, function (err, balance) {
        //
        console.log("balance>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1111", balance)
      });
      // sts
    } else {
      // stripe.accounts.create({
      //   type: 'custom',
      //   country: 'US',
      //   requested_capabilities: ['card_payments'],
      //   email: "no-prakashsingh@mobiloitte.com",
      //   //stripAccountId: "acct_1FuFOUEDZz4f5537"
      // },
      // (err, account) => {
      // console.log("340===>",err,account)
      // if (err) {
      //   console.log("error in creating aacount", err)
      // } else {
      // console.log("account created successfully>>>>>>>>>>>>>>>>>>>>>>>>>", account)
      var obj = {
        firstName: "Prakash",
        lastName: "Singh",
        email: "no-prakashsingh@mobiloitte.com",
        countryCode: "+91",
        phoneNumber: "7303423430",
        mergeMobileNumber: "+917303423430",
        dateOfBirth: "15/09/1993",
        gender: "MALE",
        password: bcrypt.hashSync("Mobiloitte1"),
        userType: "ADMIN",
        stripAccountId: "acct_1E89IeJRAbfLz5Ri",
        permission: {
          dashboard: true,
          stickerManagement: true,
          gifManagement: true,
          industryManagement: true,
          userManagement: true,
          bannerManagement: true,
          staticContentManagement: true,
          buyingSellingManagement: true,
          auctionManagement: true,
          orderManagement: true,
          jobManagement: true,
          groupManagement: true,
          videoGameManagement: true,
          advertiseManagement: true,
          nonProfitManagement: true,
          eventManagement: true,
          classRoomManagement: true,
          discussionForumManagement: true,
          newsManagement: true,
          myPostManagement: true,
          paymentManagement: true,
          transactionManagement: true,
          reportManagement: true,
          faqManagement: true
        },
      };
      mongoose
        .model("userMedia", userMember)(obj)
        .save((err1, success) => {
          if (err1) {
            console.log("error in saving data ");
          } else {
            console.log("Admin created", success);

          }
        });
      //   }
      // })
    }
  })
})();
