/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const SELLER = require("../model/sellerPermission"); // import user model to perform crud operation
const USER = require("../../userServices/model/userModel");
const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const dir = "./uploads/images/";// declare path of upload dir on server
const mongoose = require("mongoose");// set rules for mongoose id
const jwt = require("jsonwebtoken");
const duration = "1d";// set expiery time of token
const bcrypt = require("bcrypt");// bcrypt for encryption of password
const constant = require("../../../helpers/constant"); // some constant value 
const crypto = require("crypto");// bcrypt for encryption of password
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _user = {};
/**
 * customer signup 
 * @param {firstName, lastName, email, password,employer,address,country}
 */
_user.signup = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
        next();
      } else {
        try {
          let data = req.body;
      
          if (req.files.profileImg) {
            let profileImg = req.files.profileImg[0].path;
            data.profileImg = profileImg;
          }
          // create random string for sign token
          let signtoken = crypto.randomBytes(constant.cryptkn).toString("hex");
          if (data.password) {
            let hash = await bcrypt.hash( // password cncrypt
              data.password,
              parseInt(process.env.SALT_ROUNDS)
            );
            data.password = hash;
          }
          data.signtoken = signtoken;
          let saveUser = await new USER(data).save();
          let token_Data = {
            email: saveUser.email,
            _id: saveUser._id,
            role: saveUser.role,
            userName: saveUser.userName,
          };
          let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
            expiresIn: duration, // expires in 24 hours
          });
          if (saveUser) {
            await setResponseObject(req, true, responseMessage.VERIFICATION('signup'), { token, saveUser });
            next();
          }
        } catch (err) {
          let keyError = "";
          err.keyPattern.userName ? keyError = responseMessage.ALREADYEXIST('userName') : err.keyPattern.email ?
            keyError = responseMessage.ALREADYEXIST('email') : err.keyPattern.phoneNo ? keyError = responseMessage.ALREADYEXIST('phone') : responseMessage.SOMETHING_WRONG
          await setResponseObject(req, false, keyError, "");
          next();
        }
      }
    });
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
};

_user.verifyOtp = async(req, res, next)=>{
  try{
    let saveUser  = await USER.findOneAndUpdate({email:req.body.email,otp:parseInt(req.body.otp)},{otpVerified:true,active:true,emailVerified:true},{new:true});
    if(!saveUser){
      res.send({
        success:true,
        message:responseMessage.INVALID('OTP'),
      })
    }else{
      let token_Data = {
        email: saveUser.email,
        _id: saveUser._id,
        role: saveUser.role,
        userName: saveUser.userName,
      };
      let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
        expiresIn: duration, // expires in 24 hours
      });
        await setResponseObject(req, true, responseMessage.VERIFICATION('otp verified'), {saveUser,token});
        next();
    }
  }catch(err){
      await setResponseObject(req, false, err.message?err.message:responseMessage.SOMETHING_WRONG, "");
      next();
    }
  } 


_user.login = async(req, res,next)=>{
  try{
    // let saveUser = await USER.findOne({userName:req.body.userName, email:req.body.email});
    let saveUser = await USER.findOne({$or:[{phoneNo:req.body.phoneNo},{email:req.body.email}]});
    if(!saveUser){
      // throw {message:responseMessage.INVALID('userName or email')};
      // await setResponseObject(req, true, responseMessage.INVALID('userName or email'), '');
      res.status(400).send({success:false, message:responseMessage.INVALID('phone No or Email') })
      // next()
    }else if(!saveUser.emailVerified || !saveUser.otpVerified){
      await setResponseObject(req, {status:false}, responseMessage.INACTIVE, saveUser);
      next()
    }if(!saveUser.active){
      await setResponseObject(req, {status:false}, responseMessage.NOTACTIVE, saveUser);
      next()
    }else{
      let data = req.body;
      let pwPresent = await bcrypt.compare(data.password, saveUser.password);
      if (!pwPresent) {// check new password is matched with old password
        throw { message: responseMessage.INCORRECTPASSWORD };
      } else {
        let token_Data = {
          email: saveUser.email,
          _id: saveUser._id,
          role: saveUser.role,
          userName: saveUser.userName,
          phoneNo: saveUser.phoneNo,
        };
        let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
          expiresIn: duration, // expires in 24 hours
        });

        saveUser["token"] = token;
        res.send({
          success:true,
          message:responseMessage.SUCCESS('login'),
          data:saveUser,token
        })
        // await setResponseObject(req, true, responseMessage.SUCCESS('login '), {saveUser,token});
        next();
      }
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
}

_user.getProfile = async (req, res, next) => {
  try {
    let userId = req.userId;
    let getProfile = await USER.findById(userId);
    if (!getProfile) {
      throw { message: responseMessage.RECORD_NOTFOUND('record') }
    } else {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getProfile);
      next();
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
}

_user.updateProfile = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
        next();
      } else {
          try{
              let data = req.body;
              if (req.files.profileImg) {
                let profileImg = req.files.profileImg[0].path;
                data.profileImg = profileImg;
              }
              let userId = req.body.id?req.body.id:req.userId;
              delete req.body.id;
              let saveUser = await USER.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)},data,{new:true})  ;
              if(saveUser){
                  await setResponseObject(req, true, responseMessage.VERIFICATION('profile updated'), {saveUser:saveUser});
                  next();
              }else {
            throw { message: responseMessage.ERROR_ON_UPDATE }
          }
        } catch (err) {
          await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
          next();
        }
      }
    });                                                                               
  }catch(err){
     // throw exception message
     await setResponseObject(req, false, err.message?err.message:responseMessage.SOMETHING_WRONG, "");
     next();
  }
}

_user.changePassword = async (req, res, next) => {
  try {
    let checkOldPass = await USER.findOne({ _id: req.userId });
    if (!checkOldPass) {
      throw { message: responseMessage.NOTFOUND('user') };
    } else {
      let comparePass = await bcrypt.compare(
        req.body.oldPassword,
        checkOldPass.password
      );
      if (!comparePass) {
        throw { message: responseMessage.INCORRECTOLDPWD };
      } else {
        let hash = await bcrypt.hash(
          req.body.password,
          parseInt(process.env.SALT_ROUNDS)
        );
        if (hash) {
          let dataToSet = {
            password: hash,
          };
          let option = { new: true };
          let userToUpdate = await USER.findOneAndUpdate(
            { _id: req.userId },
            dataToSet,
            option
          );
          if (!userToUpdate) {
            throw { message: responseMessage.SOMETHING_WRONG };
          } else {
            await setResponseObject(req, true, responseMessage.PASSWORD_CHANGED, '');
            next();
          }
        }
      }
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
}

_user.forgotPassword = async (req, res, next) => {
  try {
    let criteria = {
      email: req.body.email,
    };
    let user = await USER.findOne(criteria);
    if (!user) {
      throw responseMessage.NOTFOUND('user');
    } else {
      let token = crypto.randomBytes(20).toString("hex");
      const dataToSet = {
        $set: {
          resetToken: token,
        },
      };
      let option = {};
      let userToUpdate = await USER.findOneAndUpdate(
        criteria,
        dataToSet,
        option
      );
      if (!userToUpdate) {
        throw responseMessage.SOMETHING_WRONG;
      } else {
        let email = req.body.email;
        let subject = constant.passwordReset;
        let link = process.env.SERVER_URL + "/reset-password?token=" + token;
        let html = helper.EMAILHTML(link);
        let forgotEmail = await helper.sendMail(email, subject, html);
        if (!forgotEmail) {
          throw (responseMessage.ERRORON_SENDMAIL, next());
        } else {
          await setResponseObject(req, true, responseMessage.SUCCESS('email sent'), '');
          next();
        }
      }
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
};

//Delete Many users
_user.deleteMany= async(req, res)=>{
  try {
    let user = await USER.deleteMany({_id:{ $in: req.body._id}});
    if(user){
      res.status(200).send({
        success:true,
        message:responseMessage.REMOVEDSUCCESSS('Users')
      })
    }else{
      res.status(400).send({
        success:false,
        message:responseMessage.NOT_DELETE('User')
      })
    }
  } catch (error) {
    res.status(400).send({
      success:false,
      message:responseMessage.SOMETHING_WRONG
    })
  }
}

_user.addSellerAccount = async (req, res) => {
  try {
    let getRequest = await SELLER.findOne({ requestedUser: mongoose.Types.ObjectId(req.userId) });
    if (getRequest) {
      res.send({
        success: false,
        message: "Request Already Made"
      })
      return
    }
    else{
      upload(req, res, async (err) => {
        if (err) {
          await setResponseObject(req, false, err.message, "");
          next();
        } else {
          let data = req.body;
        
          if (req.files.storeImage) {
            let storeImage = req.files.storeImage[0].path;
            data.storeImage = storeImage;
          }
         
          if (data.long && data.lat) {
            data.location = {
              type: 'Point',
              coordinates: [data.long, data.lat],
            };
          }
          data.requestedUser = req.userId
          let result = await SELLER.create(data)
          if (result) {
            res.status(200).send({
              success: true,
              message: responseMessage.ADD_SUCCESS('Seller'),
              data: result
            })
          } else {
            res.send({
              success: false,
              message: responseMessage.SOMETHING_WRONG
            })
          }
        }
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG
    })
  }
}

// Update Seller Request
_user.updateRequest = async (req, res) => {
  try {
    if (req.role !== 1) {
      res.status(401).send({
        success: false,
        message: responseMessage.UNAUTHORIZED
      })
    }
    let data = req.body;
    console.log(data);
    let dataToSet = {
      status: data.status,
      updatedAt: new Date()
    };
    let idToUpdate = mongoose.Types.ObjectId(data.id);
    let updateSellerRequest = await SELLER.findOneAndUpdate({ requestedUser: idToUpdate }, dataToSet, { new: true });
    if (updateSellerRequest) {
      res.status(200).send({
        success: true,
        updateSellerRequest, 
        message: responseMessage.UPDATE_SUCCESS('Request')
      })
      if (updateSellerRequest.status == 'accepted') {
        await USER.findOneAndUpdate(
          { _id: updateSellerRequest.requestedUser },
          { hasPermission: true, isSeller: true,storeName:updateSellerRequest.storeName,storeImage:updateSellerRequest.storeImage,
            business:updateSellerRequest.business,
            description:updateSellerRequest.description,
            fullNameOfSeller:updateSellerRequest.fullNameOfSeller},
          { new: true }
        )
      }
    } else {
      res.status(200).send({
        success: false,
        message: responseMessage.ERROR_ON_UPDATE
      })
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG
    })
  }
}

//Delete seller request
_user.deleteSeller= async(req, res)=>{
  try {
    let user = await SELLER.deleteMany({_id:req.params.id});
    if(user){
      res.status(200).send({
        success:true,
        message:responseMessage.REMOVEDSUCCESSS('Seller')
      })
    }else{
      res.status(400).send({
        success:false,
        message:responseMessage.NOT_DELETE('Seller')
      })
    }
  } catch (error) {
    res.status(400).send({
      success:false,
      message:responseMessage.SOMETHING_WRONG 
    })
  }
}
// List Seller Request
_user.getRequestList = async (req, res) => {
  try {
    if (req.role !== 1) {
      res.status(401).send({
        success: false,
        message: responseMessage.UNAUTHORIZED
      })
    }
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize);
    if (pageNo <= 0) {
        throw { message: message.PAGE_INVALID };
    }
    let count = await SELLER.find().countDocuments()
    let result = await SELLER.find()
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate('requestedUser', '-password');
    if (result && result.length) {
      res.status(200).send({
        success: true,
        message: responseMessage.DATA_FOUND,
        data: result,
        count
      })
    } else {
      res.status(200).send({
        success: false,
        message: responseMessage.NOT_FOUND
      })
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG
    })
  }
}

//multer
var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "profileImg" },
  { name: "storeImage" }
]);





module.exports = _user;
