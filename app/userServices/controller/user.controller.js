/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.stripe_Key;
const BLOCKMODEL = require("../../blockService/model/blockModel"); // import user model to perform crud operation

const stripe = require("stripe")(secretKey);
const USER = require("../model/userModel"); // import user model to perform crud operation
const ADDRESS = require("../model/addressModel"); 
const POST = require("../../postService/model/postModel"); 


const fs = require("fs"); // fs import to read/write file
const multer = require("multer"); // for file save on server
const dir = "./uploads/images/"; // declare path of upload dir on server
const mongoose = require("mongoose"); // set rules for mongoose id
const jwt = require("jsonwebtoken");
const duration = "1d"; // set expiery time of token
const bcrypt = require("bcrypt"); // bcrypt for encryption of password
const constant = require("../../../helpers/constant"); // some constant value
const crypto = require("crypto"); // bcrypt for encryption of password
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const StoryLIKE = require("../../likeUnlikeService/model/likeUnlikeStory");
const { CHATS, CHATCONSTANTS } = require("../../chatService/model/chatModel");
const _user = {};
const commonFunction = require('../../../helpers/commonFunctions');
const NOTIFICATION = require("../../notificationService/model/pushNotificationModel");
const ORDERNOTIFICATION = require("../../notificationService/model/orderNotificationModel");
/**
 * customer signup
 * @param {firstName, lastName, email, password, employer, address, country}
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
            let hash = await bcrypt.hash(
              // password cncrypt
              data.password,
              parseInt(process.env.SALT_ROUNDS)
            );
            data.password = hash;
          }
          data.signtoken = signtoken;

          let customerData = await stripe.customers.create({
            description: "My First Test Customer (created for API docs)",
          });
          data.customerId = customerData.id;

          let saveUser = await new USER(data).save();
          let token_Data = {
            email: saveUser.email,
            _id: saveUser._id,
            role: saveUser.role,
            isSeller: saveUser.isSeller,
            userName: saveUser.userName,
          };
          let token = jwt.sign(token_Data, process.env.JWT_SECRET);
          let updateToken = await USER.findOneAndUpdate(
            { _id: saveUser._id },
            { $set: { token: token } }
          );
          if (saveUser) {
            await setResponseObject(
              req,
              true,
              responseMessage.VERIFICATION("signup"),
              { token, saveUser }
            );
            next();
          }
        } catch (err) {
          let keyError = "";
          err.keyPattern.userName
            ? (keyError = responseMessage.ALREADYEXIST("userName"))
            : err.keyPattern.email
            ? (keyError = responseMessage.ALREADYEXIST("email"))
            : err.keyPattern.phoneNo
            ? (keyError = responseMessage.ALREADYEXIST("phone"))
            : responseMessage.SOMETHING_WRONG;
          await setResponseObject(req, false, keyError, "");
          next();
        }
      }
    });
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.verifyOtp = async (req, res, next) => {
  try {
    let saveUser = await USER.findOneAndUpdate(
      { email: req.body.email, otp: parseInt(req.body.otp) },
      { otpVerified: true, active: true, emailVerified: true },
      { new: true }
    );
    if (!saveUser) {
      res.send({
        success: true,
        message: responseMessage.INVALID("OTP"),
      });
    } else {
      let token_Data = {
        email: saveUser.email,
        _id: saveUser._id,
        role: saveUser.role,
        userName: saveUser.userName,
        isSeller: saveUser.isSeller,
      };
      let token = jwt.sign(token_Data, process.env.JWT_SECRET);
      let updateToken = await USER.findOneAndUpdate(
        { _id: saveUser._id },
        { $set: { token: token } }
      );
      await setResponseObject(
        req,
        true,
        responseMessage.VERIFICATION("otp verified"),
        { saveUser, token }
      );
      next();
    }
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.login = async (req, res, next) => {
  try {
    // let saveUser = await USER.findOne({userName:req.body.userName, email:req.body.email});
    let saveUser = await USER.findOne({
      $or: [{ phoneNo: req.body.phoneNo }, { email: req.body.email }],
    });
    if (!saveUser) {
      // throw {message:responseMessage.INVALID('userName or email')};
      // await setResponseObject(req, true, responseMessage.INVALID('userName or email'), '');
      res
        .status(400)
        .send({
          success: false,
          message: responseMessage.INVALID("phone No or Email"),
        });
      // next()
    } else if (!saveUser.emailVerified || !saveUser.otpVerified) {
      await setResponseObject(
        req,
        { status: false },
        responseMessage.INACTIVE,
        saveUser
      );
      next();
      return;
    }
    if (!saveUser.active) {
      await setResponseObject(
        req,
        { status: false },
        responseMessage.NOTACTIVE,
        saveUser
      );
      next();
      return;
    } else {
      let data = req.body;
      let pwPresent = await bcrypt.compare(data.password, saveUser.password);
      if (!pwPresent) {
        // check new password is matched with old password
        throw { message: responseMessage.INCORRECTPASSWORD };
      } else {
        let token_Data = {
          email: saveUser.email,
          _id: saveUser._id,
          role: saveUser.role,
          userName: saveUser.userName,
          phoneNo: saveUser.phoneNo,
          isSeller: saveUser.isSeller,
          hasPermission: saveUser.hasPermission
            ? saveUser.hasPermission
            : false,
        };
        let token = jwt.sign(token_Data, process.env.JWT_SECRET);
        let updateToken = await USER.findOneAndUpdate(
          { _id: saveUser._id },
          { $set: { token: token } }
        );
        let fcmToken = await USER.findOneAndUpdate(
          { _id: saveUser._id },
          { $set: { fcmToken: req.body.fcmToken } }
        );
        res.send({
          success: true,
          message: responseMessage.SUCCESS("login"),
          data: saveUser,
          token,
        });
        // await setResponseObject(req, true, responseMessage.SUCCESS('login '), {saveUser,token});
        // next();
      }
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.getProfile = async (req, res, next) => {
  try {
    let userId = req.userId;
    // let getProfile = await USER.findById(userId);
    let getProfile = await USER.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "follows",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$id"] } } },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$followTo"] } } },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$followTo" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $in: ["$_id", { $ifNull: ["$$followTo", []] }] },
                    },
                  },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "followTo",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$followBy" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $in: ["$_id", { $ifNull: ["$$followTo", []] }] },
                    },
                  },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "followBy",
              },
            },
          ],
          as: "follows",
        },
      },
    ]);
    if (!getProfile) {
      throw { message: responseMessage.RECORD_NOTFOUND("record") };
    } else {
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getProfile[0]
      );
      next();
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};
_user.updateProfile = async (req, res, next) => {
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

          if (req.files.storeImage) {
            let storeImage = req.files.storeImage[0].path;
            data.storeImage = storeImage;
          }
          let userId = req.body.id ? req.body.id : req.userId;
          delete req.body.id;
          let saveUser = await USER.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(userId) },
            data,
            { new: true }
          );
          if (saveUser) {
            await setResponseObject(
              req,
              true,
              responseMessage.VERIFICATION("profile updated"),
              { saveUser: saveUser }
            );
            next();
          } else {
            throw { message: responseMessage.ERROR_ON_UPDATE };
          }
        } catch (err) {
          await setResponseObject(
            req,
            false,
            err.message ? err.message : responseMessage.SOMETHING_WRONG,
            ""
          );
          next();
        }
      }
    });
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.changePassword = async (req, res, next) => {
  try {
    let checkOldPass = await USER.findOne({ _id: req.userId });
    if (!checkOldPass) {
      throw { message: responseMessage.NOTFOUND("user") };
    } else {
      let comparePass = await bcrypt.compare(
        req.body.oldPassword,
        checkOldPass.password
      );
      if (!comparePass) {
        res.status(400).send({
          success: false,
          message: responseMessage.INCORRECTOLDPWD,
        });
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
            await setResponseObject(
              req,
              true,
              responseMessage.PASSWORD_CHANGED,
              ""
            );
            next();
          }
        }
      }
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.forgotPassword = async (req, res, next) => {
  try {
    let criteria = {
      email: req.body.email,
    };
    let user = await USER.findOne(criteria);
    if (!user) {
      throw responseMessage.NOTFOUND("user");
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
          await setResponseObject(
            req,
            true,
            responseMessage.SUCCESS("email sent"),
            ""
          );
          next();
        }
      }
    }
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

//Delete Many users
_user.deleteMany = async (req, res) => {
  try {
    let user = await USER.deleteMany({ _id: { $in: req.body._id } });
    if (user) {
      res.status(200).send({
        success: true,
        message: responseMessage.REMOVEDSUCCESSS("Users"),
      });
    } else {
      res.status(400).send({
        success: false,
        message: responseMessage.NOT_DELETE("User"),
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

_user.updateMany = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
        next();
      } else {
        try {
          let data = req.body;
          if (req.file) {
            let image = req.file.path;
            data.profileImg = image;
          }
          let userId = req.body.id ? req.body.id : req.userId;
          delete req.body.id;
          let saveUser = await USER.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(userId) },
            data,
            { new: true }
          );
          if (saveUser) {
            await setResponseObject(
              req,
              true,
              responseMessage.VERIFICATION("profile updated"),
              { saveUser: saveUser }
            );
            next();
          } else {
            throw { message: responseMessage.ERROR_ON_UPDATE };
          }
        } catch (err) {
          await setResponseObject(
            req,
            false,
            err.message ? err.message : responseMessage.SOMETHING_WRONG,
            ""
          );
          next();
        }
      }
    });
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

//fetch user data
_user.getData = async (req, res, next) => {
  try {
    let fetchData = await USER.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "follows",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$id"] } } },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$followTo" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $in: ["$_id", { $ifNull: ["$$followTo", []] }] },
                    },
                  },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "followTo",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$followBy" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $in: ["$_id", { $ifNull: ["$$followTo", []] }] },
                    },
                  },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "followBy",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$followTo"] } } },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "user",
              },
            },
            //  {
            //    $unwind:"$user"
            //  } ,
          ],

          as: "follows",
        },
      },
      // {
      //   $unwind:"$follows"
      // },

      {
        $lookup: {
          from: "stories",
          let: { story: "$story" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$story"] } } },
            {
              $lookup: {
                from: "storylikes",
                let: { id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$storyId", "$$id"] },
                      isLiked: true,
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      let: { likedBy: "$likedBy" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$likedBy"] } } },
                        {
                          $project: {
                            profileImg: 1,
                            userName: 1,
                            email: 1,
                            firstName: 1,
                            lastName: 1,
                          },
                        },
                      ],
                      as: "likedBy",
                    },
                  },
                  // {
                  //     $unwind:"$likedBy"
                  // },
                ],
                as: "likes",
              },
            },
            {
              $lookup: {
                from: "storylikes",
                let: { id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$storyId", "$$id"] },
                      isLiked: false,
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      let: { likedBy: "$likedBy" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$likedBy"] } } },
                        {
                          $project: {
                            profileImg: 1,
                            userName: 1,
                            email: 1,
                            firstName: 1,
                            lastName: 1,
                          },
                        },
                      ],
                      as: "likedBy",
                    },
                  },
                  // {
                  //     $unwind:"$likedBy"
                  // },
                ],
                as: "dislikes",
              },
            },
            {
              $addFields: {
                dilikeCount: { $size: "$dislikes" },
                likeCount: { $size: "$likes" },
                viewCount: { $size: "$viewedBy" },
              },
            },
            {
              $lookup: {
                from: "commentstories",
                let: { id: "$_id" },
                pipeline: [{ $match: { $expr: { $eq: ["$story", "$$id"] } } }],
                as: "comments",
              },
            },
            {
              $addFields: {
                commentCount: { $size: "$comments" },
              },
            },
            {
              $lookup: {
                from: "subreplies",
                localField: "_id",
                foreignField: "story",
                as: "subreplies",
              },
            },
            {
              $addFields: {
                commentCount: {
                  $add: [{ $size: "$comments" }, { $size: "$subreplies" }],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                let: { viewedBy: "$viewedBy" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$viewedBy"] } } },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "viewedBy",
              },
            },
          ],
          as: "story",
        },
      },
      {
        $addFields: {
          followingCount: { $size: "$follows.followTo" },
          followerCount: { $size: "$follows.followBy" },
        },
      },
      {
        $project: {
          _id: 1,
          role: 1,
          profileImg: 1,
          story: 1,
          createdAt: 1,
          updatedAt: 1,
          userName: 1,
          email: 1,
          countryCode: 1,
          phoneNo: 1,
          country: 1,
          birthday: 1,
          description: 1,
          following: "$follows.followTo",
          follower: "$follows.followBy",
          followingCount: 1,
          followerCount: 1,
          gender: 1,
        },
      },
    ]);

    if (!fetchData) {
      throw { message: responseMessage.RECORD_NOTFOUND("record") };
    } else {
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        fetchData[0]
      );
      next();
    }
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.getAllUserProfile = async (req, res, next) => {
  try {
    let getAllUserProfile = await USER.aggregate([
      {
        $match: {
          _id: { $eq: mongoose.Types.ObjectId(req.params.userId) },
        },
      },
      {
        $lookup: {
          from: "follows",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$id"] } } },
            {
              $lookup: {
                from: "users",
                let: { followTo: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$followTo"] } } },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
          ],
          as: "follows",
        },
      },
      {
        $lookup: {
          from: "posts",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$postedBy", "$$userId"] } },
            },
            {
              $lookup: {
                from: "likes",
                let: { postsId: "$posts._id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$postId", "$$postsId"] } } },
                  {
                    $lookup: {
                      from: "users",
                      let: { likedBy: "$likedBy" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$likedBy"] } } },
                        {
                          $project: {
                            _id: 1,
                            profileImg: 1,
                            friends: 1,
                            followers: 1,
                            following: 1,
                            userName: 1,
                            email: 1,
                          },
                        },
                      ],
                      as: "likedBy",
                    },
                  },
                  {
                    $unwind: "$likedBy",
                  },
                ],
                as: "likes",
              },
            },
            {
              $lookup: {
                from: "comments",
                let: { postsId: "$posts._id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$postId", "$$postsId"] } } },
                  {
                    $lookup: {
                      from: "users",
                      let: { commentBy: "$commentBy" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$commentBy"] } } },
                        {
                          $project: {
                            _id: 1,
                            profileImg: 1,
                            friends: 1,
                            followers: 1,
                            following: 1,
                            userName: 1,
                            email: 1,
                          },
                        },
                      ],
                      as: "commentBy",
                    },
                  },
                  {
                    $unwind: "$commentBy",
                  },
                  {
                    $project: {
                      _id: 1,
                      title: 1,
                      commentBy: 1,
                    },
                  },
                ],
                as: "comments",
              },
            },
            {
              $project: {
                _id: 1,
                type: 1,
                postTime: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1,
                title: 1,
                description: 1,
                postImg: 1,
                likes: 1,
                comments: 1,
              },
            },
          ],
          as: "posts",
        },
      },
      {
        $project: {
          _id: 1,
          profileImg: 1,
          friends: 1,
          followers: 1,
          following: 1,
          userName: 1,
          email: 1,
          posts: 1,
          createdAt: 1,
          updatedAt: 1,
          countryCode: 1,
          phoneNo: 1,
          country: 1,
          follows: 1,
          description: 1,
        },
      },
    ]);
    await setResponseObject(
      req,
      true,
      responseMessage.RECORDFOUND,
      getAllUserProfile
    );
    next();
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.getUserProfileData = async (req, res, next) => {
  try {
   
    let blockData=await BLOCKMODEL.find({blockedTo:req.params.userId,blockedBy:req.userId})

    let array=[];
    blockData.map(a=>{
      array.push(a.blockedTo)
    })


    let getAllUserProfile = await USER.aggregate([
      {
        $match: {
          _id: { $eq: mongoose.Types.ObjectId(req.params.userId) },
        },
      },
      {$match:{_id:{"$nin":array}}},
       {
        $lookup: {
          from: "follows",
          let: { userId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$user", "$$userId"] } } }],
          as: "followsData",
        },
      },
      {
        $addFields: { followsData: { $arrayElemAt: ["$followsData", 0] } },
      },
      {
        $addFields: {
          isUserFollowing: {
            $cond: {
              if: {
                $in: [
                  mongoose.Types.ObjectId(req.userId),
                  {
                    $cond: {
                      if: "$followsData.followBy",
                      then: "$followsData.followBy",
                      else: [],
                    },
                  },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          followsData: 0,
        },
      },
      {
        $lookup: {
          from: "posts",
          let: { postedBy: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$postedBy", "$$postedBy"] } },
            },
            {
              $lookup: {
                from: "follows",
                let: { userId: "$postedBy" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$user", "$$userId"] } } },
                ],
                as: "followsData",
              },
            },
            {
              $addFields: {
                followsData: { $arrayElemAt: ["$followsData", 0] },
              },
            },
            {
              $addFields: {
                isUserFollowing: {
                  $cond: {
                    if: {
                      if: {
                        $in: [
                          mongoose.Types.ObjectId(req.userId),
                          {
                            $cond: {
                              if: "$followsData.followBy",
                              then: "$followsData.followBy",
                              else: [],
                            },
                          },
                        ],
                      },
                    },
                    then: true,
                    else: false,
                  },
                },
              },
            },
            {
              $project: {
                followsData: 0,
              },
            },
            {
              $lookup: {
                from: "comments",
                let: { profile_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$post", "$$profile_id"],
                      },
                    },
                  },
                ],
                as: "comments",
              },
            },
            {
              $lookup: {
                from: "subreplies",
                let: { profile_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$post", "$$profile_id"],
                      },
                    },
                  },
                ],
                as: "subreplies",
              },
            },
            {
              $lookup: {
                from: "likes",
                let: { profile_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$postId", "$$profile_id"],
                      },
                    },
                  },
                ],
                as: "likes",
              },
            },
            {
              $addFields: {
                countComment: {
                  $add: [{ $size: "$comments" }, { $size: "$subreplies" }],
                },
                countLike: { $size: "$likes" },
                viewCount: { $size: "$viewedBy" },
                isLikedByUser: {
                  $cond: {
                    if: {
                      $in: [
                        mongoose.Types.ObjectId(req.userId),
                        {
                          $cond: { if: "$likedBy", then: "$likedBy", else: [] },
                        },
                      ],
                    },
                    then: true,
                    else: false,
                  },
                },
              },
            },
            {
              $lookup: {
                from: "users",
                let: { viewedBy: "$viewedBy" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$viewedBy"] } } },
                  {
                    $project: {
                      profileImg: 1,
                      userName: 1,
                      email: 1,
                      firstName: 1,
                      lastName: 1,
                    },
                  },
                  {
                    $lookup: {
                      from: "follows",
                      let: { postedBy: "$_id" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$user", "$$postedBy"] } } },
                      ],
                      as: "followsData",
                    },
                  },

                  {
                    $addFields: {
                      followsData: { $arrayElemAt: ["$followsData", 0] },
                    },
                  },
                  {
                    $addFields: {
                      isUserFollowing: {
                        $cond: {
                          if: {
                            $in: [
                              mongoose.Types.ObjectId(req.userId),
                              {
                                $cond: {
                                  if: "$followsData.followBy",
                                  then: "$followsData.followBy",
                                  else: [],
                                },
                              },
                            ],
                          },
                          then: true,
                          else: false,
                        },
                      },
                    },
                  },
                  {
                    $project: {
                      followsData: 0,
                    },
                  },
                ],
                as: "viewedBy",
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            { $project: { comments: 0, subreplies: 0, likes: 0 } },
          ],
          as: "postData",
        },
      },
      {
        $lookup: {
          from: "follows",
          let: { postedBy: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$user", "$$postedBy"] } },
            },
            {
              $lookup: {
                from: "users",
                let: { profile_id: "$followTo" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ["$_id", { $ifNull: ["$$profile_id", []] }],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: "follows",
                      let: { postedBy: "$_id" },
                      pipeline: [
                        {
                          $match: { $expr: { $eq: ["$user", "$$postedBy"] } },
                        },
                      ],
                      as: "otheruserfollowToBy",
                    },
                  },
                  {
                    $addFields: {
                      otheruserfollowToBy: {
                        $arrayElemAt: ["$otheruserfollowToBy", 0],
                      },
                    },
                  },
                  {
                    $addFields: {
                      otheruserfollowToBy: {
                        $cond: {
                          if: {
                            $in: [
                              mongoose.Types.ObjectId(req.userId),
                              "$otheruserfollowToBy.followBy",
                            ],
                          },
                          then: "$otheruserfollowToBy",
                          else: 0,
                        },
                      },
                    },
                  },
                  {
                    $match: { otheruserfollowToBy: { $ne: 0 } },
                  },
                  {
                    $addFields: {
                      isfollowingUser: {
                        $cond: {
                          if: {
                            $in: [
                              mongoose.Types.ObjectId(req.userId),
                              "$otheruserfollowToBy.followBy",
                            ],
                          },
                          then: true,
                          else: false,
                        },
                      },
                    },
                  },

                  /*  {
                    $match:{isfollowingUser:true}
                }  ,  */
                  {
                    $project: {
                      otheruserfollowToBy: 0,
                    },
                  },
                ],
                as: "followTo",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { profile_id: "$followBy" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: ["$_id", { $ifNull: ["$$profile_id", []] }],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: "follows",
                      let: { postedBy: "$_id" },
                      pipeline: [
                        {
                          $match: { $expr: { $eq: ["$user", "$$postedBy"] } },
                        },
                      ],
                      as: "otheruserfollowsBy",
                    },
                  },
                  {
                    $addFields: {
                      otheruserfollowsBy: {
                        $arrayElemAt: ["$otheruserfollowsBy", 0],
                      },
                    },
                  },
                  /*  {
                      $addFields:{
                        otheruserfollowsBy:{
                          $cond: {
                            if: {
                              $in: [mongoose.Types.ObjectId(req.userId),  "$otheruserfollowsBy.followTo"]
                            },
                            then: "$otheruserfollowsBy",
                            else: 0
                          }
                        }
                      }
                    },
                    {
                      $match:{otheruserfollowsBy:{$ne:0}}
                    },  */
                  {
                    $addFields: {
                      isfollowedByUser: {
                        $cond: {
                          if: {
                            $in: [
                              mongoose.Types.ObjectId(req.userId),
                              {
                                $cond: {
                                  if: "$otheruserfollowsBy.followTo",
                                  then: "$otheruserfollowsBy.followTo",
                                  else: [],
                                },
                              },
                            ],
                          },
                          then: true,
                          else: false,
                        },
                      },
                    },
                  },

                  {
                    $project: {
                      otheruserfollowsBy: 0,
                    },
                  },
                ],
                as: "followBy",
              },
            },
          ],
          as: "followData",
        },
      },
      {
        $lookup: {
          from: "chatconstants",
          let: { postedBy: "$_id" },
          pipeline: [
            {
              $match: {
                // match with sender and receiver id with and, or case
                $or: [
                  {
                    $and: [
                      {
                        senderId: mongoose.Types.ObjectId(req.userId),
                      },
                      {
                        receiverId: mongoose.Types.ObjectId(req.params.userId),
                      },
                    ],
                  },
                  {
                    $and: [
                      {
                        senderId: mongoose.Types.ObjectId(req.params.userId),
                      },
                      {
                        receiverId: mongoose.Types.ObjectId(req.userId),
                      },
                    ],
                  },
                ],
              },
            },
          ],
          as: "chatId",
        },
      },
      {
        $addFields: { chatId: { $arrayElemAt: ["$chatId", 0] } },
      },
      {
        $addFields: { chatId: "$chatId._id" },
      },
    ]);

    if (array.length) {
      await setResponseObject(
        req,
        false,
        responseMessage.BLCOK,
        
      );
      next();    }
    else{
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getAllUserProfile
      );
      next();
    }
   
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
}

//Get User Data 
_user.getUserData = async (req, res, next) => {
  // try{
  //   let userData = await USER.aggregate([
  //     {
  //       $match:{
  //         _id: mongoose.Types.ObjectId(req.params.id)
  //       }
  //     },
  //     {
  //       $project: {
  //         password: 0
  //       }
  //     },
  //     {
  //       $lookup: {
  //         from: "products",
  //         let : {userId: "$_id"},
  //         pipeline: [
  //           {
  //             // $match: {}
  //           }
  //         ]
  //       }
  //     }
  //   ]);
  //   await res.status(200).send({
  //     success:true,
  //     message:responseMessage.DATA_FOUND,
  //     data:userData
  // })
  // }catch(error){
  //   await setResponseObject(req, false, error.message ? error.message : responseMessage.SOMETHING_WRONG, "");
  //   next();
  // }
}

_user.users = async (req, res, next) => {
  try {

    let blockData=await BLOCKMODEL.find({blockedBy:req.userId})

    let array=[];
    blockData.map(a=>{
      array.push(a.blockedTo)
    })


    let data = await USER.aggregate([
      {
        $match: {
          otpVerified: true,
          _id: { $ne: mongoose.Types.ObjectId(req.userId) },
        },
      },
      {$match:{_id:{"$nin":array}}},

      {
        $lookup: {
          from: "follows",
          let: { userId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$user", "$$userId"] } } }],
          as: "followsData",
        },
      },
      {
        $addFields: { followsData: { $arrayElemAt: ["$followsData", 0] } },
      },
      {
        $addFields: {
          isUserFollowing: {
            $cond: {
              if: {
                $in: [
                  mongoose.Types.ObjectId(req.userId),
                  {
                    $cond: {
                      if: "$followsData.followBy",
                      then: "$followsData.followBy",
                      else: [],
                    },
                  },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          userName: 1,
          profileImg: 1,
          _id: 1,
          isUserFollowing: 1,
        },
      },
    ]);

    await setResponseObject(req, true, responseMessage.RECORDFOUND, data);
    next();
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_user.chatList = async (req, res) => {
  let senderId = "6077d9d524c15a27da15664a";
  let chatDetails = await CHATS.aggregate([
    {
      $match: {
        chatId: mongoose.Types.ObjectId("60812cfc48bc55ddec41e288"),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderId",
      },
    },
    {
      $unwind: "$senderId",
    },
    {
      $lookup: {
        from: "chats",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$chatId", "$$userId"] } } },
          {
            $addFields: {
              unseenCount: {
                $cond: {
                  if: {
                    receiverId: mongoose.Types.ObjectId(senderId),
                    isSeen: false,
                  },
                  then: false,
                  else: true,
                },
              },
            },
          },
        ],
        as: "unseenCount",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "receiverId",
        foreignField: "_id",
        as: "receiverId",
      },
    },
    {
      $unwind: "$receiverId",
    },
    {
      $project: {
        _id: "$_id",
        type: "$type",
        message: 1,
        updatedAt: "$updatedAt",
        createdAt: 1,
        isSeen: 1,
        chatId: 1,
        "senderId._id": "$senderId._id",
        "senderId.isOnline": "$senderId.isOnline",
        "senderId.username": "$senderId.username",
        "senderId.profileImg": "$senderId.profileImg",
        "senderId.email": "$senderId.email",
        "senderId.socketId": "$senderId.socketId",
        "receiverId._id": "$receiverId._id",
        "receiverId.isOnline": "$receiverId.isOnline",
        "receiverId.username": "$receiverId.username",
        "receiverId.profileImg": "$receiverId.profileImg",
        "receiverId.email": "$receiverId.email",
        "receiverId.socketId": "$receiverId.socketId",
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    { $skip: 10 * (10 - 1) },
    { $limit: 10 },
  ]);
  res.send(chatDetails);
};

//Get One Product By Id
_user.inviteLink = async (req, res) => {
  try {
    let result = await USER.findOne({ _id: req.params.id });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Link"),
      });
      return;
    }
    let inviteLink = `http://95.179.244.96:8080/auth/inviteLink/${req.params.id}`;
    result = JSON.parse(JSON.stringify(result));

    result.inviteLink = inviteLink;

    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Add addres for order
_user.addAdress = async (req, res) => {
  try {
    let data = req.body;
    data.userId = mongoose.Types.ObjectId(req.body.userId);
    let result = await ADDRESS.create(data);
    // data.userId = mongoose.Types.ObjectId(req.userId);
    //let result = await new ADDRESS(data).save();

    res.status(200).send({
      success: true,
      message: responseMessage.VERIFICATION("Adress added"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Get Address by id
_user.getAddress = async (req, res) => {
  try {
    let result = await ADDRESS.find({ userId: req.params.id });

    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Address"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Update Subcategory
_user.updateAddress = async (req, res) => {
  try {
    let data = req.body;
    let result = await ADDRESS.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: responseMessage.UPDATE_SUCCESS("Address"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Delete address
_user.deleteAddress = async (req, res) => {
  try {
    let result = await ADDRESS.findByIdAndRemove({ _id: req.params.id });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Address"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DELETE("Address"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Get Address by id
_user.sellerDetail = async (req, res) => {
  try {
    
      // let result= await USER.find({_id:req.params.id})
      let result = await USER.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.params.id)
          }
        }, 
        {
          $lookup: {
            from: 'sellers',
            localField: '_id',
            foreignField: 'requestedUser',
            as: 'sellerAddress'
          },
          // $lookup: {
          //   from: 'sellers',
          //   let: { userId: "$_id" },
          //   pipeline: [
          //     {$match: { $expr: { $eq: ["$requestedUser", "$$userId"] } }},
          //     {
          //       $lookup: {
          //         from: "messageconstants",
          //         localField: "requestedUser",
          //         foreignField: "receiverId",
          //         as: "chatId"
          //       }
          //     }
          //   ],
          //   as: "sellerAddress"
          // }
        },
      ,
      {
        $lookup: {
          from: "sellers",
          localField: "_id",
          foreignField: "requestedUser",
          as: "sellerAddress",
        }
      },
        {
          $lookup: {
            from: "messageconstants",
            let: { postedBy: "$_id" },
            pipeline: [
              {
                $match: {
                  // match with sender and receiver id with and, or case
                  $or: [
                      {
                          $and: [
                          {
                              senderId: mongoose.Types.ObjectId(req.userId),
                          },
                          {
                              receiverId: mongoose.Types.ObjectId(req.params.id),
                          },
                          ],
                      },
                      {
                          $and: [
                          {
                              senderId: mongoose.Types.ObjectId(req.params.id),
                          },
                          {
                              receiverId: mongoose.Types.ObjectId(req.userId),
                          },
                          ],
                      },
                  ],
              }
              },
            ],
            as:"chatId"
            },
          },
           {
            $addFields:{"chatId":{$arrayElemAt: [ "$chatId", 0 ]}} 
          },
          {
            $addFields:{"chatId":"$chatId._id"} 
          }
        
        // {
        //   $lookup: {
        //     from: "messageconstants",
        //     localField: "_id",
        //     foreignField: "receiverId",
        //     as: "chatId"
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$chatId'
        //   }
        // },
      ])
      if(!result){
          res.status(400).send({
              success:false,
              message:responseMessage.RECORD_NOTFOUND('Data')
          })
          return
      }
      res.status(200).send({
          success:true,
          message:responseMessage.DATA_FOUND,
          data:result
      })
  } catch (error) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Data"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } 
 

_user.hashTagList = async (req, res) => {
  try {


    let blockByArray=await BLOCKMODEL.find({blockedBy:req.userId})
    let arrays=[]
    blockByArray.map(a=>{
        arrays.push(a.blockedTo)
    })

    let blockArray=await BLOCKMODEL.find({blockedTo:req.userId})
                                                                              
    blockArray.map(a=>{
        arrays.push(a.blockedBy)
    })

     let postData=await POST.find({
      postedBy: { $nin:arrays}
       
     })
     let array=[];
     postData.map(a=>{
      array.push(a.description)
     })
     let description = [];
     postData.map((e) => {
      description.push(e.description);
     });
     let mergedA = [].concat.apply([], description);
     let uniqueDescription = [...new Set(mergedA)];
    const result = uniqueDescription.filter(data =>  data.includes("#") === true);
  
      res.send({ status: 200, success: true, data: result })
  } catch (error) {
      res.status(400).send({
          success: false,
          message: error.message
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
// const upload = multer({ storage: storage }).single("profileImg");

const upload = multer({ storage: storage }).fields([
  { name: "profileImg" },
  { name: "storeImage" },
]);

module.exports = _user;


