
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const fs = require("fs");
const mongoose = require("mongoose");

const USER = require("../../auth/model/auth.model");
const CRYSTAL = require("../../crystal/model/crystal.model");
const ADDEDCRYSTAL = require("../../addedCrystal/model/addedCrystal.model");
const FAVOURITE = require("../../crystal/model/favourite.model");
const NOTE = require("../../crystal/model/notes.model");

const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;
const _crystal = {};

const multer = require("multer");
const { type } = require("os");
const { populate } = require("../../auth/model/auth.model");
const dir = "./uploads/images/";

var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
]);

_crystal.getAllNote = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize);
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {};
      let count = await NOTE.find(filter).countDocuments();
      let result = await NOTE.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate("user", "guId");

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
//save crystal by user

_crystal.saveCrystal = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      let crystalData = await CRYSTAL.findOne({ _id: req.body.crystalId });
      if (crystalData) {
        let data = req.body;
        if (req.files.image1) {
          let image1 = req.files.image1[0].path;
          data.image1 = image1;
        }
        if (req.files.image2) {
          let image2 = req.files.image1[0].path;
          data.image2 = image2;
        }
        if (req.files.image3) {
          let image3 = req.files.image3[0].path;
          data.image3 = image3;
        }
        data.added_by = req.userId;

        let result = await new ADDEDCRYSTAL(data).save();

        await setResponseObject(req, true, responseMessage.ADD, [
          { crystalData, result },
        ]);
        next();
      } else {
        let data = req.body;
        if (req.files.image1) {
          let image1 = req.files.image1[0].path;
          data.image1 = image1;
        }
        if (req.files.image2) {
          let image2 = req.files.image1[0].path;
          data.image2 = image2;
        }
        if (req.files.image3) {
          let image3 = req.files.image3[0].path;
          data.image3 = image3;
        }
        data.added_by = req.userId;
        let result = await new ADDEDCRYSTAL(data).save();

        await setResponseObject(req, true, responseMessage.ADD, result);
        next();
      }
    });
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
},
  //delete crystal by user
  _crystal.deleteCrystal = async (req, res, next) => {
    try {
      let user = await ADDEDCRYSTAL.findOneAndRemove({ _id: req.params.id });
      if (user) {
        await setResponseObject(req, true, responseMessage.CRYSTAL_DELETE);
        next();
      }
    } catch (err) {
      await setResponseObject(req, false, err.message);
      next();
    }
  };
// get crystal detail by id
_crystal.viewCrsyatl = async (req, res, next) => {
  try {
    let getCrystal = await ADDEDCRYSTAL.findOne({
      _id: req.params.id,
    }).populate("crystalId");
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getCrystal);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//update crystal by user
_crystal.editCrystal = async (req, res, next) => {
  try {
    let criteria = { _id: req.params.id };
    let data = req.body;
    let options = { new: true };
    let crystalData = await ADDEDCRYSTAL.findOneAndUpdate(
      criteria,
      data,
      options
    );
    if (crystalData) {
      await setResponseObject(
        req,
        true,
        responseMessage.CRYSTAL_EDITED,
        crystalData
      );
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

_crystal.crystalHistory = async (req, res, next) => {
  try {
    let criteria = { added_by: req.userId };
    let result = await ADDEDCRYSTAL.find(criteria).populate("crystalId");
    if (result) {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_crystal.getMyCrystal = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize);
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {};
      let count = await ADDEDCRYSTAL.find(filter).countDocuments();
      let result = await ADDEDCRYSTAL.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate("added_by");

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
_crystal.addFavourite = async (req, res, next) => {
  try {
    if (req.body.isFavourite == true) {
      let criteria = { added_by: req.userId, _id: req.body.crystalId };
      let data = { $set: { isFavourite: true } };
      let options = { new: true };
      let userData = await ADDEDCRYSTAL.findOneAndUpdate(
        criteria,
        data,
        options
      );
      if (userData) {
        let data = req.body;
        data.user = req.userId;
        data.myCrystal = data.crystalId;
        data.type = "myCrystal";
        let result = await new FAVOURITE(data).save();

        await setResponseObject(req, true, responseMessage.DATA_EDITED);
        next();
      } else {
        await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
        next();
      }
    }
    if (req.body.isFavourite == false) {
      let criteria = { added_by: req.userId, _id: req.body.crystalId };
      let data = { $set: { isFavourite: false } };
      let options = { new: true };
      let userData = await ADDEDCRYSTAL.findOneAndUpdate(
        criteria,
        data,
        options
      );
      if (userData) {
        let crystal = await FAVOURITE.findOneAndRemove({
          user: req.userId,
          myCrystal: req.body.crystalId,
        });

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

_crystal.note = async (req, res, next) => {
  try {
    if (req.body.isNote == true) {
      let criteria = { added_by: req.userId, _id: req.body.crystalId };
      let data = { $set: { isNote: true, note: req.body.note } };
      let options = { new: true };
      let userData = await ADDEDCRYSTAL.findOneAndUpdate(
        criteria,
        data,
        options
      );
      if (userData) {
        let notData = await NOTE.findOneAndUpdate(
          { myCrystal: req.body.crystalId, user: req.userId },
          { $set: { notes: req.body.note } },
          { new: true }
        );
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

//change identification of crystal
_crystal.editIdentification = async (req, res, next) => {
  try {
    let criteria = { _id: req.params.id };
    let data = {
      $set: { identification: false, crystalName: "Not Identified" },
    };
    let options = { new: true };
    let crystalData = await ADDEDCRYSTAL.findOneAndUpdate(
      criteria,
      data,
      options
    );
    if (crystalData) {
      await setResponseObject(
        req,
        true,
        responseMessage.CRYSTAL_EDITED,
        crystalData
      );
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

_crystal.favouriteHistory = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize);
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {};
      let count = await FAVOURITE.find(filter).countDocuments();
      let result = await FAVOURITE.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate("user", "guId");

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
_crystal.filterCrystal = async (req, res, next) => {
  try {
    var filter = {
      $or: [
        {
          crystalName: {
            $in: req.body.crystalName ? req.body.crystalName : [],
          },
        },
      ],
    };
    let result = await CRYSTAL.aggregate([{ $match: filter }]);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
module.exports = _crystal;
