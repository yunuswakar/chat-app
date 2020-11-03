const router = require('express').Router();
const userController = require('../webServices/controllers/userController');
const basicAuth = require('../middleware/auth');
const biddingController = require('../webServices/biddingController');

const jobController = require('../webServices/jobController')
const postController = require('../webServices/postController')

//-------------------------------------user section---------------------------------------------------------

/**
 * @swagger
 * /api/v1/user/signUp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: firstName
 *         description: FirstName
 *         in: formData
 *         required: true
 *       - name: dateOfBirth
 *         description: Date of Birth
 *         in: formData
 *         required: true
 *       - name: phoneNumber
 *         description: Phone no
 *         in: formData
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */


router.post('/signUp', userController.signUp)

router.post('/otpVerify', userController.otpVerify)
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: loginId
 *         description: loginId
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', userController.login)
/**
 * @swagger
 * /api/v1/user/resetPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id
 *         in: header
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/resetPassword', userController.resetPassword)
router.post('/imageUpload', userController.imageUpload)
router.post('/videoUpload', userController.videoUpload)
/**
 * @swagger
 * /api/v1/user/forgotPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/forgotPassword', userController.forgotPassword)
router.post('/changePassword', basicAuth.basicAuthUser, userController.changePassword)
/**
 * @swagger
 * /api/v1/user/resendOtp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/resendOtp', userController.resendOtp)
/**
 * @swagger
 * /api/v1/user/myProfile:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/myProfile', userController.myProfile)
router.post('/editProfile', basicAuth.basicAuthUser, userController.editProfile)
router.post('/socialLogin', userController.socialLogin)
router.post('/forgotEmail', userController.forgotEmail)
/**
 * @swagger
 * /api/v1/user/selectLanguage:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: _id
 *         description: _id
 *         in: header
 *         required: true
 *       - name: selectedLanguage
 *         description: selectedLanguage
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/selectLanguage', basicAuth.basicAuthUser, basicAuth.basicAuthUser, userController.selectLanguage)
/**
 * @swagger
 * /api/v1/user/getSelectedLanguage:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: _id
 *         description: _id
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Signup successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/getSelectedLanguage', basicAuth.basicAuthUser, basicAuth.basicAuthUser, userController.getSelectedLanguage)
router.post('/changeEmailOrPhoneNumber', basicAuth.basicAuthUser, userController.changeEmailOrPhoneNumber)

//-----------------------------------friend section--------------------------------------------------------------

router.post('/friendSuggestion', basicAuth.basicAuthUser, userController.friendSuggestion)
router.post('/sendFriendRequest',userController.sendFriendRequest)
router.post('/actionToFriendRequest', basicAuth.basicAuthUser, userController.actionToFriendRequest)
router.get('/getFriendList', userController.getFriendList)
router.post('/viewFriend', userController.viewFriend)
router.post('/getFriendRequestList', basicAuth.basicAuthUser, userController.getFriendRequestList)
router.post('/searchFriendSuggestion', basicAuth.basicAuthUser, userController.searchFriendSuggestion)
router.post('/searchFriendList', basicAuth.basicAuthUser, userController.searchFriendList)
router.post('/searchFriendRequestList', basicAuth.basicAuthUser, userController.searchFriendRequestList)
// router.post('/getMutualFriendList', basicAuth.basicAuthUser, userController.getMutualFriendList)


//----------------------------------------group section-----------------------------------------------------------

router.post('/createGroup', userController.createGroup)
router.post('/groupAddFriend', basicAuth.basicAuthUser, userController.groupAddFriend)
router.post('/groupFriendList', basicAuth.basicAuthUser, userController.groupFriendList)
router.post('/groupRemoveFriend', basicAuth.basicAuthUser, userController.groupRemoveFriend)
router.post('/groupDelete', basicAuth.basicAuthUser, userController.groupDelete)
router.post('/groupUpdate', basicAuth.basicAuthUser, userController.groupUpdate)
router.post('/groupSuggestionList', userController.groupSuggestionList)
router.post('/groupbycategory', userController.groupByCategory)
router.post('/discovergroup', userController.discoverGroup)
router.post('/joingroup', userController.joinGroup)
router.post('/recentlyVisited', userController.recentlyVisited)
router.post('/replyCommentInGroup', userController.replyCommentInGroup)
router.post('/viewPostLikesAndCommentInGroup', userController.viewPostLikesAndCommentInGroup)

//---------------------------------------------Group Description----------------------------------
router.post('/groupdescription', userController.groupdescription)
router.post('/addPostGroupDescription', userController.addPostGroupDescription)
router.post('/tagFriendsGroupPost', userController.tagFriendsGroupPost)
router.post('/groupLikeAndComment', userController.groupLikeAndComment)
router.post('/editGroupPostLikesAndComment', userController.editGroupPostLikesAndComment)



//------------------------------------------class section---------------------------------------------------------------
router.post('/createClass', userController.createClass)
router.post('/classAddFriend',userController.classAddFriend)
router.post('/replyCommentInClass', userController.replyCommentInClass)
router.post('/sharePostInClass', userController.sharePostInClass)
// basicAuth.basicAuthUser,
router.post('/classFriendList', basicAuth.basicAuthUser, userController.classFriendList)
router.post('/classRemoveFriend', basicAuth.basicAuthUser, userController.classRemoveFriend)
router.post('/classDelete', basicAuth.basicAuthUser, userController.classDelete)
router.post('/classUpdate', basicAuth.basicAuthUser, userController.classUpdate)
router.post('/classSuggestionList', userController.classSuggestionList)
router.post('/discoverclass', userController.discoverClass)
router.post('/recentlyVisitedClass', userController.recentlyVisitedClass)
router.post('/classByCategory', userController.classByCategory)
router.post('/joinClass', userController.joinClass)

//------------------------------------------job section---------------------------------------------------------------

router.get("/getAllIndustry", jobController.getAllIndustry)
router.post("/addjob", jobController.addJob)
router.post("/viewjob", jobController.viewJob)
router.post("/applyjob", jobController.applyJob)
router.post("/viewappliedjob", jobController.viewAppliedJob)
router.post("/jobApplicants", jobController.jobApplicants)
router.post("/viewPostedJob", jobController.viewPostedJob)
router.post("/hideAndDeletePostedJob", jobController.hideAndDeletePostedJob)



//------------------------------------------postSection---------------------------------------------------------------
router.post("/createPost", postController.createPost)
router.post('/replyCommentInPost', postController.replyCommentInPost)
router.get("/myAllPhoto",postController.myAllPhoto)
router.post("/sharePost", postController.sharePost)
router.post("/tagFriendsPost", postController.tagFriendsPost)
router.post('/sharePagePost', userController.sharePagePost)
router.post("/postLocation", postController.postLocation)
router.post("/postLikeAndComment", postController.postLikeAndComment)
router.post("/viewPostLikesAndComment", postController.viewPostLikesAndComment)
router.post("/viewPost", postController.viewPost)
router.post("/myPost", postController.myPost)
router.post("/hideAndDeletePost", postController.hideAndDeletePost)
router.post("/postViewers", postController.postViewers)
router.post('/editPostLikesAndComment', postController.editPostLikesAndComment)


//------------------------------------------usersSetting section------------------------------------------------------

router.post('/addcard', userController.addCard)
router.post('/editcard', userController.editCard)
router.post('/viewcard', userController.viewCard)

//-----------------------------------------newsSEction----------------------------------------------------------------

//router.post('/addnews', userController.addNews)
router.post('/getallnews', userController.getAllnews)

//-------------------------------------------eventsection--------------------------------------------------------------

router.post('/addEvent', userController.addEvent)
router.post('/replyCommentInEvent', userController.replyCommentInEvent)
router.post('/shareEventPost', userController.shareEventPost)
router.post('/viewEvent', userController.viewEvent)
router.post('/inviteMembers', userController.inviteMembers)
router.post('/myEvent', userController.myEvent)
router.post('/eventLocation', userController.eventLocation)
router.post('/eventLikeAndComment', userController.eventLikeAndComment)
router.post('/viewEventsLikesAndComment', userController.viewEventsLikesAndComment)
router.post('/hideAndDeleteEvent', userController.hideAndDeleteEvent)
router.post('/eventViewers', userController.eventViewers)
router.post('/chargeForGameVideo', userController.chargeForGameVideo)
router.post('/eventEditComment', userController.eventEditComment)

//-----------------------------------------discussionForm--------------------------------------
router.post('/addDiscussionForm', userController.addDiscussionForm)
router.post('/shareDiscussionPost', userController.shareDiscussionPost)
router.post('/viewDiscussionForum', userController.viewDiscussionForum)
router.post('/editDiscussionComment', userController.editDiscussionComment)
router.post('/discussionFormLikeAndComment', userController.discussionFormLikeAndComment)
router.post('/discussionForumLocation', userController.discussionForumLocation)
router.post('/replyCommentInDisscussion', userController.replyCommentInDisscussion)
router.post('/tagFriendsDiscussionForum', userController.tagFriendsDiscussionForum)
router.post('/viewDisscussionLikesAndComment',userController.viewDisscussionLikesAndComment)


//-----------------------------------------non profit activity--------------------------------------------------------

router.post('/nonProfit', userController.nonProfit)
router.post('/shareNonProfit', userController.shareNonProfit)
router.post('/viewNonProfit', userController.viewNonProfit)
router.post('/myNonProfit', userController.myNonProfit)
router.post('/nonProfitLocation', userController.nonProfitLocation)
router.post('/nonProfitLikesAndComment', userController.nonProfitLikesAndComment)
router.post('/addImageIcon', userController.addImageIcon)
router.post('/viewNonProfitLikesAndComment', userController.viewNonProfitLikesAndComment)
router.post('/nonProfitEditComment', userController.nonProfitEditComment) // for 3 sections nonprofit,event and games
// router.post('/editLikesAndComment', userController.editLikesAndComment)

router.post('/hideAndDeleteNonProfit', userController.hideAndDeleteNonProfit)
router.post('/replyCommentInNonProfit', userController.replyCommentInNonProfit)

//-----------------------------------------Bio section--------------------------------------------------------------
router.post('/addBio', userController.addBio)
router.post('/editBio', userController.editBio)
router.post('/editUserDetail', userController.editUserDetail)

//-----------------------------------------game section----------------------------------------------------------------

router.post('/addGameVideo', userController.addGameVideo)
router.post('/updateGameVideo', userController.updateGameVideo)
router.post('/viewGame', userController.viewGame)
router.post('/myGame', userController.myGame)
router.post('/gameLikesAndComment', userController.gameLikesAndComment)
router.post('/hideAndDeleteGame', userController.hideAndDeleteGame)
router.post('/myGameVideo', userController.myGameVideo)
router.post('/gameLocation', userController.gameLocation)
router.post('/viewGamesLikesAndComment', userController.viewGamesLikesAndComment)
router.post('/replyCommentInGameVideo', userController.replyCommentInGameVideo)
router.post('/editGameComment', userController.editGameComment)
//-----------------------------------------help section-----------------------------------------------------------------

router.post('/reportQuery', userController.reportQuery)

router.get('/getAllGif', userController.getAllGif)
//---------------------------------------Buying and selling section-------------------------

/**
 * @swagger
 * /api/v1/user/shopByCategory:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/shopByCategory', userController.shopByCategory)

/**
 * @swagger
 * /api/v1/user/filterInProduct:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: maxPrice
 *         description: maxPrice
 *         in: formData
 *         required: true
 *       - name: minPrice
 *         description: minPrice
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/filterInProduct', userController.filterInProduct)
router.post('/shopByProduct', userController.shopByProduct)
router.post('/shopBySubCategory', userController.shopBySubCategory)
router.post('/feedbackOfProduct', userController.feedbackOfProduct)
router.post('/viewfeedback', userController.viewfeedback)
router.post('/getUser', userController.getUser)
router.post('/productOrderHistory', userController.productOrderHistory)
router.get('/getBannerImage', userController.getBannerImage)
router.post('/popularCategory', userController.popularCategory)
router.post('/popularProduct', userController.popularProduct)
router.post('/popularAuctionCategory', biddingController.popularAuctionCategory)
router.post('/popularBiddingProduct', biddingController.popularBiddingProduct)
router.post('/buyProduct', userController.buyProduct)

/**
 * @swagger
 * /api/v1/user/viewProductInformation:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewProductInformation', userController.viewProductInformation)
// router.post('/chattingAPI', ChatController.chattingAPI)

// router.post('/addImages', userController.addImages)
/**
 * @swagger
 * /api/v1/user/addCart:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/addCart', userController.addCart)
/**
 * @swagger
 * /api/v1/user/viewAddToCart:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewAddToCart', userController.viewAddToCart)
/**
 * @swagger
 * /api/v1/user/removeCart:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/removeCart', userController.removeCart)
/**
 * @swagger
 * /api/v1/user/itemReport:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true
 *       - name: reportType
 *         description: reportType
 *         in: formData
 *         required: true
 *       - name: reportDescription
 *         description: reportDescription
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/itemReport', userController.itemReport)
/**
 * @swagger
 * /api/v1/user/addWishList:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/addWishList', userController.addWishList)
/**
 * @swagger
 * /api/v1/user/getWishlistProduct:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/getWishlistProduct', userController.getWishlistProduct)
/**
 * @swagger
 * /api/v1/user/removeWishListProduct:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/removeWishListProduct', userController.removeWishListProduct)
/**
 * @swagger
 * /api/v1/user/addAddress:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: contactNumber
 *         description: contactNumber
 *         in: formData
 *         required: true
 *       - name: addressDetail
 *         description: addressDetail
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city
 *         in: formData
 *         required: true *
 *       - name: pinCode
 *         description: pinCode
 *         in: formData
 *         required: true
 *       - name: landmark
 *         description: landmark
 *         in: formData
 *         required: true
 *       - name: alternatePhoneNumber
 *         description: alternatePhoneNumber
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/addAddress', userController.addAddress)

/**
 * @swagger
 * /api/v1/user/editAddress:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: personalId
 *         description: personalId
 *         in: formData
 *         required: true
 *       - name: contactNumber
 *         description: contactNumber
 *         in: formData
 *         required: true
 *       - name: addressDetail
 *         description: addressDetail
 *         in: formData
 *         required: true
 *       - name: alternatePhoneNumber
 *         description: alternatePhoneNumber
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/editAddress', userController.editAddress)
router.post('/getAddress', userController.getAddress)
router.post('/sellingHistory', userController.sellingHistory)
// router.post('/orderCreated', userController.orderCreated)
router.post('/createOrder', userController.createOrder)
router.post('/sellingHistoryEdit', userController.sellingHistoryEdit)
router.post('/returnProduct', userController.returnProduct)
router.post('/changeOrderStatusByBuyer', userController.changeOrderStatusByBuyer)
router.post('/changeOrderStatusBySeller', userController.changeOrderStatusBySeller)
router.post('/changeProductStatusByBuyer', userController.changeProductStatusByBuyer)
//----------------------------product---------------
router.post('/addProduct', userController.addProduct)
router.post('/addCountries', userController.addCountries)
router.get('/getAllCountries', userController.getAllCountries)
router.post('/getStateCountriesWise', userController.getStateCountriesWise)
// router.post('/biddingCategory',biddingController.biddingCategory)
//------------------bidding-------------------------

/**
 * @swagger
 * /api/v1/user/biddingByCategory:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/biddingByCategory', biddingController.biddingByCategory)
router.post('/biddBySearch', biddingController.biddBySearch)

/**
 * @swagger
 * /api/v1/user/biddingBySubCategory:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/biddingBySubCategory', biddingController.biddingBySubCategory)
/**
 * @swagger
 * /api/v1/user/biddingByProduct:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bidderId
 *         description: bidderId
 *         in: formData
 *         required: true
 *       - name: auctionId
 *         description: auctionId
 *         in: formData
 *         required: true
 *       - name: enterBidding
 *         description: enterBidding
 *         in: formData
 *         required: true
 *       - name: startTime
 *         description: startTime
 *         in: formData
 *         required: true
 *       - name: endTime
 *         description: endTime
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/biddingByProduct', biddingController.biddingByProduct)
router.post('/biddingByUser', biddingController.biddingByUser)
/**
 * @swagger
 * /api/v1/user/viewBidding:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: maxPrice
 *         description: maxPrice
 *         in: formData
 *         required: true
 *       - name: minPrice
 *         description: minPrice
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Category found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewBidding', biddingController.viewBidding)
/**
 * @swagger
 * /api/v1/user/upadteBiddingStatus:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: productId
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Product image  found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/upadteBiddingStatus', biddingController.upadteBiddingStatus)
/**
 * @swagger
 * /api/v1/user/ViewBiddingProductImg:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: productId
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Product image  found  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/ViewBiddingProductImg', biddingController.ViewBiddingProductImg)
/**
 * @swagger
 * /api/v1/user/addwishlistBidding:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Product added in wishlist
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/addwishlistBidding', biddingController.addwishlistBidding)
/**
 * @swagger
 * /api/v1/user/viewWishlistBidding:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Wishlist found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewWishlistBidding', biddingController.viewWishlistBidding)
/**
 * @swagger
 * /api/v1/user/removeWishList:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: productId
 *         description: productId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Wishlist found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/removeWishList', biddingController.removeWishList)
/**
 * @swagger
 * /api/v1/user/sellOnAuction:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: subCategoryId
 *         description: subCategoryId
 *         in: formData
 *         required: true
 *       - name: auctionProductName
 *         description: auctionProductName
 *         in: formData
 *         required: true
 *       - name: auctionProductDescription
 *         description: auctionProductDescription
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *       - name: productInitialCost
 *         description: productInitialCost
 *         in: formData
 *         required: true
 *       - name: country
 *         description: country
 *         in: formData
 *         required: true
 *       - name: state
 *         description: state
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city
 *         in: formData
 *         required: true
 *       - name: location
 *         description: location
 *         in: formData
 *         required: true
 *       - name: startTime
 *         description: startTime
 *         in: formData
 *         required: true
 *       - name: endTime
 *         description: endTime
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Product addedesuccessfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/sellOnAuction', biddingController.sellOnAuction)
/**
 * @swagger
 * /api/v1/user/sellOnAuctionHistory:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description:Auction found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/sellOnAuctionHistory', biddingController.sellOnAuctionHistory)
/**
 * @swagger
 * /api/v1/user/upadteBiddingStatus:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: biddingId
 *         description: biddingId
 *         in: formData
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Auction found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/upadteBiddingStatus', biddingController.upadteBiddingStatus)

/**
 * @swagger
 * /api/v1/user/buyBidding:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: biddingId
 *         description: biddingId
 *         in: formData
 *         required: true
 *       - name: bidderId
 *         description: bidderId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Auction found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/buyBidding', biddingController.buyBidding)
/**
 * @swagger
 * /api/v1/user/feedbackOfOrder:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: orderId
 *         description: orderId
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/feedbackOfOrder', biddingController.feedbackOfOrder)
/**
 * @swagger
 * /api/v1/user/feedbackOfOrder:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: orderId
 *         description: orderId
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/participantDetail', biddingController.participantDetail)
router.post('/getfeedback', biddingController.getfeedback)
/**
 * @swagger
 * /api/v1/user/feedbackOfOrder:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: orderId
 *         description: orderId
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/upadteAuctionStatus', biddingController.upadteAuctionStatus)

router.post('/updateOrderStatusByBidder', biddingController.updateOrderStatusByBidder)
router.post('/updateOrderStatusBySeller', biddingController.updateOrderStatusBySeller)
router.post('/OrderHistory', biddingController.OrderHistory)
router.post('/myBiddingHistory', biddingController.myBiddingHistory)



//-------------------------------------------------------class post----------------------------------------------------------------------

router.post("/createClassPost", userController.createClassPost)
router.post("/tagFriendsInClassPost", userController.tagFriendsInClassPost)
router.post("/postLikeAndCommentInClass", userController.postLikeAndCommentInClass)
router.post("/classPostLocation", userController.classPostLocation)
router.post("/viewPostLikesAndCommentInClass", userController.viewPostLikesAndCommentInClass)
router.post("/viewPostLikesAndCommentInClass", userController.viewPostLikesAndCommentInClass)
router.post("/viewClassPost", userController.viewClassPost)
router.post("/myClassPost", userController.myClassPost)
router.post("/hideAndDeleteClassPost", userController.hideAndDeleteClassPost)
router.post("/ClassPostViewers", userController.ClassPostViewers)
router.post('/editClassPostLikesAndComment', userController.editClassPostLikesAndComment)
router.post('/classDescription', userController.classDescription)
router.post('/viewClass', userController.viewClass)
router.post('/viewGroup', userController.viewGroup)
router.post('/shareClassPost', userController.shareClassPost)
router.post('/shareGroupPost', userController.shareGroupPost)
router.post('/hideAndDeleteGroupPost', userController.hideAndDeleteGroupPost) 
router.post('/chargeForAdv', userController.chargeForAdv)
router.post('/shareGame', userController.shareGame)


router.post('/addAdv', userController.addAdv)
router.post('/viewAdvLikesAndComment', userController.viewAdvLikesAndComment)
router.post('/editAdvComment', userController.editAdvComment)
router.post('/replyCommentInAdv', userController.replyCommentInAdv)
router.post('/hideAndDeleteAdv', userController.hideAndDeleteAdv)
router.post('/shareAdvPost',userController.shareAdvPost)
router.post('/advlikesAndComment', userController.advlikesAndComment)
router.post('/viewMyPostAdv', userController.viewMyPostAdv)
router.post('/getCard', userController.getCard)
router.post('/createOrder1', userController.createOrder1)
router.get('/viewAdv', userController.viewAdv)
router.get('/productDelivered', userController.productDelivered)
router.post('/createPage', userController.createPage)
router.post('/pageLikeAndComment',userController.pageLikeAndComment)
router.post('/replyCommentInPagePost',userController.replyCommentInPagePost)
router.post('/editPagePostLikesAndComment', userController.editPagePostLikesAndComment)
router.post('/createPagePost', userController.createPagePost)
router.post('/getMyPage', userController.getMyPage)
router.post('/viewPagePostLikesAndComment', userController.viewPagePostLikesAndComment)
router.post('/viewPage', userController.viewPage)
router.post('/pagePostList',userController.pagePostList)
router.post('/followUnfollowPage', userController.followUnfollowPage)
router.post('/pagePostLikeAndComment', userController.pagePostLikeAndComment)
router.get('/getPageForFollow', userController.getPageForFollow)
router.post('/addUserDetails', userController.addUserDetails)
router.post('/getUserDetails', userController.getUserDetails)
router.post('/activityLogForApp', userController.activityLogForApp)
router.post('/activityLogForWeb', userController.activityLogForWeb)
router.post('/notificationForWeb', userController.notificationForWeb)
router.post('/notificationForApp', userController.notificationForApp)
router.post('/deleteNotification', userController.deleteNotification)
router.post('/deleteActivity',userController.deleteActivity)
/**
 * @swagger
 * /api/v1/user/viewUserDetails:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 
 *     responses:
 *       200:
 *         description: found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewUserDetails',userController.viewUserDetails)
/**
 * @swagger
 * /api/v1/user/activeAndBlockUser:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 
 *     responses:
 *       200:
 *         description: found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/activeAndBlockUser',userController.activeAndBlockUser)


module.exports = router;