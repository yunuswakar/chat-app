"use strict";

const USER = require("../model/auth.model");
const STORE = require("../../store/model/store.model");
const SUBSCRIPTION = require("../../subscription/model/subscription.model");
const CRYSTAL = require("../../crystal/model/crystal.model");
const NOTIFICATIONS = require("../../notifications/model/notifications.model");
const POST = require("../../post/model/post.model");
const ADDEDCRYSTAL = require("../../addedCrystal/model/addedCrystal.model");
const open = require('open');
const otpGenerator = require("otp-generator");

const fs = require("fs");
const multer = require("multer");
const dir = "./uploads/images/";
const mongoose = require("mongoose");
const crypto = require("crypto");
const constant = require("../../../helper/constant");
const nodeMailer = require("../../../helper/nodeMailer");
const commonFunction = require("../../../helper/commonFunctions");
const yourhandle = require("countrycitystatejson");

const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;
const jwt = require("jsonwebtoken");
const { error } = require("console");
const { ConnectContactLens } = require("aws-sdk");
const duration = "1d";
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
const upload = multer({ storage: storage }).single("image");

const _user = {};

//register

_user.signup = async (req, res, next) => {
  try {
    let subscription = await SUBSCRIPTION.findOne({ planName: "Trial Period" });
    let trialUserBackup = await subscription.backup;

    let deviceData = await USER.findOne({ deviceId: req.body.deviceId }).sort({
      createdAt: -1,
    });
    if (deviceData) {
      let device = await POST.deleteMany({ created_by: deviceData._id });
    }
    let data = req.body;

    let result = await USER.create(data);

    let token_Data = {
      _id: result._id,
      deviceId: req.body.deviceId,
      deviceType: req.body.deviceType,
      role: result.role,
    };
    let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    let dataToSet = {
      token: token,
    };
    const option = { new: true };

    let userToUpdate = await USER.findOneAndUpdate(
      { _id: result._id },
      dataToSet,
      option
    );

    userToUpdate = JSON.parse(JSON.stringify(userToUpdate));
    userToUpdate.trialUserBackup = trialUserBackup;

    if (data) {
      await setResponseObject(req, true, responseMessage.SIGNUP, userToUpdate);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//send link for verify email
_user.sendVerifyLink = async (req, res, next) => {
  try {
    let criteria = {
      _id: req.body.userId,
    };
    let token = crypto.randomBytes(constant.cryptkn).toString("hex");
    const dataToSet = {
      $set: {
        resetToken: token,
      },
    };
    let option = { new: true };
    let userToUpdate = await USER.findOneAndUpdate(criteria, dataToSet, option);
    if (!userToUpdate) {
      await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
      next();
    } else {
      let email = req.body.email;
      let subject = constant.verifyEmail;
      let link = process.env.SERVER_URL_LOCAL + "auth/verifyLink?token=" + token;
      let html = nodeMailer.VERIFYEMAILHTML(link);

      let verifyEmail = await nodeMailer.sendMail(email, subject, html);

      await setResponseObject(req, true, responseMessage.LINK_VERIFY);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_user.verifyLink = async (req, res, next) => {
  try {
    let criteria = {
      resetToken: req.query.token,
    };
    let user = await USER.findOne(criteria);

    const dataToSet = {
      $set: {
        isVerified: true,
        resetToken: null,
      },
    };
    const option = { new: true };
    
    let userToUpdate =  await USER.findOneAndUpdate(criteria, dataToSet, option);

    res.redirect('https://crystaleyes.app');

  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// Login
_user.login = async (req, res, next) => {
  try {
    let userData = await USER.findOne({
      email: req.body.email,
    });

    let subscription = await SUBSCRIPTION.findOne({ planName: "Trial Period" });
    let trialUserBackup = await subscription.backup;
    let dbPassoword = userData.password;
    if (!userData) {
      await setResponseObject(req, false, responseMessage.NOTFOUND);
      next();
    } else if (userData.status == "BLOCK") {
      await setResponseObject(req, false, responseMessage.BLOCKED);
      next();
    } else {
      if (userData.role == "ADMIN") {
        if (dbPassoword != req.body.password) {
          await setResponseObject(req, false, responseMessage.INCORRECT_PWD);
          next();
        } else {
          let token_Data = {
            email: userData.email,
            _id: userData._id,
            role: userData.role,
          };
          let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
            expiresIn: duration
          });
          userData = JSON.parse(JSON.stringify(userData));
          delete userData["password"];
          userData.token = token;

          await setResponseObject(
            req,
            true,
            responseMessage.LOGGIN_SUCCESSFULLY,
            userData
          );
          next();
        }
      } else {
        if (dbPassoword != req.body.password) {
          await setResponseObject(req, false, responseMessage.INCORRECT_PWD);
          next();
        } else {
          userData = JSON.parse(JSON.stringify(userData));
          userData.trialUserBackup = trialUserBackup;

          delete userData["password"];
          await setResponseObject(
            req,
            true,
            responseMessage.LOGGIN_SUCCESSFULLY,
            userData
          );
          next();
        }
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//forgot password
_user.forgotPassword = async (req, res, next) => {
  try {
    let criteria = {
      email: req.body.email,
    };
    let user = await USER.findOne(criteria);

    if (!user) {
      await setResponseObject(req, false, responseMessage.NO_USER_FOUND);
      next();
    } else {
      let token = crypto.randomBytes(constant.cryptkn).toString("hex");
      const dataToSet = {
        $set: {
          resetToken: token,
        },
      };
      let option = { new: true };
      let userToUpdate = await USER.findOneAndUpdate(
        criteria,
        dataToSet,
        option
      );
      if (!userToUpdate) {
        await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
        next();
      } else {
        let email = req.body.email;
        let subject = constant.passwordReset;
        let link = process.env.SERVER_URL + "reset-password?token=" + token;
        let html = nodeMailer.EMAILHTML(link);
        let forgotEmail = await nodeMailer.sendMail(email, subject, html);
        if (!forgotEmail) {
          throw (responseMessage.ERRORON_SENDMAIL, next());
        } else {
          req.reqdata = {
            type: 1,
            message: responseMessage.EMAIL_SENT,
          };
          next();
        }
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//Reset Password
_user.resetPassword = async (req, res, next) => {
  try {
    let payloadData = req.body;
    const criteria = {
      resetToken: req.params.token,
    };
    let user = await USER.findOne(criteria);
    if (!user) {
      await setResponseObject(req, false, responseMessage.NO_USER_FOUND);
      next();
    } else {
      if (payloadData.newPassword == payloadData.confirmNewPassword) {
        const dataToSet = {
          $set: {
            password: newPassword,
            resetToken: null,
          },
        };
        const option = { new: true };
        let userToUpdate = await USER.findOneAndUpdate(
          criteria,
          dataToSet,
          option
        );
        if (!userToUpdate) {
          throw responseMessage.SOMETHING_WRONG;
        } else {
          await setResponseObject(req, true, responseMessage.PASSWORD_CHANGED);
          next();
        }
      } else {
        await setResponseObject(req, false, responseMessage.PASSWORD_NOT_MATCH);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//forget password
_user.forgetPassword = async (req, res, next) => {
  try {
    let criteria = { email: req.body.email };
    let user = await USER.findOne(criteria);

    if (!user) {
      await setResponseObject(req, false, responseMessage.VALID_EMAIL);
      next();
    } else {
      var emailOtp = otpGenerator.generate(8, {
        alphabets: true,
        upperCase: false,
        specialChars: false,
      });
      let mailSend = await commonFunction.emailSend(
        req.body.email,
        "Your updated password is",
        emailOtp
      );
      let updateData = await USER.findOneAndUpdate(
        criteria,
        { password: emailOtp },
        { new: true }
      );

      await setResponseObject(req, true, responseMessage.EMAIL_SEND);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//change password
_user.changePassword = async (req, res, next) => {
  try {
    let checkOldPass = await USER.findOne({
      _id: req.userId,
      password: req.body.oldPassword,
    });
    if (!checkOldPass) {
      await setResponseObject(req, false, responseMessage.INCORRECT_PWD);
      next();
    } else {
      let dataToSet = {
        password: req.body.password,
      };
      const option = { new: true };

      let userToUpdate = await USER.findOneAndUpdate(
        { _id: req.userId },
        dataToSet,
        option
      );
      if (!userToUpdate) {
        await setResponseObject(req, false, responseMessage.SOMETHING_WRONG);
        next();
      } else {
        await setResponseObject(req, true, responseMessage.PASSWORD_CHANGED);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//set profile and preference by user
_user.updateProfile = async (req, res, next) => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
        next();
      } else {
        if (req.body.email) {
          let user = await USER.findOne({ _id: req.userId });
          USER.findOne(
            { email: req.body.email, _id: { $ne: user._id } },
            async (error, result) => {
              if (error) {
                await setResponseObject(
                  req,
                  false,
                  responseMessage.SOMETHING_WRONG
                );
                next();
              } else if (result) {
                if (result.email == req.body.email) {
                  await setResponseObject(
                    req,
                    false,
                    responseMessage.EMAILEXIST
                  );
                  next();
                }
              } else {
                let data = req.body;
                if (req.file) {
                  let image = req.file.path;
                  data.profileImg = image;
                }
                let options = { new: true };

                let userData = await USER.findOneAndUpdate(
                  { deviceId: req.params.deviceId, _id: req.userId },
                  data,
                  options
                );
                if (userData) {
                  await setResponseObject(
                    req,
                    true,
                    responseMessage.USER_EDITED,
                    userData
                  );
                  next();
                } else {
                  if (req.file) {
                    fs.unlinkSync(req.file.path);
                  }
                  await setResponseObject(
                    req,
                    false,
                    responseMessage.ERROR_ON_UPDATE
                  );
                  next();
                }
              }
            }
          );
        } else {
          let data = req.body;
          if (req.file) {
            let image = req.file.path;
            data.profileImg = image;
          }
          let options = { new: true };

          let userData = await USER.findOneAndUpdate(
            { deviceId: req.params.deviceId, _id: req.userId },
            data,
            options
          );
          if (userData) {
            await setResponseObject(
              req,
              true,
              responseMessage.USER_EDITED,
              userData
            );
            next();
          } else {
            if (req.file) {
              fs.unlinkSync(req.file.path);
            }
            await setResponseObject(
              req,
              false,
              responseMessage.ERROR_ON_UPDATE
            );
            next();
          }
        }
      }
    });
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//edit profile by admin
_user.editProfile = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      upload(req, res, async (err) => {
        if (err) {
          await setResponseObject(req, false, err.message, "");
          next();
        } else {
          let data = req.body;
          if (req.file) {
            let image = req.file.path;
            data.profileImg = image;
          }
          let options = { new: true };
          let userData = await USER.findOneAndUpdate(
            { _id: req.userId },
            data,
            options
          );
          if (userData) {
            await setResponseObject(
              req,
              true,
              responseMessage.USER_EDITED,
              userData
            );
            next();
          } else {
            if (req.file) {
              fs.unlinkSync(req.file.path);
            }
            await setResponseObject(
              req,
              false,
              responseMessage.ERROR_ON_UPDATE
            );
            next();
          }
        }
      });
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete user by admin
_user.delete = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let user = await USER.findOneAndRemove({ _id: req.params.id });
      if (user) {
        await setResponseObject(req, true, responseMessage.USER_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// get User detail by id
_user.getById = async (req, res, next) => {
  try {
    let getUser = await USER.findOne({ _id: req.userId });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getUser);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// get User detail by id

_user.getAllUser = async (req, res, next) => {
  try {
    let getUser = await USER.find();
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getUser);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get User detail by id

_user.getUser = async (req, res, next) => {
  try {
    let getUser = await USER.findOne({ _id: req.query.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getUser);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All Users
_user.getUsers = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize);
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {
        role: "USER",
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: req.query.search,
            options: "i",
          },
        },
      };
      let count = await USER.find(filter).countDocuments();
      let result = await USER.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        result,
        count,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//toggle button on or off by user
_user.toggleButton = async (req, res, next) => {
  try {
    let criteria = { _id: req.userId };
    let data = { $set: { toggleStatus: req.body.toggleStatus } };
    let options = { new: true };
    let userData = await USER.findOneAndUpdate(criteria, data, options);
    if (userData) {
      await setResponseObject(req, true, responseMessage.DATA_EDITED);
      next();
    } else {
      await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Dashboard Info
_user.dashboardInfo = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });

    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let userCriteria = { role: "USER" };
      let userCount = await USER.find(userCriteria).countDocuments();
      let storeCount = await STORE.find().countDocuments();
      let subscriptionCount = await SUBSCRIPTION.find().countDocuments();
      let crystalCount = await CRYSTAL.find().countDocuments();
      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        userCount,
        storeCount,
        subscriptionCount,
        crystalCount,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//update trial status after 7 days
_user.updateTrial = async (req, res, next) => {
  try {
    let data = { isTrial: false };
    let options = { new: true, multi: true };
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    let userData = await USER.update(
      { trialEndDate: { $gte: start, $lt: end } },
      data,
      options
    );
    if (userData) {
      console.log("data updated successfully");
    } else {
      console.log("error on updation");
    }
  } catch (err) {
    console.log("catch error");
  }
};
//get all country
_user.getAllCountry = async (req, res, next) => {
  try {
    let country = yourhandle.getCountries();
    await setResponseObject(req, true, responseMessage.RECORDFOUND, country);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get all state by country
_user.getState = async (req, res, next) => {
  try {
    let country = yourhandle.getStatesByShort(req.query.shortName);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, country);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//toggle button on or off by user
_user.blockUser = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let criteria = { _id: req.body.userId };
      let data = { $set: { status: req.body.status } };
      let options = { new: true };
      let userData = await USER.findOneAndUpdate(criteria, data, options);
      if (userData) {
        await setResponseObject(req, true, responseMessage.DATA_EDITED);
        next();
      } else {
        await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//logout
_user.logout = async (req, res, next) => {
  try {
    let getUser = await USER.findOne({ _id: req.userId });
    if (getUser.distribution == "NotSubscribed") {
      let post = await POST.deleteMany({ created_by: req.userId });
      let crystal = await ADDEDCRYSTAL.deleteMany({ added_by: req.userId });
      let deleteUser = await USER.deleteMany({ _id: req.userId });
      await setResponseObject(
        req,
        true,
        responseMessage.LOGOUT_SUCCESSFULLY,
        getUser
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
module.exports = _user;
