
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";
const fs = require("fs");
const mongoose = require("mongoose");
const CRYSTAL = require("../model/crystal.model");
const AUTOID = require("../model/autoIdHistory.model");
const LOGTABLE = require("../model/logTable.model");



const FAVOURITE = require("../model/favourite.model");
const NOTE = require("../model/notes.model");
const got = require("got");
const apiKey = "acc_f8724ead06ecdb2";
const apiSecret = "25c8d94539660aa6695da7b4f07c6e0d";
const FormData = require("form-data");
const USER = require("../../auth/model/auth.model");
const PAYMENT = require("../../subscription/model/payment.model");

const ADDEDCRYSTAL = require("../../addedCrystal/model/addedCrystal.model");
const UPDATETABLE=require("../../updateTable/model/updateTable.model")

const responseMessage = require("../../../helper/responseMessages");
const setResponseObject = require("../../../helper/commonFunctions")
  .setResponseObject;
const _crystal = {};

const multer = require("multer");
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
  { name: "raw_thumbnail_image" },
  { name: "rawImage" },
  { name: "polished_thumbnail_image" },
  { name: "polishedImage" },
  { name: "scan_img" },
]);

//add crystal by admin
_crystal.addCrystal = async (req, res, next) => {
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
          req.body.color = req.body.color ? req.body.color.split(",") : [];
          req.body.astrologicalSign = req.body.astrologicalSign
            ? req.body.astrologicalSign.split(",")
            : [];
          req.body.physical = req.body.physical
            ? req.body.physical.split(",")
            : [];
          req.body.primaryChakra = req.body.primaryChakra
            ? req.body.primaryChakra.split(",")
            : [];
          req.body.secondaryChakra = req.body.secondaryChakra
            ? req.body.secondaryChakra.split(",")
            : [];
          req.body.spiritual = req.body.spiritual
            ? req.body.spiritual.split(",")
            : [];
          req.body.mineralClass = req.body.mineralClass
            ? req.body.mineralClass.split(",")
            : [];
          req.body.location = req.body.location
            ? req.body.location.split(",")
            : [];
          req.body.numericalVibration = req.body.numericalVibration
            ? req.body.numericalVibration.split(",")
            : [];
          req.body.emotional = req.body.emotional
            ? req.body.emotional.split(",")
            : [];
          req.body.alternateStoneName = req.body.alternateStoneName
            ? req.body.alternateStoneName.split(",")
            : [];
          let data = req.body;

          if (req.files.raw_thumbnail_image) {
            let raw_thumbnail_image = req.files.raw_thumbnail_image[0].path;
            data.raw_thumbnail_image = raw_thumbnail_image;
          }

          if (req.files.rawImage) {
            let rawImage = req.files.rawImage[0].path;
            data.rawImage = rawImage;
          }

          if (req.files.polished_thumbnail_image) {
            let polished_thumbnail_image =
              req.files.polished_thumbnail_image[0].path;
            data.polished_thumbnail_image = polished_thumbnail_image;
          }

          if (req.files.polishedImage) {
            let polishedImage = req.files.polishedImage[0].path;
            data.polishedImage = polishedImage;
          }

          let result = await new CRYSTAL(data).save();
          if (data) {
            await setResponseObject(req, true, responseMessage.ADD, data);
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

//add crystal by admin
_crystal.importCrystal = async (req, res, next) => {
  try {
          let data = req.body.crystalData

          data.map((data)=>(
             data.physical=data.physical.split(","),
             data.primaryChakra=data.primaryChakra.split(","),
             data.secondaryChakra=data.secondaryChakra.split(","),
             data.spiritual=data.spiritual.split(","),
             data.color=data.color.split(","),
             data.mineralClass=data.mineralClass.split(","),
             data.astrologicalSign=data.astrologicalSign.split(","),
             data.location=data.location.split(","),
             data.numericalVibration=data.numericalVibration.split(","),
             data.emotional=data.emotional.split(","),
             data.alternateStoneName=data.alternateStoneName.split(",")
          ))
let result = await CRYSTAL.create(req.body.crystalData);
          if (result) {
            await setResponseObject(req, true, responseMessage.ADD, result);
            next();
          }
    
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get crystal detail by id
_crystal.getById = async (req, res, next) => {
  try {
    let getCrystal = await CRYSTAL.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getCrystal);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get all crystal
_crystal.getAllCrystal = async (req, res, next) => {
  try {
    let getCrystal = await CRYSTAL.find();
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getCrystal);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All crystal by admin
_crystal.getCrystals = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    if (page <= 0) {
      throw responseMessage.PAGE_INVALID;
    }
    let filter = {};
    if (req.query.search) {
      filter.crystalName = { $regex: req.query.search ? req.query.search : "", $options: 'i' }
  }
    let count = await CRYSTAL.find(filter).countDocuments();
    let result = await CRYSTAL.find(filter)
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
//delete crystal by admin
_crystal.delete = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let user = await CRYSTAL.findOneAndRemove({ _id: req.params.id });
      if (user) {
        await setResponseObject(req, true, responseMessage.CRYSTAL_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//update crystal by admin
_crystal.updateCrystal = async (req, res, next) => {
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

          req.body.color = req.body.color ? req.body.color.split(",") : [];
          req.body.astrologicalSign = req.body.astrologicalSign
            ? req.body.astrologicalSign.split(",")
            : [];
          req.body.physical = req.body.physical
            ? req.body.physical.split(",")
            : [];
          req.body.primaryChakra = req.body.primaryChakra
            ? req.body.primaryChakra.split(",")
            : [];
          req.body.secondaryChakra = req.body.secondaryChakra
            ? req.body.secondaryChakra.split(",")
            : [];
          req.body.spiritual = req.body.spiritual
            ? req.body.spiritual.split(",")
            : [];
          req.body.mineralClass = req.body.mineralClass
            ? req.body.mineralClass.split(",")
            : [];
          req.body.location = req.body.location
            ? req.body.location.split(",")
            : [];
          req.body.numericalVibration = req.body.numericalVibration
            ? req.body.numericalVibration.split(",")
            : [];
          req.body.emotional = req.body.emotional
            ? req.body.emotional.split(",")
            : [];
          req.body.alternateStoneName = req.body.alternateStoneName
            ? req.body.alternateStoneName.split(",")
            : [];


          let data = req.body;
          if (req.files.raw_thumbnail_image) {
            let raw_thumbnail_image = req.files.raw_thumbnail_image[0].path;
            data.raw_thumbnail_image = raw_thumbnail_image;
          }

          if (req.files.rawImage) {
            let rawImage = req.files.rawImage[0].path;
            data.rawImage = rawImage;
          }

          if (req.files.polished_thumbnail_image) {
            let polished_thumbnail_image =
              req.files.polished_thumbnail_image[0].path;
            data.polished_thumbnail_image = polished_thumbnail_image;
          }

          if (req.files.polishedImage) {
            let polishedImage = req.files.polishedImage[0].path;
            data.polishedImage = polishedImage;
          }
          let options = { new: true };
          let crystalData = await CRYSTAL.findOneAndUpdate(
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
            await setResponseObject(
              req,
              false,
              responseMessage.ERROR_ON_UPDATE
            );
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
// get crystal detail by id
_crystal.getCrystalCount = async (req, res, next) => {
  try {
    let getCrystal = await USER.findOne({ _id: req.userId });

    var data = {
      total_crystal_count: getCrystal.total_crystal_count,
      isTrial: getCrystal.isTrial,
      used_count: getCrystal.used_count,
    };

    await setResponseObject(req, true, responseMessage.RECORDFOUND, data);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_crystal.favourite = async (req, res, next) => {
  try {
    let getCrystal = await FAVOURITE.findOne({
      user: req.userId,
      crystal: req.body.crystal,
    });
    if (getCrystal) {
      let crystal = await FAVOURITE.findOneAndRemove({
        user: req.userId,
        crystal: req.body.crystal,
      });
      if (crystal) {
        await setResponseObject(req, true, responseMessage.UNFAVOURITE);
        next();
      }
    } else {
      let data = req.body;
      data.user = req.userId;
      data.type="crystalLibrary"
      let result = await new FAVOURITE(data).save();
      if (data) {
        await setResponseObject(req, true, responseMessage.FAVOURITE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_crystal.addNotes = async (req, res, next) => {
  try {
    let getCrystal = await NOTE.findOne({
      user: req.userId,
      crystal: req.body.crystal,
    });
    if (getCrystal) {
      var data = req.body;
      let criteria = { user: req.userId, crystal: req.body.crystal };
      let options = { new: true };
      let crystalData = await NOTE.findOneAndUpdate(
        criteria,
        { $set: { notes: req.body.notes } },
        options
      );
      await setResponseObject(req, true, responseMessage.ADD, crystalData);
      next();
    } else {
      let data = req.body;
      data.user = req.userId;
      data.type="crystalLibrary"
      let result = await new NOTE(data).save();
      if (data) {
        await setResponseObject(req, true, responseMessage.ADD, result);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_crystal.getCrystal = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.search) {
      query.crystalName = {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      };
    }
    var sortQuery;
    switch (req.query.type) {
      case "1":
        sortQuery = { crystalName: -1 };
        break;
      case "2":
        sortQuery = { crystalName: 1 };
        break;
      case "3":
        sortQuery = { updateAt: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    let result = await CRYSTAL.aggregate([
      {  
        $lookup: {
          from: "favourites",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
              },
            },
            { $match: { type:"crystalLibrary"} },

          ],
          as: "favourite",
        },
      },
      {
        $lookup: {
          from: "notes",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
              },
            },
            { $match: { type:"crystalLibrary"} },
          ],
          as: "notes",
        },
      },
      {
        $lookup: {
          from: "addedcrystals",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystalId", "$$id"] },
              },
            },
            { $match: { collections: true } },
          ],
          as: "crystalData",
        },
      },
      { $match: query },

      { $sort: sortQuery },
      {
        $project: {
          isFavourite: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(req.userId), "$favourite.user"],
              },
              then: true,
              else: false,
            },
          },
          isNotes: {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(req.userId), "$notes.user"] },
              then: true,
              else: false,
            },
          },
          isCollection: {
            $cond: {
              if: {
                $in: [
                  mongoose.Types.ObjectId(req.userId),
                  "$crystalData.added_by",
                ],
              },
              then: true,
              else: false,
            },
          },
          crystalImg: 1,
          crystalName: 1,
          description: 1,
          knownAs: 1,
          knownFor: 1,
          physical: 1,
          primaryChakra: 1,
          spiritual: 1,
          rarity: 1,
          color: 1,
          chemicalComposition: 1,
          mineralClass: 1,
          crystalSystem: 1,
          astrologicalSign: 1,
          hardness: 1,
          location: 1,
          numericalVibration: 1,
          secondaryChakra: 1,
          pronunciation: 1,
          emotional: 1,
          createdAt: 1,
          updatedAt: 1,
          raw_thumbnail_image: 1,
          rawImage: 1,
          polished_thumbnail_image: 1,
          polishedImage: 1,
          affirmation: 1,
          ethicalSourced: 1,
          brain:1,
          alternateStoneName:1
        },
      },
    ]);
    if (result) {
          await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_crystal.lookupFilter = async (req, res, next) => {
  try {
    var filter = {
      $or: [
        {
          crystalName: {
            $in: req.body.crystalName ? req.body.crystalName : [],
          },
        },
        { color: { $in: req.body.color ? req.body.color : [] } },
        { hardness: { $in: req.body.hardness ? req.body.hardness : [] } },
        { rarity: { $in: req.body.rarity ? req.body.rarity : [] } },
        { location: { $in: req.body.location ? req.body.location : [] } },
        {
          primaryChakra: {
            $in: req.body.primaryChakra ? req.body.primaryChakra : [],
          },
        },
        {
          secondaryChakra: {
            $in: req.body.secondaryChakra ? req.body.secondaryChakra : [],
          },
        },
        {
          astrologicalSign: {
            $in: req.body.astrologicalSign ? req.body.astrologicalSign : [],
          },
        },
        {
          numericalVibration: {
            $in: req.body.numericalVibration ? req.body.numericalVibration : [],
          },
        },
        { physical: { $in: req.body.physical ? req.body.physical : [] } },
        { spiritual: { $in: req.body.spiritual ? req.body.spiritual : [] } },
        { emotional: { $in: req.body.emotional ? req.body.emotional : [] } },
      ],
    };
    let result = await CRYSTAL.aggregate([
      {
        $lookup: {
          from: "favourites",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
              },
            },
            { $match: { type:"crystalLibrary"} },

          ],
          as: "favourite",
        },
      },
      {
        $lookup: {
          from: "notes",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
              },
            },
          ],
          as: "notes",
        },
      },
      {
        $lookup: {
          from: "addedcrystals",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystalId", "$$id"] },
              },
            },
            { $match: { collections: true } },
          ],
          as: "crystalData",
        },
      },
      { $match: filter },
      {
        $project: {
          isFavourite: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(req.userId), "$favourite.user"],
              },
              then: true,
              else: false,
            },
          },
          isNotes: {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(req.userId), "$notes.user"] },
              then: true,
              else: false,
            },
          },
          isCollection: {
            $cond: {
              if: {
                $in: [
                  mongoose.Types.ObjectId(req.userId),
                  "$crystalData.added_by",
                ],
              },
              then: true,
              else: false,
            },
          },
          crystalImg: 1,
          crystalName: 1,
          description: 1,
          knownAs: 1,
          knownFor: 1,
          physical: 1,
          primaryChakra: 1,
          spiritual: 1,
          rarity: 1,
          color: 1,
          chemicalComposition: 1,
          mineralClass: 1,
          crystalSystem: 1,
          astrologicalSign: 1,
          hardness: 1,
          location: 1,
          numericalVibration: 1,
          secondaryChakra: 1,
          pronunciation: 1,
          emotional: 1,
          // trained: 1,
          createdAt: 1,
          updatedAt: 1,
          added_by: 1,
          raw_thumbnail_image: 1,
          rawImage: 1,
          polished_thumbnail_image: 1,
          polishedImage: 1,
          affirmation: 1,
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

_crystal.lookupFilterData = async (req, res, next) => {
  try {
    let getStore = await CRYSTAL.find();

    let crystalName = [];
    getStore.map((e) => {
      crystalName.push(e.crystalName);
    });
    let uniqueCrystalName = [...new Set(crystalName)];

    let color = [];
    getStore.map((e) => {
      color.push(e.color);
    });
    let mergedA = [].concat.apply([], color);
    let uniqueColor = [...new Set(mergedA)];

    let hardness = [];
    getStore.map((e) => {
      hardness.push(e.hardness);
    });
    let uniqueHardness = [...new Set(hardness)];

    let rarity = [];
    getStore.map((e) => {
      rarity.push(e.rarity);
    });
    let uniqueRarity = [...new Set(rarity)];

    let location = [];
    getStore.map((e) => {
      location.push(e.location);
    });
    let mergedB = [].concat.apply([], location);
    let uniqueLocation = [...new Set(mergedB)];

    let primaryChakra = [];
    getStore.map((e) => {
      primaryChakra.push(e.primaryChakra);
    });
    let mergedC = [].concat.apply([], primaryChakra);
    let uniquePrimaryChakra = [...new Set(mergedC)];

    let secondaryChakra = [];
    getStore.filter((e) => {
      secondaryChakra.push(e.secondaryChakra);
    });
    let mergedD = [].concat.apply([], secondaryChakra);
    let uniqueSecondaryChakra = [...new Set(mergedD)];

    let astrologicalSign = [];
    getStore.map((e) => {
      astrologicalSign.push(e.astrologicalSign);
    });
    let mergedE = [].concat.apply([], astrologicalSign);
    let uniqueAstrologicalSign = [...new Set(mergedE)];

    let numericalVibration = [];
    getStore.map((e) => {
      numericalVibration.push(e.numericalVibration);
    });
    let mergedF = [].concat.apply([], numericalVibration);
    let uniqueNumericalVibration = [...new Set(mergedF)];

    let physical = [];
    getStore.map((e) => {
      physical.push(e.physical);
    });
    let mergedG = [].concat.apply([], physical);
    let uniquePhysical = [...new Set(mergedG)];

    let spiritual = [];
    getStore.map((e) => {
      spiritual.push(e.spiritual);
    });
    let mergedH = [].concat.apply([], spiritual);
    let uniqueSpiritual = [...new Set(mergedH)];

    let emotional = [];
    getStore.map((e) => {
      emotional.push(e.emotional);
    });
    let mergedI = [].concat.apply([], emotional);
    let uniqueEmotional = [...new Set(mergedI)];

    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      crystalName: uniqueCrystalName,
      color: uniqueColor,
      hardness: uniqueHardness,
      rarity: uniqueRarity,
      location: uniqueLocation,
      primaryChakra: uniquePrimaryChakra,
      secondaryChakra: uniqueSecondaryChakra,
      astrologicalSign: uniqueAstrologicalSign,
      numericalVibration: uniqueNumericalVibration,
      physical: uniquePhysical,
      spiritual: uniqueSpiritual,
      emotional: uniqueEmotional,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_crystal.myFavourite = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.search) {
      query.crystalName = {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      };
    }
    var sortQuery;
    switch (req.query.type) {
      case "1":
        sortQuery = { crystalName: -1 };
        break;
      case "2":
        sortQuery = { crystalName: 1 };
        break;
      case "3":
        sortQuery = { updateAt: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }
    let result = await CRYSTAL.aggregate([
      {
        $lookup: {
          from: "favourites",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
                user: { $in: [mongoose.Types.ObjectId(req.userId)] },
              },
            },
          ],
          as: "favourite",
        },
      },
      {
        $match: {
          favourite: { $ne: [] },
        },
      },
      {
        $addFields: {
          isFavourite: {
            $cond: {
              if: { $size: "$favourite" },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $lookup: {
          from: "notes",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
              },
            },
          ],
          as: "notes",
        },
      },
      { $match: query },
      { $sort: sortQuery },
      {
        $project: {
          isNotes: {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(req.userId), "$notes.user"] },
              then: true,
              else: false,
            },
          },
          crystalImg: 1,
          crystalName: 1,
          description: 1,
          knownAs: 1,
          knownFor: 1,
          physical: 1,
          primaryChakra: 1,
          spiritual: 1,
          rarity: 1,
          color: 1,
          chemicalComposition: 1,
          mineralClass: 1,
          crystalSystem: 1,
          astrologicalSign: 1,
          hardness: 1,
          location: 1,
          numericalVibration: 1,
          secondaryChakra: 1,
          pronunciation: 1,
          emotional: 1,
          trained: 1,
          createdAt: 1,
          updatedAt: 1,
          added_by: 1,
          isFavourite: 1,
          raw_thumbnail_image: 1,
          rawImage: 1,
          polished_thumbnail_image: 1,
          polishedImage: 1,
          affirmation: 1,
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

_crystal.favouriteFilter = async (req, res, next) => {
  try {
    var filter = {
      $or: [
        {
          crystalName: {
            $in: req.body.crystalName ? req.body.crystalName : [],
          },
        },
        { color: { $in: req.body.color ? req.body.color : [] } },
        { hardness: { $in: req.body.hardness ? req.body.hardness : [] } },
        { rarity: { $in: req.body.rarity ? req.body.rarity : [] } },
        { location: { $in: req.body.location ? req.body.location : [] } },
        {
          primaryChakra: {
            $in: req.body.primaryChakra ? req.body.primaryChakra : [],
          },
        },
        {
          secondaryChakra: {
            $in: req.body.secondaryChakra ? req.body.secondaryChakra : [],
          },
        },
        {
          astrologicalSign: {
            $in: req.body.astrologicalSign ? req.body.astrologicalSign : [],
          },
        },
        {
          numericalVibration: {
            $in: req.body.numericalVibration ? req.body.numericalVibration : [],
          },
        },
        { physical: { $in: req.body.physical ? req.body.physical : [] } },
        { spiritual: { $in: req.body.spiritual ? req.body.spiritual : [] } },
        { emotional: { $in: req.body.emotional ? req.body.emotional : [] } },
      ],
    };
    let result = await CRYSTAL.aggregate([
      {
        $lookup: {
          from: "favourites",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
                user: { $in: [mongoose.Types.ObjectId(req.userId)] },
              },
            },
          ],
          as: "favourite",
        },
      },
      {
        $match: {
          favourite: { $ne: [] },
        },
      },
      {
        $addFields: {
          isFavourite: {
            $cond: {
              if: { $size: "$favourite" },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $addFields: {
          isFavourite: {
            $cond: {
              if: { $size: "$favourite" },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $lookup: {
          from: "notes",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$crystal", "$$id"] },
              },
            },
          ],
          as: "notes",
        },
      },
      { $match: filter },
      {
        $project: {
          isNotes: {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(req.userId), "$notes.user"] },
              then: true,
              else: false,
            },
          },
          crystalImg: 1,
          crystalName: 1,
          description: 1,
          knownAs: 1,
          knownFor: 1,
          physical: 1,
          primaryChakra: 1,
          spiritual: 1,
          rarity: 1,
          color: 1,
          chemicalComposition: 1,
          mineralClass: 1,
          crystalSystem: 1,
          astrologicalSign: 1,
          hardness: 1,
          location: 1,
          numericalVibration: 1,
          secondaryChakra: 1,
          pronunciation: 1,
          emotional: 1,
          trained: 1,
          createdAt: 1,
          updatedAt: 1,
          added_by: 1,
          isFavourite: 1,
          raw_thumbnail_image: 1,
          rawImage: 1,
          polished_thumbnail_image: 1,
          polishedImage: 1,
          affirmation: 1,
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

_crystal.wrapperApi = async (req, res, next) => {
  try {
    let result = await CRYSTAL.aggregate([
      {
        $limit: 3,
      },
      { $sort: { createdAt: 1 } },
    ]);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, result);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_crystal.scanningData = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.send({
        success: false,
        message: "Internal server error"
      });
    } else {
      let data = req.body;
      if (req.files.scan_img) {
        let scan_img = req.files.scan_img[0].path;
        data.scan_img = scan_img;
      }
      data.added_by = req.userId;
      let myCrystals = await new ADDEDCRYSTAL(data).save();

      let logData = {
        userGuID:req.body.userguid,
        autoId:req.body.autoid,
         scan_img:data.scan_img
      };
      let logSaveData = await new LOGTABLE(logData).save();

      let imgUrl = req.files.scan_img[0].path;
      let images = "https://betab.crystaleyesapp.com/" + imgUrl;
      let image_url =
        "http://crystalb.toxsl.in/uploads/images/1617173706359-Agate-polished_full.jpeg";
      const url =
        "https://api.imagga.com/v2/categories/crystals_f8724ead06ecdb2?image_url=" +
        encodeURIComponent(images);
      (async () => {
        try {
          const response = await got(url, {
            username: apiKey,
            password: apiSecret,
          });
          let someData = await JSON.parse(response.body);
          let array = [];
          let arrayy = [];
          let finish=[];
          someData.result.categories.map((e) => {
            array.push(e.name.en.replace(e.name.en.split(" ")[0], "").trim());
            finish.push(  e.name.en.substring(0, e.name.en.indexOf(" ")))
            arrayy.push(e.confidence);
          });

         let result = await CRYSTAL.aggregate([
            { $match: { crystalName: { $in: array } } },
            { $limit : 5 }
          ]);
          await Promise.all(result.map((data, key) => {
            console.log(
              array.includes(data.crystalName),
              data.crystalName,
              arrayy[key],
              finish[key]
            );
            if (array.includes(data.crystalName)) {
              let index = array.indexOf(data.crystalName);
              data["confidence"] = arrayy[index];
               data["finish"] = finish[index];
            }
          }));
          let mlData=[]
          await Promise.all(someData.result.categories.map(async (e) => {
            let saveData = {
              crystalName: e.name.en,
              confidence: e.confidence,
              added_by: req.userId,
               scan_img:data.scan_img,
               autoId:req.body.autoid,
            };
            let myCrystalData = await new AUTOID(saveData).save();
            mlData.push(myCrystalData)
          }));
          res.send({
            success: true,
            message: "Record found successfully",
            data:result,
            mlData
          });
        } catch (error) {
          res.send({ success: false, message: "Something went wrong." });
        }
      })();
    }
  });
};
_crystal.updateFlag = async (req, res, next) => {
  try {
    let result = await AUTOID.findOneAndUpdate({_id:req.params.id},{$set:{selected:true}},{new:true});
    await setResponseObject(req, true, responseMessage.CRYSTAL_UPDATE, result);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_crystal.changeBrain = async (req, res, next) => {
  try {
    let result = await CRYSTAL.updateMany({crystalName:{$in: req.body.crystalName}},{$set:{brain:"1"}},{new:true,multi:true});
    await setResponseObject(req, true, responseMessage.CRYSTAL_UPDATE, result);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};



module.exports = _crystal;
