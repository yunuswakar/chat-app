const userModel = require("../models/userModel")
const webNotification = require("../models/webNotification")
const notificationModel = require("../models/notificationModel")
const jobModel = require("../models/jobModel")
const jobApplicationModel = require("../models/jobApplicationModel")
const commonFunction = require("../helperFunctions/commonFunction");
const industry = require("../models/industryModel")
const jobPayment = require("../models/jobPayment")
const paymentManagement = require("../models/paymentManagement")
const stripe = require('stripe')('sk_test_L8oA9O5IOgtmflzWMndmmEhR')
const globalResponse = require("../helperFunctions/responseHandler");
const globalMessege = require("../helperFunctions/responseMessage");
const globalStatusCode = require("../helperFunctions/statusCodes");

module.exports = {
     getAllIndustry: (req, res) => {
          try {
               query = { status: "ACTIVE" }
               let options = {
                    page: req.body.page || 1,
                    limit: req.body.limit || 10
               }
               industry.paginate(query, options, (err, result) => {
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

     addJob: (req, res) => {
          if (!req.body.title || !req.body.email || !req.body.phoneNumber || !req.body.userId ||
               !req.body.gender || !req.body.industryType || !req.body.address || !req.body.addDetails ||
               !req.body.country || !req.body.id) {
               globalResponse.commonResponse(res, globalStatusCode.ErrorCode.PARAMETER_MISSING, globalMessege.ErrorMessage.FIELD_REQUIRED);
          } else {
               paymentManagement.findOne((paymentError, paymentResult) => {
                    if (paymentError) {
                         res.send({
                              responseCode: 500,
                              responseMessage: "Internal server error"
                         })
                    }
                    else {
                         userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                             
                              if (err) {
                                   globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                              } else if (!result) {
                                   globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                              } else {
                                    userModel.findOne({ userType: "ADMIN", status: "ACTIVE" },(adminErr,adminResult)=>{
                                         if (adminErr) {
                                              globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                         }
                                         else{
                                              commonFunction.emailSender(req.body.email, "Bayise job added!", `Dear ${result.firstName},You have successfully posted the job. Click on the link:${global.gConfig.jobURL}`, (err3, result3) => {
                                                   if
                                                        (err3) {
                                                        return res.send({ responseCode: 500, responseMessege: "Internal server error" })
                                                   }
                                                   else if (!result3) {
                                                        return res.send({ responseCode: 404, responseMessege: "Email not found" })

                                                   }
                                                   else {
                                                        commonFunction.phoneSms(req.body.phoneNumber, "Congratulation! your job has been posted", (smsError, smsResult) => {
                                                             if (smsError) {
                                                                  return res.send({ responseCode: 500, responseMessege: "Internal server error" })
                                                             }
                                                             else if (!smsResult) {
                                                                  return res.send({ responseCode: 404, responseMessege: "Phone no not found" })

                                                             }
                                                             else {
                                                                  stripe.customers.create({
                                                                       source: req.body.id,
                                                                       email: result.email
                                                                  }, (error1, customer) => {
                                                                     
                                                                       if (error1) {
                                                                            res.send({
                                                                                 responseCode: 500,
                                                                                 responseMessage: "Internal server error",
                                                                                 error1
                                                                            })
                                                                       } else {

                                                                            stripe.charges.create({
                                                                                 amount: paymentResult.paymentForJob * 100,
                                                                                 currency: "usd",
                                                                                 customer: customer.id,
                                                                            }, function (error2, charge) {
                                                                               
                                                                                 if (error2) {
                                                                                  
                                                                                      res.send({
                                                                                           responseCode: 500,
                                                                                           responseMessage: "Internal server error",
                                                                                           error2
                                                                                      })
                                                                                 }
                                                                                 else if (!charge) {
                                                                                      res.send({
                                                                                           responseCode: 404,
                                                                                           responseMessage: "Charge not created"

                                                                                      })
                                                                                 }
                                                                                 else {
                                                                                      var obj2 = {
                                                                                           userId: adminResult._id,
                                                                                           senderId: result.userId,
                                                                                           title: "Amount credited",
                                                                                           body: `Your account has been credited USD ${charge.amount} by ${result.firstName}`,
                                                                                           notificationType: "Credited for job management"
                                                                                      };
                                                                                      new webNotification(obj2).save((nErr, nResult) => {
                                                                                           if (nErr) {
                                                                                                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                                           }
                                                                                           else {

                                                                                           }
                                                                                      })
                                                                                      var obj = {
                                                                                           transactionId: charge.balance_transaction,
                                                                                           chargeId: charge.id,
                                                                                           amount: charge.amount,
                                                                                           customerId: charge.customer,
                                                                                           url: charge.receipt_url,
                                                                                           transactionStatus: charge.status,
                                                                                           amount_refunded: charge.amount_refunded,
                                                                                           userId: charge._id,
                                                                                           posterName: result.firstName + " " + result.lastName
                                                                                      }
                                                                                      var obj1 = new jobPayment(obj)
                                                                                      obj1.save((error4, result4) => {
                                                                                           if (error4) {
                                                                                                res.send({
                                                                                                     responseCode: 500,
                                                                                                     responseMessage: "Internal server error", error4
                                                                                                })
                                                                                           } else if (!result4) {
                                                                                                res.send({
                                                                                                     responseCode: 404,
                                                                                                     responseMessage: "Data not found"
                                                                                                })

                                                                                           }
                                                                                           else {
                                                                                                var date = new Date();
                                                                                                date.setDate(date.getDate() + 30);
                                                                                                var dateString = date.toISOString().split('T')[0];
                                                                                                let job = new jobModel({
                                                                                                     "userId": result._id,
                                                                                                     "expiryDate": dateString,
                                                                                                     "userName": result.firstName + " " + result.lastName,
                                                                                                     "title": req.body.title,
                                                                                                     "totalVacancy": req.body.vacancy,
                                                                                                     "addDetails": req.body.addDetails,
                                                                                                     "industryType": req.body.industryType,
                                                                                                     "country": req.body.country,
                                                                                                     "state": req.body.state,
                                                                                                     "city": req.body.city,
                                                                                                     "pinCode": req.body.pinCode,
                                                                                                     "languages": req.body.languages,
                                                                                                     "jobType": req.body.jobType,
                                                                                                     "email": req.body.email,
                                                                                                     "phoneNumber": req.body.phoneNumber,
                                                                                                     "company": req.body.company,
                                                                                                     "roleExperience": req.body.roleExperience,
                                                                                                     "gender": req.body.gender,
                                                                                                     "address": req.body.address,
                                                                                                     "jobPic": req.body.jobPic,
                                                                                                     "photoId": req.body.photoId
                                                                                                })
                                                                                                job.save((err4, result4) => {
                                                                                                     if (err4) {
                                                                                                          globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                                                                                     } else {
                                                                                                          return res.send({ responseCode: 200, responseMessege: "Job posted successfully", result4 })
                                                                                                     }
                                                                                                })
                                                                                           }
                                                                                      })
                                                                                 }
                                                                            });
                                                                       }
                                                                  });
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
     },

     viewJob: (req, res) => {
          if (!req.body.userId) {
               res.send({ responseCode: 204, responseMessage: "Parameter missing" })
          } else {
               userModel.findOne({ _id: req.body.userId ,status:"ACTIVE"}, (err, result) => {
                    if (err) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR, err);
                    } else if (!result) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                    } else {
                         if (req.body.search) {
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 5,
                                   sort: {
                                        createdAt: -1
                                   }
                              }
                              jobModel.paginate({
                                   $and: [{
                                        $or: [{ industry: { $regex: "^" + req.body.search, $options: 'i' } }, { title: { $regex: "^" + req.body.search, $options: 'i' } },
                                        { country: { $regex: "^" + req.body.search, $options: 'i' } }, { city: { $regex: "^" + req.body.search, $options: 'i' } }, { jobType: { $regex: "^" + req.body.search, $options: 'i' } }, { company: { $regex: "^" + req.body.search, $options: 'i' } }]
                                   }, { jobStatus: "ACTIVE" },{expiryDate:{$gte:Date.now()}}
                                   ]
                              }, options, (err1, result1) => {
                                   if (err1) {
                                        globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR, err1);
                                   } else if (result1.length == 0) {
                                        globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.NOT_FOUND);
                                   } else {
                                        res.send({ responseCode: 200, responseMessege: "Jobs found successfully", result: result1 })
                                   }
                              })
                         } else {
                              let query = { expiryDate: { $gte: Date.now()
          },jobStatus:"ACTIVE"};
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 5,
                                   // select: "",
                                   sort: {
                                        createdAt: -1
                                   }
                              }
                              jobModel.paginate(
                                   query
                                   , options, (err1, result1) => {
                                        if (err1) {
                                             globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                        } else if (result1.length == 0) {
                                             globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.NOT_FOUND);
                                        } else {
                                             res.send({ responseCode: 200, responseMessege: "Jobs found successfully", result: result1 })
                                        }
                                   })
                         }
                    }
               })
          }
     },
     viewPostedJob: (req, res) => {
          if (!req.body.userId) {
               res.send({ responseCode: 204, responseMessage: "Parameter missing" })
          } else {
               userModel.findOne({ _id: req.body.userId }, (err, result) => {
                    if (err) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                    } else if (!result) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                    } else {
                         if (req.body.search) {
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 5,
                                   // select: "",
                                   sort: {
                                        createdAt: -1
                                   }
                              }
                              jobModel.paginate({
                                   $and: [{ userId: result._id }, {
                                        $or: [{ industry: { $regex: req.body.search } }, { title: { $regex: req.body.search } }, { title: { $regex: req.body.search } },
                                        { country: req.body.country }, { city: req.body.city }, { jobType: req.body.jobType }]
                                   }
                                   ]
                              }, options, (err1, result1) => {
                                   if (err1) {
                                        globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                   } else if (result1.length == 0) {
                                        globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.NOT_FOUND);
                                   } else {
                                        res.send({ responseCode: 200, responseMessege: "Jobs found successfully", result: result1 })
                                   }
                              })
                         } else {
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 5,
                                   // select: "",
                                   sort: {
                                        createdAt: -1
                                   }
                              }
                              jobModel.paginate(
                                   {
                                        $and: [{ userId: result._id },
                                        {
                                             $or: [{ industry: req.body.industry },
                                             { country: req.body.country },
                                             { city: req.body.city },
                                             { jobType: req.body.jobType }]
                                        }]
                                   }
                                   , options, (err1, result1) => {
                                        if (err1) {
                                             globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                        } else if (result1.length == 0) {
                                             globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.NOT_FOUND);
                                        } else {
                                             res.send({ responseCode: 200, responseMessege: "Jobs found successfully", result: result1 })
                                        }
                                   })
                         }
                    }
               })
          }
     },
     applyJob: (req, res) => {
          if (!req.body.userId || !req.body.email || !req.body.mobile || !req.body.jobId) {
               globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.PARAMETER_MISSING);
          } else {
               userModel.findOne({ _id: req.body.userId }, (err, result) => {
                    if (err) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                    } else if (!result) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                    } else {

                         jobModel.findOne({ _id: req.body.jobId }, (err1, result1) => {

                              var myDate = result1.expiryDate;
                              var d2 = new Date(myDate).toISOString()
                              console.log("313=====>", d2)

                              var d1 = new Date(d2).getTime()
                              console.log("316======>", d1)
                              console.log("319====>", new Date().getTime())
                              if (d1 >= new Date().getTime()) {

                                   if (err1) {
                                        globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                   } else if (!result1) {
                                        globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.JOB_EXPIRED);
                                   } else {
                                        if (req.body.resume) {
                                             const mergeNumber = req.body.countryCode + req.body.mobile
                                             const apply = new jobApplicationModel({
                                                  profilePic: result.profilePic,
                                                  applicantId: result._id,
                                                  jobId: result1._id,
                                                  applicantName: req.body.name,
                                                  // mobile: mergeNumber,
                                                  phoneNumber: req.body.mobile,
                                                  email: req.body.email,
                                                  gender: req.body.gender,
                                                  country: req.body.country,
                                                  state: req.body.state,
                                                  city: req.body.city,
                                                  zipCode: req.body.zipCode,
                                                  resume: req.body.resume
                                             })
                                             apply.save((err2, result2) => {
                                                  if (err2) {
                                                       res.send({ responseCode: 500, responseMessege: "Something went wrong" })
                                                  } else {
                                                       jobModel.findOneAndUpdate({ _id: req.body.jobId }, { $addToSet: { applicants: req.body.userId } }, { new: true }, (err4, saveIdData) => {
                                                            if (err4) {
                                                                 return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                            } else {
                                                                 console.log("Add applicants id", saveIdData, req.body.userId);
                                                                 let body = `Dear ${result.firstName}, You have successfully applied for the job.<br>
                                                                  See from this link:<a href=${global.gConfig.websiteURL}> click <a>`
                                                                 commonFunction.emailSender(req.body.email, "Job applied successfully",body, (err3, result3) => {
                                                                      if (err3) {
                                                                           console.log("something went wrong")
                                                                      } else {
                                                                           var mergeMobileNumber = req.body.countryCode + req.body.mobile;
                                                                           commonFunction.smsSender(mergeMobileNumber, "You have successfully applied for the job", (error, smsSend) => {
                                                                                if (error) {
                                                                                     console.log("something went wrong")
                                                                                } else {
                                                                                     console.log("sms sent successfully ", smsSend) 
                                                                                }
                                                                           })
                                                                           console.log("email sent successfully", result3)
                                                                           userModel.findOne({ _id: result1.userId, status: "ACTIVE" }, (err4, result4) => {
                                                                                if (err4) {
                                                                                     console.log("something went wrong")
                                                                                } else if (!result4) {
                                                                                     console.log("User not found")
                                                                                } else {
                                                                                     console.log("user found successfully", result4)
                                                                                     commonFunction.emailSender(result4.email, "You have got a new application for the job", `Somebody Applied to your posted job and you can see from this link:${global.gConfig.jobURL}`, (err5, result5) => {
                                                                                          if (err5) {
                                                                                               console.log("something went wrong")
                                                                                          } else {
                                                                                               console.log("email sent successfully", result5)
                                                                                               var mobileNumber = result4.countryCode + result4.phoneNumber;
                                                                                               commonFunction.smsSender(mobileNumber, "Somebody Applied to your posted job", (error, smsSend) => {
                                                                                                    if (error) {
                                                                                                         console.log("something went wrong")
                                                                                                    } else {
                                                                                                         console.log("sms sent successfully ", smsSend)
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
                                                       res.send({ responseCode: 200, responseMessege: "Job applied successfully", result: result2._id })
                                                  }
                                             })
                                        }
                                   }
                              }
                              else {
                                   res.send({ responseCode: 404, responseMessege: "Job has been expired" })
                              }
                         })
                    }
               })
          }
     },
     viewAppliedJob: (req, res) => {
          try {
               userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                    if (err) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                    } else if (!result) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                    } else {
                         jobApplicationModel.find({ applicantId: result._id, appliedJobStatus: "PENDING" }).populate({ path: 'jobId', match: { jobStatus: "ACTIVE" } }).exec((err1, result1) => {
                              if (err1) {
                                   globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                              } else if (!result1) {
                                   globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                              } else {
                                   res.send({ responseCode: 200, responseMessege: "Applied job details", result: result1 })
                              }
                         })
                    }
               })
          } catch (error) {
               res.send({ responseCode: 500, responseMesssage: "Something went wrong" })
          }
     },
     jobApplicants: (req, res) => {
          try {
               userModel.findOne({ _id: req.body.userId }, (err, result) => {
                    if (err) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                    } else if (!result) {
                         globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                    } else {
                         jobModel.findOne({ _id: req.body.jobId }, (err1, result1) => {
                              if (err1) {
                                   globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                              } else if (!result1) {
                                   globalResponse.commonResponse(res, globalStatusCode.ErrorCode.NOT_FOUND, globalMessege.ErrorMessage.USER_FOUND);
                              } else {
                                   jobApplicationModel.find({ jobId: result1._id }).count().exec((err2, result2) => {
                                        console.log("fffffffffffffffffffffffffff", result2)
                                        if (err2) {
                                             globalResponse.commonResponse(res, globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR, globalMessege.ErrorMessage.INTERNAL_ERROR);
                                        } else if (result2 == 0) {
                                             return res.send({ responseCode: 200, responseMessege: "Job details", result: result1 })
                                        } else {
                                             const result = {
                                                  result: result1,
                                                  applicants: result2
                                             }
                                             return res.send({ responseCode: 200, responseMessege: "Job details", result: result })
                                        }
                                   });
                              }
                         })
                    }
               })
          } catch (error) {
               res.send({ responseCode: 500, responseMesssage: "Something went wrong" })
          }
     },
     hideAndDeletePostedJob: (req, res) => {
          console.log("547====>", req.body)
          try {
               if (!req.body.userId || !req.body.jobId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               } else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (err, result) => {
                         console.log("553====>", err, result)
                         if (err) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              if (req.body.type == "HIDE") {
                                   jobModel.findOneAndUpdate({ _id: req.body.jobId, jobStatus: "ACTIVE" },
                                        {
                                             $set: { jobStatus: "HIDE" }
                                        },
                                        { new: true },
                                        (err1, result1) => {
                                             console.log("566===>".err1, result1.jobId)
                                             if (err1) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             } else {
                                                  return res.send({ responseCode: 200, responseMessage: "Job hide successfully", result: result1 })
                                             }
                                        })
                              }
                              if (req.body.type == "DELETE") {
                                   jobModel.findOneAndUpdate({ _id: req.body.jobId, userId: result._id, jobStatus: "ACTIVE" },
                                        {
                                             $set: { jobStatus: "DELETE" }
                                        },
                                        { new: true },
                                        (err1, result1) => {
                                             if (err1) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             } else {
                                                  return res.send({ responseCode: 200, responseMessage: "Job delete successfully", result: result1 })
                                             }
                                        })
                              }
                              if (req.body.type == "ARCHIVE") {
                                   jobModel.findOneAndUpdate({ _id: req.body.jobId, userId: result._id, jobStatus: "ACTIVE" },
                                        {
                                             $set: { jobStatus: "ARCHIVE" }
                                        },
                                        { new: true },
                                        (err1, result1) => {
                                             if (err1) {
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                             } else {
                                                  return res.send({ responseCode: 200, responseMessage: "Job ARCHIVED successfully", result: result1 })
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
}