const express = require('express')
const router = express.Router()
const communityController = require('../../controllers/communityController')
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/community/addCommunity:
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
 *       - name: communityName
 *         description: communityName
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: link
 *         description: link
 *         in: formData
 *         required: true
 *       - name: communityType
 *         description: OPEN / CLOSE
 *         in: formData
 *         required: true
 *       - name: communityDescription
 *         description: communityDescription
 *         in: formData
 *         required: true
 *       - name: coverPageImage
 *         description: coverPageImage
 *         in: formData
 *         required: true
 *       - name: image
 *         description: logo
 *         in: formData
 *         required: true
 *       - name: lat
 *         description: lat
 *         in: formData
 *         required: true
 *       - name: long
 *         description: long
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Community has been added successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/addCommunity', auth.verifyToken, communityController.addCommunity);

/**
 * @swagger
 * /api/v1/community/editCommunity:
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
 *       - name: communityName
 *         description: communityName
 *         in: formData
 *         required: true
 *       - name: link
 *         description: link
 *         in: formData
 *         required: true
 *       - name: communityType
 *         description: OPEN / CLOSE
 *         in: formData
 *         required: true
 *       - name: communityDescription
 *         description: communityDescription
 *         in: formData
 *         required: true
 *       - name: coverPageImage
 *         description: coverPageImage
 *         in: formData
 *         required: true
 *       - name: endTime
 *         description: endTime
 *         in: formData
 *         required: true
 *       - name: image
 *         description: logo
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: updated successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.put('/editCommunity', auth.verifyToken, communityController.editCommunity);

/**
 * @swagger
 * /api/v1/community/viewCommunity/{communityId}:
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
 *       - name: communityId
 *         description: communityId
 *         in: path
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewCommunity/:communityId', auth.verifyToken, communityController.viewCommunity);

/**
 * @swagger
 * /api/v1/community/deleteCommunity:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: community delete successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteCommunity', auth.verifyToken, communityController.deleteCommunity);

/**
 * @swagger
 * /api/v1/community/communityList:
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
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/communityList', auth.verifyToken, communityController.communityList)
/**
 * @swagger
 * /api/v1/community/trendingCommunity:
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
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.get('/trendingCommunity', auth.verifyToken, communityController.trendingCommunity)

/**
 * @swagger
 * /api/v1/community/commentOnCommunity:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: comment
 *         description: comment
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/commentOnCommunity', auth.verifyToken, communityController.commentOnCommunity)
/**
 * @swagger
 * /api/v1/community/likeAndDislikeCommunity:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: like
 *         description: true/false
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/likeAndDislikeCommunity', auth.verifyToken, communityController.likeAndDislikeCommunity)
/**
 * @swagger
 * /api/v1/community/deleteComment:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: commentId
 *         description: commentId
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteComment', auth.verifyToken, communityController.deleteComment)
/**
 * @swagger
 * /api/v1/community/editCommunityComment:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: comment
 *         description: comment
 *         in: formData
 *         required: true 
 *       - name: commentId
 *         description: commentId
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/editCommunityComment', auth.verifyToken, communityController.editCommunityComment)
/**
 * @swagger
 * /api/v1/community/hideAndDeleteCommunity:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: type
 *         description: HIDE/DELETE
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/hideAndDeleteCommunity', auth.verifyToken, communityController.hideAndDeleteCommunity)
/**
 * @swagger
 * /api/v1/community/communityReport:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: reportReason
 *         description: reportReason
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/communityReport', auth.verifyToken, communityController.communityReport)

/**
 * @swagger
 * /api/v1/community/createCommunityStory:
 *   post:
 *     tags:
 *       - CommunityStory
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
 *       - name: image
 *         description: image-array
 *         in: formData
 *         required: false
 *       - name: video
 *         description: video-array
 *         in: formData
 *         required: false
 *       - name: storyPrivacy
 *         description: PUBLIC/PRIVATE
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
router.post('/createCommunityStory', auth.verifyToken, communityController.createCommunityStory)

/**
 * @swagger
 * /api/v1/community/viewStory/{_id}:
 *   get:
 *     tags:
 *       - CommunityStory
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

router.get('/viewStory/:_id', auth.verifyToken, communityController.viewStory)

/**
* @swagger
* /api/v1/community/storyList:
*   post:
*     tags:
*       - CommunityStory
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
router.post('/storyList', auth.verifyToken, communityController.storyList)

/**
 * @swagger
 * /api/v1/community/recommendedCommunity:
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
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/recommendedCommunity', auth.verifyToken, communityController.recommendedCommunity)
/**
* @swagger
* /api/v1/community/commentList/{_id}:
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
router.get('/commentList/:_id', auth.verifyToken, communityController.commentList)


/**
* @swagger
* /api/v1/community/communityProfileList:
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
*         description:Post comments list get successfully
*       404:
*         description: Invalid credentials
*       500:
*         description: Internal Server Error
*/
router.get('/communityProfileList', auth.verifyToken, communityController.communityProfileList)

/**
 * @swagger
 * /api/v1/community/bookmarkCommunity:
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
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: true 
 *       - name: bookmark
 *         description: true/false
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/bookmarkCommunity', auth.verifyToken, communityController.bookmarkCommunity)



router.post('/communityFilter', auth.verifyToken, communityController.communityFilter)

/**
 * @swagger
 * /api/v1/community/myCommunityList:
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
 *       - name: userId
 *         description: userId
 *         in: query
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

router.get('/myCommunityList', auth.verifyToken, communityController.myCommunityList)

/**
 * @swagger
 * /api/v1/community/myCommunity:
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
 *       - name: pageNumber
 *         description: pageNumber
 *         in: formData
 *         required: true 
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/myCommunity', auth.verifyToken, communityController.myCommunity)


module.exports = router;