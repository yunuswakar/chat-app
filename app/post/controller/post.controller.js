/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;

const constant = require("../../../helper/constant");
const POST = require("../model/post.model");
const REPORT = require("../model/report.model");
const USER = require("../../auth/model/auth.model");

const _post = {};

const multer = require("multer");
const dir = "./uploads/post/";
const fs = require("fs");
var pageNovar = 1;
var pageSizevar = 10;

var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("postImg");
// create post by user

_post.createPost = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
        next();
      } else {
        let data = req.body;
        data.created_by = req.userId;
        if (req.file) {
          let postImg = req.file.path;
          data.postImg = postImg;
        }
        let result = await new POST(data).save();
        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
    });
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//delete post by admin
_post.delete = async (req, res, next) => {
  try {
    let post = await POST.findOneAndRemove({
      _id: req.params.id,
      postStatus: "ACTIVE",
    });
    if (post) {
      await setResponseObject(req, true, responseMessage.POST_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//delete report
_post.deleteReport = async (req, res, next) => {
  try {
    let post = await REPORT.findOneAndRemove({ _id: req.params.id });
    if (post) {
      await setResponseObject(req, true, responseMessage.REPORT_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//get all post by admin without pagination
_post.allpost = async (req, res, next) => {
  try {
    let getPost = await POST.find({});
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getPost);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//get my post
_post.getMyPost = async (req, res, next) => {
  try {
    let getPost = await POST.find({
      postStatus: "ACTIVE",
      created_by: req.userId,
    }).populate({ path: "created_by", select: "profileImg" });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getPost);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All post
_post.getAllPost = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (page <= 0) {
      throw responseMessage.PAGE_INVALID;
    }
    let filter = { postStatus: "ACTIVE" };
    let count = await POST.find(filter).countDocuments();
    let result = await POST.find(filter)
      .populate("created_by", "profileImg")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result,
      count,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//block post by admin
_post.blockPost = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      if (!req.body.postStatus && !req.body.id) {
        await setResponseObject(req, false, responseMessage.REQUIRED_FIELD);
        next();
      } else {
        let criteria = { _id: req.body.id };
        let data = { $set: { postStatus: req.body.postStatus } };
        let options = { new: true };
        let postData = await POST.findOneAndUpdate(criteria, data, options);
        if (postData) {
          await setResponseObject(req, true, responseMessage.DATA_BLOCK);
          next();
        } else {
          await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
          next();
        }
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//block post by admin
_post.unblockPost = async (req, res, next) => {
  try {
    let criteria = { _id: req.params.id };
    let data = { $set: { postStatus: "ACTIVE" } };
    let options = { new: true };
    let postData = await POST.findOneAndUpdate(criteria, data, options);
    if (postData) {
      await setResponseObject(req, true, responseMessage.DATA_UNBLOCK);
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

// get Post detail by id

_post.getById = async (req, res, next) => {
  try {
    let getUser = await POST.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getUser);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_post.likeAndDislikePost = async (req, res, next) => {
  try {
    if (req.body.like == true) {
      let criteria = { _id: req.body.postId, postStatus: "ACTIVE" };
      let getPost = await POST.findOne(criteria);

      let data = {
        $addToSet: { likes: req.userId },
        $set: { postCount: getPost.postCount + 1 },
      };
      let options = { new: true };
      let postData = await POST.findOneAndUpdate(criteria, data, options);
      await setResponseObject(req, true, responseMessage.POST_LIKE, {
        postData,
      });
      next();
    }
    if (req.body.like == false) {
      let criteria = { _id: req.body.postId, postStatus: "ACTIVE" };
      let getPost = await POST.findOne(criteria);

      let data = {
        $pull: { likes: req.userId },
        $set: { postCount: getPost.postCount - 1 },
      };
      let options = { new: true };
      let postData = await POST.findOneAndUpdate(criteria, data, options);
      await setResponseObject(req, true, responseMessage.POST_DISLIKE, {
        postData,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_post.sendReport = async (req, res, next) => {
  try {
    let data = req.body;
    data.reported_by = req.userId;
    let result = await new REPORT(data).save();
    if (data) {
      await setResponseObject(req, true, responseMessage.ADD, data);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// populate : {path : 'reviewId'}})
//Get All post
_post.getAllReport = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize) || 10;
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {};
      let count = await REPORT.find(filter).countDocuments();
      let result = await REPORT.find(filter)
        .populate({
          path: "reported_by postId",
          select: "guId",
          populate: { path: "created_by", select: "guId" },
        })
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

//get all post by user
_post.trendingPost = async (req, res, next) => {
  try {
    let result = await POST.aggregate([
      { $match: { postStatus: "ACTIVE" } },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
      {
        $addFields: {
          isLike: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(req.userId), "$likes"],
              },
              then: true,
              else: false,
            },
          },
          isHide: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(req.userId), "$hiddenByUsers"],
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
          localField: "created_by",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $project: {
          _id: 1,
          postImg: 1,
          postStatus: 1,
          text: 1,
          isProfileImg: 1,
          created_by: 1,
          createdAt: 1,
          updatedAt: 1,
          totalLikes: {
            $cond: {
              if: { $isArray: "$likes" },
              then: { $size: "$likes" },
              else: "NA",
            },
          },
          isLike: 1,
          isHide: 1,
          user: { profileImg: 1, firstName: 1, lastName: 1, displayName: 1 },
          height: 1,
          width: 1,
        },
      },
    ]);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
(_post.hidePost = async (req, res, next) => {
  try {
    let criteria = { _id: req.body.postId, postStatus: "ACTIVE" };
    let data = { $addToSet: { hiddenByUsers: req.userId } };
    let options = { new: true };
    let postData = await POST.updateMany(criteria, data, options);
    await setResponseObject(req, true, responseMessage.POST_HIDE);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
}),
  //get all post by user
  (_post.allPost = async (req, res, next) => {
    try {
      let pageNo = parseInt(req.query.pageNo) || 1;
      let pageSize = parseInt(req.query.pageSize) || 10;

      let result = await POST.aggregate([
        { $match: { postStatus: "ACTIVE" } },
        {
          $addFields: {
            isLike: {
              $cond: {
                if: {
                  $in: [mongoose.Types.ObjectId(req.userId), "$likes"],
                },
                then: true,
                else: false,
              },
            },
            isHide: {
              $cond: {
                if: {
                  $in: [mongoose.Types.ObjectId(req.userId), "$hiddenByUsers"],
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
            localField: "created_by",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $sort: { createdAt: -1 },
        },

        { $skip: pageSize * (pageNo - 1) },
        { $limit: pageSize },

        {
          $project: {
            _id: 1,
            postImg: 1,
            postStatus: 1,
            text: 1,
            isProfileImg: 1,
            created_by: 1,
            createdAt: 1,
            updatedAt: 1,
            totalLikes: {
              $cond: {
                if: { $isArray: "$likes" },
                then: { $size: "$likes" },
                else: "NA",
              },
            },
            isLike: 1,
            isHide: 1,
            user: { profileImg: 1, firstName: 1, lastName: 1, displayName: 1 },
            height: 1,
            width: 1,
          },
        },
      ]);
      await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
      next();
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  });
//get my post
_post.myPost = async (req, res, next) => {
  try {
    let result = await POST.aggregate([
      {
        $match: {
          created_by: mongoose.Types.ObjectId(req.userId),
          postStatus: "ACTIVE",
        },
      },
      {
        $addFields: {
          isLike: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(req.userId), "$likes"],
              },
              then: true,
              else: false,
            },
          },
          isHide: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(req.userId), "$hiddenByUsers"],
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
          localField: "created_by",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          postImg: 1,
          postStatus: 1,
          text: 1,
          isProfileImg: 1,
          created_by: 1,
          createdAt: 1,
          updatedAt: 1,
          totalLikes: {
            $cond: {
              if: { $isArray: "$likes" },
              then: { $size: "$likes" },
              else: "NA",
            },
          },
          isLike: 1,
          isHide: 1,
          user: { profileImg: 1, firstName: 1, lastName: 1, displayName: 1 },
          height: 1,
          width: 1,
        },
      },
    ]);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//Get All post
_post.getAll = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let filter = {};
    if (req.query.search) {
      filter._id = req.query.search ? req.query.search : "";
    }

    let count = await POST.find(filter).countDocuments();
    let result = await POST.find(filter)
      .populate("created_by", "firstName lastName guId")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result,
      count,
    });

    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

(_post.archivePost = async (req, res, next) => {
  try {
    let criteria = { created_by: req.body.postBy, postStatus: "ACTIVE" };
    let data = { $addToSet: { hiddenByUsers: req.userId } };
    let options = { new: true };
    let postData = await POST.updateMany(criteria, data, options);
    await setResponseObject(req, true, responseMessage.POST_HIDE);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
}),
  (module.exports = _post);
