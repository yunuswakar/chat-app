const commonFunction = require("../../helperFunctions/commonFunction");
const queryModel = require("../../models/queryModel")
const pageModel = require("../../models/pageModel")
const pagePost = require("../../models/pagePostModel")
const productFeedback = require("../../models/productFeedbackModel")
const feedbackModel = require("../../models/feedbackModel")
const groupPostModel = require("../../models/groupPostModel")
const aggregatePaginate = require("mongoose-aggregate-paginate")
const productPayment = require("../../models/productPayment")
const waterfall = require("async-waterfall")
const jobPayment = require("../../models/jobPayment")
const sellOnAuctionModel = require("../../models/sellOnAuctionModel")
const itemReportModel = require("../../models/itemReport")
const postModel = require("../../models/postModel");
const jobModel = require("../../models/jobModel");
const userModel = require("../../models/userModel");
const classRoom = require("../../models/classRoomModel");
const classRoomPost = require("../../models/classPostModel");
const newsModel = require("../../models/newsModel");
const groupModel = require("../../models/groupModel");
const gamePayment = require("../../models/videoGamePayment")
const categoryModel = require("../../models/categoryModel");
const auctionModel = require("../../models/auctionModel");
const advPayment = require("../../models/advPayment")
const bannerModel = require("../../models/bannerModel");
const faqModel = require("../../models/faqModel");
const industryModel = require("../../models/industryModel")
const gifModel = require("../../models/gifModel");
const stickerModel = require("../../models/stickerModel");
const productModel = require("../../models/productModel");
const discussionFormModel = require("../../models/discussionFormModel");
const paymentModel = require("../../models/paymentManagement");
// const postModel = require("../../models/postModel");
const eventModel = require("../../models/eventModel");
const advertisementModel = require("../../models/advertisementModel")
const staticModel = require('../../models/staticModel');
const jobApplicationModel = require("../../models/jobApplicationModel");
const webNotification = require("../../models/webNotification")
const config = require("../../config/config.js");
const bcrypt = require("bcrypt-nodejs");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const log = console.log;
const _ = require("lodash");
const mongoose = require("mongoose");
const globalResponse = require("../../helperFunctions/responseHandler");
const globalMessege = require("../../helperFunctions/responseMessage");
const globalStatusCode = require("../../helperFunctions/statusCodes");
const bidding = require("../../models/biddingModel")
const stripe = require('stripe')('sk_test_L8oA9O5IOgtmflzWMndmmEhR')
const payment = require("../../models/paymentModel")



module.exports = {
  login: (req, res) => {
    try {
      if (!req.body.email && !req.body.password) {
        res.send({ responseCode: 204, responseMessege: "Fields are required" });
      } else {
        userModel.findOne(
          { email: req.body.email, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } },
          (err, adminDetails) => {
            console.log("45=>>>>>>>", err, adminDetails)
            if (err) {
              res.send({
                responseCode: 500,
                responseMessege: "Internal server error"
              });
            } else if (!adminDetails) {
              res.send({
                responseCode: 404,
                responseMessege: "Admin not found"
              });
            } else {
              const check = bcrypt.compareSync(
                req.body.password,
                adminDetails.password
              );
              const token = jwt.sign(
                {
                  _id: adminDetails._id,
                  email: adminDetails.email
                },
                global.gConfig.jwtSecretKey
              );
              if (check) {
                result = { adminId: adminDetails._id, token: token, userType: adminDetails.userType };
                res.send({
                  responseCode: 200,
                  responseMessege: "Admin logged in successfully",
                  result
                });
              } else {
                res.send({
                  responseCode: 401,
                  responseMessege: "Invalid credentials"
                });
              }
            }
          }
        );
      }
    } catch (error) {

      res.send({ responseCode: 500, responseMessege: "Error in catch!" });
    }
  },
  forgotPassword: (req, res) => {
    try {
      if (!req.body.email) {
        res.send({ responseCode: 204, responseMessege: "Fields are required" });
      } else {
        userModel.findOne(
          { email: req.body.email, status: "ACTIVE", userType: "ADMIN" },
          (err, adminDetails) => {
            if (err) {
              res.send({
                responseCode: 500,
                responseMessege: "Internal server error"
              });
            } else if (!adminDetails) {
              res.send({
                responseCode: 404,
                responseMessege: "Admin not found"
              });
            } else {
              var adminOtp = otpGenerator.generate(8, {
                alphabets: false,
                upperCase: false,
                specialChars: false
              });
              const link = `http://172.16.6.59:4200/reset-password/${adminDetails._id}`;
              // const url = `${link}?=${adminOtp}`;
              userModel.findOneAndUpdate(
                {
                  email: adminDetails.email,
                  status: "ACTIVE",
                  userType: "ADMIN"
                },
                {
                  $set: {
                    adminOtp: adminOtp
                  }
                },
                { new: true },
                (err1, result) => {
                  if (err1) {
                    res.send({
                      responseCode: 500,
                      responseMessege: "Something went wrong"
                    });
                  } else {
                    commonFunction.emailSender(
                      adminDetails.email,
                      "Click this link to reset your password",
                      link,
                      (err2, result2) => {
                        if (err2) {
                          res.send({
                            responseCode: 500,
                            responseMessege: "Something went wrong"
                          });
                        } else {
                          res.send({
                            responseCode: 200,
                            responseMessege:
                              "A reset link has been sent to your mail"
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Error in catch!" });
    }
  },
  resetPassword: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 204, responseMessege: "Fields are required" });
      } else {
        userModel.findOne(
          {
            _id: req.body.adminId,

            status: "ACTIVE",
            userType: { $in: ["ADMIN", "SUBADMIN"] }
          },
          (err, result) => {
            if (err) {
              res.send({
                responseCode: 500,
                responseMessege: "Internal server error"
              });
            } else if (!result) {
              res.send({
                responseCode: 500,
                responseMessege: "Admin not found"
              });
            } else {
              if (req.body.confirmPassword == req.body.password) {
                const newPassword = bcrypt.hashSync(req.body.password);
                userModel.findByIdAndUpdate(
                  {
                    _id: result._id,
                    status: "ACTIVE",
                    userType: "ADMIN"
                  },
                  {
                    $set: {
                      password: newPassword
                    }
                  },
                  { new: true },
                  (err1, result1) => {
                    if (err1) {
                      res.send({
                        responseCode: 500,
                        responseMessege: "Internal server error"
                      });
                    } else {
                      res.send({
                        responseCode: 200,
                        responseMessege: "Password successfully reset",
                        result1
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Error in catch!" });
    }
  },

  changePassword: (req, res) => {
    try {
      if (
        !req.body.adminId ||
        !req.body.newPassword ||
        !req.body.confirmPassword ||
        !req.body.oldPassword
      ) {
        return res.send({ responseCode: 401, responseMessage: "Parameter missing" });
      } else {
        userModel.findOne(
          { _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } },
          (err, result1) => {
            if (err) {
              res.send({
                responseCode: 500,
                responseMessege: "Internal server error"
              });
            } else if (!result1) {
              return res.send({ responseCode: 404, responseMessage: "Admin not found" })
            } else {
              var check = bcrypt.compareSync(req.body.oldPassword, result1.password)
              if (check) {
                if (req.body.newPassword == req.body.confirmPassword) {
                  var hashPassword = bcrypt.hashSync(req.body.confirmPassword);
                  userModel.findOneAndUpdate(
                    { _id: req.body.adminId, status: "ACTIVE" },
                    { $set: { password: hashPassword } },
                    { new: true },
                    (err, result2) => {
                      if (err) {
                        res.send({
                          responseCode: 500,
                          responseMessege: "Internal server error"
                        });
                      } else if (!result2) {
                        return res.send({ responseCode: 404, responseMessage: "Admin not found" })

                      } else {
                        console.log("success in resetPassword", result2);
                        var result = { _id: result2._id };
                        return res.send({ responseCode: 200, responseMessage: "Password changed successfully", result })
                      }
                    }
                  );
                } else {
                  return res.send({ responseCode: 404, responseMessage: "Password does not match" })
                }
              } else {
                log("old password not matched")
                res.send({ responseCode: 404, responseMessege: "Old password not matched" })
              }
            }
          }
        );
      }
    } catch (error) {
      return res.send({ responseCode: 500, responseMessage: "Something went wrong" })
    }
  },

  adminProfile: (req, res) => {
    try {
      //   if (!req.body.adminId) {
      //     res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      //   } else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, (err, result) => {
        console.log("305==========>", err, result)
        if (err) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        } else if (!result) {
          return res.send({ responseCode: 404, responseMessage: " Admin not found" })
        } else {
          const obj = {
            email: result.email,
            profilePic: result.profilePic,
            firstName: result.firstName,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber
          }
          return res.send({ responseCode: 200, responseMessage: " Admin found successfully", result: obj })
        }
      })
      // }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  editAdminProfile: (req, res) => {
    userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, (error, result) => {
      if (error) {
        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
      } else if (!result) {
        return res.send({ responseCode: 404, responseMessage: " Admin not found" })
      }
      else {
        if (req.body.profilePic) {
          commonFunction.uploadImg(req.body.profilePic, (imageError, imageData) => {
            if (imageError) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else {
              req.body.profilePic = imageData;
              userModel.findOneAndUpdate({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, { $set: req.body }, { new: true }, (updateError, updateResult) => {
                if (updateError) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Profile updated successfully", updateResult })
                }
              })
            }
          })
        }
        else {
          userModel.findOneAndUpdate({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, { $set: req.body }, { new: true }, (updateError, updateResult) => {
            console.log("353=====>", updateError, updateResult)
            if (updateError) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else {
              return res.send({ responseCode: 500, responseMessage: "Profile updated successfully", updateResult })
            }
          })
        }

      }
    })
  },

  //-----------------------------------------------------News section------------------------------------------------------

  addNews: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        
            commonFunction.multipleImageUploadCloudinary(req.body.newsPic, (error, imageData) => {
              console.log("335=====>", error, imageData)
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
              }
              else {
                console.log("result is", imageData)
                var imageArray = [];
                imageData.forEach(a => imageArray.push({ image: a }));
                console.log("The newsPic before save is:....", imageArray);


                let newsObj = new newsModel({
                  title: req.body.title,
                  description: req.body.description,
                  newsPic: imageArray,
                  date: Date.now()
                })
                newsObj.save((err1, result1) => {
                  console.log("gdasyfkayduwefkghdsfafjkads", err1, result1)
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "News saved successfully", result: result1 })
                  }
                })
              }
            })

            // } else {
            //   return res.send({ responseCode: 201, responseMessage: "Error in uploading image" })
            // }
       
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  updatedNews: (req, res) => {
    newsModel.findOne({ _id: req.body.newsId, status: "ACTIVE" }, (error, result) => {
      console.log("419=====>", error, result);

      if (error) {
        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
      }
      else if (!result) {
        return res.send({ responseCode: 404, responseMessage: "News not found" })
      }
      else {

        commonFunction.multipleImageUploadCloudinary(req.body.image, (imageEror, imageData) => {
          console.log("427======>", imageEror, imageData)
          if (imageEror) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error", imageEror })
          }
          else {
            var set = {};
            if (req.body.newsPic) {
              set['newsPic.$.image'] = imageData
            }
            var image1 = [];
            image1 = req.body.imageId
            console.log("result is", imageData)
            var imageArray = [];
            imageData.forEach((a, i) => { imageArray.push({ image: a, _id: image1[i] }) });
            console.log("The newsPic before save is:....", imageArray);

            newsModel.findOneAndUpdate({ "newsPic._id": { $in: req.body.imageId } }, { $set: { newsPic: imageArray, title: req.body.title, description: req.body.description } }, { multi: true, new: true }, (newsError, newsData) => {
              console.log("444", newsError, newsData)
              if (newsError) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!newsData) {

                return res.send({ responseCode: 404, responseMessage: "News not found" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "News updated successfully", newsData })
              }
            })
          }
        })
      }
    })
  },
  imageUpload: (req, res) => {
    try {
      if (!req.body.profilePic) {
        globalResponse.commonResponse(
          res,
          globalStatusCode.ErrorCode.PARAMETER_MISSING,
          globalMessege.ErrorMessage.FIELD_REQUIRED
        );
      } else {
        commonFunction.imageUploadCloudinary(
          req.body.profilePic,
          (error, result) => {
            if (error) {
              globalResponse.commonResponse(
                res,
                globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                globalMessege.ErrorMessage.INTERNAL_ERROR
              );
            } else {
              console.log("success in imageUpload", result);

              globalResponse.sendResponseWithData(
                res,
                globalStatusCode.SuccessCode.SUCCESS,
                globalMessege.SuccessMessage.IMAGE_URL,
                result
              );
            }
          }
        );
      }
    } catch (error) {
      globalResponse.commonResponse(
        res,
        globalStatusCode.ErrorCode.BAD_REQUEST,
        globalMessege.ErrorMessage.ERROR_IN_CATCH
      );
    }
  },

  viewNews: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: { $ne: "DELETE" } }, async (err, result) => {
          if (err) {
            console.log("yeturifjkgsjf", err)
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.newsId) {

              newsModel.findOne({ _id: req.body.newsId, addedBy: "ADMIN", status: { $ne: "DELETE" } }, (err1, result1) => {
                if (err1) {
                  console.log("the erreor", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " News not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "News found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              if (req.body.search) {
                query =
                  { title: new RegExp('^' + req.body.search, "i") }

              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              newsModel.paginate(query, options, (err1, result1) => {
                console.log("5186===>", err1, result1)
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "News not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "News found successfully", result1 })
                }

              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  newsManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            newsModel.findOneAndUpdate({
              _id: req.body.newsId, addedBy: "ADMIN", status: { $in: ["ACTIVE", "BLOCK"] }
            },
              { $set: { status: req.body.status } }, { new: true },
              (err1, result1) => {
                console.log("597===>", err1, result1)
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "News not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " News updated successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      console.log(":LLLLLLLLLLLLLLLLLL", error)
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  // editNews: (req, res) => {
  //   try {
  //     if (!req.body.adminId || !req.body.newsId) {
  //       res.send({ responseCode: 401, responseMessege: "Parameter missing" })
  //     }
  //     else {
  //       console.log("hsddsadj")
  //       userModel.findById({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, async (err, result) => {
  //         if (err) {
  //           console.log("HEEEEEEEEEYYYYYY", err, result)
  //           return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
  //         } else if (!result) {
  //           return res.send({ responseCode: 404, responseMessage: " Admin not found" })
  //         }
  //         else {
  //           var obj= {}
  //           if (req.body.image) {
  //             obj[newsPic.$.image]=req.body.image
  //           }

  //           if (req.body.title) {
  //             obj[title] = req.body.title;
  //             console.log("881====>", updatedNews.title)
  //           }

  //           newsModel.findByIdAndUpdate({ _id: req.body.newsId, status: "ACTIVE", addedBy: "ADMIN" },{$set:req.body}{ new: true }, async (err1, result1) => {
  //             if (err1) {
  //               return res.send({ responseCode: 500, responseMessage: "Internal server error1", err })
  //             }
  //             else if (!result1) {
  //               return res.send({ responseCode: 404, responseMessage: "No News Found For This NewsId", })
  //             }
  //             else {
  //               var updatedNews = {}
  //               updatedNews.addedBy = "ADMIN"

  //               if (req.body.title) {
  //                 updatedNews.title = req.body.title;
  //                 console.log("881====>", updatedNews.title)
  //               }
  //               if (req.body.description) {
  //                 updatedNews.description = req.body.description;
  //                 console.log("881====>", updatedNews.description)
  //               }
  //               if (req.body.newsPic) {
  //                 updatedNews.newsPic = req.body.newsPic;
  //                 console.log("881====>", updatedNews.newsPic)
  //               }

  //               return res.send({ responseCode: 200, responseMessage: " News updated successfully", result1: updatedNews })
  //             }
  //           })
  //         }
  //       })
  //     }
  //   }
  //   catch (error) {
  //     res.send({ responseCode: 500, responseMessege: "Something went wrong" })
  //   }
  // },
  //---------------------------------------------------Users section------------------------------------------------------

  userManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              userModel.findOneAndUpdate({
                _id: req.body.userId,
                status: "ACTIVE",
                userType: "USER"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " User blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              userModel.findOneAndUpdate({
                _id: req.body.userId,
                status: "ACTIVE",
                userType: "USER"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " User deleted successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "ACTIVE") {
              userModel.findOneAndUpdate({
                _id: req.body.userId,
                status: "BLOCK",
                userType: "USER"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " User activated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewUser: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            let options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 10,
              // select: "title description picVideo likes comments",
              sort: {
                createdAt: -1
              }
            }

            // userModel.paginate({$or:[{ status: { $ne: "DELETE" }, userType: "USER" },
            // {$or:[{firstName:{$regex:req.body.search}},{email:{$regex:req.body.search}},
            //  { phoneNumber:{$regex:req.body.search}}]}]}
            if (req.body.search) {
              let query = {
                $and: [{ status: { $ne: "DELETE" }, userType: "USER" },
                {
                  $or: [{ firstName: { $regex: "^" + req.body.search, $options: 'i' } },
                  { email: { $regex: "^" + req.body.search, $options: 'i' } },
                  { phoneNumber: { $regex: "^" + req.body.search, $options: 'i' } }
                  ]
                }
                ]
              };

              userModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  console.log("fkdhgukfhg", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " User found successfully", result: result1 })
                }
              })
            } else if (req.body.userId) {
              userModel.findOne({ _id: req.body.userId, status: { $ne: "DELETE" } }, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "User found successfully", result: result1 })
                }
              })
            } else {

              let query = {

                status: { $ne: "DELETE" }, userType: "USER"
              };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }

              userModel.paginate(query, options, (err1, result1) => {
                console.log("839", err1, result1)
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " User found successfully", result: result1 })
                }
              })
            }


          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  dashboard: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            userModel.find({ status: { $ne: "DELETE" }, userType: "USER" }, (err1, result1) => {
              if (err1) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              } else if (result1.docs.length == 0) {
                return res.send({ responseCode: 404, responseMessage: " User not found" })
              } else {
                const count = result1.docs.length;
                return res.send({ responseCode: 200, responseMessage: " User deleted successfully", result: count })
              }
            })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //------------------------------------------------sub Admin management----------------------------------------------

  addSudAdmin: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.password == req.body.confirmPassword) {
              let subAdmin = {}
              subAdmin.userType = "SUBADMIN";
              subAdmin.firstName = req.body.fullName;
              subAdmin.email = req.body.email;
              subAdmin.phoneNumber = req.body.phoneNumber;
              subAdmin.password = bcrypt.hashSync(req.body.password);;


              if (req.body.dashboard) {
                subAdmin['permission.dashboard'] = req.body.dashboard;
              }
              if (req.body.userManagement) {
                subAdmin['permission.userManagement'] = req.body.userManagement;
              }
              if (req.body.bannerManagement) {
                subAdmin['permission.bannerManagement'] = req.body.bannerManagement;
              }
              if (req.body.staticContentManagement) {
                subAdmin['permission.staticContentManagement'] = req.body.staticContentManagement;
              }
              if (req.body.stickerManagement) {
                subAdmin['permission.stickerManagement'] = req.body.stickerManagement;
              }
              if (req.body.gifManagement) {
                subAdmin['permission.gifManagement'] = req.body.gifManagement;
              }
              if (req.body.industryManagement) {
                subAdmin['permission.industryManagement'] = req.body.industryManagement;
              }
              if (req.body.categoryManagement) {
                subAdmin['permission.categoryManagement'] = req.body.categoryManagement;
              }
              if (req.body.subCategoryManagement) {
                subAdmin['permission.subCategoryManagement'] = req.body.subCategoryManagement;
              }
              if (req.body.buyingSellingProductManagement) {
                subAdmin['permission.buyingSellingProductManagement'] = req.body.buyingSellingProductManagement;
              }
              if (req.body.auctionCategoryManagement) {
                subAdmin['permission.auctionCategoryManagement'] = req.body.auctionCategoryManagement;
              }
              if (req.body.auctionSubCategoryManagement) {
                subAdmin['permission.auctionSubCategoryManagement'] = req.body.auctionSubCategoryManagement;
              }
              if (req.body.auctionProductManagement) {
                subAdmin['permission.auctionProductManagement'] = req.body.auctionProductManagement;
              }
              if (req.body.orderManagement) {
                subAdmin['permission.orderManagement'] = req.body.orderManagement;
              }
              if (req.body.jobManagement) {
                subAdmin['permission.jobManagement'] = req.body.jobManagement;
              }
              if (req.body.groupManagement) {
                subAdmin['permission.groupManagement'] = req.body.groupManagement;
              }
              if (req.body.videoGameManagement) {
                subAdmin['permission.videoGameManagement'] = req.body.videoGameManagement;
              }
              if (req.body.advertiseManagement) {
                subAdmin['permission.advertiseManagement'] = req.body.advertiseManagement;
              }

              if (req.body.nonProfitManagement) {
                subAdmin['permission.nonProfitManagement'] = req.body.nonProfitManagement;
              }
              if (req.body.eventManagement) {
                subAdmin['permission.eventManagement'] = req.body.eventManagement;
              }
              if (req.body.classRoomManagement) {
                subAdmin['permission.classRoomManagement'] = req.body.classRoomManagement;
              }
              if (req.body.discussionForumManagement) {
                subAdmin['permission.discussionForumManagement'] = req.body.discussionForumManagement;
              }
              if (req.body.newsManagement) {
                subAdmin['permission.newsManagement'] = req.body.newsManagement;
              }
              if (req.body.paymentManagement) {
                subAdmin['permission.paymentManagement'] = req.body.paymentManagement;
              }
              if (req.body.jobTransactionManagement) {
                subAdmin['permission.jobTransactionManagement'] = req.body.jobTransactionManagement;
              }
              if (req.body.buyingSellingTransactionManagement) {
                subAdmin['permission.buyingSellingTransactionManagement'] = req.body.buyingSellingTransactionManagement;
              }
              if (req.body.reportManagement) {
                subAdmin['permission.reportManagement'] = req.body.reportManagement;
              }
              if (req.body.faqManagement) {
                subAdmin['permission.faqManagement'] = req.body.faqManagement;
              }
              if (req.body.pageManagement) {
                subAdmin['permission.pageManagement'] = req.body.pageManagement;
              }
              if (req.body.generalReportManagement) {
                subAdmin['permission.generalReportManagement'] = req.body.generalReportManagement;
              }
              if (req.body.auctionOrderManagement) {
                subAdmin['permission.auctionOrderManagement'] = req.body.auctionOrderManagement;
              }
              if (req.body.auctionTransactionManagement) {
                subAdmin['permission.auctionTransactionManagement'] = req.body.auctionTransactionManagement;
              }

              userModel.create(subAdmin, (err1, result1) => {
                if (err1) {
                  console.log("847==========>", err1, result1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else {
                  let body = `Dear ${result.firstName}, You have successfully added ${result1.firstName},as a Sub-Admin<br>
                                                                  See from this link:<a href=${global.gConfig.adminURL}> click <a>`
                  // commonFunction.emailSender(req.body.email, "Job applied successfully", body
                  commonFunction.adminEmail(result.email, "added sub-Admin", body, (alinkErr, aResult) => {
                    if (alinkErr) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else {
                      let body1 = `Dear ${result1.firstName}, You have been successfully added as a Sub-Admin by  ${result.firstName} ${result.lastName ? result.lastName : ""}
                     <br>your password is: ${req.body.password} 
                      <br>See from this link :<a href=${global.gConfig.adminURL}>click<a>`
                      commonFunction.subAdminEmail(result1.email, "added sub-Admin", body1, (sLinkErr, sResult) => {
                        if (sLinkErr) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          return res.send({ responseCode: 200, responseMessage: "subAdmin saved successfully", result: result1 })
                        }
                      })
                    }
                  })

                }
              })
            } else {
              return res.send({ responseCode: 404, responseMessage: "Password not matched" })
            }

          }
        })
      }
    } catch (error) {
      console.log("OOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPPOOOOOOOOOOOO")
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  editSudAdmin: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Unable to post!" })
          } else {
            console.log("dashboardklmklmjomjp", result.permission.dashboard == req.body.dashboard)

            var subAdmin = {};
            subAdmin.userType = "SUBADMIN";



            if (req.body.fullName) {
              subAdmin.firstName = req.body.fullName;
              console.log("881====>", subAdmin.firstName)
            }
            if (req.body.email) {

              subAdmin.email = req.body.email;
            }
            if (req.body.phoneNumber) {
              subAdmin.phoneNumber = req.body.phoneNumber;
            }
            if (req.body.password) {
              if (req.body.password == req.body.confirmPassword) {
                subAdmin.password = bcrypt.hashSync(req.body.password);
              } else {
                return res.send({ responseCode: 404, responseMessage: "Password not matched" })
              }
            }

            if (req.body.dashboard == true) {

              subAdmin['permission.dashboard'] = req.body.dashboard;

            }
            if (req.body.dashboard == false) {

              subAdmin['permission.dashboard'] = req.body.dashboard;

            }
            if (req.body.userManagement == true) {
              subAdmin['permission.userManagement'] = req.body.userManagement;
            }
            if (req.body.userManagement == false) {
              subAdmin['permission.userManagement'] = req.body.userManagement;
            }
            if (req.body.bannerManagement == true) {
              subAdmin['permission.bannerManagement'] = req.body.bannerManagement;
            }
            if (req.body.bannerManagement == false) {
              subAdmin['permission.bannerManagement'] = req.body.bannerManagement;
            }
            if (req.body.staticContentManagement == true) {
              subAdmin['permission.staticContentManagement'] = req.body.staticContentManagement;
            }
            if (req.body.staticContentManagement == false) {
              subAdmin['permission.staticContentManagement'] = req.body.staticContentManagement;
            }
            if (req.body.stickerManagement == true) {
              subAdmin['permission.stickerManagement'] = req.body.stickerManagement;
            }
            if (req.body.stickerManagement == false) {
              subAdmin['permission.stickerManagement'] = req.body.stickerManagement;
            }
            if (req.body.gifManagement == true) {
              subAdmin['permission.gifManagement'] = req.body.gifManagement;
            }
            if (req.body.gifManagement == false) {
              subAdmin['permission.gifManagement'] = req.body.gifManagement;
            }
            if (req.body.industryManagement == true) {
              subAdmin['permission.industryManagement'] = req.body.industryManagement;
            }
            if (req.body.industryManagement == false) {
              subAdmin['permission.industryManagement'] = req.body.industryManagement;
            }
            if (req.body.categoryManagement == true) {
              subAdmin['permission.categoryManagement'] = req.body.categoryManagement;
            }
            if (req.body.categoryManagement == false) {
              subAdmin['permission.categoryManagement'] = req.body.categoryManagement;
            }
            if (req.body.subCategoryManagement == true) {
              subAdmin['permission.subCategoryManagement'] = req.body.subCategoryManagement;
            }
            if (req.body.subCategoryManagement == false) {
              subAdmin['permission.subCategoryManagement'] = req.body.subCategoryManagement;
            }
            if (req.body.buyingSellingProductManagement == true) {
              subAdmin['permission.buyingSellingProductManagement'] = req.body.buyingSellingProductManagement;
            }
            if (req.body.buyingSellingProductManagement == false) {
              subAdmin['permission.buyingSellingProductManagement'] = req.body.buyingSellingProductManagement;
            }
            if (req.body.auctionCategoryManagement == true) {
              subAdmin['permission.auctionCategoryManagement'] = req.body.auctionCategoryManagement;
            }
            if (req.body.auctionCategoryManagement == false) {
              subAdmin['permission.auctionCategoryManagement'] = req.body.auctionCategoryManagement;
            }
            if (req.body.auctionSubCategoryManagement == true) {
              subAdmin['permission.auctionSubCategoryManagement'] = req.body.auctionSubCategoryManagement;
            }
            if (req.body.auctionSubCategoryManagement == false) {
              subAdmin['permission.auctionSubCategoryManagement'] = req.body.auctionSubCategoryManagement;
            }
            if (req.body.auctionProductManagement == true) {
              subAdmin['permission.auctionProductManagement'] = req.body.auctionProductManagement;
            }
            if (req.body.auctionProductManagement == false) {
              subAdmin['permission.auctionProductManagement'] = req.body.auctionProductManagement;
            }
            if (req.body.orderManagement == true) {
              subAdmin['permission.orderManagement'] = req.body.orderManagement;
            }
            if (req.body.orderManagement == false) {
              subAdmin['permission.orderManagement'] = req.body.orderManagement;
            }
            if (req.body.jobManagement == true) {
              subAdmin['permission.jobManagement'] = req.body.jobManagement;
            }
            if (req.body.jobManagement == false) {
              subAdmin['permission.jobManagement'] = req.body.jobManagement;
            }
            if (req.body.groupManagement == true) {
              subAdmin['permission.groupManagement'] = req.body.groupManagement;
            }
            if (req.body.groupManagement == false) {
              subAdmin['permission.groupManagement'] = req.body.groupManagement;
            }
            if (req.body.videoGameManagement == true) {
              subAdmin['permission.videoGameManagement'] = req.body.videoGameManagement;
            }
            if (req.body.videoGameManagement == false) {
              subAdmin['permission.videoGameManagement'] = req.body.videoGameManagement;
            }
            if (req.body.advertiseManagement == true) {
              subAdmin['permission.advertiseManagement'] = req.body.advertiseManagement;
            }
            if (req.body.advertiseManagement == false) {
              subAdmin['permission.advertiseManagement'] = req.body.advertiseManagement;
            }
            if (req.body.nonProfitManagement == true) {
              subAdmin['permission.nonProfitManagement'] = req.body.nonProfitManagement;
            }
            if (req.body.nonProfitManagement == false) {
              subAdmin['permission.nonProfitManagement'] = req.body.nonProfitManagement;
            }
            if (req.body.eventManagement == true) {
              subAdmin['permission.eventManagement'] = req.body.eventManagement;
            }
            if (req.body.eventManagement == false) {
              subAdmin['permission.eventManagement'] = req.body.eventManagement;
            }
            if (req.body.classRoomManagement == true) {
              subAdmin['permission.classRoomManagement'] = req.body.classRoomManagement;
            }
            if (req.body.classRoomManagement == false) {
              subAdmin['permission.classRoomManagement'] = req.body.classRoomManagement;
            }
            if (req.body.discussionForumManagement == true) {
              subAdmin['permission.discussionForumManagement'] = req.body.discussionForumManagement;
            }
            if (req.body.discussionForumManagement == false) {
              subAdmin['permission.discussionForumManagement'] = req.body.discussionForumManagement;
            }
            if (req.body.newsManagement == true) {
              subAdmin['permission.newsManagement'] = req.body.newsManagement;
            }
            if (req.body.newsManagement == false) {
              subAdmin['permission.newsManagement'] = req.body.newsManagement;
            }
            if (req.body.paymentManagement == true) {
              subAdmin['permission.paymentManagement'] = req.body.paymentManagement;
            }
            if (req.body.paymentManagement == false) {
              subAdmin['permission.paymentManagement'] = req.body.paymentManagement;
            }
            if (req.body.jobTransactionManagement == true) {
              subAdmin['permission.jobTransactionManagement'] = req.body.jobTransactionManagement;
            }
            if (req.body.jobTransactionManagement == false) {
              subAdmin['permission.jobTransactionManagement'] = req.body.jobTransactionManagement;
            }
            if (req.body.buyingSellingTransactionManagement == true) {
              subAdmin['permission.buyingSellingTransactionManagement'] = req.body.buyingSellingTransactionManagement;
            }
            if (req.body.buyingSellingTransactionManagement == false) {
              subAdmin['permission.buyingSellingTransactionManagement'] = req.body.buyingSellingTransactionManagement;
            }
            if (req.body.reportManagement == true) {
              subAdmin['permission.reportManagement'] = req.body.reportManagement;
            }
            if (req.body.reportManagement == false) {
              subAdmin['permission.reportManagement'] = req.body.reportManagement;
            }
            if (req.body.faqManagement == true) {
              subAdmin['permission.faqManagement'] = req.body.faqManagement;
            }
            if (req.body.faqManagement == false) {
              subAdmin['permission.faqManagement'] = req.body.faqManagement;
            }
            if (req.body.pageManagement == true) {
              subAdmin['permission.pageManagement'] = req.body.pageManagement;
            }
            if (req.body.pageManagement == false) {
              subAdmin['permission.pageManagement'] = req.body.pageManagement;
            }
            if (req.body.generalReportManagement == true) {
              subAdmin['permission.generalReportManagement'] = req.body.generalReportManagement;
            }
            if (req.body.generalReportManagement == false) {
              subAdmin['permission.generalReportManagement'] = req.body.generalReportManagement;
            }
            if (req.body.auctionOrderManagement == true) {
              subAdmin['permission.auctionOrderManagement'] = req.body.auctionOrderManagement;
            }

            if (req.body.auctionOrderManagement == false) {
              subAdmin['permission.auctionOrderManagement'] = req.body.auctionOrderManagement;
            }
            if (req.body.auctionTransactionManagement == true) {
              subAdmin['permission.auctionTransactionManagement'] = req.body.auctionTransactionManagement;
            }
            if (req.body.auctionTransactionManagement == false) {
              subAdmin['permission.auctionTransactionManagement'] = req.body.auctionTransactionManagement;
            }
            userModel.findByIdAndUpdate({
              _id: req.body.subAdminId,
              userType: "SUBADMIN",
              status: "ACTIVE"
            },
              { $set: subAdmin },
              { new: true },
              (err1, result1) => {
                console.log("963=========>", err1, result1)
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "subAdmin updated successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  viewSubAdmin: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            let options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 10,
              // select: "title description picVideo likes comments",
              sort: {
                createdAt: -1
              }
            }

            // let query = { docStatus: "ACTIVE", status: "Pending", endTime: { $gte: new Date().toISOString() } };
            // query.$or = [
            //   { auctionProductName: new RegExp('^' + req.body.search, "i") },
            //   { auctionCategoryName: new RegExp('^' + req.body.search, "i") },
            //   { auctionSubCategoryName: new RegExp('^' + req.body.search, "i") }
            // ]

            if (req.body.search) {
              let query = {
                $and: [{ status: { $ne: "DELETE" }, userType: "SUBADMIN" },
                {
                  $or: [{ firstName: { $regex: "^" + req.body.search, $options: 'i' } },
                  { email: { $regex: "^" + req.body.search, $options: 'i' } },
                  { phoneNumber: { $regex: "^" + req.body.search, $options: 'i' } }
                  ]
                }
                ]
              };

              userModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubAdmin found successfully", result: result1 })
                }
              })
            } else if (req.body.subAdminId) {
              console.log("ghgfhgfhjhgh")
              userModel.findOne({ _id: req.body.subAdminId, status: "ACTIVE", userType: "SUBADMIN" }, (err1, result1) => {
                console.log("ghgfhgfhjhgh", err1, result1)
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " SubAdmin found successfully", result: result1 })
                }
              })
            } else {

              let query = {
                status: { $ne: "DELETE" }, userType: "SUBADMIN"
              };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }

              userModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubAdmin found successfully", result: result1 })
                }
              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  subAdminManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              userModel.findOneAndUpdate({
                _id: req.body.subAdminId,
                status: "ACTIVE",
                userType: "SUBADMIN"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " SubAdmin not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " SubAdmin blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              userModel.findOneAndUpdate({
                _id: req.body.subAdminId,
                status: "ACTIVE",
                userType: "SUBADMIN"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " SubAdmin not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " SubAdmin deleted successfully", result: result1 })
                  }
                })
            }
            else {
              userModel.findOneAndUpdate({
                _id: req.body.subAdminId,
                status: "BLOCK",
                userType: "SUBADMIN"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " SubAdmin not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " SubAdmin activated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //-------------------------------------------------------jobSection-------------------------------------------------------
  viewJob: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }).then((admin, err) => {
          if (admin) {
            var query = {};
            if (req.body.search) {
              query.$or = [{ userName: new RegExp('^' + req.body.search, "i") },
              { title: new RegExp('^' + req.body.search, "i") }]
            }
            if (req.body.fromDate && req.body.toDate) {
              query.$and = [{
                createdAt: { $gte: new Date(req.body.fromDate) }
              },
              {
                createdAt: { $lte: new Date(req.body.toDate) }
              }]
            }
            if (req.body.fromDate && !req.body.toDate) {
              query.createdAt = { $gte: new Date(req.body.fromDate) }
            }
            if (!req.body.fromDate && req.body.toDate) {
              query.createdAt = { $lte: new Date(req.body.toDate) }

            }

            if (req.body.jobId) {
              query.$and = [{ _id: mongoose.Types.ObjectId(req.body.jobId) }, { jobStatus: "ACTIVE" }]

            }

            var aggregate = jobModel.aggregate([
              {
                $lookup:
                {
                  from: "jobpayments",
                  localField: "userName",
                  foreignField: "posterName",
                  as: "charge"
                }
              },
              { $match: { jobStatus: { $ne: "DELETE" } } },
              { $sort: { createdAt: -1 } },
              {
                $project: {
                  applicants: 1,
                  pinCode: 1,
                  country: 1,
                  state: 1,
                  city: 1,
                  gender: 1,
                  languages: 1,
                  roleExperience: 1,
                  company: 1,
                  email: 1,
                  totalVacancy: 1,
                  expiryDate: 1,
                  addDetails: 1,
                  jobPic: 1,
                  photoId: 1,
                  address: 1,
                  createdAt: 1,
                  jobStatus: 1,
                  title: 1,
                  userName: 1,
                  phoneNumber: 1,
                  jobType: 1,
                  industryType: 1,
                  totalApplicant: { $cond: { if: { $isArray: "$applicants" }, then: { $size: "$applicants" }, else: "NA" } },
                  totalAmount: { $arrayElemAt: ["$charge.amount", 0] }
                }
              },
              { $match: query },
            ])

            var options = {
              page: req.body.page || 1,
              limit: req.body.limit || 10


              // sort: ('-createdAt') 
            };
            jobModel.aggregatePaginate(aggregate, options, function (err, results, totalpage, total) {
              console.log("1522====>", options.populate)
              if (err) {
                res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
              }
              else if (results.length == 0) {
                res.send({ responseCode: 404, responseMessage: "Data not found" })

              }
              else {
                res.send({ responseCode: 200, responseMessage: "The job details are...", results, totalpage, total })
              }
            })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  // dashboardMng: (req, res) => {
  //     try {
  //       waterfall([
  //         function (callback) {
  //           productPayment.aggregate([
  //             { $match: { createdAt: { $lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) } } },
  //             {
  //               $group: {
  //                 _id: 0,
  //                 orderInMonth: { $sum: 1 },

  //               }
  //             },
  //             { $project: { orderInMonth: 1, _id: 0 } }
  //           ]).then((monData, monErr) => {
  //             (monData) ? callback(null, monData) : 0
  //           })
  //         },
  //         function (monData, callback) {
  //           productPayment.aggregate([
  //             { $match: { createdAt: { $lte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } } },
  //             {
  //               $group: {
  //                 _id: 0,
  //                 orderInWeek: { $sum: 1 },
  //               }
  //             },
  //             { $project: { orderInWeek: 1, _id: 0 } }
  //           ]).then((weekData, weekErr) => {
  //             (weekData) ? callback(null, monData, weekData) : 0
  //           })
  //         },
  //         function (monData, weekData, callback) {
  //           productPayment.aggregate([
  //             { $match: { createdAt: { $lte: new Date(new Date() - 1 * 24 * 60 * 60 * 1000) } } },
  //             {
  //               $group: {
  //                 _id: 0,
  //                 orderInDay: { $sum: 1 },
  //               }
  //             },
  //             { $project: { orderInDay: 1, _id: 0 } }
  //           ]).then((dayData, dayErr) => {
  //             (dayData) ? callback(null, ...monData, ...weekData, ...dayData) : 0
  //           })
  //         }
  //       ], function (err, result1, result2, result3) {
  //         return res.send({ responseCode: 200, responseMessage: "Data found successfully", ...result1, ...result2, ...result3 })
  //       });
  //     } catch (error) {
  //       res.send({ responseCode: 500, responseMessage: "Internal Server Error...", error })
  //     }

  // },
  dashboardMng: (req, res) => {
    try {
      userModel.count((userErr, userResult) => {
        if (userErr) {
          res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
        }
        else {
          productPayment.aggregate([
            { $match: { "orderStatus": "Delivered", deliveryDate: { $lte: new Date(new Date() - 3 * 24 * 60 * 60 * 1000) } } },
            { $unwind: "$productDescription" },
            {
              $group: {
                _id: null,
                marketEarning: { $sum: "$productDescription.totalCost" }
              }
            },
            { $project: { marketEarning: { $multiply: ["$marketEarning", 0.06] }, _id: 0 } }
          ], (err, result) => {
            if (err) {
              res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
            }
            else {
              result.length != 0 ? result = result : result = [{ marketEarning: 0 }];
              jobPayment.aggregate([
                { $match: { "transactionStatus": "succeeded", createdAt: { $lte: new Date(new Date() - 3 * 24 * 60 * 60 * 1000) } } },
                {
                  $group: {
                    _id: null,
                    jobEarning: { $sum: "$amount" }
                  }
                },
                { $project: { jobEarning: 1, _id: 0 } }
              ], (err, jobData) => {
                if (err) {
                  res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
                }
                else {
                  jobData.length != 0 ? jobData = jobData : jobData = [{ jobEarning: 0 }];
                  advPayment.aggregate([
                    { $match: { "transactionStatus": "succeeded", createdAt: { $lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) } } },
                    {
                      $group: {
                        _id: null,
                        advEarning: { $sum: "$amount" }
                      }
                    },
                    { $project: { advEarning: 1, _id: 0 } }
                  ], (err, advData) => {
                    if (err) {
                      res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
                    }
                    else {
                      advData.length != 0 ? advData = advData : advData = [{ advEarning: 0 }];
                      gamePayment.aggregate([
                        { $match: { "transactionStatus": "succeeded", createdAt: { $lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) } } },
                        {
                          $group: {
                            _id: null,
                            gameEarning: { $sum: "$amount" } || 0
                          }
                        },
                        { $project: { gameEarning: 1, _id: 0 } }
                      ], (err, gameData) => {
                        if (err) {
                          res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
                        }
                        else {
                          gameData.length != 0 ? gameData = gameData : gameData = [{ gameEarning: 0 }];
                          waterfall([
                            function (callback) {
                              productPayment.aggregate([
                                { $match: { createdAt: { $lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) } } },
                                {
                                  $group: {
                                    _id: 0,
                                    orderInMonth: { $sum: 1 },

                                  }
                                },
                                { $project: { orderInMonth: 1, _id: 0 } }
                              ]).then((monData, monErr) => {
                                (monData) ? callback(null, monData) : 0
                              })
                            },
                            function (monData, callback) {
                              productPayment.aggregate([
                                { $match: { createdAt: { $lte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } } },
                                {
                                  $group: {
                                    _id: 0,
                                    orderInWeek: { $sum: 1 },
                                  }
                                },
                                { $project: { orderInWeek: 1, _id: 0 } }
                              ]).then((weekData, weekErr) => {
                                (weekData) ? callback(null, monData, weekData) : 0
                              })
                            },
                            function (monData, weekData, callback) {
                              
                              productPayment.aggregate([
                                { $match: { createdAt: { $lte: new Date(new Date() - 1 * 24 * 60 * 60 * 1000) } } },
                                {
                                  $group: {
                                    _id: 0,
                                    orderInDay: { $sum: 1 },
                                  }
                                },
                                { $project: { orderInDay: 1, _id: 0 } }
                              ]).then((dayData, dayErr) => {
                                (dayData) ? callback(null, ...monData, ...weekData, ...dayData) : 0
                              })
                            }
                          ], function (err, result1, result2, result3) {
                            return res.send({ responseCode: 200, responseMessage: "Data found successfully", ...result1, totalUser: userResult, ...result2, ...result3, ...result[0] || { marketEarning: 0 }, ...jobData[0] || { jobEarning: 0 }, ...advData[0] || { advEarning: 0 }, ...gameData[0] || { gameEarning: 0 }, totalEarning: { ...result[0] }.marketEarning + { ...jobData[0] }.jobEarning + { ...advData[0] }.advEarning + { ...gameData[0] }.gameEarning || 0 })
                          });
                          // gameData.length != 0 ? gameData = gameData : gameData = [{ gameEarning: 0 }];
                          // console.log({ ...result[0] }.marketEarning, { ...jobData[0] }.jobEarning, { ...advData[0] }.advEarning, { ...gameData[0] }.gameEarning)
                          // return res.send({ responseCode: 200, responseMessage: "Transaction found successfully", ...result[0] || { marketEarning: 0 }, ...jobData[0] || { jobEarning: 0 }, ...advData[0] || { advEarning: 0 }, ...gameData[0] || { gameEarning: 0 }, totalEarning: { ...result[0] }.marketEarning + { ...jobData[0] }.jobEarning + { ...advData[0] }.advEarning + { ...gameData[0] }.gameEarning || 0 })
                        }
                      })
                      //  return res.send({ responseCode: 200, responseMessage: "Transaction found successfully", ...result[0] || { marketEarning: 0 }, ...jobData[0] || { jobEarning: 0 }, ...advData[0] || { advEarning: 0 }})
                    }
                  })
                  // return res.send({ responseCode: 200, responseMessage: "Transaction found successfully", ...result[0] || { marketEarning: 0 }, ...jobData[0] || { jobEarning: 0 } })
                }
              })
            }
          })
        }
      })
    } catch (error) {
      res.send({ responseCode: 500, responseMessage: "Internal Server Error...", error })
    }
  },
  totalOrder: (req, res) => {
    productPayment.aggregate([
      { $match: { createdAt: { $lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: null, orderInMonth: { $sum: 1 } } },
      { $project: { _id: 0 } }
    ], (err, result1) => {
      console.log("1534=======>", err, result1)
      if (err) {
        return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
      }
      else {
        productPayment.aggregate([
          { $match: { createdAt: { $lte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } } },
          { $group: { _id: null, orderInWeek: { $sum: 1 } } },
          { $project: { _id: 0 }, }
        ], (err, result2) => {
          console.log("1534=======>", err, result2)
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
          }
          else {
            productPayment.aggregate([
              { $match: { createdAt: { $lte: new Date(new Date() - 1 * 24 * 60 * 60 * 1000) } } },
              { $group: { _id: null, orderInDay: { $sum: 1 } } },
              { $project: { _id: 0 } }
            ], (err, result3) => {
              console.log("1534=======>", err, result3)
              if (err) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", ...result1[0], ...result2[0], ...result3[0] })
              }
            })
          }
        })
      }
    })
  },
  jobTransaction: (req, res) => {
    console.log("1336=======>", req, res)
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      let query = {};
      let options = {
        page: req.body.pageNumber || 1,
        limit: req.body.limit || 5,
        sort: { createdAt: -1 }
      }
      jobPayment.paginate(query, options, (error, paymentData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
        }
        else if (paymentData.docs.length == 0) {
          return res.send({ responseCode: 404, responseMessage: "Data not found" })
        }
        else {
          return res.send({ responseCode: 200, responseMessage: "Data found successfully", paymentData })
        }
      })
    }
  },

  addIndustry: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, userType: { $in: ["ADMIN", "SUBADMIN"] }, status: "ACTIVE" }, (err, result) => {
          if (err) {
            globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
          } else if (!result) {
            globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
          } else {
            var query = { $and: [{ status: { $ne: "DELETE" } }, { industryType: { $regex: req.body.industryType, $options: 'i' } }] }
            industryModel.findOne(query, (error, industry_result) => {
              if (error)
                globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
              else if (industry_result) {
                return res.send({ responseCode: 404, responseMessage: "industry type  already exists" })
              } else {
                new industryModel(req.body).save((error, success) => {
                  if (error) {
                    return res.send({ responseCode: 503, responseMessage: "Something wrong" })
                  }
                  else {
                    res.send({ responseCode: 200, responseMessege: "Industry successfully added", result: success })
                  }
                })
              }
            })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMesssage: "Something went wrong" })
    }
  },
  deleteIndustry: (req, res) => {
    try {

      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        industryModel.findOne({ '_id': req.body.industryId, status: "ACTIVE" }, (error, success) => {
          if (error) {
            res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!success) {
            res.send({ responseCode: 400, responseMessage: "Data not found" })
          }
          else {
            industryModel.findOneAndUpdate({ '_id': req.body.industryId, status: "ACTIVE" }, { $set: { status: req.body.status } }, { new: true }, (error, result) => {
              if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                res.send({ responseCode: 200, responseMessage: "industry successfully deleted", result: result })
              }
            })
          }
        })
      }


    }

    catch (error) {
      res.send({ responseCode: 500, responseMessage: "Something went wrong" })
    }
  },

  editIndustry: (req, res) => {

    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {

        industryModel.findOne({ '_id': req.body.industryId, status: "ACTIVE" }, (error, success) => {
          if (error) {
            res.send({ responseCode: 500, responseMessage: "Internal server error", err })
          }
          else if (!success) {
            res.send({ responseCode: 404, responseMessage: "Data not found" })
          }

          else {
            industryModel.findByIdAndUpdate({ '_id': req.body.industryId, status: "ACTIVE" },
              req.body, { new: true }, (update_error, update_result) => {
                if (update_error) {
                  res.send({ responseCode: 404, responseMessage: " industry type updation failed", update_error })
                }
                else {
                  res.send({ responseCode: 200, responseMessage: "industry successfully updated ", result: update_result })
                }
              })

          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessage: "Something went wrong" })
    }
  },

  industryList: (req, res) => {

    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            var query = { status: { $ne: "DELETE" } };
            var options

            if (req.body.industryId && req.body.adminId) {
              query.$and = [{ _id: req.body.industryId }, { status: { $ne: "DELETE" } }]

            }
            if (req.body.industryType && req.body.adminId) {

              query.$and = [{ industryType: { $regex: "^" + req.body.industryType, $options: 'i' } }, { status: { $ne: "DELETE" } }]
            }


            if (req.body.fromDate && req.body.toDate) {
              query.$and = [{
                createdAt: { $gte: req.body.fromDate }
              },
              {
                createdAt: { $lte: req.body.toDate }
              }]
            }

            if (req.body.fromDate && !req.body.toDate) {
              query.createdAt = { $gte: req.body.fromDate }
            }
            if (!req.body.fromDate && req.body.toDate) {
              query.createdAt = { $lte: req.body.toDate }
            }


            options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 10,
              sort: {
                createdAt: -1
              },

            }

            industryModel.paginate(query, options, (err1, result1) => {
              if (err1) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              } else if (result1.docs.length == 0) {
                return res.send({ responseCode: 404, responseMessage: " Industry not found" })
              } else {
                return res.send({ responseCode: 200, responseMessage: "Industry found successfully", result: result1 })
              }
            })
          }

        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  industryBlockUnblock: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              industryModel.findOneAndUpdate({
                _id: req.body.industryId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Industry not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Industry blocked successfully", result: result1 })
                  }
                })
            } else {
              industryModel.findOneAndUpdate({
                _id: req.body.industryId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Industry not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Industry Activated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  getAllIndustry: (req, res) => {
    try {
      query = { status: "ACTIVE" }
      let options = {
        page: req.body.page || 1,
        limit: req.body.limit || 4
      }
      industryModel.paginate(query, options, (err, result) => {
        if (err) {
          res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (result.docs.length == 0) {
          res.send({ responseCode: 404, responseMessage: "Data not found" })
        }
        else {
          res.send({ responseCode: 200, responseMessage: "Data found successfulluy", result })
        }
      })
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessage: "Something went wrong" })
    }
  },
  searchJobByPostedUser: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    } else {
      jobModel.find({ status: { $ne: "DELETE" } }).populate("userId", "firstName lastName _id").exec((err, result) => {
        if (err) {
          throw err;
        } else if (!result.length) {
          res.send({ responseCode: 404, responseMessage: `Failed to obtain the result...` });
        } else {
          var output = [];
          result.forEach(a =>
            new RegExp("^" + req.body.name, "i").test(
              a.userId.firstName + " " + a.userId.lastName
            )
              ? output.push(a)
              : 0
          );
          var limit = req.body.limit || 5,
            length = output.length,
            page = req.body.page || 1;
          var docs = commonFunction.Paging(output, limit, page);
          length != 0 && page <= Math.ceil(length / limit) ? res.send({
            responseCode: 200,
            responseMessage: "The jobs are...", result: {docs }, page: page, limit: limit, TotalPage: Math.ceil(length / limit)
          })
            : res.send({ responseCode: 404, responseMessage: "No jobs found..." });
        }
      })

    }
  },
  jobManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, docs) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!docs) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.jobStatus == "DELETE") {
              jobModel.findOneAndUpdate({
                _id: req.body.jobId,
                jobStatus: { $ne: "DELETE" }
              },
                {
                  $set: {
                    jobStatus: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Job deleted successfully", docs: result1 })
                  }
                })
            }
            else if (req.body.jobStatus == "ACTIVE") {
              console.log("gfdgsfdhghgfdhfgdh")
              jobModel.findOneAndUpdate({
                _id: req.body.jobId,
                jobStatus: "BLOCK"
              },
                {
                  $set: {
                    jobStatus: "ACTIVE"
                  }
                },
                { new: true },
                (err1, docs) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!docs) {
                    return res.send({ responseCode: 404, responseMessage: "Job not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Job Actived successfully", docs })
                  }
                })
            } else {
              jobModel.findOneAndUpdate({
                _id: req.body.jobId,
                jobStatus: "ACTIVE"
              },
                {
                  $set: {
                    jobStatus: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Job not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Job blocked successfully", docs: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewApplicant: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            jobApplicationModel.findOne({ applicantId: req.body.userId, status: { $ne: "DELETE" } }, (err1, result1) => {
              if (err1) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              } else if (!result1) {
                return res.send({ responseCode: 404, responseMessage: "User not found" })
              } else {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", result: result1 })
              }
            })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewAllApplicant: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            let options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 5,
              sort: {
                createdAt: -1
              }
            }
            jobApplicationModel.paginate({
              appliedJobStatus: "PENDING"
            },
              options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Data found successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  applicantManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.applicantStatus == "INACTIVE") {
              jobApplicationModel.findOneAndUpdate({
                _id: req.body.appliedJobId,
                applicantStatus: "ACTIVE"
              },
                {
                  $set: {
                    applicantStatus: "INACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "User blocked successfully", result: result1 })
                  }
                })
            } else {
              jobApplicationModel.findOneAndUpdate({
                _id: req.body.appliedJobId,
                applicantStatus: "INACTIVE"
              },
                {
                  $set: {
                    applicantStatus: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "User activated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },


  //-----------------------------------------------------------------------NON-PROFIT MANAGEMENT--------------------------------------------------------

  viewNonProfit: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.eventId) {
              eventModel.findOne({
                _id: req.body.eventId,
                eventType: "NONPROFIT",
                status: { $ne: "DELETE" }
              }).populate({ path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }).exec((err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Non profit not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Non profit found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              eventModel.paginate({
                $and: [{ title: { $regex: req.body.search, $options: 'i' } },
                { eventType: "NONPROFIT" }, { status: { $ne: "DELETE" } },
                ]
              }, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Non profit not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Non profit found successfully", result: result1 })
                }
              })
            }
            else {
              let query = {};
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              eventModel.paginate({
                eventType: "NONPROFIT",
                status: { $ne: "DELETE" }
              },
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Non profit not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Non profit found successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  //-------------------------------------------video game section-----------------------------------------------------------

  viewVideo: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.gameId) {

              eventModel.findOne(
                { _id: req.body.gameId, eventType: "GAME", status: { $ne: "DELETE" } }
              ).populate({ path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              ).exec((err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Game not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Game found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              let query = {
                $and: [{ status: { $ne: "DELETE" }, eventType: "GAME" }, {
                  $or: [{ title: { $regex: req.body.search, $options: 'i' } },
                  { userName: { $regex: req.body.search, $options: 'i' } }]
                }]
              }
              eventModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Game not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Game found successfully", result: result1 })
                }
              })
            }
            else {
              let query = {
                $and: [{ status: { $ne: "DELETE" } }, { eventType: "GAME" }]
              };

              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              eventModel.paginate(
                query,
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Game not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Game found successfully", result: result1 })
                  }
                })

            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  videoManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              eventModel.findOneAndUpdate({
                _id: req.body.gameId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Video not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Video blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              eventModel.findOneAndUpdate({
                _id: req.body.gameId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Video not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Video Deleted successfully", result: result1 })
                  }
                })
            }
            else {
              eventModel.findOneAndUpdate({
                _id: req.body.gameId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Video not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Video blocked successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //------------------------------------report management-----------------------------------------------------------

  viewReport: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.reportId) {
              itemReportModel.findOne({
                _id: req.body.reportId,
                status: { $ne: "DELETE" }
              }).populate({ path: 'userId productId', select: 'firstName lastName productName' }).exec((err1, result1) => {
                console.log("kkkkkkkkfdgfdgfdgkkkkk", result1)
                if (err1) {
                  console.log("jhgfuiasdgjktshag0", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Report not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " Report found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId productId', select: 'firstName lastName productName' }
              }
              itemReportModel.paginate(query,
                options, (err1, result1) => {
                  console.log("kkkkkkkkkkkkk", result1)
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Report not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Report found successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  deleteReport: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminResult) => {
        if (adminErr) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        } else {
          itemReportModel.findOneAndDelete({ _id: req.body.itemId, status: "ACTIVE" }, (deleteErr, deleteResult) => {
            if (deleteErr) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Report successfully deleted" })
            }
          })
        }
      })
    }
  },
  viewAllReport: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.reportId) {
              queryModel.findOne({
                _id: req.body.reportId,
                status: "ACTIVE"
              }).populate({ path: 'userId', select: 'firstName lastName' }).exec((err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Report not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Report found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName' }
              }
              queryModel.paginate(query,
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Report not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Report found successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  deleteGeneralReport: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminResult) => {
        if (adminErr) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else {
          queryModel.findOneAndDelete({ _id: req.body.queryId, status: "ACTIVE" }, (deleteErr, deleteResult) => {
            if (deleteErr) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Report successfully deleted" })
            }
          })
        }
      })

    }
  },

  //-------------------------------------------group section-----------------------------------------------------------

  viewGroup: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.groupId) {
              groupModel.findOne({
                _id: req.body.groupId,
                status: { $ne: "DELETE" }
              }).populate({ path: 'members.memberId', select: 'firstName lastName' }).exec(async (err1, result1) => {
                console.log("kkkkkkkkfdgfdgfdgkkkkk", result1)
                if (err1) {
                  console.log("jhgfuiasdgjktshag0", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " Group not found" })
                } else {
                  let allPost = await groupPostModel.find({ groupId: result1._id, postStatus: "ACTIVE" });
                  // result1["allPost"]= allPost;
                  console.log("Here  we   go....", allPost)
                  // result1["allPosts"]= allPost ;
                  return res.send({ responseCode: 200, responseMessage: " Group found successfully", result: result1, allPost: allPost })
                }
              })
            }
            else if (req.body.search) {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'members.memberId', select: 'firstName lastName' }
              }
              var query = {
                $and: [{ status: { $ne: "DELETE" } }, {
                  $or: [{ groupName: { $regex: req.body.search, $options: 'i' } },
                  { userName: { $regex: req.body.search, $options: 'i' } }]
                }]
              }
              groupModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " Group not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Group found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } }
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'members.memberId', select: 'firstName lastName' }
              }
              groupModel.paginate(query,
                options, (err1, result1) => {
                  console.log("kkkkkkkkkkkkk", result1)
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: " Group not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Group found successfully", result: result1 })
                  }
                })

            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  groupManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              groupModel.findOneAndUpdate({
                _id: req.body.groupId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Group not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Group blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              groupModel.findOneAndUpdate({
                _id: req.body.groupId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Group not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Group Deleted successfully", result: result1 })
                  }
                })
            }
            else {
              groupModel.findOneAndUpdate({
                _id: req.body.groupId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Group not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Group Actived successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  //-------------------------------------------class section-----------------------------------------------------------


  viewClass: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.classId) {
              classRoom.findOne({
                _id: req.body.classId,
                status: { $ne: "DELETE" }
              }).populate({ path: 'members.memberId', select: 'firstName lastName' }).exec(async (err1, result1) => {
                if (err1) {

                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Class not found" })
                } else {
                  let allPost = await classRoomPost.find({ classId: result1._id, postStatus: "ACTIVE" });

                  return res.send({ responseCode: 200, responseMessage: "Class found successfully", result: result1, allPost: allPost })
                }
              })
            }
            else {
              var query = { status: { $ne: "DELETE" } }, options;


              if (req.body.search) {

                query = {
                  $and: [{ status: { $ne: "DELETE" } }, {
                    $or: [{ classRoomName: { $regex: req.body.search, $options: 'i' } },
                    { userName: { $regex: req.body.search, $options: 'i' } }]
                  }]
                }
              }
              if (req.body.searchByUserId && req.body.adminId) {

                query.$and = [{ userId: mongoose.Types.ObjectId(req.body.searchByUserId) }, { status: { $ne: "DELETE" } }]
              }


              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },

                populate: { path: 'members.memberId', select: 'firstName lastName' }


              }
              classRoom.paginate(query, options, async (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " class not found" })
                } else {

                  return res.send({ responseCode: 200, responseMessage: "Class found successfully", result: result1 });
                }
              })
            }
          }
        })

      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  classManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              classRoom.findOneAndUpdate({
                _id: req.body.classId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Class not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Class blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              classRoom.findOneAndUpdate({
                _id: req.body.classId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Class not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Class deleted successfully", result: result1 })
                  }
                })
            }

            else {
              classRoom.findOneAndUpdate({
                _id: req.body.classId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Class not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Class actived successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  //-------------------------------------------event section-----------------------------------------------------------
  viewEvent: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.eventId) {
              eventModel.findOne({
                _id: req.body.eventId,
                eventType: "EVENT",
                status: { $ne: "DELETE" }
              }).populate({ path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }).exec((err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Event not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Event found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              eventModel.paginate({
                $and: [{ status: { $ne: "DELETE" } }, { eventType: { $eq: "EVENT" } }, {
                  $or: [{ title: { $regex: req.body.search, $options: 'i' } },
                  { userName: { $regex: req.body.search, $options: 'i' } }]
                }],
              }, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Event not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Event found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              query.eventType = "EVENT"
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              eventModel.paginate(query,
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error2" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Event not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Event found successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  eventManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              eventModel.findOneAndUpdate({
                _id: req.body.eventId,
                status: "ACTIVE",
                eventType: "EVENT"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Event not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Event blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              eventModel.findOneAndUpdate({
                _id: req.body.eventId,
                status: "ACTIVE",
                eventType: "EVENT"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Event not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Event Deleted successfully", result: result1 })
                  }
                })
            }
            else {
              eventModel.findOneAndUpdate({
                _id: req.body.eventId,
                status: "BLOCK",
                eventType: "EVENT"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Event not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Event activated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //-----------------------------------------------discusionFormManagement-----------------------------------------------------
  viewDiscussionForm: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.discussionId) {
              discussionFormModel.findOne({
                _id: req.body.discussionId,
                status: { $ne: "DELETE" }
              }).populate({ path: 'userId', select: 'firstName', match: { status: "ACTIVE" } }).exec((err1, result1) => {

                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " Discussion not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " Discussion found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 5,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              discussionFormModel.paginate({
                $and: [{ status: { $ne: "DELETE" } }, {
                  $or: [{ title: { $regex: req.body.search, $options: 'i' } },
                  { userName: { $regex: req.body.search, $options: 'i' } }]
                }]
              }, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " Discussion not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Discussion found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              discussionFormModel.paginate(query,
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: " Discussion not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Discussion found successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  searchDiscussionByCreatar: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        discussionFormModel.find({ status: { $ne: "DELETE" } }).populate("userId", "firstName lastName _id").exec((err, result) => {
          if (err) {
            throw err;
          } else if (!result.length) {
            res.send({
              responseCode: 404,
              responseMessage: `Failed to obtain the result...`
            });
          } else {
            var output = [];
            result.forEach(a =>
              new RegExp("^" + req.body.name, "i").test(
                a.userId.firstName + " " + a.userId.lastName
              )
                ? output.push(a)
                : 0
            );
            var limit = req.body.limit || 5,
              length = output.length,
              page = req.body.page || 1;
            var docs = commonFunction.Paging(output, limit, page);
            length != 0 && page <= Math.ceil(length / limit) ? res.send({
              responseCode: 200,
              responseMessage: "The Classs are...", result: { docs }, page: page, limit: limit, TotalPage: Math.ceil(length / limit)
            })
              : res.send({ responseCode: 404, responseMessage: "No class found..." });
          }
        });
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },


  discussionFormManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              discussionFormModel.findOneAndUpdate({
                _id: req.body.disscussionId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Discussion not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Discussion blocked successfully", result: result1 })
                  }
                })
            }

            else if (req.body.status == "DELETE") {
              discussionFormModel.findOneAndUpdate({
                _id: req.body.disscussionId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Discussion not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Discussion Deleted successfully", result: result1 })
                  }
                })
            }

            else {
              discussionFormModel.findOneAndUpdate({
                _id: req.body.disscussionId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " User Activated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //-------------------------------------------static content section-----------------------------------------------------------
  viewStaticContent: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            let options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 5,
              sort: {
                createdAt: -1
              }
            }
            staticModel.paginate({
              status: { $ne: "DELETE" }
            },
              options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Static content not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " static content found successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  editStaticContent: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Unable to post!" })
          } else {
            let obj = {};
            obj.$and = []
            if (req.body.description) {
              obj.$and.push({
                description: req.body.description
              })
            }
            if (req.body.title) {
              obj.$and.push({
                title: req.body.title
              })
            }
            if (req.body.status == "DELETE") {
              staticModel.findOneAndUpdate({ _id: req.body.staticId, addedBy: "ADMIN", status: "ACTIVE" },
                { $set: { status: "DELETE" } },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Static content not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Static content found successfully", result: result1 })
                  }
                })
            }
            staticModel.findOneAndUpdate({ _id: req.body.staticId, addedBy: "ADMIN" },
              { $set: obj },
              (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " User not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " User deleted successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  //------------------------------------------------------------------gif and -----------------------------------------------------
  addGif: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          }
          else {
            commonFunction.uploadImg(req.body.gif, (error, imageData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                let obj = new gifModel({
                  "gif": imageData
                })
                obj.save((error, gifData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Gif added successfully", gifData })
                  }
                })
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  viewGif: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.gifId) {
              gifModel.findOne({ _id: req.body.gifId, status: "ACTIVE" }, (error, gifData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!gifData) {
                  return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Gif file found!", gifData })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              gifModel.paginate(
                query,
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: " Gif not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Gif successfully", result: result1 })
                  }
                })

            }
          }
        })

      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  deleteGif: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.status == "DELETE") {
              gifModel.findOne({ _id: req.body.gifId, status: "ACTIVE" }, (error, gifData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!gifData) {
                  return res.send({ responseCode: 404, responseMessage: "Gif not found" })
                }
                else {
                  gifModel.findOneAndUpdate({ _id: req.body.gifId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, gifData) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!gifData) {
                      return res.send({ responseCode: 404, responseMessage: "Gif not found" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Deleted successfully", gifData })

                    }
                  })
                }
              })
            }
            else if (req.body.status == "BLOCK") {
              gifModel.findOne({ _id: req.body.gifId, status: "ACTIVE" }, (error, gifData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!gifData) {
                  return res.send({ responseCode: 404, responseMessage: "Gif not found" })
                }
                else {
                  gifModel.findOneAndUpdate({ _id: req.body.gifId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (error, gifData) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!gifData) {
                      return res.send({ responseCode: 404, responseMessage: "Gif not found" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Blocked successfully", gifData })

                    }
                  })
                }
              })
            }
            else {
              gifModel.findOne({ _id: req.body.gifId, status: "BLOCK" }, (error, gifData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!gifData) {
                  return res.send({ responseCode: 404, responseMessage: "Gif not found" })
                }
                else {
                  gifModel.findOneAndUpdate({ _id: req.body.gifId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, gifData) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!gifData) {
                      return res.send({ responseCode: 404, responseMessage: "Gif not found" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Actived successfully", gifData })
                    }
                  })
                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //---------------------------------------------nonProfit management-----------------------------

  viewNonProfit: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: { $ne: "DELETE" } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.nonProfitId) {

              userModel.findOne({ _id: req.body.newsId, addedBy: "ADMIN", status: { $ne: "DELETE" } }, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "NonProfit not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "NonProfit found successfully", result: result1 })
                }
              })
            }

            else if (req.body.search) {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 5,
                // select: "title description picVideo likes comments",
                sort: {
                  createdAt: -1
                }
              }
              newsModel.paginate({ $and: [{ addedBy: "ADMIN" }, { status: { $ne: "DELETE" } }, { createdAt: { $regex: req.body.search } }] }, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " News not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "News found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { $and: [{ status: { $ne: "DELETE" } }, { addedBy: "ADMIN" }] }
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }
              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 5,
                sort: {
                  createdAt: -1
                }
              }
              newsModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " News not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "News found successfully", result: result1 })
                }
              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  //-----------------------------------------------stickerManagment-----------------------------

  addSticker: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          }
          else {
            commonFunction.uploadImg(req.body.image, (error, imageData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                let obj = new stickerModel({
                  "stickerName": req.body.stickerName,
                  "image": imageData
                })
                obj.save((error, stickerData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Sticker added successfully", stickerData })
                  }
                })
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  viewSticker: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.stickerId) {
              stickerModel.findOne({ _id: req.body.stickerId, status: "ACTIVE" }, (error, stickerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!stickerData) {
                  return res.send({ responseCode: 404, responseMessage: "Sticker not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Sticker data found!", stickerData })
                }
              })
            }
            else {
              let query = {
                status: { $ne: "DELETE" }
              };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              stickerModel.paginate(query,
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: " Sticker not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Sticker found successfully", result: result1 })
                  }
                })

            }
          }
        })

      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  stickerManagment: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.status == "DELETE") {
              stickerModel.findOneAndUpdate({ _id: req.body.stickerId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, stickerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!stickerData) {
                  return res.send({ responseCode: 404, responseMessage: "Sticker not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Deleted successfully", stickerData })

                }
              })
            }
            else if (req.body.status == "BLOCK") {
              stickerModel.findOneAndUpdate({ _id: req.body.stickerId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (error, stickerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!stickerData) {
                  return res.send({ responseCode: 404, responseMessage: "Sticker not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Blocked successfully", stickerData })

                }
              })
            }
            else {
              stickerModel.findOneAndUpdate({ _id: req.body.stickerId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, stickerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!stickerData) {
                  return res.send({ responseCode: 404, responseMessage: "Sticker not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Activated successfully", stickerData })
                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //--------------------------------------nonProfit management-------------------------

  nonProfitManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, result) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              eventModel.findOneAndUpdate({
                _id: req.body.eventId,
                status: "ACTIVE",
                eventType: "NONPROFIT"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (error, update_result) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!update_result) {
                    return res.send({ responseCode: 404, responseMessage: "Non profit not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Non profit blocked successfully" })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              eventModel.findOneAndUpdate({
                _id: req.body.eventId,
                status: "ACTIVE",
                eventType: "NONPROFIT"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (error, update_result) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!update_result) {
                    return res.send({ responseCode: 404, responseMessage: " Event not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Event deleted successfully" })
                  }
                })
            }
            else {
              eventModel.findOneAndUpdate({
                _id: req.body.eventId,
                status: "BLOCK",
                eventType: "NONPROFIT"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (error, update_result) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!update_result) {
                    return res.send({ responseCode: 404, responseMessage: " User not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Event Actived successfully" })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewNonProfitEvent: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.eventId) {
              eventModel.findOne({
                _id: req.body.eventId,
                eventType: "NONPROFIT",
                status: { $ne: "DELETE" }
              }).populate({ path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }).exec((err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " Data not found" })
                } else {
                  var result = {
                    likes: result1.likes.length,
                    comments: result1.comments.length,
                    uploadDate: result1.createdAt,
                    description: result1.description,
                    title: result1.title,
                    image: result1.image
                  }
                  return res.send({ responseCode: 200, responseMessage: " Data found successfully", result })
                }
              })
            }
            else if (req.body.search) {

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              eventModel.paginate({
                $and: [{ status: { $ne: "DELETE" }, eventType: "NONPROFIT" }, {
                  $or: [{ userName: { $regex: req.body.search, $options: 'i' } },
                  { title: { $regex: req.body.search, $options: 'i' } }]
                }]
              }, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Data not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Data found successfully", result: result1 })
                }
              })
            }
            else {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
              }
              eventModel.paginate({
                eventType: "NONPROFIT",
                status: { $ne: "DELETE" }
              },
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Data found successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },


  //-------------------------------------bannerManagment-------------------------------

  addBanner: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            commonFunction.uploadImg(req.body.image, (error, imageData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
              }
              else {
                let obj = new bannerModel({
                  "bannerName": req.body.bannerName,
                  "image": imageData
                })
                obj.save((error, bannerData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Banner added successfully", bannerData })
                  }
                })
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  editBanner: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.image) {
              commonFunction.uploadImg(req.body.image, (error, imageData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else {
                  req.body.image = imageData
                  bannerModel.findOneAndUpdate({ _id: req.body.bannerId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (error, bannerData) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!bannerData) {
                      return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Updated successfully", bannerData })

                    }
                  })
                }
              })
            }
            else {
              bannerModel.findOneAndUpdate({ _id: req.body.bannerId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (error, bannerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!bannerData) {
                  return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Updated successfully", bannerData })

                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  viewBanner: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: { $ne: "DELETE" } }, async (err, result) => {
          if (err) {
            console.log("yeturifjkgsjf", err)
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.bannerId) {

              bannerModel.findOne({ _id: req.body.bannerId, status: { $ne: "DELETE" } }, (err1, result1) => {
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Banner found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let query = {
                $and: [{ status: { $ne: "DELETE" } }, { bannerName: { $regex: req.body.search, $options: 'i' } }]
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              bannerModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " Banner not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Banner found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              bannerModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " Banner not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Banner found successfully", result: result1 })
                }
              })

            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  deleteBanner: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.status == "DELETE") {
              bannerModel.findOneAndUpdate({ _id: req.body.bannerId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, bannerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!bannerData) {
                  return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Deleted successfully", bannerData })

                }
              })
            }
            else if (req.body.status == "BLOCK") {
              bannerModel.findOneAndUpdate({ _id: req.body.bannerId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (error, bannerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!bannerData) {
                  return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Blocked successfully", bannerData })

                }
              })
            }
            else {
              bannerModel.findOneAndUpdate({ _id: req.body.bannerId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, bannerData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!bannerData) {
                  return res.send({ responseCode: 404, responseMessage: "Banner not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Activatd successfully", bannerData })

                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  // ---------------------------------------CategoryManagment---------------------------
  addCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        var query = {
          $and: [
            {
              categoryName: req.body.categoryName
            },
            { status: { $in: ["ACTIVE", "BLOCK"] } }
          ]
        };
        categoryModel.findOne(query, { status: "ACTIVE", categoryType: "CATEGORY" }, (categoryError, categoryData) => {
          if (categoryError) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (categoryData) {
            return res.send({ responseCode: 404, responseMessage: "Category name already exist" })
          }
          else {
            userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!adminData) {
                return res.send({ responseCode: 404, responseMessage: " Admin not found" })
              }
              else {
                commonFunction.uploadImg(req.body.image, (error, imageData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                  }
                  else {
                    let obj = new categoryModel({
                      "categoryName": req.body.categoryName,
                      "image": imageData
                    })
                    obj.save((error, categoryData) => {
                      if (error) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                      }
                      else {
                        return res.send({ responseCode: 200, responseMessage: "Category added successfully", categoryData })
                      }
                    })
                  }
                })
              }
            })
          }

        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  editCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.image) {
              commonFunction.uploadImg(req.body.image, (error, imageData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else {
                  req.body.image = imageData;
                  categoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (error, categoryData) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!categoryData) {
                      return res.send({ responseCode: 404, responseMessage: "Category not found" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Updated successfully", categoryData })

                    }
                  })
                }
              })
            }
            else {
              categoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (error, categoryData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!categoryData) {
                  return res.send({ responseCode: 404, responseMessage: "Category not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Updated successfully", categoryData })

                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  viewCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: "ACTIVE" }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.categoryId) {

              categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE", categoryType: "CATEGORY" }, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let query = {
                $and: [{ status: { $ne: "DELETE" } }, { categoryType: "CATEGORY" }, { categoryName: { $regex: req.body.search, $options: 'i' } }]
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 5,
                sort: {
                  createdAt: -1
                }
              }
              categoryModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: result1 })
                }
              })
            }
            else {
              let query = {

                status: { $ne: "DELETE" }, categoryType: { $eq: "CATEGORY" }
              };
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              categoryModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: result1 })
                }
              })

            }//
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewAllSubCategory: (req, res) => {
    categoryModel.find({ categoryId: req.body.categoryId, categoryType: "SUBCATEGORY" }).populate("categoryId").exec((error, result) => {
      if (error) {
        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
      }
      else if (!result.length) {
        return res.send({ responseCode: 404, responseMessage: " Admin not found" })
      }
      else {
        return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result })

      }
    })
  },

  categoryManagment: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    } else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        } else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: " Admin not found" })
        } else {
          if (req.body.status == "BLOCK") {
            categoryModel.findOneAndUpdate({
              _id: req.body.categoryId,
              status: "ACTIVE", categoryType: "CATEGORY"
            },
              {
                $set: {
                  status: "BLOCK"
                }
              },
              { new: true },
              (error, categoryData1) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!categoryData1) {
                  return res.send({ responseCode: 404, responseMessage: "Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category blocked successfully", result: categoryData1 })
                }
              })
          } else if (req.body.status == "ACTIVE") {
            categoryModel.findOneAndUpdate({
              _id: req.body.categoryId,
              status: "BLOCK"
            },
              {
                $set: {
                  status: "ACTIVE"
                }
              },
              { new: true },
              (error, categoryData2) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!categoryData2) {
                  return res.send({ responseCode: 404, responseMessage: " Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: " Category activated successfully", result: categoryData2 })
                }
              })
          }
          else {
            categoryModel.findOneAndUpdate({
              _id: req.body.categoryId,
              status: "ACTIVE"
            },
              {
                $set: {
                  status: "DELETE"
                }
              },
              { new: true },
              (error, categoryData2) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!categoryData2) {
                  return res.send({ responseCode: 404, responseMessage: " Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "category  deleted successfully", result: categoryData2 })
                }
              })
          }
        }
      })
    }
  },

  //------------------------------------------subCategoryManagment-------------------------

  addSubCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        var query = {
          $and: [
            {
              subCategoryName: req.body.subCategoryName
            },
            { status: { $in: ["ACTIVE", "BLOCK"] } }
          ]
        };
        categoryModel.findOne(query, { status: "ACTIVE", categoryType: "SUBCATEGORY" }, (subCategoryError, subCategoryData) => {
          if (subCategoryError) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }

          else if (subCategoryData) {
            return res.send({ responseCode: 404, responseMessage: "SubCategory name already exist" })

          }
          else {
            userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!adminData) {
                return res.send({ responseCode: 404, responseMessage: " Admin not found" })
              }
              else {
                categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE", categoryType: "CATEGORY" }, (error, categoryData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else if (!categoryData) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
                  }
                  else {
                    commonFunction.uploadImg(req.body.image, (error, imageData) => {
                      if (error) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                      }
                      else {
                        let obj = new categoryModel({
                          "subCategoryName": req.body.subCategoryName,
                          "image": imageData,
                          "categoryId": categoryData._id,
                          "categoryType": req.body.categoryType,
                          "categoryName": categoryData.categoryName
                        })
                        obj.save((error, categoryData) => {

                          if (error) {
                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                          }
                          else {
                            return res.send({ responseCode: 200, responseMessage: "Subcategory added successfully", categoryData })
                          }
                        })
                      }
                    })
                  }
                })

              }
            })
          }
        })
      }

    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  editSubCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            categoryModel.findOne({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, (err, result) => {
              if (err) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!result) {
                return res.send({ responseCode: 404, responseMessage: "Subcategory not found" })
              }
              else {
                if (req.body.image && !req.body.categoryId) {
                  commonFunction.uploadImg(req.body.image, (imageErr, imageResult) => {
                    if (imageErr) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else {
                      req.body.image = imageResult;
                      categoryModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                        }
                      })
                    }
                  })
                }
                else if (!req.body.image && req.body.categoryId) {
                  categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE", categoryType: "CATEGORY" }, (error, categoryResult) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!categoryResult) {
                      return res.send({ responseCode: 404, responseMessage: "Category not found" })
                    }
                    else {
                      req.body.categoryName = categoryResult.categoryName;
                      categoryModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                        }
                      })
                    }
                  })
                }
                else if (req.body.image && req.body.categoryId) {
                  categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE", categoryType: "CATEGORY" }, (err2, categoryData) => {
                    if (err2) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!categoryData) {
                      return res.send({ responseCode: 404, responseMessage: "Category not found" })
                    }
                    else {
                      commonFunction.uploadImg(req.body.image, (error, imageData) => {
                        if (error) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          req.body.categoryName = categoryData.categoryName;
                          req.body.image = imageData;
                          categoryModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else {
                              return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                            }
                          })
                        }
                      })
                    }
                  })
                }
                else {
                  categoryModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                    if (updateErr) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                    }
                  })
                }

              }
            })
          }
        })
      }//
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewSubCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: { $ne: "DELETE" } }, async (err, result) => {
          if (err) {
            console.log("yeturifjkgsjf", err)
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.subCategoryId) {

              categoryModel.findOne({ _id: req.body.subCategoryId, status: { $ne: "DELETE" }, categoryType: "SUBCATEGORY" }, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let query = {
                $and: [{ status: { $ne: "DELETE" }, categoryType: "SUBCATEGORY" }, {
                  $or: [{ categoryName: { $regex: req.body.search, $options: 'i' } },
                  { subCategoryName: { $regex: req.body.search, $options: 'i' } }]
                }]
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              categoryModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " SubCategory not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result: result1 })
                }
              })
            }
            else {
              let query = {
                status: { $ne: "DELETE" }, categoryType: { $eq: "SUBCATEGORY" }
              }

              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
              }
              categoryModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " SubCategory not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result: result1 })
                }
              })

            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  subCategoryManagment: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              categoryModel.findOneAndUpdate({
                _id: req.body.subCategoryId,
                status: "ACTIVE",
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "SubCategory blocked successfully", result: categoryData1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              categoryModel.findOneAndUpdate({
                _id: req.body.subCategoryId,
                status: "ACTIVE", categoryType: "SUBCATEGORY"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "SubCategory delete successfully", result: categoryData1 })
                  }
                })
            } else {
              categoryModel.findOneAndUpdate({
                _id: req.body.subCategoryId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (error, categoryData2) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData2) {
                    return res.send({ responseCode: 404, responseMessage: " Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "SubCategory activated successfully", result: categoryData2 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  // ----------------------------------------------------------------------
  //---------------------------------productManagment-----------------------------------------

  viewProduct: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.productId) {
              query._id = req.body.productId
            }
            if (req.body.search) {

              query.$and = [
                {
                  $or: [
                    { productName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    { sellerName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    { categoryName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    { subCategoryName: { $regex: `^${req.body.search}`, $options: 'im' } }]
                },
                { status: { $ne: "DELETE" } },
              ]
            }
            if (req.body.status) {
              query.sellStatus = req.body.status
            }
            if (req.body.fromDate && req.body.toDate) {
              query.$and = [{
                createdAt: { $gte: req.body.fromDate }
              },
              {
                createdAt: { $lte: req.body.toDate }
              }]
            }
            if (req.body.fromDate && !req.body.toDate) {
              query.createdAt = { $gte: req.body.fromDate }
            }
            if (!req.body.fromDate && req.body.toDate) {
              query.createdAt = { $lte: req.body.toDate }

            }
            let options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 10,
              sort: {
                createdAt: -1
              }
            }
            productModel.paginate(query,
              options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Product not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Product found successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  editProduct: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    } else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        } else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: "Admin not found" })
        }
        else {
          productModel.findOneAndUpdate({ _id: req.body.productId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (productError, productData) => {
            if (productError) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            } else if (!productData) {
              return res.send({ responseCode: 404, responseMessage: "Product not found" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Product updated successfully", productData })
            }
          })
        }
      })
    }
  },

  productManagment: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              productModel.findOneAndUpdate({
                _id: req.body.productId,
                status: "ACTIVE",
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (error, productData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!productData) {
                    return res.send({ responseCode: 404, responseMessage: "Product not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Product blocked successfully", result: productData })
                  }
                })
            } else if (req.body.status == "DELETE") {
              productModel.findOneAndUpdate({
                _id: req.body.productId,
                status: "ACTIVE",
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: "Product not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Product deleted successfully", result: categoryData1 })
                  }
                })
            }

            else {
              productModel.findOneAndUpdate({
                _id: req.body.productId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (error, productData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!productData) {
                    return res.send({ responseCode: 404, responseMessage: " Product not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Product activated successfully", result: productData })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //-----------------------------------------auction----------------------------------------------------------------------
  addAuctionCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        var query = {
          $and: [
            {
              auctionCategoryName: req.body.auctionCategoryName
            },
            { status: { $in: ["ACTIVE", "BLOCK"] } }
          ]
        };
        auctionModel.findOne(query, { status: "ACTIVE", categoryType: "CATEGORY" }, (subCategoryError, subCategoryData) => {
          if (subCategoryError) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (subCategoryData) {
            return res.send({ responseCode: 404, responseMessage: "SubCategory name already exist" })
          }
          else {
            userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error1" })
              }
              else if (!adminData) {
                return res.send({ responseCode: 404, responseMessage: " Admin not found" })
              }
              else {
                commonFunction.uploadImg(req.body.image, (error, imageData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error2" })
                  }
                  else {
                    let obj = new auctionModel({
                      "auctionCategoryName": req.body.auctionCategoryName,
                      "categoryType": req.body.categoryType,
                      "image": imageData
                    })
                    obj.save((error, categoryData) => {
                      if (error) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server error3" })
                      }
                      else {
                        return res.send({ responseCode: 200, responseMessage: "Category added successfully", categoryData })
                      }
                    })
                  }
                })
              }
            })
          }
        }
        )

      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  editAuctionCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.image) {
              commonFunction.uploadImg(req.body.image, (error, imageData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else {
                  req.body.image = imageData
                  auctionModel.findOneAndUpdate({ _id: req.body.auctionCategoryId, categoryType: "CATEGORY" },
                    { $set: req.body }, { new: true },
                    (err1, result1) => {
                      if (err1) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                      } else if (!result1) {
                        return res.send({ responseCode: 404, responseMessage: " Category not found" })
                      } else {
                        return res.send({ responseCode: 200, responseMessage: " Category updated successfully", result: result1 })
                      }
                    })
                }
              })
            }
            else {
              auctionModel.findOneAndUpdate({ _id: req.body.auctionCategoryId, categoryType: "CATEGORY" },
                { $set: req.body }, { new: true },
                (err1, result1) => {
                  console.log(">>>>>>>>>>>>>>>>>>>>>>.267", err1, result1)
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: " Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: " Category updated successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewAuctionCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: { $ne: "DELETE" } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.auctionCategoryId) {

              auctionModel.findOne({ _id: req.body.auctionCategoryId, status: { $ne: "DELETE" } }, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: result1 })
                }
              })
            }
            else if (req.body.search) {
              let query = {
                $and: [{ status: { $ne: "DELETE" } }, { categoryType: "CATEGORY" }, { auctionCategoryName: { $regex: req.body.search, $options: 'i' } }]
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 5,
                sort: {
                  createdAt: -1
                }
              }
              auctionModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Category not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: result1 })
                }
              })
            }
            else {
              let query = {
                status: { $ne: "DELETE" }, categoryType: { $eq: "CATEGORY" }
              }
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                // populate: { path: 'categoryId subCategoryId', select: 'categoryName subCategoryName', match: { status: "ACTIVE" } }

              }
              auctionModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: " SubCategory not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: result1 })
                }
              })

            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  auctionCategoryManagment: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              auctionModel.findOneAndUpdate({
                _id: req.body.auctionCategoryId,
                status: "ACTIVE",
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (error, categoryData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Category blocked successfully", result: categoryData })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              auctionModel.findOneAndUpdate({
                _id: req.body.auctionCategoryId,
                status: "ACTIVE", categoryType: "CATEGORY"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Category deleted successfully", result: categoryData1 })
                  }
                })
            }

            else {
              auctionModel.findOneAndUpdate({
                _id: req.body.auctionCategoryId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: " Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Category activated successfully", result: categoryData1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },


  addSubAuctionCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        var query = {
          $and: [
            {
              auctionSubCategoryName: req.body.auctionSubCategoryName
            },
            { status: { $in: ["ACTIVE", "BLOCK"] } }
          ]
        };
        auctionModel.findOne(query, { status: "ACTIVE", categoryType: "SUBCATEGORY" }, (subCategoryError, subCategoryData) => {
          if (subCategoryError) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (subCategoryData) {
            return res.send({ responseCode: 404, responseMessage: "SubCategory name already exist" })

          }
          else {
            userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!adminData) {
                return res.send({ responseCode: 404, responseMessage: " Admin not found" })
              }
              else {
                auctionModel.findOne({ _id: req.body.auctionCategoryId, status: "ACTIVE" }, (error, auctionCatData) => {
                  if (error) {
                    return res.send({ responseCode: "500", responseMessage: "Internal server error" })
                  }
                  else if (!auctionCatData) {
                    return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                  }
                  else {
                    commonFunction.uploadImg(req.body.image, (error, imageData) => {
                      if (error) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                      }
                      else {
                        let obj = new auctionModel({
                          "auctionSubCategoryName": req.body.auctionSubCategoryName,
                          "categoryId": auctionCatData._id,
                          "categoryType": req.body.categoryType,
                          "image": imageData,
                          "auctionCategoryName": auctionCatData.auctionCategoryName

                        })
                        obj.save((error, subCategoryData) => {
                          if (error) {
                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                          }
                          else {
                            return res.send({ responseCode: 200, responseMessage: "SubCategory added successfully", subCategoryData })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        }
        )
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  editAuctionSubCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            auctionModel.findOne({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, (err, result) => {
              if (err) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!result) {
                return res.send({ responseCode: 404, responseMessage: "Subcategory not found" })
              }
              else {
                if (req.body.image && !req.body.categoryId) {
                  commonFunction.uploadImg(req.body.image, (imageErr, imageResult) => {
                    if (imageErr) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else {
                      req.body.image = imageResult;
                      auctionModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                        }
                      })
                    }
                  })
                }
                else if (!req.body.image && req.body.categoryId) {
                  auctionModel.findOne({ _id: req.body.categoryId, status: "ACTIVE", categoryType: "CATEGORY" }, (error, categoryResult) => {
                    if (error) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!categoryResult) {
                      return res.send({ responseCode: 404, responseMessage: "Category not found" })
                    }
                    else {
                      req.body.auctionCategoryName = categoryResult.auctionCategoryName;
                      auctionModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                        }
                      })
                    }
                  })
                }
                else if (req.body.image && req.body.categoryId) {
                  auctionModel.findOne({ _id: req.body.categoryId, status: "ACTIVE", categoryType: "CATEGORY" }, (err2, categoryData) => {
                    if (err2) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!categoryData) {
                      return res.send({ responseCode: 404, responseMessage: "Category not found" })
                    }
                    else {
                      commonFunction.uploadImg(req.body.image, (error, imageData) => {
                        if (error) {
                          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else {
                          req.body.auctionCategoryName = categoryData.auctionCategoryName;
                          req.body.image = imageData;
                          auctionModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                            }
                            else {
                              return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                            }
                          })
                        }
                      })
                    }
                  })
                }
                else {
                  auctionModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE", categoryType: "SUBCATEGORY" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                    if (updateErr) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else {
                      return res.send({ responseCode: 200, responseMessage: "Updated successfully", updateResult })
                    }
                  })
                }
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewAuctionSubCategory: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] }, status: { $ne: "DELETE" } }, async (err, result) => {
          if (err) {
            console.log("yeturifjkgsjf", err)
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.subCategoryAuctionId) {

              auctionModel.findOne({ _id: req.body.subCategoryAuctionId, status: { $ne: "DELETE" }, categoryType: "SUBCATEGORY" }, (err1, result1) => {
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result: result1 })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" }, categoryType: { $eq: "SUBCATEGORY" } }


              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }


              if (req.body.search) {

                query.$and = [
                  {
                    $or: [
                      { auctionCategoryName: { $regex: `^${req.body.search}`, $options: 'im' } },
                      { sellerName: { $regex: `^${req.body.search}`, $options: 'im' } },
                      { auctionSubCategoryName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    ]
                  },
                  { status: { $ne: "DELETE" } }, { categoryType: "SUBCATEGORY" }
                ]
              }

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'categoryId', select: 'auctionCategoryName' }

              }
              auctionModel.paginate(query, options, (err1, result1) => {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>..584", err1, result1)
                if (err1) {
                  console.log("yeturifjkgsjf", err1)
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result: result1 })
                }
              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  auctionSubCategoryManagment: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              auctionModel.findOneAndUpdate({
                _id: req.body.auctionSubCategoryId,
                status: "ACTIVE",
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (error, categoryData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData) {
                    return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "SubCategory blocked successfully", result: categoryData })
                  }
                })
            }

            else if (req.body.status == "DELETE") {
              auctionModel.findOneAndUpdate({
                _id: req.body.auctionSubCategoryId,
                status: "ACTIVE", categoryType: "SUBCATEGORY"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "SubCategory deleted successfully", result: categoryData1 })
                  }
                })
            }

            else {
              auctionModel.findOneAndUpdate({
                _id: req.body.auctionSubCategoryId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (error, categoryData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!categoryData1) {
                    return res.send({ responseCode: 404, responseMessage: " SubCategory not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "SubCategory activated successfully", result: categoryData1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //----------------------------------------auctionProductManagement-------------------------------------------------------


  viewAuctionProduct: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            var query = {};
            if (req.body.productId) {
              query._id = req.body.productId
            }
            if (req.body.search) {

              query.$and = [
                {
                  $or: [
                    { auctionProductName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    { sellerName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    { auctionCategoryName: { $regex: `^${req.body.search}`, $options: 'im' } },
                    { auctionSubCategoryName: { $regex: `^${req.body.search}`, $options: 'im' } }]
                },
                { docStatus: { $ne: "DELETE" } },
              ]
            }
            if (req.body.status) {
              query.status = req.body.status
            }
            if (req.body.fromDate && req.body.toDate) {
              query.$and = [{
                createdAt: { $gte: req.body.fromDate }
              },
              {
                createdAt: { $lte: req.body.toDate }
              }]
            }
            if (req.body.fromDate && !req.body.toDate) {
              query.createdAt = { $gte: req.body.fromDate }
            }
            if (!req.body.fromDate && req.body.toDate) {
              query.createdAt = { $lte: req.body.toDate }

            }
            let options = {
              page: req.body.pageNumber || 1,
              limit: req.body.limit || 10,
              sort: {
                createdAt: -1
              }
            }
            sellOnAuctionModel.paginate(query,
              options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Product not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Product found successfully", result: result1 })
                }
              })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  auctionProductOrderDetailsByStatus: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {

      var query = { docStatus: { $ne: "DELETE" } };
      if (req.body.status == "Pending") {
        query.status = req.body.status
      }
      if (req.body.status == "Cancel") {
        query.status = req.body.status
      }
      if (req.body.status == "Completed") {

        query.status = req.body.status
      }

      let options = {
        page: req.body.pageNumber || 1,
        limit: req.body.limit || 5,
        sort: {
          createdAt: -1
        }
      }
      sellOnAuctionModel.paginate(query, options, (productError, productResult) => {
        console.log("5678=========>", productError, productResult)
        if (productError) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (productResult.docs.length == 0) {
          return res.send({ responseCode: 404, responseMessage: "Product not found" })
        }
        else {
          return res.send({ responseCode: 200, responseMessage: "Product found successfully", productResult })
        }
      })
    }
  },
  auctionProductManagment: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          } else {
            if (req.body.docStatus == "BLOCK") {
              sellOnAuctionModel.findOneAndUpdate({
                _id: req.body.productId,
                docStatus: "ACTIVE",
              },
                {
                  $set: {
                    docStatus: "BLOCK"
                  }
                },
                { new: true },
                (error, productData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!productData) {
                    return res.send({ responseCode: 404, responseMessage: "Product not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Product blocked successfully", result: productData })
                  }
                })
            }
            else if (req.body.docStatus == "DELETE") {
              sellOnAuctionModel.findOneAndUpdate({
                _id: req.body.productId,
                docStatus: "ACTIVE",
              },
                {
                  $set: {
                    docStatus: "DELETE"
                  }
                },
                { new: true },
                (error, productData) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!productData) {
                    return res.send({ responseCode: 404, responseMessage: "Product not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Product deleted successfully", result: productData })
                  }
                })
            }
            else {
              sellOnAuctionModel.findOneAndUpdate({
                _id: req.body.productId,
                docStatus: "BLOCK"
              },
                {
                  $set: {
                    docStatus: "ACTIVE"
                  }
                },
                { new: true },
                (error, productData1) => {
                  if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!productData1) {
                    return res.send({ responseCode: 404, responseMessage: " Product not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Product activated successfully", result: productData1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  totalParticipant: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      bidding.find({ auctionId: req.body.auctionId }, (error, biddingResult) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        } else if (!biddingResult) {
          return res.send({ responseCode: 404, responseMessage: "Admin not found" })
        }
        else {
          return res.send({ responseCode: 200, responseMessage: "Participant detail found successfully", biddingResult })

        }
      })
    }
  },
  editAuctionProduct: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    } else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        } else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: "Admin not found" })
        }
        else {
          sellOnAuctionModel.findOneAndUpdate({ _id: req.body.productId, docStatus: "ACTIVE" }, { $set: req.body }, { new: true }, (productError, productData) => {
            if (productError) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            } else if (!productData) {
              return res.send({ responseCode: 404, responseMessage: "Product not found" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Product updated successfully", productData })
            }
          })
        }
      })
    }
  },

  //----------------------------order management---------------------------------
  orderManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }).then((admin, err) => {
          if (admin) {
            if (req.body.orderId) {


              productPayment.findOne({ _id: req.body.orderId, status: { $ne: "DELETE" } }).populate("productDescription.productId userId").exec(async (orderErr, orderResult) => {
                if (orderErr) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!orderResult) {
                  return res.send({ responseCode: 404, responseMessage: "Order not found" })
                }
                else {
                  let allPost = await productFeedback.findOne({ orderId: req.body.orderId });

                  return res.send({ responseCode: 200, responseMessage: "Order found successfully", result: orderResult, allPost })

                }
              })
            }
            else {
              var query = { status: { $ne: "DELETE" } };
              if (req.body.orderStatus) {
                query.orderStatus = new RegExp('^' + req.body.orderStatus, "i") || "";
              }

              if (req.body.search) {
                query.$or = [{ "productDescription.productName": new RegExp('^' + req.body.search, "i") },
                { userName: new RegExp('^' + req.body.search, "i") }]
              }
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'productDescription.productId userId' }
              }

              productPayment.paginate(query, options, async (err, results) => {
                if (err) {
                  res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
                }
                else {
                  res.send({ responseCode: 200, responseMessage: "The Order Details are...", results })
                }
              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  orderDetailsByStatus: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      var query = {};
      if (req.body.orderStatus == "Pending") {
        query.orderStatus = req.body.orderStatus
      }
      if (req.body.orderStatus == "Cancel") {
        query.orderStatus = req.body.orderStatus
      }
      if (req.body.orderStatus == "Delivered") {

        query.orderStatus = req.body.orderStatus
      }
      if (req.body.orderStatus == "Return") {

        query.orderStatus = req.body.orderStatus
      }

      let options = {
        page: req.body.pageNumber || 1,
        limit: req.body.limit || 1,
        sort: {
          createdAt: -1
        }
      }
      productPayment.paginate(query, options, (productError, productResult) => {
        if (productError) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (productResult.docs.length == 0) {
          return res.send({ responseCode: 404, responseMessage: "Order not found" })
        }
        else {
          return res.send({ responseCode: 200, responseMessage: "Order found successfully", productResult })
        }
      })
    }
  },
  editOrderManagement: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: "Admin not found" })
        }
        else {
          if (req.body.orderStatus == "Cancel") {
            productPayment.findOneAndUpdate({ _id: req.body.orderId, orderStatus: "Pending" }, { $set: { "productDescription.$[ids].status": "Cancel" } }, { arrayFilters: [{ 'ids.productId': { $in: req.body.productId } }], new: true, multi: true }).populate("userId").exec((orderError, orderData) => {
              if (orderError) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", orderError })
              }
              else if (!orderData) {
                return res.send({ responseCode: 404, responseMessage: "Order not found" })
              }
              else {
                let body = `Dear ${orderData.userName}, Your order has been canceled for order id: ${orderData._id} <br>
                                                                  See from this link:<a href=${global.gConfig.orderURL}> click <a>`
                commonFunction.emailSender(orderData.userId.email, "Bayise order canceled", body, (emailErr, emailResult) => {
                  if (emailErr) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Order cancel successfully" })
                  }
                })
              }
            })
          }
          else if (req.body.orderStatus == "Delivered") {
            productPayment.findOneAndUpdate({ _id: req.body.orderId, orderStatus: { $in: ["Pending", "Return"] } }, { $set: { "productDescription.$[ids].status": "Delivered" } }, { arrayFilters: [{ 'ids.productId': { $in: req.body.productId } }], new: true, multi: true }).populate("userId").exec((orderError, orderData) => {
              if (orderError) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", orderError })
              }
              else if (!orderData) {
                return res.send({ responseCode: 404, responseMessage: "Order not found" })
              }
              else {
                let body = `Dear ${orderData.userName}, Your order has been delivered for order id: ${orderData._id} <br>
                                                                  See from this link:<a href=${global.gConfig.orderURL}> click <a>`
                commonFunction.emailSender(orderData.userId.email, "Bayise order delivered", body, (emailErr, emailResult) => {
                  if (emailErr) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Order delivered successfully" })
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  deleteOrder: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: " Admin not found" })
        }
        else {
          productPayment.findOneAndUpdate({ _id: req.body.orderId }, { $set: { status: req.body.status } }, { new: true }, (orderError, orderData) => {
            if (orderError) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error", orderError })
            }
            else if (!orderData) {
              return res.send({ responseCode: 404, responseMessage: "Order not found" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Order updated successfully" })

            }
          })
        }
      })
    }
  },


  // ---------------------------FAQ------------------------------------------------
  //---------------------------Management---------------------------------------
  addFaq: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          }
          else {
            let obj = new faqModel({
              "title": req.body.title,
              "description": req.body.description
            })
            obj.save((error, faqData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Faq added successfully", faqData })
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  viewFaq: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.faqId) {
              faqModel.findOne({ _id: req.body.faqId, status: "ACTIVE" }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Faq not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Faq found successfully!", result: faqData })
                }
              })
            }
            else {
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                }
              }
              faqModel.paginate({
                status: { $ne: "DELETE" }
              },
                options, (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (result1.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "FAQ not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "FAQ successfully", result: result1 })
                  }
                })
            }

          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }

  },
  editFaq: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          }
          else {
            faqModel.findOneAndUpdate({ _id: req.body.faqId, status: "ACTIVE" }, req.body, { new: true }, (error, faqData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!faqData) {
                return res.send({ responseCode: 404, responseMessage: "Faq not found" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Faq.......updated!", result: faqData })
              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  deleteFaq: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.status == "DELETE") {
              faqModel.findOneAndUpdate({ _id: req.body.faqId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Faq not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Faq.......deleted!", result: faqData })
                }
              })
            }
            else if (req.body.status == "BLOCK") {
              faqModel.findOneAndUpdate({ _id: req.body.faqId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Faq not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Faq blocked successfully!", result: faqData })
                }
              })
            }
            else {
              faqModel.findOneAndUpdate({ _id: req.body.faqId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Faq not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Faq activated successfully!", result: faqData })
                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  //-----------------------------------------------------paymentManagement------------------------------------------------------
  setPayment: (req, res) => {
    try {
      if (!req.body.adminId) {
        return res.send({ responseCode: 401, responseMessage: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          }
          else {
            let obj = new paymentModel({
              "paymentForVideo": req.body.paymentForVideo,
              "paymentForAdvertisement": req.body.paymentForAdvertisement,
              "paymentForJob": req.body.paymentForJob
            })
            obj.save((error, paymentData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Payment Data Saved", result: paymentData })
              }
            })
          }
        })
      }
    }
    catch (error) {
      return res.send({ responseCode: 500, responseMessage: "Something went wrong" })

    }
  },
  getSetPayment: (req, res) => {
    if (!req.body.adminId) {
      return res.send({ responseCode: 401, responseMessage: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminResult) => {
        if (adminErr) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (!adminResult) {
          return res.send({ responseCode: 404, responseMessage: " Admin not found" })
        }
        else {
          var data = await paymentModel.findOne({ _id: req.body.paymentId, status: "ACTIVE" })
          return res.send({ responseCode: 200, responseMessage: "Payment successfully found", data })
        }
      })
    }
  },
  //**************************************refund management*****************************/

  refundForProduct: (req, res) => {
    try {
      productPayment.findOne({ _id: req.body.orderId }).populate("userId").exec((orderErr, payData) => {
        if (orderErr) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (!payData) {
          return res.send({ responseCode: 404, responseMessage: "Order not found" })
        }
        else {
          stripe.charges.retrieve(payData.chargeId, function (err, charge) {
            console.log("10956=======>", err, charge)
            if (charge.amount != charge.amount_refunded) {
              console.log("The charge info .........", charge);
              payData.productDescription.forEach((item, i) => {
                if (item.status == "Return" || item.status == "Cancel") {
                  if (item.refundStatus) {
                    console.log({
                      responseCode: 401,
                      responseMessage:
                        "The refund for the product already Done..."
                    });
                  } else {
                    stripe.refunds.create(
                      {
                        charge: payData.chargeId,
                        amount: item.totalCost
                      },
                      async (error, refund) => {
                        if (error) {
                          console.log({
                            responseCode: 500,
                            responseMessage: "Internal server error",
                            error
                          });
                        } else {
                          var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                          var obj2 = {
                            userId: adminData._id,
                            title: "Amount debited",
                            body: `Debited:Dear ${adminData.firstName}, Your stripe Acct xxx${adminData.stripAccountId.split("").splice(18).join("")} is being debited  USD ${item.totalCost} for refunding to the return of  ${item.productName} product to the buyer ${payData.userName}`,
                            notificationType: "Amount debited for refund"
                          };
                          new webNotification(obj2).save((saveErr, saveResult) => {
                            if (saveErr) {
                              console.log({ responseCode: 500, responseMessage: "Internal server error" });
                            }
                            else {
                              if (payData.userId.fcmToken == null) {
                                var obj = {
                                  userId: payData.userId,
                                  title: "Amount credited",
                                  body: `Credited:Dear ${payData.userName},Your account has been credited  USD ${item.totalCost} for the cancel/return of the product ${item.productName}`,
                                  notificationType: "Amount credited for refund"
                                };
                                new webNotification(obj).save((saveErr, saveResult) => {
                                  if (saveResult) {
                                    console.log({ responseCode: 200, responseMessage: "notification send successfully" });
                                  }
                                })
                              }
                              if (payData.userId.fcmToken != null) {
                                commonFunction.pushNotification(payData.userId.fcmToken, `Credited:Dear ${payData.userName},Your account has been credited  USD ${item.totalCost} for the cancel/return of the product ${item.productName}`, (err, res) => {
                                  if (res) {
                                    var obj = {
                                      userId: payData.userId,
                                      title: "Amount credited",
                                      body: `Credited:Dear ${payData.userName},Your account has been credited  USD ${item.totalCost} for the cancellation/return of the product ${item.productName}`,
                                      notificationType: "Amount credited for refund"
                                    };
                                    new notificationModel(obj).save((error1, result1) => {
                                      if (result1) {
                                        console.log({ responseCode: 200, responseMessage: "notification send successfully" });
                                      }

                                    })
                                  }
                                })
                              }
                              productPayment
                                .update(
                                  { _id: req.body.orderId },
                                  {
                                    $set: {
                                      "productDescription.$[id].refundStatus": true, amount_refunded: refund.amount, refundId: refund.id
                                    }
                                  },
                                  {
                                    arrayFilters: [{ "id._id": { $eq: item._id } }],
                                    multi: true
                                  }
                                )
                                .then((updated, err) => {
                                  if (updated.nModified != 0) {
                                    console.log(
                                      "The product is updated.......",
                                      updated
                                    );
                                    console.log({
                                      responseCode: 200,
                                      responseMessage: `The refund for ${i +
                                        1} product of the order :${
                                        payData._id
                                        } done successfully`,
                                      refund
                                    });
                                  }
                                });
                            }
                          })

                        }
                      }
                    );
                  }
                }
              });
              res.send({
                responseCode: 200,
                responseMessage: "The refund done successfully"
              });
            } else {
              res.send({
                responseCode: 201,
                responseMessage: "The amount already refunded..."
              });
            }
            // asynchronously called
          });
        }
      })

    } catch (error) {
      res.send({
        responseCode: 500,
        responseMessage: "Internal Server Error...",
        error
      });
    }
  },

  sellerPaymentTransfer: async (req, res) => {

    productPayment.aggregate([

      // { $match: { orderStatus: "Delivered", } },
      { $match: { _id: mongoose.Types.ObjectId(req.body.orderId) } },
      { $unwind: "$productDescription" },
      { $match: { "productDescription.status": "Delivered" } },
      {

        $group: {
          // _id:"$productDescription.sellerId",
          _id: 0,
          seller: { $push: "$productDescription" },
          totalSaleAmount: { $sum: "$productDescription.totalCost" },
          ids: { $addToSet: "$transactionId" }

        }
      }
    ], (err, result) => {
      if (err) {
        res.send({ responseCode: 500, responseMessage: "Internal server error", err })
      }
      else if (result.length == 0) {
        res.send({ responseCode: 404, responseMessage: "Data not found" })

      }
      else {
        result[0].seller.forEach(a => {
          let adminAccount = "acct_1E89IeJRAbfLz5Ri"

          stripe.balance.retrieve({
            stripe_account: adminAccount,
          }, (err, balance) => {
            console.log("10983====>", err, balance)

            if (err) {
              console.log({ responseCode: 500, responseMessage: "Internal server error...1", err })
            }

            else {
              if ((balance.available[0].amount == 0)) {
                console.log({ responseCode: 404, responseMessage: "Not enouhgh balance" })
              }
              else {
                stripe.transfers.create({
                  amount: parseInt(Number(a.totalCost) * 0.94),
                  currency: "usd",
                  destination: a.sellerAccountId
                }, async (err1, result1) => {

                  if (err1) {
                    console.log({ responseCode: 500, responseMessage: "Internal server error...2", err1 })
                  }
                  else {
                    let note = await notify(a);
                    productPayment.findOneAndUpdate({ _id: req.body.orderId, orderStatus: "Delivered" }, { $set: { orderStatus: "Completed", "productDescription.$[].status": "Completed" } }, { new: true, multi: true }, (productError, productResult) => {
                      if (productError) {
                        console.log({ responseCode: 500, responseMessage: "Internal server error", productError })
                      }
                      else if (!productResult) {
                        console.log({ responseCode: 404, responseMessage: "Product not found" })

                      }
                      else {

                        console.log({ responseCode: 200, responseMessage: "Status delivered successfully", productResult })
                      }
                    })
                  }
                })
              }
            }
          })

        })
        res.send({ responseCode: 200, responseMessage: "Status delivered successfully" })
      }
    })
    //**____________________________________________________________________________________________________________ */
    async function notify(seller) {
      let appSeller = await userModel.findOne({ _id: seller.sellerId, status: "ACTIVE" });
      let admin = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" });
      let sellerNote = `Credited:Dear ${seller.sellerName}, Your stripe Acct xx${seller.sellerAccountId.split("").splice(18).join("")} is being credited USD ${parseFloat(Number(seller.totalCost) * 0.94)} for the sale of ${seller.productQuantity} ${seller.productName} product/products `;
      let adminNote = `Debited:Dear ${admin.firstName}, Your stripe Acct xx${admin.stripAccountId.split("").splice(18).join("")} is being debited USD ${parseFloat(Number(seller.totalCost) * 0.94)} for payment of sale of ${seller.productQuantity} ${seller.productName} products `;

      let adminNotish = {
        userId: admin._id,
        title: "Amount Debited",
        body: adminNote,
        notificationType: "Amount debited for payment for sale of product in buying/selling section"
      };
      let sellerNotish = {
        userId: seller.sellerId,
        title: "Amount Credited",
        body: sellerNote,
        notificationType: "Amount credited for sale of product in buying/selling section"
      };
      if (appSeller.fcmToken != null) {
        commonFunction.pushNotification(appSeller.fcmToken, sellerNote, async (err, rest) => {
          if (rest) {
            new notificationModel({
              userId: userData.userId,
              title: "Amount Credited",
              body: sellerNote,
              notificationType: "Amount credited for sale of product in buying/selling section"
            }).save();
            await webNotification.create(adminNotish)
          }
        })


      }
      if (appSeller.fcmToken == null) {
        await webNotification.create(sellerNotish, adminNotish);
      } else {

      }
    }
    //**____________________________________________________________________________________________________________ */
  },
  //***********************************************************************************/

  transactionManag: (req, res) => {
    try {
      if (!req.body.adminId) {
        return res.send({ responseCode: 401, responseMessage: "Parameter missing" })
      }
      else {
        if (req.body.transactionId) {
          productPayment.findOne({ _id: req.body.transactionId }).populate('productDescription.productId userId').exec((error, paymentResult) => {
            if (error) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
            }
            else if (!paymentResult) {
              return res.send({ responseCode: 404, responseMessage: "Data not found" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Transaction found successfully", paymentResult })
            }
          })
        }
        else {
          let query = { status: { $ne: "DELETE" } };

          if (req.body.search) {
            query =
              { userName: new RegExp('^' + req.body.search, "i") }
          }
          if (req.body.fromDate && req.body.toDate) {
            query.$and = [{
              createdAt: { $gte: req.body.fromDate }
            },
            {
              createdAt: { $lte: req.body.toDate }
            }]
          }

          if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate }
          }
          if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
          }

          let options = {
            page: req.body.pageNumber || 1,
            limit: req.body.limit || 10,
            sort: { createdAt: -1 }
          }
          productPayment.paginate(query, options, (error, paymentData) => {
            if (error) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
            }
            else if (paymentData.docs.length == 0) {
              return res.send({ responseCode: 404, responseMessage: "Data not found" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Transaction detail found successfully", paymentData })
            }
          })
        }
      }
    }
    catch (error) {
      res.send({ responseCode: 404, responseMessage: "Error in catch", error })
    }
  },

  jobTransaction: (req, res) => {
    if (!req.body.adminId) {
      return res.send({ responseCode: 401, responseMessage: "Parameter missing" })
    }
    else {
      let query = { status: { $ne: "DELETE" } };
      if (req.body.search) {
        query =
          { posterName: new RegExp('^' + req.body.search, "i") }
      }
      if (req.body.fromDate && req.body.toDate) {
        query.$and = [{
          createdAt: { $gte: req.body.fromDate }
        },
        {
          createdAt: { $lte: req.body.toDate }
        }]
      }

      if (req.body.fromDate && !req.body.toDate) {
        query.createdAt = { $gte: req.body.fromDate }
      }
      if (!req.body.fromDate && req.body.toDate) {
        query.createdAt = { $lte: req.body.toDate }
      }

      let options = {
        page: req.body.pageNumber || 1,
        limit: req.body.limit || 10,
        sort: { createdAt: -1 }
      }
      jobPayment.paginate(query, options, (error, paymentData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
        }
        else if (paymentData.docs.length == 0) {
          return res.send({ responseCode: 404, responseMessage: "Data not found" })
        }
        else {
          return res.send({ responseCode: 200, responseMessage: "Data found successfully", paymentData })
        }
      })
    }
  },
  deleteJobTranasaction: (req, res) => {
    try {
      if (!req.body.adminId) {
        return res.send({ responseCode: 401, responseMessage: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminResult) => {
          if (adminErr) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else {
            jobPayment.findOneAndUpdate({ _id: req.body.paymentId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (deleteErr, deleteResult) => {
              if (deleteErr) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Transaction successfully deleted" })
              }
            })
          }
        })
      }
    }
    catch (error) {
      return res.send({ responseCode: 500, responseMessage: "Something went wrong" })
    }
  },
  editSetPayment: (req, res) => {
    try {
      if (!req.body.adminId) {
        return res.send({ responseCode: 401, responseMessage: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          }
          else {
            paymentModel.findOneAndUpdate({ _id: req.body.paymentId, status: "ACTIVE" }, req.body, { new: true }, (error, paymentData) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!paymentData) {
                return res.send({ responseCode: 404, responseMessage: "Data not found" })
              }
              else {
                return res.send({ responseCode: 404, responseMessage: "Upadted successfully", result: paymentData })

              }
            })
          }
        })
      }
    }
    catch (error) {
      return res.send({ responseCode: 500, responseMessage: "Something went wrong" })

    }
  },
  //-----------------------------------------------------------------addvertisement--------------------------------------------------------

  viewAdv: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        advPayment.findOne((paymentError, paymentResult) => {
          if (paymentError) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else {
            userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
              console.log(err, result)
              if (err) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              } else if (!result) {
                return res.send({ responseCode: 404, responseMessage: "Admin not found" })
              } else {
                if (req.body.advertisementId) {
                  advertisementModel.findOne({ _id: req.body.advertisementId, status: { $ne: "DELETE" } }).populate("userId").exec((err1, result1) => {
                    if (err1) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    } else if (!result1) {
                      return res.send({ responseCode: 404, responseMessage: "Advertisement not found" })
                    } else {

                      return res.send({ responseCode: 200, responseMessage: "Advertisement found successfully", result: result1 })
                    }
                  })
                }
                else if (req.body.search) {
                  let query = {
                    $and: [{ status: { $ne: "DELETE" } }, {
                      $or: [{ title: { $regex: req.body.search, $options: 'i' } },
                      { userName: { $regex: req.body.search, $options: 'i' } }]
                    }]
                  }
                  let options = {
                    page: req.body.pageNumber || 1,
                    limit: req.body.limit || 10,
                    sort: {
                      createdAt: -1
                    }
                  }
                  advertisementModel.paginate(query, options, (err1, result1) => {
                    if (err1) {
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    } else if (result1.docs.length == 0) {
                      return res.send({ responseCode: 404, responseMessage: " Advertisement not found" })
                    } else {
                      return res.send({ responseCode: 200, responseMessage: " Advertisement found successfully", result: result1 })
                    }
                  })
                }
                else {
                  let query = { status: { $ne: "DELETE" } };
                  if (req.body.fromDate && req.body.toDate) {
                    query.$and = [{
                      createdAt: { $gte: req.body.fromDate }
                    },
                    {
                      createdAt: { $lte: req.body.toDate }
                    }]
                  }

                  if (req.body.fromDate && !req.body.toDate) {
                    query.createdAt = { $gte: req.body.fromDate }
                  }
                  if (!req.body.fromDate && req.body.toDate) {
                    query.createdAt = { $lte: req.body.toDate }
                  }

                  let options = {
                    page: req.body.pageNumber || 1,
                    limit: req.body.limit || 10,
                    sort: {
                      createdAt: -1
                    }
                  }
                  advertisementModel.paginate(query, options, (err1, result1) => {
                    if (err1) {
                      console.log("yeturifjkgsjf", err1)
                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    } else if (result1.docs.length == 0) {
                      return res.send({ responseCode: 404, responseMessage: " Advertisement not found" })
                    } else {
                      return res.send({ responseCode: 200, responseMessage: "Advertisement found successfully", result: result1 })
                    }
                  })

                }
              }
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },

  advAction: (req, res) => {
    try {
      if (!req.body.adminId) {

        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        if (!req.body.advertisementId) {
          globalResponse.commonResponse(
            res,
            globalStatusCode.ErrorCode.PARAMETER_MISSING,
            globalMessege.ErrorMessage.FIELD_REQUIRED
          );
        } else {
          advertisementModel.findOne({ _id: req.body.advertisementId }, (err, result) => {
            if (err) {
              globalResponse.commonResponse(
                res,
                globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                globalMessege.ErrorMessage.INTERNAL_ERROR
              );
            } else if (!result) {
              globalResponse.commonResponse(
                res,
                globalStatusCode.ErrorCode.NOT_FOUND,
                globalMessege.ErrorMessage.NOT_FOUND
              );
            } else {
              if (req.body.status == "BLOCK") {
                advertisementModel.findOneAndUpdate({ _id: req.body.advertisementId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (err, result) => {
                  if (err) {
                    globalResponse.commonResponse(
                      res,
                      globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                      globalMessege.ErrorMessage.INTERNAL_ERROR
                    );
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Advertisement inactivated successfully" });
                  }
                })
              }
              else if (req.body.status == "DELETE") {
                advertisementModel.findOneAndUpdate({ _id: req.body.advertisementId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (err, result) => {
                  if (err) {
                    globalResponse.commonResponse(
                      res,
                      globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                      globalMessege.ErrorMessage.INTERNAL_ERROR
                    );
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Advertisement deleted successfully" });
                  }
                })
              }
              else {
                advertisementModel.findOneAndUpdate({ _id: req.body.advertisementId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (err2, result2) => {
                  if (err2) {
                    globalResponse.commonResponse(
                      res,
                      globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                      globalMessege.ErrorMessage.INTERNAL_ERROR
                    );
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Advertisement activated successfully" });
                  }
                })
              }
            }
          })
        }
      }
    } catch (error) {
      globalResponse.commonResponse(
        res,
        globalStatusCode.ErrorCode.BAD_REQUEST,
        globalMessege.ErrorMessage.ERROR_IN_CATCH
      );
    }
  },

  //-----------------------------------------------------------------transactionManagement-------------------------------------------------
  transactionManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            productPayment.findOneAndUpdate({ _id: req.body.transactionId }, { $set: { status: "DELETE" } }, { new: true }, (error, data) => {

              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
              }
              else if (!data) {
                return res.send({ responseCode: 404, responseMessage: "Data not found" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Transaction deleted successfully", data })

              }
            })
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  reportManagement: (req, res) => {
    if (req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      if (req.body.reportId) {

        report.findOne({ _id: req.body.reportId, status: "ACTIVE" }).populate({ path: 'userId productId', select: 'productName description firstName lastName', match: { status: "ACTIVE" } }).exec((reportError, reportResult) => {
          if (reportError) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!reportResult) {
            return res.send({ responseCode: 404, responseMessage: "Report not found" })
          }
          else {
            return res.send({ responseCode: 200, responseMessage: "Report found successfully", reportResult })

          }
        })
      }
      else {
        let options = {
          page: req.body.pageNumber || 1,
          limit: req.body.limit || 10,
          sort: {
            createdAt: -1
          },
          populate: { path: 'userId', select: 'firstName lastName', match: { status: "ACTIVE" } }
        }
        report.paginate({
          status: { $ne: "DELETE" }
        },
          options, (err1, result1) => {
            console.log("5426===>", err1, result1)
            if (err1) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            } else if (result1.docs.length == 0) {
              return res.send({ responseCode: 404, responseMessage: "Report not found" })
            } else {

              return res.send({ responseCode: 200, responseMessage: " Report found successfully", result: result1 })
            }
          })
      }
    }
  },
  updatedReport: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            if (req.body.status == "DELETE") {
              report.findOneAndUpdate({ _id: req.body.reportId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Report not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Report deleted successfully!", result: faqData })
                }
              })
            }
            else if (req.body.status == "BLOCK") {
              report.findOneAndUpdate({ _id: req.body.reportId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Report not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Report blocked successfully!", result: faqData })
                }
              })
            }
            else {
              report.findOneAndUpdate({ _id: req.body.reportId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, faqData) => {
                if (error) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!faqData) {
                  return res.send({ responseCode: 404, responseMessage: "Report not found" })
                }
                else {
                  return res.send({ responseCode: 200, responseMessage: "Report activated successfully!", result: faqData })
                }
              })
            }
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }

  },
  notificationList: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            var query = { notificationStatus: { $ne: "REJECT" } }

            if (req.body.adminId) {
              query.userId = req.body.adminId
            }

            webNotification.find(query, (error, data) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else if (!data) {
                return res.send({ responseCode: 404, responseMessage: "Data not found" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", data })
              }
            })

          }
        })

      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }

  },
  deleteNotification: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      }
      else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
          if (error) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!adminData) {
            return res.send({ responseCode: 404, responseMessage: "Admin not found" })
          }
          else {
            webNotification.findOneAndUpdate({ _id: req.body.notificationId, notificationStatus: "PENDING" }, { $set: { notificationStatus: "REJECT" } }, { new: true }, (error, result) => {
              if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
              }
              else {
                return res.send({ responseCode: 200, responseMessage: "Delete successfully" })

              }
            })
          }
        })
      }
    }
    catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  //***************************************page management***********************/
  viewPage: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.pageId) {
              pageModel.findOne({
                _id: req.body.pageId,
                status: { $ne: "DELETE" }
              }).populate({ path: 'followers.followerId', select: 'firstName lastName' }).exec(async (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result1) {
                  return res.send({ responseCode: 404, responseMessage: " Page not found" })
                } else {
                  let allPost = await pagePost.find({ pageId: result1._id, postStatus: "ACTIVE" });

                  return res.send({ responseCode: 200, responseMessage: "Page found successfully", result: result1, allPost: allPost })
                }
              })
            }
            else {
              let query = { status: { $ne: "DELETE" } };

              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

                sort: {
                  createdAt: -1
                },
                populate: { path: 'followers.followerId', select: 'firstName lastName' }
              }

              if (req.body.search) {

                query.$and = [{ status: { $ne: "DELETE" } }, {
                  $or: [{ pageName: { $regex: req.body.search, $options: 'i' } },
                  { adminName: { $regex: req.body.search, $options: 'i' } }]
                }]
              }


              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              pageModel.paginate(query, options, (err1, result1) => {
                if (err1) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (result1.docs.length == 0) {
                  return res.send({ responseCode: 404, responseMessage: "Page not found" })
                } else {
                  return res.send({ responseCode: 200, responseMessage: "Page found successfully", result: result1 })
                }
              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },


  pageManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
          if (err) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          } else if (!result) {
            return res.send({ responseCode: 404, responseMessage: " Admin not found" })
          } else {
            if (req.body.status == "BLOCK") {
              pageModel.findOneAndUpdate({
                _id: req.body.pageId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "BLOCK"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Page not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Page blocked successfully", result: result1 })
                  }
                })
            }
            else if (req.body.status == "DELETE") {
              pageModel.findOneAndUpdate({
                _id: req.body.pageId,
                status: "ACTIVE"
              },
                {
                  $set: {
                    status: "DELETE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Page not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Page deleted successfully", result: result1 })
                  }
                })
            }
            else {
              pageModel.findOneAndUpdate({
                _id: req.body.pageId,
                status: "BLOCK"
              },
                {
                  $set: {
                    status: "ACTIVE"
                  }
                },
                { new: true },
                (err1, result1) => {
                  if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  } else if (!result1) {
                    return res.send({ responseCode: 404, responseMessage: "Page not found" })
                  } else {
                    return res.send({ responseCode: 200, responseMessage: "Page actived successfully", result: result1 })
                  }
                })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  auctionOrderManagement: (req, res) => {
    try {
      if (!req.body.adminId) {
        res.send({ responseCode: 401, responseMessege: "Parameter missing" })
      } else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }).then((admin, err) => {
          if (admin) {
            if (req.body.orderId) {

              payment.findOne({ _id: req.body.orderId, status: { $ne: "DELETE" } }).populate("auctionId bidderId").exec(async (orderErr, orderResult) => {

                if (orderErr) {
                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!orderResult) {
                  return res.send({ responseCode: 404, responseMessage: "Order not found" })
                }
                else {
                  let allPost = await feedbackModel.findOne({ orderId: req.body.orderId });

                  return res.send({ responseCode: 200, responseMessage: "Order successfully found", result: orderResult, allPost })
                }
              })
            }
            else {
              var query = { status: { $ne: "DELETE" } };
              if (req.body.orderStatus) {
                query.orderStatus = new RegExp('^' + req.body.orderStatus, "i") || "";
              }

              if (req.body.search) {
                query.$or = [{ auctionProductName: new RegExp('^' + req.body.search, "i") },
                { bidderName: new RegExp('^' + req.body.search, "i") }]
              }
              if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                  createdAt: { $gte: req.body.fromDate }
                },
                {
                  createdAt: { $lte: req.body.toDate }
                }]
              }

              if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
              }
              if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
              }
              let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                  createdAt: -1
                },
                populate: { path: 'auctionId bidderId' }
              }

              payment.paginate(query, options, async (err, results) => {
                if (err) {
                  res.send({ responseCode: 500, responseMessage: "Internal server error", err })
                }
                else if (results.docs.length == 0) {
                  res.send({ responseCode: 404, responseMessage: "Order not found" })

                }
                else {
                  res.send({ responseCode: 200, responseMessage: "Order successfully found", results })
                }
              })
            }
          }
        })
      }
    } catch (error) {
      res.send({ responseCode: 500, responseMessege: "Something went wrong" })
    }
  },
  deleteAuctionOrder: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: "Admin not found" })
        }
        else {
          payment.findOneAndUpdate({ _id: req.body.orderId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (orderError, auctionData) => {
            if (orderError) {
              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (!auctionData) {
              return res.send({ responseCode: 404, responseMessage: "Order not found" })
            }
            else {
              return res.send({ responseCode: 200, responseMessage: "Order deleted successfully" })
            }
          })
        }
      })
    }
  },
  editAuctionOrder: (req, res) => {
    if (!req.body.adminId) {
      res.send({ responseCode: 401, responseMessege: "Parameter missing" })
    }
    else {
      userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
        if (error) {
          return res.send({ responseCode: 500, responseMessage: "Internal server error" })
        }
        else if (!adminData) {
          return res.send({ responseCode: 404, responseMessage: "Admin not found" })
        }
        else {
          if (req.body.orderStatus == "Cancel") {
            payment.findOneAndUpdate({ _id: req.body.orderId, orderStatus: "Pending" }, { $set: { orderStatus: "Cancel" } }, { new: true }).populate("bidderId").exec((orderError, orderData) => {
              if (orderError) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", orderError })
              }
              else if (!orderData) {
                return res.send({ responseCode: 404, responseMessage: "Order not found" })
              }
              else {
                let body = `Dear ${orderData.bidderName}, Your order has been canceled for order id: ${orderData._id} <br>
                                                                  See from this link:<a href=${global.gConfig.auctionOrder}> click <a>`
                commonFunction.emailSender(orderData.bidderId.email, "Bayise order canceled", body, (emailErr, emailResult) => {
                  if (emailErr) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Order canceled successfully" })
                  }
                })
              }
            })
          }
          else if (req.body.orderStatus == "Delivered") {
            payment.findOneAndUpdate({ _id: req.body.orderId, orderStatus: { $in: ["Pending", "Return"] } }, { $set: { orderStatus: "Delivered" } }, { new: true }).populate("bidderId").exec((orderError, orderData) => {
              if (orderError) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", orderError })
              }
              else if (!orderData) {
                return res.send({ responseCode: 404, responseMessage: "Order not found" })
              }
              else {
                let body = `Dear ${orderData.bidderName}, Your order has been delivered for order id: ${orderData._id} <br>
                                                                  See from this link:<a href=${global.gConfig.auctionOrder}> click <a>`
                commonFunction.emailSender(orderData.bidderId.email, "Bayise order delivered", body, (emailErr, emailResult) => {
                  if (emailErr) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                  }
                  else {
                    return res.send({ responseCode: 200, responseMessage: "Order delivered successfully" })
                  }
                })
              }
            })
          }
        }
      })
    }
  },

  //-----auction seller trasfer-------------------------


  sellerTransferForAuction: async (req, res) => {
   
      payment.findOne({ _id: req.body.orderId, status: "ACTIVE", orderStatus: "Delivered" }).populate("auctionId").exec((paymentErr, paymentResult) => {
        if (paymentErr) {
          res.send({ responseCode: 500, responseMessage: "Internal server error", err })
        }
        else if (!paymentResult) {
          res.send({ responseCode: 404, responseMessage: "Order not found" })
        }
        else {
          let adminAccount = "acct_1E89IeJRAbfLz5Ri"

          stripe.balance.retrieve({
            stripe_account: adminAccount,
          }, (err, balance) => {

            if (err) {
              res.send({ responseCode: 500, responseMessage: "Internal server error...1", err })
            }
            else {
              if ((balance.available[0].amount == 0)) {
                res.send({ responseCode: 404, responseMessage: "Not enouhgh balance" })
              }
              else {
                stripe.transfers.create({
                  amount: parseInt(Number(paymentResult.amount) * 0.94),
                  currency: "usd",
                  destination: "acct_1GIDKrFoaPo8gtne"
                }, async (err1, result1) => {
                  if (err1) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error...2", err1 })
                  }
                  else {
                    let seller = await notify(paymentResult.auctionId.userId);

                    payment.findOneAndUpdate({ _id: req.body.orderId, orderStatus: "Delivered" }, { $set: { orderStatus: "Completed" } }, { new: true }, (productError, productResult) => {
                      if (productError) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error", productError })
                      }
                      else if (!productResult) {
                        res.send({ responseCode: 404, responseMessage: "Payment cant trasfer" })
                      }
                      else {
                        res.send({ responseCode: 200, responseMessage: "Payment trasfer successfully", productResult })
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
      //**____________________________________________________________________________________________________________ */
      async function notify(sellerId) {
        let paymentData = await payment.findOne({ _id: req.body.orderId, status: "ACTIVE", orderStatus: "Delivered" }).populate("auctionId")
        let appSeller = await userModel.findOne({ _id: sellerId, status: "ACTIVE" });

        let admin = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" });
        let sellerNote = `Credited:Dear ${paymentData.auctionId.sellerName}, Your stripe Acct xx${paymentData.auctionId.cardDetails[0].stripAccountId.split("").splice(18).join("")} is being credited USD ${parseFloat(Number(paymentData.amount) * 0.94 / 100)} for the sale of ${paymentData.auctionProductName} product`;
        let adminNote = `Debited:Dear ${admin.firstName}, Your stripe Acct xx${admin.stripAccountId.split("").splice(18).join("")} is being debited USD ${parseFloat(Number(paymentData.amount) * 0.94 / 100)} for payment of sale of ${paymentData.auctionProductName} product`;

        let adminNotish = {
          userId: admin._id,
          title: "Amount Debited",
          body: adminNote,
          notificationType: "Amount debited for payment for sale of product in bidding section"
        };
        let sellerNotish = {
          userId: paymentData.auctionId.userId,
          title: "Amount Credited",
          body: sellerNote,
          notificationType: "Amount credited for sale of product in bidding section"
        };
        if (appSeller.fcmToken != null) {
          commonFunction.pushNotification(appSeller.fcmToken, sellerNote, async (err, rest) => {
            if (rest) {
              new notificationModel({
                userId: paymentData.auctionId.userId,
                title: "Amount Credited",
                body: sellerNote,
                notificationType: "Amount credited for sale of product in bidding section"
              }).save();
              await webNotification.create(adminNotish)
            }
          })
        }
        if (appSeller.fcmToken == null) {
          await webNotification.create(sellerNotish, adminNotish);
        } else {

        }
      }
    //**____________________________________________________________________________________________________________ */
  },
  refundForAuction: (req, res) => {
    try {
        payment.findOne({ _id: req.body.orderId }).populate("auctionId bidderId").exec((orderErr, payData) => {
          if (orderErr) {
            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
          }
          else if (!payData) {
            return res.send({ responseCode: 404, responseMessage: "Order not found" })
          }
          else {
            stripe.charges.retrieve(payData.chargeId, function (err, charge) {
              if (charge.amount != charge.amount_refunded) {
                if (payData.orderStatus == "Return" || payData.orderStatus == "Cancel") {

                  stripe.refunds.create(
                    {
                      charge: payData.chargeId,
                      amount: payData.totalCost,
                    },
                    async (error, refund) => {
                      if (error) {
                        console.log({
                          responseCode: 500,
                          responseMessage: "Internal server error",
                          error
                        });
                      } else {
                        var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                        var obj2 = {
                          userId: adminData._id,
                          title: "Amount debited",
                          body: `Debited:Dear ${adminData.firstName}, Your stripe Acct xxx${adminData.stripAccountId.split("").splice(18).join("")} is being debited  USD ${payData.amount / 100} for refunding to the return of  ${payData.auctionProductName} product to the buyer ${payData.auctionId.sellerName}`,
                          notificationType: "Amount debited for refund"
                        };
                        new webNotification(obj2).save((saveErr, saveResult) => {
                          if (saveErr) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" });
                          }
                          else {
                            if (payData.bidderId.fcmToken == null) {
                              var obj = {
                                userId: payData.bidderId,
                                title: "Amount credited",
                                body: `Credited:Dear ${payData.bidderName},Your account has been credited  USD ${payData.amount / 100} for the cancel/return of the product ${payData.auctionProductName}`,
                                notificationType: "Amount credited for refund"
                              };
                              new webNotification(obj).save((saveErr, saveResult) => {
                                if (saveResult) {
                                  console.log({ responseCode: 200, responseMessage: "notification send successfully" });
                                }
                              })
                            }
                            if (payData.bidderId.fcmToken != null) {
                              commonFunction.pushNotification(payData.bidderId.fcmToken, `Credited:Dear ${payData.bidderName},Your account has been credited  USD ${payData.amount / 100} for the cancel/return of the product ${payData.auctionProductName}`, (err, res) => {
                                if (res) {
                                  var obj = {
                                    userId: payData.bidderId,
                                    title: "Amount credited",
                                    body: `Credited:Dear ${payData.bidderName},Your account has been credited  USD ${payData.amount / 100} for the cancellation/return of the product ${payData.auctionProductName}`,
                                    notificationType: "Amount credited for refund"
                                  };
                                  new notificationModel(obj).save((error1, result1) => {
                                    if (result1) {
                                      console.log({ responseCode: 200, responseMessage: "notification send successfully" });
                                    }

                                  })
                                }
                              })
                            }

                            payment.findOneAndUpdate(
                              { _id: req.body.orderId },
                              {
                                $set: {
                                  refundStatus: true, amount_refunded: refund.amount, refundId: refund.id
                                }
                              },
                              {

                                new: true, multi: true
                              }
                            )
                              .then((updated, err) => {
                                if (updated) {

                                  res.send({
                                    responseCode: 200,
                                    responseMessage: "The refund done successfully"
                                  });
                                }
                              });
                          }
                        })

                      }
                    }
                  );
                }
              } else {
                res.send({
                  responseCode: 201,
                  responseMessage: "The amount already refunded..."
                });
              }
          
            });
          }
        })
    } catch (error) {
      res.send({
        responseCode: 500,
        responseMessage: "Internal Server Error...",
        error
      });
    }

  }
}




