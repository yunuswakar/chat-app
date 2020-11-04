const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const db = mongoose.connection;
var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
    
    email: {
        type: String,
        require: true,
        lowercase:true,
        unique:true
    },
    name: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    deviceToken:{
        type:String
    },
    deviceType:{
        type:String
    },
    createdAt: {
        type: Date,
        default:new Date()
    },
    updatedAt:{
        type: Date,  
    },
    createdAt1: {
        type: String,
        default: Date.now()
    },
    username:{
        type:String
    },
    profilePic: {
        type: String
     
    },
    mobileOtp:{
        type:String
    },
    emailOtp:{
        type:String
    },
    mobileOtpVerificationStatus:{
        type:Boolean,
        default:false
    },
    emailOtpVerificationStatus:{
        type:Boolean,
        default:false
    },
    usernameStatus:{
        type:Boolean,
        default:false
    },
    publicId:{
        type:String
    },
    jwtToken:{
        type:String
    },
    bio:{
        type:String
    },
    dob:{
        type:String

    },
    countryCode:{
        type:String
    },
    country:{
        type:String
    },
    socialId:{
        type:String
    },
    socialType:{
        type:String
    },
    followerCount:{
        type:String,
        default:0
    },
    followers:[{
        userId:{
            type:String
        },
        isFollow:{
            type:Boolean
        }
    }],
    followingCount:{
        type:String,
        default:0
    },
    following:[{
        userId:{
            type:String
        },
        isFollow:{
            type:Boolean
        }
    }],
    posts:{
        type:String,
        default:0
    },
    role:{
        type:String,
        default:2
    },
    status:{
        type:String,
        default:'ACTIVE'
    }
    
   
    
},{
    timestamps: ''
})



userSchema.plugin(mongoosePaginate)
userSchema.plugin(mongooseAggregatePaginate);
const User = mongoose.model('user', userSchema, 'user');
module.exports = User

User.findOne({email : 'admin@admin.com'}, (error, success) => {
    if (error) {
        console.log(error)
    } else {
        if (!success) {
                    new User({
                        email: "admin@admin.com",
                        password: "$2a$10$i6z1LkIx6ZRK2nKezi65t./tI7nukmOymmkac2AHR2QI1flHYwKD6",
                        name: "Admin",
                        username:"admin",
                        countryCode:'+91',
                        country:'India',
                        mobileNumber:'9987665544',
                        profilePic: "http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg",
                        role:1
                    }).save((error, success) => {
                        console.log("Successfully Added Admin")
                    })
        }else{
              User.findByIdAndUpdate({email : 'admin@admin.com'}, {
                $set: { "profilePic": "https://res.cloudinary.com/sumit9211/image/upload/v1542879708/und4l1ruuang3cexhb9a.jpg"}
            }, {
                new: true
            }, (error1, result2) => {
               console.log("Successfully updated Admin")
            });
        }

    }
})