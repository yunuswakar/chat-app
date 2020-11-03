const userModel = require("../models/userModel")
const notificationModel = require("../models/notificationModel")
const feedback = require("../models/feedbackModel")
const sellOnAuctionModel = require("../models/sellOnAuctionModel")
const auctionModel = require("../models/auctionModel")
const payment = require("../models/paymentModel")
const wishlist = require("../models/wishlistModel")
const commonFunction = require("../helperFunctions/commonFunction");
const biddingModel = require("../models/biddingModel")
const stripe = require('stripe')('sk_test_L8oA9O5IOgtmflzWMndmmEhR')
const _ = require("lodash")
const mongoose = require("mongoose")
const webNotification = require("../models/webNotification")



module.exports = {

     biddingByCategory: (req, res) => {
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               }
               else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (userError, userData) => {
                         if (userError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!userData) {
                              return res.send({ responseCode: 404, responseMessage: "User not found" })
                         } else {
                              if (req.body.categoryId && req.body.searchByProduct) {
                                   let query = {};
                                   if (req.body.searchByProduct) {
                                        query.auctionProductName = new RegExp('^' + req.body.searchByProduct, "i"),
                                             query.categoryId = req.body.categoryId,
                                             query.docStatus = "ACTIVE"
                                   }
                                   let options = {
                                        page: req.body.pageNumber || 1,
                                        limit: req.body.limit || 10,
                                        sort: { createdAt: -1 }
                                   }

                                   sellOnAuctionModel.paginate(query, options, (videoError, productData) => {
                                        if (videoError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (productData.docs.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: "Product not found" })
                                        }
                                        else {
                                             return res.send({ responseCode: 200, responseMessage: "Product found successfully", productData })
                                        }
                                   })
                              }
                              else if (req.body.categoryId && req.body.searchBySubCategory) {
                                   let query = {};
                                   if (req.body.searchBySubCategory) {
                                        query.auctionSubCategoryName = new RegExp('^' + req.body.searchBySubCategory, "i");
                                        query.categoryId = req.body.categoryId,
                                             query.status = "ACTIVE",
                                             categoryType = "SUBCATEGORY"
                                   }

                                   auctionModel.find(query, (videoError, subCategoryData) => {
                                        if (videoError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (subCategoryData.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                                        }
                                        else {
                                             return res.send({ responseCode: 200, responseMessage: " SubCategory found successfully", subCategoryData })
                                        }
                                   })
                              }
                              else if (req.body.serachByCategory) {
                                   let query = {};
                                   if (req.body.serachByCategory) {
                                        query.auctionCategoryName = new RegExp('^' + req.body.serachByCategory, "i"),
                                             query.status = "ACTIVE",
                                             query.categoryType = "CATEGORY"
                                   }
                                   auctionModel.find(query, (categoryError, categoryData) => {
                                        if (categoryError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", categoryError })
                                        } else if (categoryData.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: "Category not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: categoryData })
                                        }
                                   })
                              }
                              else if (req.body.serachByProduct) {
                                   let query = {};
                                   if (req.body.serachByProduct) {
                                        query.auctionProductName = new RegExp('^' + req.body.serachByProduct, "i"),
                                             query.docStatus = "ACTIVE"
                                   }


                                   let options = {
                                        page: req.body.pageNumber || 1,
                                        limit: req.body.limit || 7,
                                        sort: { createdAt: -1 }
                                   }
                                   sellOnAuctionModel.paginate(query, options, (categoryError, categoryData) => {
                                        if (categoryError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", categoryError })
                                        } else if (categoryData.docs.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: "product not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "product found successfully", result: categoryData })
                                        }
                                   })
                              }
                              else if (req.body.subCategoryId && req.body.searchByProduct) {
                                   let query = {};
                                   if (req.body.searchByProduct) {
                                        query.productName = new RegExp('^' + req.body.searchByProduct, "i");
                                        query.subCategoryId = req.body.subCategoryId,
                                             query.status = "ACTIVE"
                                   }
                                   let options = {
                                        page: req.body.pageNumber || 1,
                                        limit: req.body.limit || 10,
                                        sort: { createdAt: -1 }
                                   }
                                   sellOnAuctionModel.paginate(query, options, (categoryError, categoryData) => {
                                        if (categoryError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", categoryError })
                                        } else if (categoryData.docs.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: " product not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "product found successfully", result: categoryData })
                                        }
                                   })
                              }
                              else if (req.body.categoryId) {
                                   let query = {};
                                   query.categoryId = req.body.categoryId,
                                        query.status = "ACTIVE",
                                        categoryType = "SUBCATEGORY"

                                   auctionModel.find(query, (categoryError, categoryData) => {
                                        if (categoryError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", categoryError })
                                        } else if (categoryData.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: " SubCategory not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", result: categoryData })
                                        }
                                   })
                              }
                              else {
                                   let query = {};
                                   query.categoryType = "CATEGORY"
                                   auctionModel.find(query, (categoryError, categoryData) => {
                                        if (categoryError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", categoryError })
                                        } else if (categoryData.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: " Category not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: categoryData })
                                        }
                                   })
                              }
                         }
                    })
               }
          } catch (error) {
               console.log("529=====>", error)
               res.send({ responseCode: 500, responseMessege: "Something went wrong" })
          }
     },

     biddBySearch: (req, res) => {
          let query = {};
          if (req.body.search) {
               query.auctionProductName = new RegExp('^' + req.body.search, "i"),
                    query.docStatus = "ACTIVE"
          }
          let options = {
               page: req.body.pageNumber || 1,
               limit: req.body.limit || 10,
               sort: { createdAt: -1 }
          }
          sellOnAuctionModel.paginate(query, options, (productError, productData) => {
               if (productError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
               } else if (productData.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "product not found" })
               } else {
                    return res.send({ responseCode: 200, responseMessage: "product found successfully", result: productData })
               }
          })
     },
     popularAuctionCategory: (req, res) => {
          let query = {
               $and: [{ status: { $ne: "DELETE" } }, { categoryType: "CATEGORY" }]
          }
          if (req.body.serach) {
               query.auctionCategoryName = new RegExp('^' + req.body.serach, "i"),
                    query.status = "ACTIVE",
                    query.categoryType = "CATEGORY"

          }
          let options = {
               page: req.body.pageNumber || 1,
               limit: req.body.limit || 5,
               sort: { createdAt: -1 }
          }

          auctionModel.paginate(query, options, (categoryError, categoryData) => {
               if (categoryError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", categoryError })
               } else if (categoryData.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Category not found" })
               } else {
                    return res.send({ responseCode: 200, responseMessage: "Category found successfully", result: categoryData })
               }
          })

     },
     popularBiddingProduct: (req, res) => {
          let query = { docStatus: { $ne: "DELETE" } };
          if (req.body.serach) {
               query.auctionProductName = new RegExp('^' + req.body.serach, "i"),
                    query.docStatus = "ACTIVE"

          }
          // let query = {status:{$ne:"DELETE"}};
          // query.productName = new RegExp('^' + req.body.serachByProduct, "i");
          let options = {
               page: req.body.pageNumber || 1,
               limit: req.body.limit || 6,
               sort: { createdAt: -1 }
          }
          sellOnAuctionModel.paginate(query, options, (productError, productData) => {
               if (productError) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", productError })
               } else if (productData.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "product not found" })
               } else {
                    return res.send({ responseCode: 200, responseMessage: "product found successfully", result: productData })
               }
          })
     },

     biddingBySubCategory: (req, res) => {
          try {
               if (!req.body.userId) {
                    res.send({ responseCode: 401, responseMessege: "Parameter missing" })
               } else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", status: { $ne: "DELETE" } }, async (userError, userData) => {
                         if (userError) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         } else if (!userData) {
                              return res.send({ responseCode: 404, responseMessage: " User not found" })
                         } else {
                              if (req.body.subCategoryAuctionId) {

                                   auctionModel.findOne({ _id: req.body.subCategoryAuctionId, categoryType: "SUBCATEGORY", status: { $ne: "DELETE" } }, (auctionError, auctionData) => {
                                        if (auctionError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (!auctionData) {
                                             return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", auctionData })
                                        }
                                   })
                              }
                              else if (req.body.search) {
                                   let query = {  
                                        $and: [{ status: { $ne: "DELETE" } }, { categoryType: "SUBCATEGORY" }, {
                                             $or: [{ auctionCategoryName: { $regex: req.body.search, $options: 'i' } },
                                             { auctionSubCategoryName: { $regex: req.body.search, $options: 'i' } }]
                                        }]
                                   }
                                   let options = {
                                        page: req.body.pageNumber || 1,
                                        limit: req.body.limit || 5,
                                        sort: {
                                             createdAt: -1
                                        },
                                        populate: { path: 'categoryId', select: 'auctionCategoryName' }

                                   }
                                   auctionModel.paginate(query, options, (auctionError, auctionData) => {
                                        console.log(">>>>>>>>>>>>>>>>>>>>>>>>..584", options)
                                        if (auctionError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (auctionData.docs.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: "SubCategory not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", auctionData })
                                        }
                                   })
                              }
                              else if (req.body.subCategoryId) {     
                                   // let query = {
                                   //      $and: [{ status: { $ne: "DELETE" } }, { categoryType: "SUBCATEGORY" }, {
                                   //           $or: [{ auctionCategoryName: { $regex: req.body.search, $options: 'i' } },
                                   //           { auctionSubCategoryName: { $regex: req.body.search, $options: 'i' } }]
                                   //      }]
                                   // }
                                   let query = { docStatus: { $ne: "DELETE" } };
                                   query.subCategoryId = req.body.subCategoryId


                                   let options = {
                                        page: req.body.pageNumber || 1,
                                        limit: req.body.limit || 5,
                                        sort: {
                                             createdAt: -1
                                        }
                                   }
                                   sellOnAuctionModel.paginate(query, options, (auctionError, auctionData) => {
                                        console.log(">>>>>>>>>>>>>>>>>>>>>>>>..584", options)
                                        if (auctionError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (auctionData.docs.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: "Product not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "Product found successfully", auctionData })
                                        }
                                   })
                              }

                              else {
                                   let query = {
                                        $and: [{ status: { $ne: "DELETE" } }, { categoryType: "SUBCATEGORY" }]
                                   }
                                   let options = {
                                        page: req.body.pageNumber || 1,
                                        limit: req.body.limit || 5,
                                        sort: {
                                             createdAt: -1
                                        },


                                   }
                                   auctionModel.paginate(query, options, (auctionError, auctionData) => {
                                        if (auctionError) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else if (auctionData.docs.length == 0) {
                                             return res.send({ responseCode: 404, responseMessage: " SubCategory not found" })
                                        } else {
                                             return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", auctionData })
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

     biddingByProduct: (req, res) => {
          console.log("427===>", req, res)
          if (!req.body.userId) {
               return res.send({ responseCode: 404, responseMessage: "Parameter missing" })
          }
          else {
               userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userData) => {
                    if (error) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!userData) {
                         return res.send({ responseCode: 404, responseMessage: "User not found" })
                    }
                    else {
                         if (req.body.productId) {
                              sellOnAuctionModel.findOne({ _id: req.body.productId, docStatus: "ACTIVE", status: "Pending" }, (productError, productData) => {
                                   if (productError) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                   }
                                   else if (!productData) {
                                        return res.send({ responseCode: 404, responseMessage: "Product not found" })
                                   }
                                   else {
                                        return res.send({ responseCode: 200, responseMessage: "Product Data found successfully", result: productData })
                                   }
                              })
                         }
                         else if (req.body.search) {
                              let query = { docStatus: "ACTIVE", status: "Pending", endTime: { $gte: new Date().toISOString() } };
                              query.$or = [
                                   { auctionProductName: new RegExp('^' + req.body.search, "i") },
                                   { auctionCategoryName: new RegExp('^' + req.body.search, "i") },
                                   { auctionSubCategoryName: new RegExp('^' + req.body.search, "i") }
                              ]

                              sellOnAuctionModel.find(query, (err1, result1) => {
                                   if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                   } else if (result1.length == 0) {
                                        return res.send({ responseCode: 404, responseMessage: "Product not found" })
                                   } else {
                                        return res.send({ responseCode: 200, responseMessage: "Product Data found successfully", result: result1 })
                                   }
                              })
                         }
                         else if (req.body.categoryId && req.body.subCategoryId) {
                              let query = { docStatus: "ACTIVE", status: "Pending", endTime: { $gte: new Date().toISOString() } };
                              query.categoryId = req.body.categoryId
                              query.subCategoryId = req.body.subCategoryId
                              let options = {
                                   page: req.body.pageNumber || 1,
                                   limit: req.body.limit || 5,
                                   sort: {
                                        createdAt: -1
                                   }
                              }
                              sellOnAuctionModel.paginate(query, options, (err1, result1) => {
                                   if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                   } else if (result1.docs.length == 0) {
                                        return res.send({ responseCode: 404, responseMessage: "Product not found" })
                                   } else {
                                        return res.send({ responseCode: 200, responseMessage: "Product found successfully", result: result1 })
                                   }
                              })
                         }
                         else {

                              sellOnAuctionModel.find({ docStatus: "ACTIVE", status: "Pending", endTime: { $gte: new Date().toISOString() } }, (err1, result1) => {
                                   console.log("519==>", err1, result1)
                                   if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                                   } else if (result1.length == 0) {
                                        return res.send({ responseCode: 404, responseMessage: "Product not found" })
                                   } else {
                                        return res.send({ responseCode: 200, responseMessage: "Product found successfully", result: result1 })
                                   }
                              })
                         }
                    }
               })

          }
     },

     biddingByUser: (req, res) => {
          try {
               if (!req.body.auctionId || !req.body.bidderId || !req.body.enterBidding) {
                    res.send({ responseCode: 400, responseMessage: "Parameter missing" })
               }
               else {
                    sellOnAuctionModel.findOne({ _id: req.body.auctionId, status: "Pending" }).populate('userId', 'email').exec((error, result) => {
                         if (error) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                         }
                         else if (!result) {
                              return res.send({ responseCode: 404, responseMessage: "Auction data not found" })
                         }
                         else {
                              userModel.findOne({ _id: req.body.bidderId, status: "ACTIVE" }, (error, userData) => {
                                   if (error) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                   }
                                   else if (!userData) {
                                        return res.send({ responseCode: 404, responseMessage: "User data not found" })
                                   }
                                   else {
                                        // console.log("606===>", result.startTime, result.endTime)
                                        // console.log("607===>", result.startTime <= req.body.startTime ?true:false)
                                        // console.log("608===>", req.body.startTime<=result.endTime ? true : false)
                                        if (result.startTime <= req.body.startTime && req.body.startTime <= result.endTime) {
                                             if (req.body.enterBidding >= result.productInitialCost) {
                                                  let obj1 = new biddingModel({
                                                       "bidderId": req.body.bidderId,
                                                       "enterBidding": req.body.enterBidding,
                                                       "auctionId": req.body.auctionId,
                                                       "auctionProductName": result.auctionProductName,
                                                       "images": result.productImages,
                                                       "auctionCategoryName": result.auctionCategoryName,
                                                       "auctionSubCategoryName": result.auctionSubCategoryName,
                                                       "productInitialCost": result.productInitialCost,
                                                       "location": result.location,
                                                       "startTime": result.startTime,
                                                       "bidderName": userData.firstName + " " + userData.lastName,
                                                       "profilePic": userData.profilePic,
                                                       "userId": result.userId,
                                                       "email": userData.email

                                                  })
                                                  obj1.save((error1, biddingData) => {
                                                       if (error1) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error22", error1 })
                                                       }
                                                       else {
                                                            let body = `Dear ${biddingData.bidderName}, Your have successfully bidd this product <br>
                                                                  See from this link:<a href=${global.gConfig.biddURL}> click <a>`
                                                            commonFunction.emailSenderBidder(userData.email, "Bayise bidded product", body, biddingData.images[0].image, (emailErr, emailResult) => {
                                                                 if (emailErr) {
                                                                      return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                 }
                                                                 else {
                                                                      commonFunction.emailSenderSeller(result.userId.email, "Congratulation your product has been bidded by new user", result.sellerName, biddingData.enterBidding, (sellErr, sellResult) => {
                                                                           console.log("661====>", result.userId.email)
                                                                           if (sellErr) {
                                                                                return res.send({ responseCode: 500, responseMessage: "Internal server error22", sellErr })
                                                                           }
                                                                           else {
                                                                                return res.send({ responseCode: 200, responseMessage: "Bidding added successfully", biddingData })

                                                                           }
                                                                      })

                                                                 }
                                                            })
                                                       }
                                                  })
                                             }
                                             else {
                                                  res.send({ responseCode: 404, responseMessage: "You can not enter less than initial biding" })
                                             }
                                        }
                                        else {
                                             res.send({ responseCode: 404, responseMessage: "Bidding product time is expired" })

                                        }
                                   }//
                              })
                         }
                    })
               }

          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch" })
          }
     },

     viewBidding: (req, res) => {
          try {
               let query = {}
               if (req.body.maxPrice && req.body.minPrice) {
                    query.$and = [{
                         enterBidding: { $lte: req.body.maxPrice }
                    },
                    {
                         enterBidding: { $gte: req.body.minPrice }
                    }]
               }
               if (req.body.search) {
                    query.$or = [
                         { auctionCategoryName: new RegExp('^' + req.body.search, "i") },
                         { location: new RegExp('^' + req.body.search, "i") },
                    ]
               }
               let options = {
                    page: req.body.pageNumber || 1,
                    limit: req.body.limit || 10,
                    sort: { createdAt: -1 }
               }
               biddingModel.paginate(query, options, (error, biddingData) => {
                    if (error) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                    }
                    else if (biddingData.docs.length == 0) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         return res.send({ responseCode: 200, responseMessage: "Data found successfully", biddingData })
                    }
               })
               // }
          }
          catch (error) {
               console.log("9169>>>>>>>>>>>", error)
               return res.send({ responseCode: 500, responseMessage: "Error in catch" })
          }
     },

     addwishlistBidding: (req, res) => {
          try {
               userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, result) => {
                    if (userError) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", userError })
                    }
                    else if (!result) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         sellOnAuctionModel.findOne({ _id: req.body.productId }, (productErr, productResult) => {
                              if (productErr) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                              }
                              else if (!productResult) {
                                   return res.send({ responseCode: 404, responseMessage: "Data not found" })
                              }
                              else {
                                   wishlist.findOne({ userId: req.body.userId, status: "ACTIVE" }, (wishListErr, wishListResult) => {
                                        if (wishListErr) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else if (wishListResult) {
                                             wishlist.findOneAndUpdate({ userId: req.body.userId }, { $addToSet: { wishList: productResult._id } }, { new: true }).populate("userId", "firstName").exec((updateErr, updateResult) => {
                                                  if (updateErr) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  }
                                                  else {
                                                       return res.send({ responseCode: 200, responseMessage: "Product added in wishlist" })
                                                  }
                                             })
                                        }
                                        else {
                                             var obj = {
                                                  userId: req.body.userId,
                                                  wishList: req.body.productId
                                             };
                                             new wishlist(obj).save((saveErr, saveResult) => {
                                                  if (saveErr) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  }
                                                  else {
                                                       return res.send({ responseCode: 200, responseMessage: "Product added in wishlist" })
                                                  }
                                             })
                                        }
                                   })
                              }
                         })
                    }
               })
          }
          catch (error) {
               return res.send({ responseCode: 500, responseMessage: "Error in catch" })
          }
     },

     viewWishlistBidding: (req, res) => {
          try {
               wishlist.findOne({ userId: req.body.userId }).populate("wishlist").exec((listErr, listResult) => {
                    if (listErr) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!listResult) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         return res.send({ responseCode: 200, responseMessage: "Wishlist found", listResult })
                    }
               })
          }
          catch (error) {
               return res.send({ responseCode: 500, responseMessage: "Error in catch" })
          }
     },
     removeWishList: (req, res) => {
          try {
               userModel.findOne({ _id: req.body.userId }, (err, result) => {
                    if (err) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!result) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         sellOnAuctionModel.findOne({ _id: req.body.productId }, (err2, result2) => {
                              if (err2) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                              }
                              else if (!result2) {
                                   return res.send({ responseCode: 404, responseMessage: "Data not found" })
                              }
                              else {
                                   wishlist.findOne({ userId: req.body.userId, wishList: req.body.productId }, (err3, result3) => {
                                        if (err3) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", err3 })
                                        }
                                        else if (!result3) {
                                             return res.send({ responseCode: 404, responseMessage: "Data not found1" })
                                        }
                                        else {
                                             wishlist.findOneAndUpdate({ userId: req.body.userId }, { $pull: { wishList: result2._id } }, { new: true }, (updateErr, updateResult) => {
                                                  if (updateErr) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error", updateErr })
                                                  }
                                                  else {
                                                       if (updateResult.wishList.length == 0) {
                                                            wishlist.deleteOne({ userId: req.body.userId }, (deleteErr, deleteResult) => {
                                                                 if (deleteErr) {
                                                                      return res.send({ responseCode: 500, responseMessage: "Internal server error", deleteErr })
                                                                 }
                                                                 else {
                                                                      return res.send({ responseCode: 200, responseMessage: "Wishlist deleted successfully", deleteResult })
                                                                 }
                                                            })
                                                       }
                                                       else {
                                                            return res.send({ responseCode: 200, responseMessage: "Wishlist deleted successfully" })
                                                       }
                                                  }
                                             })
                                        }
                                   })
                              }
                         })
                    }
               })
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },

     sellOnAuction: (req, res) => {
          try {
               if (!req.body.categoryId || !req.body.subCategoryId || !req.body.userId || !req.body.productImages) {
                    res.send({ responseCode: 400, responseMessage: "Parameter missing" })
               }
               else {
                    auctionModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (error, categoryData) => {
                         if (error) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                         }
                         else if (!categoryData) {
                              return res.send({ responseCode: 404, responseMessage: "Data not found1" })
                         }
                         else {
                              auctionModel.findOne({ _id: req.body.subCategoryId, status: "ACTIVE" }, (error, subCatData) => {
                                   if (error) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                   }
                                   else if (!subCatData) {
                                        return res.send({ responseCode: 404, responseMessage: "Data not found2" })
                                   }
                                   else {
                                        userModel.aggregate([
                                             { $match: { _id: mongoose.Types.ObjectId(req.body.userId), status: "ACTIVE" } },
                                             { $unwind: "$cardDetails" },
                                             { $match: { 'cardDetails._id': mongoose.Types.ObjectId(req.body.cardId) } }
                                        ], (error, userData) => {
                                             console.log("8994=====>", error, userData)
                                             if (error) {
                                                
                                                  return res.send({ responseCode: 500, responseMessage: "Internal server error",error})
                                             } else if (userData.length == 0) {
                                                  return res.send({ responseCode: 404, responseMessage: "Data not found3" })
                                             } else {
                                                  commonFunction.multipleImageUploadCloudinary(req.body.productImages, (imgError, imageData) => {
                                                       if (imgError) {
                                                            console.log("9201>>>>>>>>>>>>>>>>", imgError)
                                                            return res.send({ responseCode: 500, responseMessage: "Image error", imgError })
                                                       }
                                                       else {
                                                            console.log("result is", imageData)
                                                            var imageArray = [];
                                                            imageData.forEach(a => imageArray.push({ image: a }));
                                                            console.log("The newsPic before save is:....", imageArray);

                                                            let obj = new sellOnAuctionModel({
                                                                 "userId": req.body.userId,
                                                                 "categoryId": req.body.categoryId,
                                                                 "subCategoryId": req.body.subCategoryId,
                                                                 "auctionProductName": req.body.auctionProductName,
                                                                 "auctionProductDescription": req.body.auctionProductDescription,
                                                                 "productImages": imageArray,
                                                                 "productInitialCost": req.body.productInitialCost,
                                                                 "country": req.body.country,
                                                                 "state": req.body.state,
                                                                 "location": req.body.location,
                                                                 "auctionSubCategoryName": subCatData.auctionSubCategoryName,
                                                                 "auctionCategoryName": categoryData.auctionCategoryName,
                                                                 "startTime": req.body.startTime,
                                                                 "endTime": req.body.endTime,
                                                                 "sellerName": userData[0].firstName,
                                                                 "cardDetails": userData[0].cardDetails

                                                            })
                                                            obj.save((error, biddingData) => {
                                                                 if (error) {
                                                                      return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                                                 }
                                                                 else {
                                                                      biddingModel.find({}, (biddErr, biddResult) => {
                                                                           biddResult.forEach(a => {
                                                                                if (a.userId == req.body.userId) {
                                                                                     commonFunction.emailSenderAllUser(a.email, "Bidd new product", a.bidderName, biddingData.productImages[0].image, (emailErr, emailResult) => {
                                                                                          console.log("1013====>", emailErr, emailResult)
                                                                                          if (emailErr) {
                                                                                               console.log({ responseCode: 500, responseMessage: "Internal server error", emailErr })
                                                                                          }
                                                                                          else {
                                                                                               console.log({ responseCode: 200, responseMessage: "Bidding added successfully", biddingData })

                                                                                          }
                                                                                     })


                                                                                }

                                                                           })
                                                                           res.send({ responseCode: 200, responseMessage: "Bidding added successfully", biddingData })
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

                    })


               }
          }
          catch (error) {
               console.log("9246>>>>>>>", error)
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },

     sellOnAuctionHistory: (req, res) => {
          try {
               sellOnAuctionModel.find({ userId: req.body.userId, status: { $ne: "Cancel" } }, (error, auctionData) => {
                    if (error) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                    }
                    else if (!auctionData) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {

                         return res.send({ responseCode: 200, responseMessage: "Auction data found successfully", auctionData })
                    }
               })
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },
     myBiddingHistory: (req, res) => {
          try {
               biddingModel.find({ bidderId: req.body.bidderId, docStatus: "ACTIVE" }, (error, bidderData) => {
                    console.log("991==>".erroe, bidderData)
                    if (error) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                    }
                    else if (bidderData.length == 0) {
                         return res.send({ responseCode: 404, responseMessage: "Bidder not found" })
                    }
                    else {
                         return res.send({ responseCode: 200, responseMessage: "Bidder data found successfully", bidderData })
                    }
               })
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },
     participantDetail: (req, res) => {
          try {
               sellOnAuctionModel.findOne({ userId: req.body.userId }, (error, result) => {
                    if (error) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                    }
                    else if (!result) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         biddingModel.find({ auctionId: req.body.auctionId }).select("enterBidding bidderName status profilePic").exec((error, biddingData) => {
                              if (error) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                              }
                              else if (!biddingData) {
                                   return res.send({ responseCode: 404, responseMessage: "Data not found" })
                              }
                              else {
                                   res.send({ responseCode: 200, responseMessage: "Particicpant data found successfully", biddingData })
                              }
                         })
                    }
               })
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },

     ViewBiddingProductImg: (req, res) => {
          try {
               if (!req.body.productId) {
                    res.send({ responseCode: 400, responseMessage: "Parameter missing" })
               }
               else {
                    biddingModel.findOne({ _id: req.body.productId }, (error, biddingData) => {
                         if (error) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         }
                         else if (!biddingData) {
                              return res.send({ responseCode: 404, responseMessage: "Data not found" })
                         }
                         else {
                              var data = {
                                   "image": biddingData.image
                              }
                              return res.send({ responseCode: 200, responseMessage: "Data found successfully", data })
                         }
                    })
               }
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch" })
          }
     },
     upadteBiddingStatus: (req, res) => {
          try {
               if (!req.body.biddingId || !req.body.userId || !req.body.status) {
                    res.send({ responseCode: 400, responseMessage: "Parameter missing" })
               }
               else {
                    if (req.body.status == "Approved") {

                         userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userResult) => {
                              if (userError) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error", error1 })
                              }
                              else if (!userResult) {
                                   return res.send({ responseCode: 404, responseMessage: "User data not found" })
                              }
                              else {
                                   sellOnAuctionModel.findOne({ userId: userResult._id }, (error1, result1) => {
                                        console.log("9384=======>", error1, result1);

                                        if (error1) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", error1 })
                                        }
                                        else if (!result1.userId) {
                                             return res.send({ responseCode: 404, responseMessage: "User data not found" })
                                        }
                                        else {
                                             var set = {};
                                             if (req.body.status) {
                                                  set['status'] = req.body.status
                                             }

                                             biddingModel.findOneAndUpdate({ _id: req.body.biddingId, status: "Pending" },
                                                  { $set: set }, { new: true }).populate('bidderId', 'fcmToken firstName').exec((error, result) => {
                                                       console.log("9117>>>>>>>", result, error)
                                                       if (error) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                                       }
                                                       else if (!result) {
                                                            return res.send({ responseCode: 404, responseMessage: "bidding data not found" })
                                                       }
                                                       else {
                                                            console.log("1072====>", result.bidderId.fcmToken)
                                                            if (result.bidderId.fcmToken != null) {
                                                                 commonFunction.pushNotification(result.bidderId.fcmToken, 'Hello', `${result.bidderName}` + ` you can purchase your bidd product`, (err1, result2) => {
                                                                      console.log("111111>....", result.bidderId.fcmToken)
                                                                      console.log("1232=======>", err1, result2)
                                                                      if (err1) {
                                                                           return res.send({ responseCode: 500, responseMessage: "Internal server error", err1 })
                                                                      }
                                                                      else {
                                                                           var obj = new notificationModel({
                                                                                userId: result.bidderId,
                                                                                title: 'Auction Management',
                                                                                body: `${result.bidderId.firstName}` + ` you can purchase your bidd product`,
                                                                                notificationType: "REQUEST",
                                                                                notificationStatus: "ACCEPT"
                                                                           })
                                                                           console.log("1242====", obj)
                                                                           obj.save((err3, result3) => {
                                                                                console.log("1244==========>", err3, result3)
                                                                                if (err3) {
                                                                                     console.log("err13", err13)
                                                                                }
                                                                                else {
                                                                                     sellOnAuctionModel.findOneAndUpdate({ _id: result.auctionId, status: "Pending" }, { $set: { status: "Completed" } }, { new: true }, (aucErr, aucResult) => {
                                                                                          if (aucErr) {
                                                                                               return res.send({ responseCode: 500, responseMessage: "Internal server error", aucErr })
                                                                                          }

                                                                                          else {
                                                                                               res.send({ responseCode: 200, responseMessage: "Status Approved successfully" })
                                                                                          }
                                                                                     })
                                                                                }
                                                                           })
                                                                      }
                                                                 })
                                                            }
                                                            else if (result.bidderId.fcmToken == null) {
                                                                 console.log("1111aaaaaaaa")
                                                                 var obj = new webNotification({
                                                                      userId: result.bidderId,
                                                                      title: 'Auction Management',
                                                                      body: `Hello ${result.bidderId.firstName}` + ` you can purchase your bidd product`,
                                                                      notificationType: "REQUEST",
                                                                      notificationStatus: "ACCEPT"
                                                                 })
                                                                 console.log("1242====", obj)
                                                                 obj.save((err3, result3) => {
                                                                      console.log("1244==========>", err3, result3)
                                                                      if (err3) {
                                                                           console.log("err13", err13)
                                                                      }
                                                                      else {
                                                                           sellOnAuctionModel.findOneAndUpdate({ _id: result.auctionId, status: "Pending" }, { $set: { status: "Completed" } }, { new: true }, (aucErr, aucResult) => {
                                                                                if (aucErr) {
                                                                                     return res.send({ responseCode: 500, responseMessage: "Internal server error", aucErr })
                                                                                }

                                                                                else {
                                                                                     res.send({ responseCode: 200, responseMessage: "Status Approved successfully" })
                                                                                }
                                                                           })
                                                                      }
                                                                 })
                                                            }
                                                       }
                                                  })
                                        }
                                   })
                              }
                         })
                    }
                    else {
                         userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userResult) => {
                              if (userError) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error", error1 })
                              }
                              else if (!userResult) {
                                   return res.send({ responseCode: 404, responseMessage: "User data not found" })
                              }
                              else {
                                   sellOnAuctionModel.findOne({ userId: userResult._id }, (error1, result1) => {
                                        console.log("9384=======>", error1, result1);

                                        if (error1) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", error1 })
                                        }
                                        else if (!result1.userId) {
                                             return res.send({ responseCode: 404, responseMessage: "User data not found" })
                                        }
                                        else {
                                             var set = {};
                                             if (req.body.status) {
                                                  set['status'] = req.body.status
                                             }
                                             biddingModel.findOneAndUpdate({ _id: req.body.biddingId },
                                                  { $set: set }, { new: true }, (error, result) => {
                                                       console.log("9117>>>>>>>", result, error)
                                                       if (error) {
                                                            return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                                       }
                                                       else if (!result) {
                                                            return res.send({ responseCode: 404, responseMessage: "bidding data not found" })
                                                       }
                                                       else {
                                                            return res.send({ responseCode: 200, responseMessage: "Status updated successfully" })
                                                       }
                                                  })
                                        }
                                   })
                              }
                         })
                    }
               }
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch" })
          }
     },


     upadteAuctionStatus: (req, res) => {
          try {
               if (!req.body.userId || !req.body.status) {
                    res.send({ responseCode: 400, responseMessage: "Parameter missing" })
               }
               else {
                    sellOnAuctionModel.findOne({ userId: mongoose.Types.ObjectId(req.body.userId), docStatus: "ACTIVE" }).exec((error1, result1) => {
                         console.log("9384=======>", error1, result1);
                         if (error1) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error", error1 })
                         }
                         else if (!result1) {
                              return res.send({ responseCode: 404, responseMessage: "User data not found" })
                         }
                         else {
                              var set = {};
                              if (req.body.status) {
                                   set['status'] = req.body.status
                              }
                              sellOnAuctionModel.findOneAndUpdate({ _id: req.body.auctionId, docStatus: "ACTIVE" },
                                   { $set: set }, { new: true }, (error, result) => {
                                        console.log("9117>>>>>>>", result, error)
                                        if (error) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                        }
                                        else if (!result) {
                                             return res.send({ responseCode: 404, responseMessage: "Auction data not found" })
                                        }
                                        else {
                                             res.send({ responseCode: 200, responseMessage: "Status updated successfully" })
                                        }
                                   })
                         }
                    })
               }
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch" })
          }
     },



     addCart: (req, res) => {
          try {
               if (!req.body.userId) {
                    return res.send({ responseCode: 404, responseMessage: "Parameter missing" })
               }
               else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userData) => {

                    })
               }
          }
          catch (error) {
               return res.send({ responseCode: 500, responseMessage: "Something went wrong" })
          }
     },

     buyBidding: (req, res) => {
          try {
               if (!req.body.biddingId || !req.body.bidderId) {
                    res.send({
                         responseCode: 204,
                         responseMessage: "Parameter is missing"
                    })
               } else {
                    biddingModel.findOne({ _id: req.body.biddingId, status: "Approved", bidderId: req.body.bidderId }, (err, result) => {
                         console.log("677=====", err, result)
                         if (err) {
                              res.send({
                                   responseCode: 500,
                                   responseMessage: "Internal server error",
                                   err
                              })
                         } else if (!result) {
                              res.send({
                                   responseCode: 404,
                                   responseMessage: "Data not found"
                              })
                         }
                         else {

                              stripe.customers.create({
                                   source: req.body.id,
                              }, (error1, customer) => {
                                   console.log("534==========>", customer)
                                   if (error1) {
                                        res.send({
                                             responseCode: 500,
                                             responseMessage: "Internal server error",
                                             error1
                                        })
                                   } else {
                                        stripe.charges.create({
                                             amount: result.enterBidding * 100,
                                             currency: "usd",
                                             customer: customer.id,
                                        }, function (error2, charge) {
                                             console.log("1234====>", error2, charge)
                                             if (error2) {
                                                  res.send({
                                                       responseCode: 500,
                                                       responseMessage: "Internal server error",
                                                       error2
                                                  })
                                             }
                                             else {
                                                  var date = new Date();
                                                  date.setDate(date.getDate() + 15);
                                                  var dateString = date.toISOString().split('T')[0];
                                                  var obj = {
                                                       transactionId: charge.balance_transaction,
                                                       chargeId: charge.id,
                                                       amount: charge.amount,
                                                       customerId: charge.customer,
                                                       url: charge.receipt_url,
                                                       transactionStatus: charge.status,
                                                       biddingId: req.body.biddingId,
                                                       bidderId: req.body.bidderId,
                                                       amount_refunded: charge.amount_refunded,
                                                       deliveryDate: dateString,
                                                       auctionId: result.auctionId,
                                                       auctionProductName: result.auctionProductName,
                                                       bidderName: result.bidderName

                                                  }
                                                  var obj1 = new payment(obj)
                                                  obj1.save(async (error4, result4) => {
                                                       if (error4) {
                                                            res.send({
                                                                 responseCode: 500,
                                                                 responseMessage: "Internal server error", error4
                                                            })
                                                       } else {
                                                            let orderData = await payment.findOne({ bidderId: req.body.bidderId, _id: result4._id });

                                                            let message = await notifyOrder(orderData)

                                                            var data = {
                                                                 orderId: result4._id,
                                                                 transactionId: result4.transactionId,
                                                                 amount: result4.amount * 100,
                                                                 createdAt: result4.createdAt,
                                                                 orderId: result4._id,
                                                                 orderStatus: result4.orderStatus
                                                            }
                                                            res.send({
                                                                 responseCode: 200,
                                                                 responseMessage: "Payment successfully done",
                                                                 data
                                                            })

                                                       }
                                                       async function notifyOrder(orderData) {
                                                            let admin = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" });
                                                            let adminNote = `Your acount has been credited USD ${orderData.amount/100} by the ${orderData.bidderName}`;
                                                            let sellerNote = `Your product has been purchased by the ${orderData.bidderName}`;
                                                            let customerNote = `Your account has been debited USD ${orderData.amount/100} for an orderId ${orderData._id}`;
                                                            let adminNotish = {
                                                                 userId: admin._id,
                                                                 title: "Amount Credited",
                                                                 body: adminNote,
                                                                 notificationType: "Credited for Auction Product"
                                                            }
                                                            let customerNotish = {
                                                                 userId: req.body.bidderId,
                                                                 title: "Amount Debited",
                                                                 body: customerNote,
                                                                 notificationType: "Debited for Auction Product"
                                                            }
                                                            let user = await biddingModel.findOne({ _id: req.body.biddingId }).populate({ path: "auctionId", populate: { path: "userId", model: "userMedia", select: "fcmToken" } })
                                                            console.log("17348=====>", user.auctionId.userId.fcmToken)
                                                            if (user.auctionId.userId.fcmToken != null) {
                                                                 commonFunction.pushNotification(user.auctionId.userId.fcmToken, "Product Sold", `Your product ${user.auctionProductName} has been purchased by the ${orderData.bidderName.split(" ")[0]}`, (err, rest) => {
                                                                      if (rest) {
                                                                           new notificationModel({
                                                                                userId: user.auctionId.userId._id,
                                                                                title: "Product Sold",
                                                                                body: `Your product ${user.auctionProductName} has been purchased by the ${orderData.bidderName.split(" ")[0]}`,
                                                                                notificationType: "Product Sold"
                                                                           }).save();
                                                                      }
                                                                 })


                                                            } if (user.auctionId.userId.fcmToken == null) {
                                                                 new webNotification({
                                                                      userId: user.auctionId.userId._id,

                                                                      title: "Product Sold",
                                                                      body: `Your product ${user.auctionProductName} has been purchased by the ${orderData.bidderName.split(" ")[0]}`,
                                                                      notificationType: "Product Sold"
                                                                 }).save();
                                                            }


                                                            let consumer = await userModel.findOne({ _id: req.body.bidderId, status: "ACTIVE" });
                                                            console.log("17362=======>", consumer)
                                                            if (consumer.fcmToken != null) {
                                                                 commonFunction.pushNotification(consumer.fcmToken, "Product Sold", `Your account has been debited USD ${orderData.amount/100} for an orderId ${orderData._id}`, (err, rest) => {
                                                                      if (rest) {
                                                                           new notificationModel({
                                                                                userId: req.body.bidderId,
                                                                                title: "Product Sold",
                                                                                body: `Your account has been debited USD ${orderData.amount/100} for an orderId ${orderData._id}`,
                                                                                notificationType: "Product Sold"
                                                                           }).save();
                                                                      }
                                                                 })

                                                            } if (await consumer.fcmToken === null) {
                                                                 await webNotification.create(adminNotish, customerNotish)
                                                            }
                                                            //  await  notificationModel.create(adminNotish , customerNotish)
                                                            return "All Notification sent fuccessfully"
                                                       }
                                                  })
                                             }
                                        });
                                   }
                              });
                         }
                    })
               }
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },

     OrderHistory: (req, res) => {
          try {
               payment.find({ bidderId: req.body.bidderId }, (error, orderData) => {
                    if (error) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                    }
                    else if (orderData.length == 0) {
                         return res.send({ responseCode: 404, responseMessage: "Order not found" })
                    }
                    else {
                         return res.send({ responseCode: 200, responseMessage: "Order detail found successfully", orderData })
                    }
               })
          }
          catch (error) {
               res.send({ responseCode: 404, responseMessage: "Error in catch", error })
          }
     },

     updateOrderStatusByBidder: (req, res) => {
          biddingModel.findOne({ 'bidderId': req.body.bidderId }).populate('bidderId').exec((error, sellerData) => {
               if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
               }
               else if (!sellerData) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    if (req.body.orderStatus == "Return") {
                         var set = {};
                         if (req.body.orderStatus) {
                              set['orderStatus'] = req.body.orderStatus
                         }
                         payment.findOne((error, paymentData) => {
                              if (error) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                              }
                              else {
                                   // var create = paymentData.createdAt.toString()
                                   // var someDate = new Date(create);
                                   // var numberOfDaysToAdd = 15;
                                   // var d = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                   // var currentTime = Date.now();
                                   // if (d >= currentTime) {
                                   payment.findByIdAndUpdate({ "_id": req.body.orderId }, { $set: set }, { new: true }, async (error, orderData) => {
                                        if (error) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else if (!orderData) {
                                             return res.send({ responseCode: 404, responseMessage: "Order data not found" })
                                        }
                                        else {
                                             let note = await notifyOrder(req.body.orderId, sellerData)
                                             console.log("1414======>", note)
                                             res.send({ responseCode: 200, responseMessage: "Order updated successfully", note })
                                        }
                                   })
                                   // }
                                   // else {
                                   //      res.send({ responseCode: 404, responseMessage: "You cant return product" })
                                   // }
                              }
                         })
                         async function notifyOrder(orderId, sellerData) {
                              let admin = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" });
                              let adminNote = `Returned:${sellerData.auctionProductName} in the order with order ID ${orderId} has been requested for return by the userId ${sellerData.bidderId}`;
                              let customerNote = `Returned:${sellerData.auctionProductName} in your order with order ID ${orderId} has been  returned `;
                              let adminNotish = {
                                   userId: admin._id,
                                   senderId: sellerData.bidderId,
                                   title: "Product Returned",
                                   body: adminNote,
                                   notificationType: "Product returned in buying/selling section"
                              }
                              let customerNotish = {
                                   userId: sellerData.bidderId,
                                   title: "Product Returned",
                                   body: customerNote,
                                   notificationType: "Product returned in buying/selling section"
                              }

                              //  let consumer = await userModel.findOne({_id:req.body.userId,status:"ACTIVE"});
                              if (sellerData.bidderId.fcmToken != null) {
                                   commonFunction.pushNotification(sellerData.bidderId.fcmToken, "Product Returned", `Returned:${sellerData.auctionProductName} in your order with order ID ${orderId} has been  returned`, (err, rest) => {
                                        if (rest) {
                                             new notificationModel({
                                                  userId: sellerData.bidderId,
                                                  title: "Product Returned",
                                                  body: `Returned:${sellerData.auctionProductName} in your order with order ID ${orderId} has been  returned `,
                                                  notificationType: "Product returned in buying/selling section"
                                             }).save();
                                        }
                                   })
                              } if (sellerData.bidderId.fcmToken == null) {
                                   await webNotification.create(adminNotish, customerNotish)
                              }
                              //  await  notificationModel.create(adminNotish , customerNotish)
                              return "All Notification sent fuccessfully"
                         }
                    }
                    else {
                         var set = {};
                         if (req.body.orderStatus) {
                              set['orderStatus'] = req.body.orderStatus
                         }
                         payment.findOneAndUpdate({ "_id": req.body.orderId }, { $set: set }, { new: true }, async (error, orderData) => {
                              if (error) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                              }
                              else if (!orderData) {
                                   return res.send({ responseCode: 404, responseMessage: "Order data not found" })
                              }
                              else {
                                   let note = await notifyOrder(req.body.orderId, sellerData)

                                   res.send({ responseCode: 200, responseMessage: "Order updated successfully", note })
                              }
                         })
                         async function notifyOrder(orderId, sellerData) {
                              let admin = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" });
                              let adminNote = `cancelled:${sellerData.auctionProductName} in the order with order ID ${orderId} has been requested for cancel by the userId ${sellerData.bidderId}`;
                              let customerNote = `cancelled:${sellerData.auctionProductName} in your order with order ID ${orderId} has been  returned `;
                              let adminNotish = {
                                   userId: admin._id,
                                   senderId: sellerData.bidderId,
                                   title: "Product cancelled",
                                   body: adminNote,
                                   notificationType: "Product cancelled in buying/selling section"
                              }
                              let customerNotish = {
                                   userId: sellerData.bidderId,
                                   title: "Product cancelled",
                                   body: customerNote,
                                   notificationType: "Product cancelled in buying/selling section"
                              }

                              //  let consumer = await userModel.findOne({_id:req.body.userId,status:"ACTIVE"});
                              if (sellerData.bidderId.fcmToken != null) {
                                   commonFunction.pushNotification(sellerData.bidderId.fcmToken, "Product cancelled", `cancelled:${sellerData.auctionProductName} in your order with order ID ${orderId} has been  cancelled`, (err, rest) => {
                                        if (rest) {
                                             new notificationModel({
                                                  userId: sellerData.bidderId,
                                                  title: "Product cancelled",
                                                  body: `cancelled:${sellerData.auctionProductName} in your order with order ID ${orderId} has been  cancelled `,
                                                  notificationType: "Product cancelled in buying/selling section"
                                             }).save();
                                        }
                                   })
                              } if (sellerData.bidderId.fcmToken == null) {
                                   await webNotification.create(adminNotish, customerNotish)
                              }
                              //  await  notificationModel.create(adminNotish , customerNotish)
                              return "All Notification sent fuccessfully"
                         }
                    }
               }
          })
     },
     updateOrderStatusBySeller: (req, res) => {
          sellOnAuctionModel.findOne({ 'userId': req.body.userId }).populate('userId').exec((error, sellerData) => {
               if (error) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
               }
               else if (!sellerData) {
                    return res.send({ responseCode: 404, responseMessage: "Data not found" })
               }
               else {
                    var set = {};
                    if (req.body.orderStatus) {
                         set['orderStatus'] = req.body.orderStatus
                    }
                    payment.findByIdAndUpdate({ "_id": req.body.orderId }, { $set: set }, { new: true }, (error, orderData) => {
                         if (error) {
                              return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                         }
                         else if (!orderData) {
                              return res.send({ responseCode: 404, responseMessage: "Order data not found" })
                         }
                         else {
                              res.send({ responseCode: 200, responseMessage: "Order updated successfully" })
                         }
                    })
               }
          })
     },

     feedbackOfOrder: (req, res) => {
          try {
               userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, result) => {
                    if (userError) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error", userError })
                    }
                    else if (!result) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         payment.findOne({ _id: req.body.orderId,orderStatus:"Delivered"}, (productErr, productResult) => {
                              if (productErr) {
                                   return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                              }
                              else if (!productResult) {
                                   return res.send({ responseCode: 404, responseMessage: "Data not found" })
                              }
                              else {
                                   feedback.findOne({ userId: req.body.userId, status: "ACTIVE" }, (wishListErr, wishListResult) => {
                                        if (wishListErr) {
                                             return res.send({ responseCode: 500, responseMessage: "Internal server error", error })
                                        }
                                        else if (wishListResult) {
                                             var set = {};
                                             if (req.body.comment) {
                                                  set["comment"] = req.body.comment
                                             }
                                             if (req.body.rating) {
                                                  set["rating"] = req.body.rating
                                             }
                                             feedback.findOneAndUpdate({ userId: req.body.userId }, { $addToSet: { orderId: productResult._id }, $set: set }, { new: true }).populate("userId", "firstName").exec((updateErr, updateResult) => {
                                                  if (updateErr) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error", updateErr })
                                                  }
                                                  else {
                                                       return res.send({ responseCode: 200, responseMessage: "Feedback added successfully" })
                                                  }
                                             })
                                        }
                                        else {
                                             var obj = {
                                                  userId: req.body.userId,
                                                  orderId: req.body.orderId,
                                                  comment: req.body.comment,
                                                  rating: req.body.rating
                                             };
                                             new feedback(obj).save((saveErr, saveResult) => {
                                                  if (saveErr) {
                                                       return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                  }
                                                  else {
                                                       return res.send({ responseCode: 200, responseMessage: "Feedback added successfully" })
                                                  }
                                             })
                                        }
                                   })
                              }
                         })
                    }
               })
          }
          catch (error) {
               return res.send({ responseCode: 500, responseMessage: "Error in catch" })
          }
     },

     getfeedback: (req, res) => {
          try {
               feedback.findOne({ userId: req.body.userId }).populate({ path: 'orderId', populate: { path: 'biddingId' } }).exec((listErr, listResult) => {
                    if (listErr) {
                         return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    }
                    else if (!listResult) {
                         return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                         return res.send({ responseCode: 200, responseMessage: "Feedback found successfully", listResult })
                    }
               })
          }
          catch (error) {
               return res.send({ responseCode: 500, responseMessage: "Error in catch" })
          }
     },

}