let userRoutes=require('express').Router()
let userHandler=require('../fileHandler/userHandler.js')


userRoutes.post('/signup',userHandler.signup);
userRoutes.post('/otpVerification',userHandler.otpVerification);
userRoutes.post('/resendMobileOtp',userHandler.resendMobileOtp);
userRoutes.post('/checkUsername',userHandler.checkUsername);
userRoutes.post('/uploadProfile',userHandler.uploadProfile);
userRoutes.post('/login',userHandler.login);
userRoutes.post('/forgotPassword',userHandler.forgotPassword);
userRoutes.post('/passwordChange',userHandler.passwordChange);
userRoutes.post('/emailOtpVerification',userHandler.emailOtpVerification);
userRoutes.post('/resetPassword',userHandler.resetPassword);
userRoutes.post('/updateProfile',userHandler.updateProfile);
userRoutes.post('/getUserData',userHandler.getUserData);
userRoutes.post('/mobileNumberChange',userHandler.mobileNumberChange);
userRoutes.post('/logout',userHandler.logout);
userRoutes.post('/videoUpload',userHandler.videoUpload);
userRoutes.post('/like',userHandler.like);
userRoutes.post('/likeList',userHandler.likeList);
userRoutes.post('/addComment',userHandler.addComment);
userRoutes.post('/commentsList',userHandler.commentsList);
userRoutes.post('/follower',userHandler.follower);
userRoutes.post('/followerList',userHandler.followerList);
userRoutes.post('/followingList',userHandler.followingList);
userRoutes.post('/videosView',userHandler.videosView);
userRoutes.post('/viewerList',userHandler.viewerList);
userRoutes.post('/bookMarks',userHandler.bookMarks);
userRoutes.post('/bookMarksList',userHandler.bookMarksList);
userRoutes.post('/retweet',userHandler.retweet);
userRoutes.post('/retweetList',userHandler.retweetList);
userRoutes.post('/getPost',userHandler.getPost);
userRoutes.post('/getPosts',userHandler.getPosts);
userRoutes.post('/search',userHandler.search)
userRoutes.post('/getSearch',userHandler.getSearch)
userRoutes.post('/totalStatus',userHandler.totalStatus)
userRoutes.post('/editPost',userHandler.editPost)
userRoutes.post('/deletePost',userHandler.deletePost)
userRoutes.post('/staticContentGet',userHandler.staticContentGet)
userRoutes.post('/report',userHandler.report)
userRoutes.post('/sharePost',userHandler.sharePost)
userRoutes.post('/shareList',userHandler.shareList)
userRoutes.post('/socialLogin',userHandler.socialLogin)
userRoutes.post('/getCommentPosts',userHandler.getCommentPosts)
userRoutes.post('/getNotificationList',userHandler.getNotificationList)
userRoutes.post('/deleteNotification',userHandler.deleteNotification)
userRoutes.post('/getLikesPost',userHandler.getLikesPost)
userRoutes.post('/getBookMarksPost',userHandler.getBookMarksPost)
userRoutes.post('/getHistoryPost',userHandler.getHistoryPost)
userRoutes.post('/getUploadPost',userHandler.getUploadPost)
userRoutes.post('/getReSharePost',userHandler.getReSharePost)
userRoutes.post('/DeleteViewPost',userHandler.DeleteViewPost)
userRoutes.post('/DeleteReSharePost',userHandler.DeleteReSharePost)
userRoutes.post('/getTagPost',userHandler.getTagPost)
userRoutes.post('/getTradingPost',userHandler.getTradingPost)
userRoutes.post('/getHomePost',userHandler.getHomePost)
userRoutes.post('/checkUsername1',userHandler.checkUsername1)
userRoutes.post('/otpMobileChange',userHandler.otpMobileChange)
userRoutes.post('/followers',userHandler.followers)
userRoutes.post('/blockList', userHandler.blockList)
userRoutes.post('/userPermission', userHandler.userPermission)

module.exports=userRoutes;


