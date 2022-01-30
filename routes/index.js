/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
const express = require("express");// import express framework to use its dependency
const router = express.Router();// create express router from express
// import controllers of used api
const USERS = require("../app/userServices/controller/user.controller");
const MEDIA = require("../app/mediaServices/controller/media.controller");
const ADMIN = require("../app/adminServices/controller/adminController")
const POST = require("../app/postService/controller/postController")
const STORY = require("../app/storyService/controller/storyController")
const REPORT = require("../app/reportService/controller/reportController")
const BLOCK = require("../app/blockService/controller/blockController")
const CATEGORY = require("../app/categoryService/controller/categoryController")
const FOLLOW = require("../app/followService/controller/followController")
const COMMENT = require("../app/commentService/controller/commentController")
const LIKE = require("../app/likeUnlikeService/controller/likeUnlikeController")
const SUBCATEGORY = require ('../app/subCategoryService/controller/subCategoryController')
const NOTIFICATION=require('../app/notificationService/controller/notificationController')
const PRODUCT = require('../app/productService/controller/productController')
const CONTACT = require('../app/contactService/controller/contactController')
const REVIEW = require('../app/reviewService/controller/reviewController')
const FAVORITE = require('../app/favoriteService/controller/favoriteController')
const STORE = require('../app/storeServices/controller/storeController')
const SELLER = require('../app/seller/controller/seller.controller')
const CART = require('../app/cartServices/controller/cartController')
const ORDER = require('../app/orderServices/controller/orderController')
const BANNER = require('../app/bannerServices/controller/bannerController')
const CHAT = require('../app/messageServices/controller/messageController')
const handleResponse = require("../middlewares/handleResponse");
const auth = require("../middlewares/auth");
const access = require("../middlewares/checkAuth");
const TRACKING = require('../app/trackingService/controller/trackingController')
const REFUNDREQUEST = require('../app/refundRequestService/controller/refundRequest.controller')
const CONTACTUSER = require('../app/contactUserService/Controller/contactUserController')
const MEASUREMENT = require('../app/measurementService/controller/measurementController')
const SIZE = require('../app/sizeService/controller/sizeController')
require("express-group-routes"); // for express group routing
const COMMENTPRODUCT = require("../app/productCommentService/controller/productComment");



//user group
router.group("/auth", (user) => {
  user.post("/signup", USERS.signup, handleResponse.RESPONSE);
  user.post("/verifyOtp", USERS.verifyOtp, handleResponse.RESPONSE);
  user.post("/login", USERS.login, handleResponse.RESPONSE);
  user.get("/getProfile", auth.authenticate, USERS.getProfile, handleResponse.RESPONSE);
  user.put("/updateProfile", auth.authenticate, USERS.updateProfile, handleResponse.RESPONSE);
  user.put("/changePassword", auth.authenticate, USERS.changePassword, handleResponse.RESPONSE);
  user.post("/forgotPassword", USERS.forgotPassword, handleResponse.RESPONSE);
  user.delete("/deleteMany", auth.authenticate, USERS.deleteMany, handleResponse.RESPONSE);
  user.get("/getData/:id", auth.authenticate, USERS.getData, handleResponse.RESPONSE);
  user.get("/getAllUserProfile/:userId",auth.authenticate,USERS.getUserProfileData, handleResponse.RESPONSE);
  user.get("/users",auth.authenticate,USERS.users, handleResponse.RESPONSE);
  user.get("/chatList",USERS.chatList, handleResponse.RESPONSE);
  user.get("/inviteLink/:id",USERS.inviteLink, handleResponse.RESPONSE);
  user.post("/addAdress", USERS.addAdress, handleResponse.RESPONSE);
  user.get("/getAddress/:id",USERS.getAddress, handleResponse.RESPONSE);
  user.put("/updateAddress/:id", auth.authenticate, USERS.updateAddress, handleResponse.RESPONSE);
  user.delete("/deleteAddress/:id", auth.authenticate, USERS.deleteAddress, handleResponse.RESPONSE);
  user.get("/sellerDetail/:id",auth.authenticate,USERS.sellerDetail, handleResponse.RESPONSE);
  user.get("/hashTagList",auth.authenticate,USERS.hashTagList, handleResponse.RESPONSE);



  

});

//media group
router.group("/media", (data) => {
  data.put("/addStories", auth.authenticate, MEDIA.uploadStories, handleResponse.RESPONSE);
  data.get("/getStories", auth.authenticate, MEDIA.getStories, handleResponse.RESPONSE);
});

router.group("/admin", (admin) => {
  admin.get("/userList",auth.authenticate, ADMIN.userList, handleResponse.RESPONSE);
  admin.get("/adminList",auth.authenticate, ADMIN.adminList, handleResponse.RESPONSE);
  admin.get("/sellerList", auth.authenticate, ADMIN.SellerList, handleResponse.RESPONSE);
  admin.delete("/userList/:id",auth.authenticate, ADMIN.deleteUser, handleResponse.RESPONSE);
  admin.get("/dashboard",auth.authenticate, ADMIN.dashboard, handleResponse.RESPONSE)
  admin.get("/sellerdashboard",auth.authenticate, ADMIN.dashboardSeller, handleResponse.RESPONSE)
  admin.post("/add",auth.authenticate, ADMIN.AddAdmin,handleResponse.RESPONSE)
  admin.get('/getAdminStats',auth.authenticate,ADMIN.getAdminStats,handleResponse.RESPONSE)
});

router.group("/post", (post) => {
  post.post("/post", auth.authenticate, POST.UserPost, handleResponse.RESPONSE)
  post.get("/posts", auth.authenticate, POST.getPostsLoginUser, handleResponse.RESPONSE)
  post.get("/postlist", auth.authenticate, POST.getPostsList, handleResponse.RESPONSE)
  post.get("/getPostsLists", auth.authenticate, POST.getPostsLists, handleResponse.RESPONSE)
  post.get("/userpost/:id", auth.authenticate, POST.getAllPostsById, handleResponse.RESPONSE)
  post.get("/post/:id", auth.authenticate, POST.getPostsById, handleResponse.RESPONSE)
  post.put("/updateVideoCount/:id", auth.authenticate, POST.updatePostVideoCount, handleResponse.RESPONSE)
  post.delete("/post/:id", auth.authenticate, POST.deletePostsById, handleResponse.RESPONSE)
  post.post("/hashTagPost", auth.authenticate, POST.hashTagPost, handleResponse.RESPONSE)




  
});

router.group("/story", (story) => {
  story.post("/add", auth.authenticate, STORY.addStory, handleResponse.RESPONSE)
  story.get("/view", auth.authenticate, STORY.getStoryList, handleResponse.RESPONSE)
  story.get("/viewstory", auth.authenticate, STORY.getStoryListBYUserId, handleResponse.RESPONSE)
  story.get("/viewstory/:id", auth.authenticate, STORY.getStoryId, handleResponse.RESPONSE)
  story.get("/viewuserstory", auth.authenticate, STORY.getStoryListBYAllUserId, handleResponse.RESPONSE)
  story.get("/getStoryData", auth.authenticate, STORY.getStoryData, handleResponse.RESPONSE);
  story.get("/fetchStoryView/:storyId", auth.authenticate, STORY.fetchStoryView, handleResponse.RESPONSE);
  story.delete("/story/:id", auth.authenticate, STORY.deleteStoryById, handleResponse.RESPONSE)
});

//Report Post/User Route
router.group("/report", (report) => {
  report.post("/report", auth.authenticate, REPORT.reportUserandPost, handleResponse.RESPONSE)
  report.get("/reportlist", auth.authenticate, REPORT.getListing, handleResponse.RESPONSE)
  report.get("/reportpostlist", auth.authenticate, REPORT.getPostListing, handleResponse.RESPONSE)
  report.get("/report/:id",auth.authenticate, REPORT.getReportById,handleResponse.RESPONSE)
  report.delete("/report/:id",auth.authenticate, REPORT.deleteReportById,handleResponse.RESPONSE)
  report.put("/update/:id",auth.authenticate, REPORT.editReportById,handleResponse.RESPONSE)
})

//Category Route
router.group("/catgeory", (catgeory) => {
  catgeory.post("/add", auth.authenticate, CATEGORY.addCategory, handleResponse.RESPONSE)
  catgeory.delete("/delete/:id", auth.authenticate, CATEGORY.deleteCategoryById, handleResponse.RESPONSE)
  catgeory.get("/view", auth.authenticate, CATEGORY.getCategory, handleResponse.RESPONSE)
  catgeory.get("/viewall", auth.authenticate, CATEGORY.getAllCategory, handleResponse.RESPONSE)
  catgeory.put("/update/:id",auth.authenticate,CATEGORY.updateCategory,handleResponse.RESPONSE)
  catgeory.get("/view/:id", auth.authenticate, CATEGORY.getCategoryById, handleResponse.RESPONSE)
  catgeory.get("/viewsall/:id", auth.authenticate, CATEGORY.getAllSubCategoryById, handleResponse.RESPONSE)
})

//Sub Category Route
router.group("/subcatgeory", (subcatgeory) => {
  subcatgeory.post("/add", auth.authenticate, SUBCATEGORY.addSubCategory, handleResponse.RESPONSE)
  subcatgeory.delete("/delete/:id", auth.authenticate, SUBCATEGORY.deleteSubCategoryById, handleResponse.RESPONSE)
  subcatgeory.get("/view", auth.authenticate, SUBCATEGORY.getSubCategory, handleResponse.RESPONSE)
  subcatgeory.put("/update/:id",auth.authenticate,SUBCATEGORY.updateSubCategory,handleResponse.RESPONSE)
  subcatgeory.get("/view/:id", auth.authenticate, SUBCATEGORY.getSubCategoryById, handleResponse.RESPONSE)
})

//Follow/Unfollow
router.group("/user", (user) => {
  user.post('/follow/:id', auth.authenticate, FOLLOW.follow, handleResponse.RESPONSE)
  user.put('/unfollow/:id', auth.authenticate, FOLLOW.UnFollow, handleResponse.RESPONSE)
  user.get("/followers", auth.authenticate, FOLLOW.GetAllFollowers, handleResponse.RESPONSE);
  user.get("/following", auth.authenticate, FOLLOW.GetAllFollowing, handleResponse.RESPONSE);
  user.get("/followingPostData", auth.authenticate, FOLLOW.GetAllFollowingPostData, handleResponse.RESPONSE);
  user.put("/removeFollower/:id", auth.authenticate, FOLLOW.removeFollower, handleResponse.RESPONSE);
  user.put("/removeFollowing/:id", auth.authenticate, FOLLOW.removeFollowing, handleResponse.RESPONSE);
})

//Comment on Post/Story
router.group("/comment", (comment) => {
  comment.post('/add', auth.authenticate, COMMENT.AddComment, handleResponse.RESPONSE)
  comment.post('/subReply', auth.authenticate, COMMENT.AddSubReply, handleResponse.RESPONSE)
  comment.get('/viewpostprevious/:id', auth.authenticate, COMMENT.GetCommentByPostId, handleResponse.RESPONSE)
  comment.get('/viewpost/:id', auth.authenticate, COMMENT.GetCommentByPostIds, handleResponse.RESPONSE)
  comment.delete("/delete/:id", auth.authenticate, COMMENT.deleteCommentById, handleResponse.RESPONSE)
  comment.put("/update/:id",auth.authenticate, COMMENT.updateComment,handleResponse.RESPONSE);
  comment.post("/addComment",auth.authenticate, COMMENT.addComment,handleResponse.RESPONSE);
  comment.put("/addStoryLike",auth.authenticate, COMMENT.addStoryLike,handleResponse.RESPONSE);
  comment.get("/getStoryDetails/:storyId",auth.authenticate, COMMENT.getStoryDetails,handleResponse.RESPONSE);
  comment.post('/subReplyOnStory', auth.authenticate, COMMENT.addSubReplyOnStory, handleResponse.RESPONSE)
})

//Like on Post/Story
router.group("/like",(like)=>{ 
  like.post('/add', auth.authenticate, LIKE.LikePost, handleResponse.RESPONSE)
  like.post('/addstoryLikes', auth.authenticate, LIKE.LikeStory, handleResponse.RESPONSE)
  like.get('/viewpostlike/:id', auth.authenticate, LIKE.GetLikesByPostId, handleResponse.RESPONSE)
  like.get('/viewstorylike/:id', auth.authenticate, LIKE.getLikes, handleResponse.RESPONSE)
  like.get('/getDislikeLikes/:id', auth.authenticate, LIKE.getDislikeLikes, handleResponse.RESPONSE)
  like.delete('/delete/:id', auth.authenticate, LIKE.LikeDelete, handleResponse.RESPONSE);
  like.put('/addStoryView', auth.authenticate, LIKE.addStoryView, handleResponse.RESPONSE);
  like.post('/addCommentStory', auth.authenticate, LIKE.addCommentStory, handleResponse.RESPONSE);
  like.post('/addLikeStory', auth.authenticate, LIKE.addLikeStory, handleResponse.RESPONSE);
  like.get('/getStoryComment/:storyId', auth.authenticate, LIKE.getStory, handleResponse.RESPONSE);
  // like.post('/likeDislikePost', auth.authenticate, LIKE.likeDislikePost, handleResponse.RESPONSE)
  like.post('/likeDislikeComment', auth.authenticate, LIKE.likeComment, handleResponse.RESPONSE);
  like.post('/likeDislikeSubReply', auth.authenticate, LIKE.likeSuBReply, handleResponse.RESPONSE);
  like.post('/likeDislikeStoryComment', auth.authenticate, LIKE.likeDislikeStoryComment, handleResponse.RESPONSE);
})

//Block Users
router.group("/block", (block) => {
  block.post("/user", auth.authenticate, BLOCK.blockUser, handleResponse.RESPONSE)
  block.delete('/delete/:id', auth.authenticate, BLOCK.unBlock, handleResponse.RESPONSE)
  block.get('/list', auth.authenticate, BLOCK.listing, handleResponse.RESPONSE)
})

//Notification Users
router.group("/notification", (notification) => {
  notification.post("/send", auth.authenticate, NOTIFICATION.notification, handleResponse.RESPONSE)
  notification.get("/listing", auth.authenticate, NOTIFICATION.getAllNotification, handleResponse.RESPONSE)
  notification.get("/view/:id", auth.authenticate, NOTIFICATION.getById, handleResponse.RESPONSE)
  notification.delete("/delete/:id", auth.authenticate, NOTIFICATION.deletenotificationById, handleResponse.RESPONSE)
  notification.get("/allNotification", auth.authenticate, NOTIFICATION.allNotification, handleResponse.RESPONSE)
  notification.get('/getMax',NOTIFICATION.getMax) 
  notification.delete("/deleteNotification/:id", auth.authenticate, NOTIFICATION.deleteNotification, handleResponse.RESPONSE)
  notification.put("/seenUnseen/:id", auth.authenticate, NOTIFICATION.seenUnseen, handleResponse.RESPONSE)
  notification.get("/orderNotification", auth.authenticate, NOTIFICATION.orderNotification, handleResponse.RESPONSE)
  notification.delete("/deleteOrderNotification/:id", auth.authenticate, NOTIFICATION.deleteOrderNotification, handleResponse.RESPONSE)
  notification.put("/seenUnseenOrder/:id", auth.authenticate, NOTIFICATION.seenUnseenOrder, handleResponse.RESPONSE)

})

//Products Routes
router.group("/product",(product)=>{
  product.post("/add",auth.authenticate, PRODUCT.addProducts, handleResponse.RESPONSE)
  product.get("/listing",auth.authenticate, PRODUCT.getProducts, handleResponse.RESPONSE)
  product.get("/view/:id",auth.authenticate, PRODUCT.getProductById, handleResponse.RESPONSE)
  product.delete("/delete/:id",auth.authenticate, PRODUCT.deleteProductById, handleResponse.RESPONSE)
  product.put("/update/:id",auth.authenticate, PRODUCT.updateProduct, handleResponse.RESPONSE)
  product.get("/userproducts",auth.authenticate, PRODUCT.getProductByUserId, handleResponse.RESPONSE)
  product.get("/bestDeals", PRODUCT.bestDeals, handleResponse.RESPONSE)
  product.get("/recommendProducts", PRODUCT.recommendProducts, handleResponse.RESPONSE)
  product.get("/homeProducts", PRODUCT.homeProducts, handleResponse.RESPONSE)
  product.get("/discount", auth.authenticate, PRODUCT.discount, handleResponse.RESPONSE)
  product.get("/filterScreen", auth.authenticate, PRODUCT.filterScreen, handleResponse.RESPONSE)
  product.get("/getAllProducts", auth.authenticate, PRODUCT.getAllProducts, handleResponse.RESPONSE)
  product.get("/getSellerProduct",  auth.authenticate,PRODUCT.getSellerProduct, handleResponse.RESPONSE)
  product.get("/filterProducts", auth.authenticate, PRODUCT.filterProducts, handleResponse.RESPONSE)
  product.get("/getSimilarProduct", auth.authenticate,PRODUCT.getSimilarProduct, handleResponse.RESPONSE)
  product.get("/getProductWithFilter", auth.authenticate,PRODUCT.getProductWithFilter, handleResponse.RESPONSE)


  
})

//Contact Admin Routes
router.group("/contact",(contact)=>{
  contact.post('/admin',auth.authenticate, CONTACT.contactAdmin,handleResponse.RESPONSE)
  contact.get('/listing',auth.authenticate, CONTACT.getListing,handleResponse.RESPONSE)
  contact.get('/view/:id',auth.authenticate, CONTACT.getById,handleResponse.RESPONSE)
  contact.delete('/delete/:id',auth.authenticate, CONTACT.deleteById,handleResponse.RESPONSE)
  contact.post('/sendReplyToUser',auth.authenticate, CONTACT.sendReplyToUser,handleResponse.RESPONSE)

})

//Review and Rating
router.group('/review',(rating)=>{
  rating.post('/add',auth.authenticate, REVIEW.addReview,handleResponse.RESPONSE)
  rating.delete('/delete/:id',auth.authenticate, REVIEW.deleteById, handleResponse.RESPONSE)
  rating.get('/listing', auth.authenticate, REVIEW.getReview,handleResponse.RESPONSE)
  rating.put('/update/:id', auth.authenticate, REVIEW.updateReview,handleResponse.RESPONSE)
  rating.get('/view/:id', auth.authenticate, REVIEW.getOneProductReview,handleResponse.RESPONSE)
  rating.get('/user/:id', auth.authenticate, REVIEW.getOneUserReview,handleResponse.RESPONSE)
  rating.get('/user', auth.authenticate, REVIEW.getOneLoginUserReview,handleResponse.RESPONSE)

//==============product comment===========//
  rating.post('/comment', auth.authenticate, COMMENTPRODUCT.commentProduct,handleResponse.RESPONSE)
  rating.get('/getComment/:id', auth.authenticate, COMMENTPRODUCT.getComment,handleResponse.RESPONSE)
  rating.delete('/deleteComment/:id',auth.authenticate, COMMENTPRODUCT.deleteComment, handleResponse.RESPONSE)
  rating.put('/editComment/:id', auth.authenticate, COMMENTPRODUCT.editComment,handleResponse.RESPONSE)

  rating.post('/addOrderReview', auth.authenticate, REVIEW.addOrderReview,handleResponse.RESPONSE)


  

})

//Wishlist Route
router.group("/favorite", (favorite) => {
  favorite.post("/add", auth.authenticate, FAVORITE.addFavorite, handleResponse.RESPONSE)
  favorite.delete("/delete/:id", auth.authenticate, FAVORITE.deleteFavoriteById, handleResponse.RESPONSE)
  favorite.get("/view", auth.authenticate, FAVORITE.getFavorite, handleResponse.RESPONSE)
  favorite.get("/view/:id", auth.authenticate, FAVORITE.getFavoriteById, handleResponse.RESPONSE)
  favorite.get("/getFavoriteByUSer", auth.authenticate, FAVORITE.getFavoriteByUSer, handleResponse.RESPONSE)

  
})

//Store Route
router.group('/store',(store)=>{
  store.post('/add',auth.authenticate,STORE.addStore,handleResponse.RESPONSE)
  store.delete('/delete/:id',auth.authenticate,STORE.deleteById,handleResponse.RESPONSE)
  store.get('/view/:id',auth.authenticate,STORE.getById,handleResponse.RESPONSE)
  store.get('/viewall',auth.authenticate,STORE.getOneUserStore,handleResponse.RESPONSE)
  store.put('/update/:id',auth.authenticate,STORE.updateStore,handleResponse.RESPONSE)
})

//Seller Route
router.group('/seller', (seller) => {
  seller.post('/createAccount', auth.authenticate, SELLER.addSellerAccount, handleResponse.RESPONSE)
  seller.put('/request', auth.authenticate, SELLER.updateRequest, handleResponse.RESPONSE)
  seller.get('/requestList', auth.authenticate, SELLER.getRequestList, handleResponse.RESPONSE)
  seller.delete('/deleteSeller/:id', auth.authenticate, SELLER.deleteSeller, handleResponse.RESPONSE)



  
})

//Cart Route
router.group("/cart", (cart) => {
  cart.post("/add", auth.authenticate, CART.addProduct, handleResponse.RESPONSE)
  cart.put("/edit", auth.authenticate, CART.editProduct, handleResponse.RESPONSE)
  cart.get("/view", auth.authenticate, CART.getProducts, handleResponse.RESPONSE)
  cart.delete("/delete/:id", auth.authenticate, CART.removeProducts, handleResponse.RESPONSE)

})

//Order Route
router.group("/order", (order) => {
  order.post("/add", auth.authenticate, ORDER.addOrder, handleResponse.RESPONSE)
  order.put("/edit/:id", auth.authenticate, ORDER.editOrder, handleResponse.RESPONSE)
  order.delete("/delete/:id", auth.authenticate, ORDER.deleteOrder, handleResponse.RESPONSE)
  order.get("/view", auth.authenticate, ORDER.getOrders, handleResponse.RESPONSE)
  order.get("/sellerView", auth.authenticate, ORDER.getSellerOrders, handleResponse.RESPONSE)
  order.get("/filterList/:status", auth.authenticate, ORDER.filterList, handleResponse.RESPONSE)
  order.post("/returnRequest/:id", auth.authenticate, ORDER.returnRequest, handleResponse.RESPONSE)
  order.get("/cancelOrder", auth.authenticate, ORDER.cancelOrder, handleResponse.RESPONSE)
  order.post("/payment", auth.authenticate, ORDER.payment, handleResponse.RESPONSE)
  order.get("/getAllOrders", auth.authenticate, ORDER.getAllOrders, handleResponse.RESPONSE)
  order.get("/cardDetails",ORDER.cardDetails, handleResponse.RESPONSE)
  order.get("/viewProduct",ORDER.viewProduct, handleResponse.RESPONSE)
  order.post("/createCard",ORDER.createCard, handleResponse.RESPONSE)
  order.delete("/deleteCard",ORDER.deleteCard, handleResponse.RESPONSE)
  order.get("/cardDetails",ORDER.cardDetails, handleResponse.RESPONSE);
  order.get("/getOrderAsPerStatus",auth.authenticate,ORDER.getOrderAsPerStatus,handleResponse.RESPONSE)
  order.get("/completeOrder", auth.authenticate, ORDER.completeOrder, handleResponse.RESPONSE)
  order.get("/getListofStripePaymentTransaction", auth.authenticate, ORDER.getListofStripePaymentTransaction, handleResponse.RESPONSE)

})

//Banner Route
router.group("/banner", (banner) => {
  banner.post("/add", BANNER.addBanner, handleResponse.RESPONSE)
  banner.put("/edit/:id", auth.authenticate, BANNER.editBanner, handleResponse.RESPONSE)
  banner.get("/view",  BANNER.getBanners, handleResponse.RESPONSE)
  banner.delete("/delete/:id", auth.authenticate, BANNER.deleteBanners, handleResponse.RESPONSE)
})

//Message Route
router.group("/chat", (chat) => {
  chat.post("/sendMessage", auth.authenticate, CHAT.sendMessage, handleResponse.RESPONSE)
  chat.get("/chatlist", auth.authenticate, CHAT.chatlist, handleResponse.RESPONSE)
  chat.get("/chatDetails/:chatId", auth.authenticate, CHAT.chatDetails, handleResponse.RESPONSE)
})

//Tracking Route
router.group("/tracking", (tracking) => {
  tracking.post("/updateTracking",TRACKING.updateTracking, handleResponse.RESPONSE)
  tracking.get("/getTracking",auth.authenticate, TRACKING.getTracking, handleResponse.RESPONSE)
  tracking.get("/getAllTracking",auth.authenticate, TRACKING.getAllTracking, handleResponse.RESPONSE)
  tracking.delete("/delete/:id",auth.authenticate, TRACKING.delete, handleResponse.RESPONSE)
  tracking.get("/getUserTracking",auth.authenticate, TRACKING.getUserTracking, handleResponse.RESPONSE)
})

router.group("/refundRequest", (refundReq) => {
  refundReq.post("/addRefundRequest",auth.authenticate,REFUNDREQUEST.addRefundRequest,handleResponse.RESPONSE)
  refundReq.get("/getAllRefundRequest",REFUNDREQUEST.getAllRefundRequest,handleResponse.RESPONSE)
  refundReq.post("/getAllRefundRequestForSeller",auth.authenticate,REFUNDREQUEST.getAllRefundRequestForSeller,handleResponse.RESPONSE)
  refundReq.put("/updateRefundRequestBySeller",auth.authenticate,REFUNDREQUEST.updateRefundRequestBySeller,handleResponse.RESPONSE)
  refundReq.post("/getRefundRequestById",auth.authenticate,REFUNDREQUEST.getRefundRequestById,handleResponse.RESPONSE)
  refundReq.put("/updateOrderStatusBySeller",auth.authenticate,REFUNDREQUEST.updateOrderStatusBySeller,handleResponse.RESPONSE)
  refundReq.get("/getAllRefundRequestForAdmin",auth.authenticate,REFUNDREQUEST.getAllRefundRequestForAdmin,handleResponse.RESPONSE)
  refundReq.get("/getAllRefundRequestForAdminByOrderId/:orderId/:product",auth.authenticate,REFUNDREQUEST.getAllRefundRequestForAdminByOrderId,handleResponse.RESPONSE)
  // refundReq.get("/getAllRefundRequestForAdminOrderId",auth.authenticate,REFUNDREQUEST.getAllRefundRequestForAdminOrderId,handleResponse.RESPONSE)
  refundReq.get("/getOrdersForRefund",auth.authenticate,REFUNDREQUEST.getOrdersForRefund,handleResponse.RESPONSE)
  refundReq.get("/refundStatusToUser",auth.authenticate,REFUNDREQUEST.refundStatusToUser,handleResponse.RESPONSE)
  refundReq.get("/getAllRefundRequestPayByAdmin",auth.authenticate, REFUNDREQUEST.getAllRefundRequestPayByAdmin,handleResponse.RESPONSE)
})

router.group("/contactUser", (contactUser) => {
  contactUser.post("/addContactUser",auth.authenticate,CONTACTUSER.contactUserAdmin,handleResponse.RESPONSE)
})

router.group("/measurement", (measurement) => {
  measurement.post("/addMeasurement",auth.authenticate, MEASUREMENT.addMeasurement, handleResponse.RESPONSE)
  measurement.get("/getMeasurementBySeller",auth.authenticate, MEASUREMENT.getMeasurementBySeller, handleResponse.RESPONSE)
  measurement.delete("/deleteMeasurementBySeller/:id",auth.authenticate, MEASUREMENT.deleteMeasurementBySeller, handleResponse.RESPONSE)
})

router.group("/size", (measurement) => {
  measurement.post("/addSize",auth.authenticate, SIZE.addSize, handleResponse.RESPONSE)
  measurement.get("/getSizeBySeller",auth.authenticate, SIZE.getSizeBySeller, handleResponse.RESPONSE)
  measurement.delete("/deleteSizeBySeller/:id",auth.authenticate, SIZE.deleteSizeBySeller, handleResponse.RESPONSE)
})



// for invalid url
router.use("*", (req, res) => {
  res.send("Looks like you landed at wrong placesss ");
});



module.exports = router;
