const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController');
const postController = require('../../controllers/postController')
const groupController = require('../../controllers/groupController')
const auth = require('../../middleware/auth');
// const multer = require("multer");
// const path = require("path");
// const storage = multer.diskStorage({
//     destination: "../public/uploads",
//     filename: function (req, file, cb) {
//         console.log("<<>>", file.fieldname);
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     }
// });
// const upload = multer({ storage: storage });


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
 *       - name: referralId
 *         description: referralId
 *         in: formData
 *         required: false
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up.
 *       404:
 *         description: This email/mobile number already exists.
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUp', userController.signUp)

/**
 * @swagger
 * /api/v1/user/setPin:
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
 *       - name: pin
 *         description: pin
 *         in: formData
 *         required: true
 
 *     responses:
 *       200:
 *         description: Your Pin has been set successfully.
 *       404:
 *         description: Requested data not found.
 *       501:
 *         description: Unexpected error!
 */

router.post('/setPin', userController.setPin)



/**
 * @swagger
 * /api/v1/user/logIn:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email/mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your login is successful
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/logIn', userController.login)

/**
 * @swagger
 * /api/v1/user/socialLogin:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: socialId
 *         description: socialId
 *         in: formData
 *         required: true
 *       - name: socialType
 *         description: socialType-facebook/google
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Your login is successful
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/socialLogin', userController.socialLogin)

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
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: A Otp has been sent to your registered ID.
 *       404:
 *         description: Provided mobileNumber is not registered.
 *       500:
 *         description: Internal Server Error
 */

router.post('/forgotPassword', userController.forgotPassword)

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
 *       - name: userId
 *         description: userId
 *         in: formData
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
 *         description: Your password has been updated successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/resetPassword', userController.resetPassword)

/**
 * @swagger
 * /api/v1/user/verifyOtp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your password has been updated successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/verifyOtp', userController.verifyOtp)

router.post('/resendOtp', userController.resendOtp)

/**
 * @swagger
 * /api/v1/user/changePassword:
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
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *       - name: oldPassword
 *         description: oldPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your password was successfully changed.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.post('/changePassword', userController.changePassword)




router.post('/updateProfile', userController.updateProfile)

router.post('/addLocation', auth.verifyToken, userController.addLocation)

/**
 * @swagger
 * /api/v1/user/categoryList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/categoryList', userController.categoryList)


/**
 * @swagger
 * /api/v1/user/selectCategory:
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
 *       - name: chooseCategory
 *         description: chooseCategory
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully updated.
 *       404:
 *         description: Select atleast three categories.
 *       500:
 *         description: Internal Server Error
 */

router.post('/selectCategory', userController.selectCategory)

router.post('/createPost', auth.verifyToken, postController.createPost)

/**
 * @swagger
 * /api/v1/user/viewPost/{_id}:
 *   get:
 *     tags:
 *       - USER-POST
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: _id
 *         description: postId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/viewPost/:_id', auth.verifyToken, postController.viewPost)

/**
 * @swagger
 * /api/v1/user/commentOnPost:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: comment
 *         description: comment
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: post created successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/commentOnPost', auth.verifyToken, postController.commentOnPost)

router.post('/editPost', auth.verifyToken, postController.editPost)
/**
 * @swagger
 * /api/v1/user/deletePost:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Post deleted successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/deletePost', auth.verifyToken, postController.deletePost)

/**
 * @swagger
 * /api/v1/user/hidePost:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Post hidden successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/hidePost', auth.verifyToken, postController.hidePost)
/**
 * @swagger
 * /api/v1/user/likeAndDislikePost:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: like
 *         description: true/false
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Post  liked/dislike  successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/likeAndDislikePost', auth.verifyToken, postController.likeAndDislikePost)

// router.post('/likePost', auth.verifyToken, userController.likePost)

router.post('/postNotification', auth.verifyToken, userController.postNotification)

router.post('/bookmarkPost', auth.verifyToken, userController.bookmarkPost)

/**
 * @swagger
 * /api/v1/user/createStory:
 *   post:
 *     tags:
 *       - USER-STORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: text
 *         description: text
 *         in: formData
 *         required: false
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image-array
 *         in: formData
 *         required: false
 *       - name: video
 *         description: video-array
 *         in: formData
 *         required: false
 *       - name: storyPrivacy
 *         description: storyPrivacy
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Data is saved successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/createStory", auth.verifyToken, userController.createStory)

/**
 * @swagger
 * /api/v1/user/viewStory/{_id}:
 *   get:
 *     tags:
 *       - USER-POST
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: _id
 *         description: storyId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/viewStory/:_id', auth.verifyToken, userController.viewStory)


/**
 * @swagger
 * /api/v1/user/addEvent:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: eventName
 *         description: eventName
 *         in: formData
 *         required: true
 *       - name: eventType
 *         description: Public / Private
 *         in: formData
 *         required: true
 *       - name: eventDescription
 *         description: eventDescription
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
 *       - name: dateOfEvent
 *         description: dd/mm/yyyy
 *         in: formData
 *         required: true
 *       - name: venue
 *         description: venue
 *         in: formData
 *         required: true
 * 
 *
 *     responses:
 *       200:
 *         description: Event has been added successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/addEvent', auth.verifyToken, userController.addEvent);

/**
 * @swagger
 * /api/v1/user/editEvent:
 *   put:
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
 *       - name: eventId
 *         description: eventId
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: eventName
 *         description: eventName
 *         in: formData
 *         required: false
 *       - name: eventType
 *         description: Public / Private
 *         in: formData
 *         required: false
 *       - name: eventDescription
 *         description: eventDescription
 *         in: formData
 *         required: false
 *       - name: startTime
 *         description: startTime
 *         in: formData
 *         required: false
 *       - name: endTime
 *         description: endTime
 *         in: formData
 *         required: false
 *       - name: dateOfEvent
 *         description: dd/mm/yyyy
 *         in: formData
 *         required: false 
 *       - name: venue
 *         description: venue
 *         in: formData
 *         required: false
 *
 *     responses:
 *       200:
 *         description: Successfully updated.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/editEvent', auth.verifyToken, userController.editEvent);

/**
 * @swagger
 * /api/v1/user/viewEvent/{eventId}:
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
 *       - name: eventId
 *         description: eventId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/viewEvent/:eventId', auth.verifyToken, userController.viewEvent);


/**
 * @swagger
 * /api/v1/user/deleteEvent:
 *   delete:
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
 *       - name: eventId
 *         description: eventId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.delete('/deleteEvent', auth.verifyToken, userController.deleteEvent)

/**
 * @swagger
 * /api/v1/user/eventList:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/eventList', auth.verifyToken, userController.eventList)

/**
 * @swagger
 * /api/v1/user/myEvents:
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
 *       - name: key
 *         description: key
 *         in: header
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/myEvents', auth.verifyToken, userController.myEvents)
/**
 * @swagger
 * /api/v1/user/editPostComment:
 *   put:
 *     tags:
 *       - USER-POST
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: commented
 *         description: comment Id
 *         in: formData
 *         required: true
 *       - name: comment
 *         description: comment
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:your comment updated successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.put('/editPostComment', auth.verifyToken, postController.editPostComment)
/**
 * @swagger
 * /api/v1/user/deleteComment:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: commentId
 *         description: commentId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Comment delete successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteComment', auth.verifyToken, postController.deleteComment)
/**
* @swagger
* /api/v1/user/postList:
*   get:
*     tags:
*       - USER-POST
*     description: Check for Social 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: page
*         description: page
*         in: formData
*         required: false
*       - name: limit
*         description: limit
*         in: formData
*         required: false
*     responses:
*       200:
*         description:Post list get successfully
*       404:
*         description: Invalid credentials
*       500:
*         description: Internal Server Error
*/
router.get('/postList', auth.verifyToken, postController.postList)
/**
 * @swagger
 * /api/v1/user/myPostList:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/myPostList', auth.verifyToken, postController.myPostList)
/**
* @swagger
* /api/v1/user/commentList/{_id}:
*   get:
*     tags:
*       - USER-POST
*     description: Check for Social 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: _id
*         description: postId
*         in: path
*         required: true
*     responses:
*       200:
*         description:Post comments list get successfully
*       404:
*         description: Invalid credentials
*       500:
*         description: Internal Server Error
*/
router.get('/commentList/:_id', auth.verifyToken, postController.commentList)

/**
 * @swagger
 * /api/v1/user/blockUnblockUserProfile:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
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
 *         description: Successfully blocked.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockUserProfile', auth.verifyToken, userController.blockUnblockUserProfile)


/**
 * @swagger
 * /api/v1/user/addGoal:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: goalName
 *         description: goalName
 *         in: formData
 *         required: false
 *       - name: aboutGoal
 *         description: aboutGoal
 *         in: formData
 *         required: false
 *       - name: goalCategory
 *         description: goalCategory
 *         in: formData
 *         required: false
 *       - name: startDate
 *         description: startDate
 *         in: formData
 *         required: false
 *       - name: endDate
 *         description: endDate
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data saved successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addGoal', auth.verifyToken, userController.addGoal)
/**
 * @swagger
 * /api/v1/user/viewGoal/{_id}:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: _id
 *         description: _id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewGoal/:_id', auth.verifyToken, userController.viewGoal)
/**
 * @swagger
 * /api/v1/user/myGoals:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.get('/myGoals', auth.verifyToken, userController.myGoals)
/**
 * @swagger
 * /api/v1/user/editGoal:
 *   put:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: goalId
 *         description: goalId
 *         in: formData
 *         required: true
 *       - name: goalName
 *         description: goalName
 *         in: formData
 *         required: false
 *       - name: aboutGoal
 *         description: aboutGoal
 *         in: formData
 *         required: false
 *       - name: goalCategory
 *         description: goalCategory
 *         in: formData
 *         required: false
 *       - name: startDate
 *         description: startDate
 *         in: formData
 *         required: false
 *       - name: endDate
 *         description: endDate
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data saved successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.put('/editGoal', auth.verifyToken, userController.editGoal)

/**
 * @swagger
 * /api/v1/user/deleteGoal:
 *   delete:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: goalId
 *         description: goalId
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Goal delete successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteGoal', auth.verifyToken, userController.deleteGoal)
/**
 * @swagger
 * /api/v1/user/myProfile:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.get('/myProfile', auth.verifyToken, userController.myProfile)

/**
 * @swagger
 * /api/v1/user/userProfile:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/userProfile', auth.verifyToken, userController.userProfile)

/**
 * @swagger
 * /api/v1/user/editProfile:
 *   put:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *       - name: gender
 *         description: gender
 *         in: formData
 *         required: false
 *       - name: backImage
 *         description: backImage
 *         in: formData
 *         required: false
 *       - name: address
 *         description: address
 *         in: formData
 *         required: false
 *       - name: hobbies
 *         description: hobbies
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: aboutMe
 *         description: aboutMe
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.put('/editProfile', auth.verifyToken, userController.editProfile)

/**
 * @swagger
 * /api/v1/user/addReport:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: reportReason
 *         description: reportReason
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/addReport', auth.verifyToken, userController.addReport)


/**
 * @swagger
 * /api/v1/user/aboutUs:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/aboutUs', auth.verifyToken, userController.aboutUs)
/**
 * @swagger
 * /api/v1/user/contactUs:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/contactUs', auth.verifyToken, userController.contactUs)
/**
 * @swagger
 * /api/v1/user/termsAndCondition:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/termsAndCondition', auth.verifyToken, userController.termsAndCondition)
/**
 * @swagger
 * /api/v1/user/passwordChange:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: oldPassword
 *         description: oldPassword
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Your password has been updated successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/passwordChange', auth.verifyToken, userController.passwordChange)
/**
 * @swagger
 * /api/v1/user/myBlockedUsersList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/myBlockedUsersList', auth.verifyToken, userController.myBlockedUsersList)
/**
 * @swagger
 * /api/v1/user/searchEvent:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: eventName
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/searchEvent', auth.verifyToken, userController.searchEvent)

/**
 * @swagger
 * /api/v1/user/getRegisteredUsers:
 *  post:
 *    tags:
 *       - USER
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - in: body
 *         name: mobileNumber
 *         description: Import contact list.
 *         schema:
 *           type: object
 *           required:
 *             - mobileNumber
 *           properties:
 *             mobileNumber:
 *               type: array
 *               items:
 *                type: string
 *    responses:
 *       200:
 *         description: You have successfully accepted the friend request.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.   
 */

router.post('/getRegisteredUsers', auth.verifyToken, userController.getRegisteredUsers)
/**
 * @swagger
 * /api/v1/user/requestSent:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/requestSent', auth.verifyToken, userController.requestSent)

/**
 * @swagger
 * /api/v1/user/cancelFriendRequest:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Request cancelled successfully.
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/cancelFriendRequest', auth.verifyToken, userController.cancelFriendRequest)

/**
 * @swagger
 * /api/v1/user/acceptRejectFriendRequest:
 *  post:
 *    tags:
 *       - USER
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - in: body
 *         name: friendRequest
 *         description: Accept/Reject friend request.
 *         schema:
 *           type: object
 *           required:
 *             - friendRequestId
 *             - response
 *           properties:
 *             friendRequestId:
 *               type: string
 *             response:
 *               type: boolean
 *               default: false
 *    responses:
 *       200:
 *         description: You have successfully accepted the friend request.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.   
 */

router.post('/acceptRejectFriendRequest', auth.verifyToken, userController.acceptRejectFriendRequest)

/**
 * @swagger
 * /api/v1/user/friendRequestList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/friendRequestList', auth.verifyToken, userController.friendRequestList)

/**
 * @swagger
 * /api/v1/user/getFriendList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getFriendList', auth.verifyToken, userController.getFriendList)

/**
 * @swagger
 * /api/v1/user/unfriendUser:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: friendId
 *         description: friendId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully unfriended.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/unfriendUser', auth.verifyToken, userController.unfriendUser)

/**
 * @swagger
 * /api/v1/user/friendSuggestion:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/friendSuggestion', auth.verifyToken, userController.friendSuggestion)

/**
 * @swagger
 * /api/v1/user/followFriend:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Follow request sent successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/followFriend', auth.verifyToken, userController.followFriend)

/**
 * @swagger
 * /api/v1/user/cancelFollowRequest:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Follow request cancelled successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/cancelFollowRequest', auth.verifyToken, userController.cancelFollowRequest)

/**
 * @swagger
 * /api/v1/user/acceptRejectFollowRequest:
 *  post:
 *    tags:
 *       - USER
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - in: body
 *         name: followRequestId
 *         description: Accept/Reject follow request.
 *         schema:
 *           type: object
 *           required:
 *             - followRequestId
 *             - response
 *           properties:
 *             followRequestId:
 *               type: string
 *             response:
 *               type: boolean
 *               default: false
 *    responses:
 *       200:
 *         description: You have successfully accepted the request.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.   
 */

router.post('/acceptRejectFollowRequest', auth.verifyToken, userController.acceptRejectFollowRequest)

/**
 * @swagger
 * /api/v1/user/followRequestList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/followRequestList', auth.verifyToken, userController.followRequestList)

/**
 * @swagger
 * /api/v1/user/getFollowersList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getFollowersList', auth.verifyToken, userController.getFollowersList)

/**
 * @swagger
 * /api/v1/user/followingList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/followingList', auth.verifyToken, userController.followingList)

/**
 * @swagger
 * /api/v1/user/unfollowFriend:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: friendId
 *         description: friendId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully unfollowed.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/unfollowFriend', auth.verifyToken, userController.unfollowFriend)

/**
 * @swagger
 * /api/v1/user/deviceTokenAdded:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Updated successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/deviceTokenAdded', auth.verifyToken, userController.deviceTokenAdded)

/**
 * @swagger
 * /api/v1/user/deleteAccount:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Your account deleted successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.get('/deleteAccount', auth.verifyToken, userController.deleteAccount)
/**
 * @swagger
 * /api/v1/user/logout:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Logout successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.get('/logout', auth.verifyToken, userController.logout)
/**
 * @swagger
 * /api/v1/user/replyOnComment:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: commentId
 *         description: commentId
 *         in: formData
 *         required: true
 *       - name: comment
 *         description: comment
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Replied successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/replyOnComment', auth.verifyToken, postController.replyOnComment)
/**
 * @swagger
 * /api/v1/user/deleteReplyComment:
 *   delete:
 *     tags:
 *       - USER-POST
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: commentId
 *         description: commentId
 *         in: formData
 *         required: true
 *       - name: replyId
 *         description: replyId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Deleted successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteReplyComment', auth.verifyToken, postController.deleteReplyComment)
/**
* @swagger
* /api/v1/user/storyList:
*   post:
*     tags:
*       - USER-STORY
*     description: Check for Social 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: pageNumber
*         description: pageNumber
*         in: formData
*         required: false
*       - name: limit
*         description: limit
*         in: formData
*         required: false
*     responses:
*       200:
*         description:Story list get successfully
*       404:
*         description: Invalid credentials
*       500:
*         description: Internal Server Error
*/
router.post('/storyList', auth.verifyToken, userController.storyList)
router.post('/createBlog', auth.verifyToken, postController.createBlog)
/**
 * @swagger
 * /api/v1/user/postReport:
 *   post:
 *     tags:
 *       - USER-POST
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: headers
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: reportReason
 *         description: reportReason
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Post has been reported successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/postReport', auth.verifyToken, postController.postReport)

/**
 * @swagger
 * /api/v1/user/notificationList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/notificationList', auth.verifyToken, userController.notificationList)

/**
 * @swagger
 * /api/v1/user/deleteNotification:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: notificationId
 *         description: notificationId
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteNotification', auth.verifyToken, userController.deleteNotification)

/**
 * @swagger
 * /api/v1/user/deleteAllNotifications:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.get('/deleteAllNotifications', auth.verifyToken, userController.deleteAllNotifications)
/**
 * @swagger
 * /api/v1/user/createGroup:
 *  post:
 *    tags:
 *       - USER-GROUP
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: groupName
 *         description: groupName
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *       - name: groupPic
 *         description: groupPic
 *         in: formData
 *         required: false
 *       - in: body
 *         name: members
 *         description: add members.
 *         schema:
 *           type: object
 *           required:
 *             - members
 *           properties:
 *             members:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 memberId:
 *                   type: string
 *    responses:
 *       200:
 *         description: Group created successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.   
 */
router.post('/createGroup', auth.verifyToken, groupController.createGroup)

/**
 * @swagger
 * /api/v1/user/addMembersInGroup:
 *  post:
 *    tags:
 *       - USER-GROUP
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - in: body
 *         name: members
 *         description: add members.
 *         schema:
 *           type: object
 *           required:
 *             - members
 *           properties:
 *             groupId:
 *               type: string
 *             members:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 memberId:
 *                   type: string
 *    responses:
 *       200:
 *         description: Members has been added successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.   
 */

router.post('/addMembersInGroup', auth.verifyToken, groupController.addMembersInGroup)

/**
 * @swagger
 * /api/v1/user/deleteGroup:
 *   post:
 *     tags:
 *       - USER-GROUP
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: groupId
 *         description: groupId
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteGroup', auth.verifyToken, groupController.deleteGroup)

/**
 * @swagger
 * /api/v1/user/exitGroup:
 *   post:
 *     tags:
 *       - USER-GROUP
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: groupId
 *         description: groupId
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully exited.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/exitGroup', auth.verifyToken, groupController.exitGroup)

/**
 * @swagger
 * /api/v1/user/viewMembers:
 *   post:
 *     tags:
 *       - USER-GROUP
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: groupId
 *         description: groupId
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewMembers', auth.verifyToken, groupController.viewMembers)

/**
 * @swagger
 * /api/v1/user/reportAProblem:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: reportReason
 *         description: reportReason
 *         in: header
 *         required: true
 *       - name: reportImage
 *         description: reportImage
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully reported.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/reportAProblem', auth.verifyToken, userController.reportAProblem)

/**
 * @swagger
 * /api/v1/user/myBookmarks:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: page
 *         description: page
 *         in: query
 *         required: true
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/myBookmarks', auth.verifyToken, userController.myBookmarks)

/**
 * @swagger
 * /api/v1/user/imageList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/imageList', auth.verifyToken, userController.imageList)

/**
 * @swagger
 * /api/v1/user/activityList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/activityList', auth.verifyToken, userController.activityList)
/**
 * @swagger
 * /api/v1/user/muteUnmuteUserProfile:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: status
 *         description: MUTE/UNMUTE
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully Done.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.post('/muteUnmuteUserProfile', auth.verifyToken, userController.muteUnmuteUserProfile)
/**
 * @swagger
 * /api/v1/user/myMutedUsersList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/myMutedUsersList', auth.verifyToken, userController.myMutedUsersList)

/**
 * @swagger
 * /api/v1/user/setNotificationStatus:
 *   put:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: friendRequest_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: visitProfile_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: tag_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: likeComment_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: profile_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: chatMessage_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: invitationOnEvent_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *       - name: admin_notification
 *         description: true/false
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.put('/setNotificationStatus', auth.verifyToken, userController.setNotificationStatus)
/**
 * @swagger
 * /api/v1/user/getNotificationStatus:
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
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/getNotificationStatus', auth.verifyToken, userController.getNotificationStatus)

/**
 * @swagger
 * /api/v1/user/invite:
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
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully sent.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/invite', auth.verifyToken, userController.invite)
/**
 * @swagger
 * /api/v1/user/myRewardList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/myRewardList', auth.verifyToken, userController.myRewardList)
/**
* @swagger
* /api/v1/user/likeList/{_id}:
*   get:
*     tags:
*       - USER-POST
*     description: Check for Social 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: _id
*         description: postId
*         in: path
*         required: true
*     responses:
*       200:
*         description:Post comments list get successfully
*       404:
*         description: Invalid credentials
*       500:
*         description: Internal Server Error
*/
router.get('/likeList/:_id', auth.verifyToken, postController.likeList)
/**
 * @swagger
 * /api/v1/user/applicationSearch:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: type
 *         description: USER/BLOG/POST
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:  Data found successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.post('/applicationSearch', auth.verifyToken, userController.applicationSearch)

// /**
//  * @swagger
//  * /api/v1/user/birdEyeFilter:
//  *   post:
//  *     tags:
//  *       - USER
//  *     description: Check for Social 
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: token
//  *         description: token
//  *         in: header
//  *         required: true
//  *       - name: trending
//  *         description: today/weekly/monthly
//  *         in: formData
//  *         required: false
//  *       - name: new
//  *         description:true
//  *         in: formData
//  *         required: false
//  *       - name: myGoal
//  *         description:myGoal in array
//  *         in: formData
//  *         required: false
//  *       - name: myInterest
//  *         description:myInterest in array
//  *         in: formData
//  *         required: false
//  *     responses:
//  *       200:
//  *         description:  Data found successfully.
//  *       404:
//  *         description: This user does not exist.
//  *       500:
//  *         description: Internal Server Error
//  */

router.post('/birdEyeFilter', auth.verifyToken, userController.birdEyeFilter)
/**
 * @swagger
 * /api/v1/user/feedSuggestion:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:  Data found successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.post('/feedSuggestion', auth.verifyToken, userController.feedSuggestion)
router.get('/publicPostExpire', auth.verifyToken, userController.publicPostExpire)

router.get('/publicStoryExpire', auth.verifyToken, userController.publicStoryExpire)

/**
 * @swagger
 * /api/v1/user/wholeApplicationSearch:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:  Data found successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.post('/wholeApplicationSearch', auth.verifyToken, userController.wholeApplicationSearch)

/**
 * @swagger
 * /api/v1/user/toggleButton:
 *   put:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: toggleButton
 *         description: true/false
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.put('/toggleButton', auth.verifyToken, userController.toggleButton)
/**
 * @swagger
 * /api/v1/user/myInterest:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */
router.get('/myInterest', auth.verifyToken, userController.myInterest)

router.post('/chatUserList', userController.chatUserList)


module.exports = router;