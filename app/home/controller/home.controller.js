/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const fs = require("fs");
const multer = require("multer");
const dir = "./uploads/images/";
const mongoose = require("mongoose");
const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;

const constant = require("../../../helper/constant");
// const HOME = require("../model/home.model");
const STORE = require("../../store/model/store.model");
const CRYSTAL = require("../../crystal/model/crystal.model");
const USER = require("../../auth/model/auth.model");
const CONTENTCREATION = require("../../home/model/contentCreation.model");
const GROUP = require("../../home/model/group.model");
const NOTIFICATIONS = require("../../notifications/model/notifications.model");
const POST = require("../../post/model/post.model");

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
const upload = multer({ storage: storage }).single("image");
const _home = {};

//add home data

_home.addHomeContent = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      upload(req, res, async (err) => {
        let data = req.body;
        if (req.file) {
          let image = req.file.path;
          data.image = image;
        }
        let result = await new CONTENTCREATION(data).save();
        await setResponseObject(req, true, responseMessage.ADD, data);
        next();
      });
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
},
  //update home data
  _home.updateHomeContent = async (req, res, next) => {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      upload(req, res, async (err) => {
        if (err) {
          await setResponseObject(req, false, err.message, "");
          next();
        } else {
          let criteria = { _id: req.params.id };
          let data = req.body;
          if (req.file) {
            let image = req.file.path;
            data.image = image;
          }
          let options = { new: true };
          let homeData = await CONTENTCREATION.findOneAndUpdate(
            criteria,
            data,
            options
          );
          if (homeData) {
            await setResponseObject(
              req,
              true,
              responseMessage.DATA_EDITED,
              homeData
            );
            next();
          } else {
            if (req.file) {
              fs.unlinkSync(req.file.path);
            }
            await setResponseObject(
              req,
              false,
              responseMessage.ERROR_ON_UPDATE
            );
            next();
          }
        }
      });
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  };
//Get All content by admin
_home.getAllContent = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize) || constant.pageSize;
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {
        grouped: req.query.grouped
       
      };

      let count = await CONTENTCREATION.find(filter).countDocuments();
      let result = await CONTENTCREATION.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate("groupType")
        .select("-hiddenByUsers");
      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        result,
        count: count,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//Get All content table by admin
_home.getContents = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize) || constant.pageSize;
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {};

      let count = await CONTENTCREATION.find(filter).countDocuments();
      let result = await CONTENTCREATION.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate("groupType")
        .select("-hiddenByUsers");
      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        result,
        count: count,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get home data by id
_home.getById = async (req, res, next) => {
  try {
    let getNews = await CONTENTCREATION.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getNews);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get all content by admin
_home.getAll = async (req, res, next) => {
  try {
    let getNews = await CONTENTCREATION.find({});
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getNews);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete content data by admin
_home.delete = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let homeData = await CONTENTCREATION.findOneAndRemove({
        _id: req.params.id,
      });
      if (homeData) {
        await setResponseObject(req, true, responseMessage.DATA_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//add home data group or heading

_home.addGroup = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let data = await GROUP.findOne({ groupName: req.body.groupName });
      if (data) {
        await setResponseObject(
          req,
          false,
          responseMessage.ALREADYEXIST(data.groupName)
        );
        next();
      } else {
        let data = req.body;
        let result = await new GROUP(data).save();
        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
},
  //update group by admin
  _home.updateGroup = async (req, res, next) => {
    try {
      let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
      if (!admin) {
        await setResponseObject(req, false, responseMessage.NO_USER);
        next();
      } else {
        let order = await GROUP.findOne({ groupOrder: req.body.groupOrder });
        if (order) {
          await setResponseObject(
            req,
            false,
            responseMessage.ALREADYEXIST(order.groupOrder)
          );
          next();
        } else {
          let criteria = { _id: req.params.id };
          let data = req.body;
          let options = { new: true };
          let groupData = await GROUP.findOneAndUpdate(criteria, data, options);

          if (groupData) {
            await setResponseObject(req, true, responseMessage.DATA_EDITED);
            next();
          } else {
            await setResponseObject(
              req,
              false,
              responseMessage.ERROR_ON_UPDATE
            );
            next();
          }
        }
      }
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  };
//update group by admin
_home.dropdownGroup = async (req, res, next) => {
  try {
    req.body.dropDownData.forEach(async (element) => {
      let criteria = { _id: element.id };
      // {$in:req.body.order}
      let data = { $set: { groupOrder: element.groupOrder } };

      let options = { new: true };
      let groupData = await GROUP.update(criteria, data, options);
    });
    await setResponseObject(req, true, responseMessage.DATA_EDITED);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get home data by id
_home.getGroupById = async (req, res, next) => {
  try {
    let getNews = await GROUP.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getNews);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get all group by admin
_home.getAllGroup = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let getNews = await GROUP.find({});
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getNews);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
},
  //Get All group by admin
  _home.getGroups = async (req, res, next) => {
    try {
      let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
      if (!admin) {
        await setResponseObject(req, false, responseMessage.NO_USER);
        next();
      } else {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize) || constant.pageSize;
        if (page <= 0) {
          throw responseMessage.PAGE_INVALID;
        }
        let filter = {};
        let count = await GROUP.find(filter).countDocuments();
        let result = await GROUP.find(filter)
          .sort({ groupOrder: 1 })
          .skip(pageSize * (page - 1))
          .limit(pageSize);

        await setResponseObject(req, true, responseMessage.RECORDFOUND, {
          result,
          count: count,
        });
      }
      next();
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  };
//delete group by admin
_home.deleteGroup = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let homeData = await GROUP.findOneAndRemove({ _id: req.params.id });
      if (homeData) {
        await setResponseObject(req, true, responseMessage.DATA_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//Get All home data
_home.homeData = async (req, res, next) => {
  try {
    let user = await USER.findOne({ _id: req.userId });
    let notificationData = await CONTENTCREATION.findOne({
      interestFlag: true,
      pushNotification: false,
      hiddenByUsers: { $nin: [req.userId] },
    });
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
        },
      },
    ]);

    let homeDatas = await GROUP.aggregate([
      {
        $lookup: {
          from: "contentcreations",
          let: { id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$groupType", "$$id"] } } },
            { $match: { interestFlag: true } },
            { $match: { distribution: user.distribution } },

            {
              $match: {
                endDate: { $gte: new Date() },
              },
            },
            {
              $match: {
                hiddenByUsers: { $nin: [req.userId] },
              },
            },
            {
              $lookup: {
                from: "crystallibraries",
                let: { crystal: "$crystal" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$crystal"] } } },
                ],
                as: "crystal",
              },
            },
            {
              $lookup: {
                from: "stores",
                let: { store: "$store" },
                pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$store"] } } }],
                as: "store",
              },
            },
          ],
          as: "data",
        },
      },
      {
        $match: {
          data: { $ne: [] },
        },
      },
    ]);

    let homeData = homeDatas.concat({ posts: result });
    if (homeDatas) {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        homeData,
        notificationData: notificationData,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
},
  _home.hidePost = async (req, res, next) => {
    try {
      let criteria = { _id: req.body.postId };
      let data = { $addToSet: { hiddenByUsers: req.userId } };
      let options = { new: true };
      let postData = await CONTENTCREATION.findOneAndUpdate(
        criteria,
        data,
        options
      );
      await setResponseObject(req, true, responseMessage.POST_HIDE);
      next();
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  },
  _home.removePost = async (req, res, next) => {
    try {
      let criteria = { _id: { $in: req.body.postId } };
      let data = { $addToSet: { hiddenByUsers: req.userId } };
      let options = { new: true };
      let postData = await CONTENTCREATION.updateMany(criteria, data, options);
      await setResponseObject(req, true, responseMessage.POST_HIDE);
      next();
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  },
  //
  //update group by admin
  _home.interestFlag = async (req, res, next) => {
    try {
      let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
      if (!admin) {
        await setResponseObject(req, false, responseMessage.NO_USER);
        next();
      } else {
        let criteria = { _id: req.body.id };
        let data = { $set: { interestFlag: req.body.interestFlag } };
        let options = { new: true };
        let groupData = await CONTENTCREATION.findOneAndUpdate(
          criteria,
          data,
          options
        );

        if (groupData) {
          await setResponseObject(req, true, responseMessage.DATA_EDITED);
          next();
        } else {
          await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
          next();
        }
      }
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  };

//Get All group by admin
_home.filterGroup = async (req, res, next) => {
  try {
    let filter = {};
    let pageNo = parseInt(req.body.pageNo);
    let pageSize = parseInt(req.body.pageSize) || constant.pageSize;

    let result = await CONTENTCREATION.aggregate([
      {
        $lookup: {
          from: "groups",
          localField: "groupType",
          foreignField: "_id",
          as: "groupType",
        },
      },
      { $unwind: "$groupType" },

      {
        $sort: { createdAt: -1 },
      },

      {
        $match: {
          $and: [
            {
              "groupType.groupName": {
                $regex: req.body.searchGroup ? req.body.searchGroup : "",
                $options: "i",
              },
            },
            {
              distribution: {
                $regex: req.body.searchDistribution,
                $options: "i",
              },
            },
          ],
        },
      },

      { $skip: pageSize * (pageNo - 1) },
      { $limit: pageSize },
    ]);

    let count = await CONTENTCREATION.aggregate([
      {
        $lookup: {
          from: "groups",
          localField: "groupType",
          foreignField: "_id",
          as: "groupType",
        },
      },
      { $unwind: "$groupType" },

      {
        $sort: { createdAt: -1 },
      },

      {
        $match: {
          $and: [
            {
              "groupType.groupName": {
                $regex: req.body.searchGroup ? req.body.searchGroup : "",
                $options: "i",
              },
            },
            {
              distribution: {
                $regex: req.body.searchDistribution
                  ? req.body.searchDistribution
                  : "",
                $options: "i",
              },
            },
          ],
        },
      },

      {
        $count: "result",
      },

      { $skip: pageSize * (pageNo - 1) },
      { $limit: pageSize },
    ]);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result: result,
      count: count[0].result,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _home;
