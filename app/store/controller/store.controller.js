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
const STORE = require("../model/store.model");
const _store = {};
const multer = require("multer");
const dir = "./uploads/images/";
const fs = require("fs");
const yourhandle = require("countrycitystatejson");
const USER = require("../../auth/model/auth.model");
const UPDATETABLE = require("../../updateTable/model/updateTable.model");

var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

// const upload = multer({ storage: storage }).array("storeImage", 2);

const upload = multer({ storage: storage }).fields([
  { name: "storeImage" },
  { name: "thumbnail_image" },
]);

const uploadDocs = multer({ storage: storage }).array("files");

//add crystal store by admin
_store.addStore = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      upload(req, res, async (err) => {
        if (err) {
          await setResponseObject(req, false, err.message, "");
          next();
        } else {
          let data = req.body;
          if (req.files.storeImage) {
            let storeImage = req.files.storeImage[0].path;
            data.storeImage = storeImage;
          }
          if (req.files.thumbnail_image) {
            let thumbnail_image = req.files.thumbnail_image[0].path;
            data.thumbnail_image = thumbnail_image;
          }

          let result = await new STORE(data).save();
          if (result) {
            await setResponseObject(req, true, responseMessage.ADD, data);
            next();
          } else {
            await setResponseObject(req, false, err.message);
            next();
          }
        }
      });
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//add crystal store by admin
_store.importStore = async (req, res, next) => {
  try {
    let data = req.body.storeData;
    let result = await STORE.create(req.body.storeData);
    res.send({
      responseCode: 200,
      responseMessage: "Store added successfully",
      result,
    });
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get Store detail by id
_store.getById = async (req, res, next) => {
  try {
    let getStore = await STORE.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All Store by admin
_store.getStores = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    if (page <= 0) {
      throw responseMessage.PAGE_INVALID;
    }
    let filter = {};
    if (req.query.search) {
      filter.shopName = {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      };
    }
    let count = await STORE.find(filter).countDocuments();
    let result = await STORE.find(filter)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result,
      count: count,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete crystal store  by admin
_store.delete = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let user = await STORE.findOneAndRemove({ _id: req.params.id });
      if (user) {
        await setResponseObject(req, true, responseMessage.STORE_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//update crystal store by admin
_store.updateStore = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
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

          if (req.files.storeImage) {
            let storeImage = req.files.storeImage[0].path;
            data.storeImage = storeImage;
          }
          if (req.files.thumbnail_image) {
            let thumbnail_image = req.files.thumbnail_image[0].path;
            data.thumbnail_image = thumbnail_image;
          }

          let options = { new: true };
          let storeData = await STORE.findOneAndUpdate(criteria, data, options);
          if (storeData) {
            await setResponseObject(
              req,
              true,
              responseMessage.STORE_EDITED,
              storeData
            );
            next();
          }
          //     } else {
          //     //     await setResponseObject(
          //     //         req,
          //     //         false,
          //     //         responseMessage.ERROR_ON_UPDATE,
          //     //     );
          //     //     next();
          //     // }
        }
      });
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// get sorting Store
_store.getSortingStore = async (req, res, next) => {
  try {
    if (req.query.asscendingName == "true") {
      let getStore = await STORE.find().sort({ shopName: +1 });
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
      next();
    }
    if (req.query.disscendingName == "true") {
      let getStore = await STORE.find().sort({ shopName: -1 });
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
      next();
    }
    if (req.query.asscendingRanking == "true") {
      let getStore = await STORE.find().sort({ ethicalRanking: +1 });
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
      next();
    }
    if (req.query.disscendingRanking == "true") {
      let getStore = await STORE.find().sort({ ethicalRanking: -1 });
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//get Store by filter
_store.getFilterStore = async (req, res, next) => {
  try {
    var query = {
      $or: [
        { state: { $in: req.body.state } },
        { city: { $in: req.body.city } },
      ],
    };
    let getStore = await STORE.find(query);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get Store by filter
_store.getAllStore = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.search) {
      query.shopName = {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      };
    }
    let getStore = await STORE.find(query);
    if (getStore) {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_store.getAllStores = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.search) {
      query.shopName = {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      };
    }
    let getStore = await STORE.find(query);
    if (getStore) {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//search Store by lat long
_store.searchStore = async (req, res, next) => {
  try {
    let result = await STORE.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [req.body.longitude, req.body.latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: 5000,

          spherical: true,
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

_store.getStates = async (req, res, next) => {
  try {
    let getStore = await STORE.find().select("state");
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_store.getCity = async (req, res, next) => {
  try {
    let getStore = await STORE.find().select("city");
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getStore);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _store;
