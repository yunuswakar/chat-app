/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const PRODUCT = require("../model/productModel");
const Constant = require("../../../helpers/constant")

const FAVORITE = require("../../favoriteService/model/favoriteModel");
const ORDERREVIEW = require("../../reviewService/model/orderReviewModel");

const fs = require("fs"); // fs import to read/write file
const multer = require("multer"); // for file save on server
const dir = "./uploads/product/"; // declare path of upload dir on server
const mongoose = require("mongoose"); // set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const _product = {};

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
const upload = multer({ storage: storage }).fields([
  {
    name: "productImg",
    maxCount: 1,
  },
  {
    name: "storeImage",
    maxCount: 1,
  },
  {
    name: "images",
  },
  {
    name: "storeImage",
    maxCount: 1,
  },
]);

//Add product
_product.addProducts = async (req, res) => {
  try {
    console.log("Product Data: ",req.body);
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
      } else {
        let data = req.body;
        data.addedBy = req.userId;
        if (req.files.productImg) {
          let image = req.files.productImg[0].path;
          data.productImg = image;
        }
        if (req.files.storeImage) {
          let image = req.files.storeImage[0].path;
          data.storeImage = image;
        }
        if (req.files.images) {
          let image = [];
          req.files.images.map((data) => {
            image.push(data.path);
          });
          data.images = image;
        }
        console.log("Data Product Data: ",data);
        console.log("Data Product Data: ",JSON.parse(data.properties));
        // data.images = req.file.path
        let result = await PRODUCT.create(data);
        res.status(200).send({
          success: true,
          message: responseMessage.ADD_SUCCESS("Product"),
          data: result,
        });

      }

    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
//Listing of Products
_product.getProducts = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      throw { message: message.PAGE_INVALID };
    }
    let filter = {};
    if (req.query.search) {
      filter = {
        title: {
          $regex: req.query.search ? req.query.search : "",
          $options: "i",
        },
      };
    }
    let count = await PRODUCT.find({ addedBy: req.userId }).countDocuments();
    let result = await PRODUCT.find({ addedBy: req.userId })
      .populate({ path: "addedBy", select: "-password" })
      .populate("subcategory", "title")
      .populate("category", "title")
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
      count,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
//Listing of Products
_product.getAllProducts = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      throw { message: message.PAGE_INVALID };
    }
    let count = await PRODUCT.find().countDocuments();
    let result = await PRODUCT.find()
      .populate({ path: "addedBy", select: "-password" })
      .populate("subcategory", "title")
      .populate("category", "title")
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });
      let dat = JSON.parse(req.query.bodydata)

      let filter = [];
      if (dat.color.length > 0) {
        filter = [
          {
            $match: { color:{$all:  dat.color} },
          }
        ];
      }
  
      if (dat.productSize.length > 0) {
        filter.push(
          // {
          //   $addFields: {
          //     commonSize: { $setIntersection: ["$size", dat.productSize] },
          //     sizePresent: {
          //       $cond: {
          //         if: { $size: "$commonSize" },
          //         then: true,
          //         else: false,
          //       },
          //     },
          //   },
          // },
          // {
          //   $match: { sizePresent: true },
          // },
          // { $skip: pageSize * (pageNo - 1) },
          // { $limit: pageSize },
          {
            $match: { size:{$all:  dat.productSize} },
          }
        );
      }
  
      const sort = {};
      let isSort = false;
      if (dat.price == 1 || dat.price == -1) {
        sort["currentProductPrice"] = Number(dat.price);
        isSort = true;
      }
  
      if (dat.rating == 1 || dat.rating == -1) {
        sort["rating"] = Number(dat.rating);
        isSort = true;
      }
  
      if (dat.time == 1 || dat.time == -1) {
        sort["createdAt"] = Number(dat.time);
        isSort = true;
      }
  
      if (isSort) {
        filter.push({
          $sort: { ...sort },
        });
      }
  
      let filterData = await PRODUCT.aggregate([
        {
          $lookup: {
            from: "favorites",
            let: { product: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$product", "$$product"] },
                },
              },
            ],
            as: "favorites",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          }
        },
  
        { $unwind: "$category" },
        {
          $lookup: {
            from: "subcategories",
            localField: "subcategory",
            foreignField: "_id",
            as: "subcategory",
          }
        },
        { $unwind: "$subcategory" },
        ...filter
      ]);
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,filterData,
      count
    });
  } catch (error) {
    
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
//Get One Product By Id
_product.getProductById = async (req, res) => {
  try {
     let orderReview=await ORDERREVIEW.find({reviewTo:req.params.id})
     let ratingCount = await ORDERREVIEW.find({reviewTo:req.params.id}).countDocuments()

     let array=[];
     orderReview.forEach(element=>{
         array.push(element.rating)
     })
     let avgRating=array.reduce((a, b) => a + b, 0)/ratingCount 

    let result = await PRODUCT.findOne({ _id: req.params.id })
      .populate("addedBy", "-password")
      .populate("subcategory", "title")
      .populate("category", "title");

    let fav = await FAVORITE.findOne({
      product: req.params.id,
      favBy: req.userId,
    });

    let isWishlisted = fav ? true : false;

    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
      isWishlisted,
      avgRating
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//Delete One Product By Id
_product.deleteProductById = async (req, res) => {
  try {
    let result = await PRODUCT.findByIdAndRemove({ _id: req.params.id });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DELETE("Product"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//Update/Edit Product
_product.updateProduct = async (req, res) => {
  try {
    let findUser = await PRODUCT.find({ addedBy: req.userId });
    if (!findUser) {
      res.status(400).send({
        success: false,
        message: responseMessage.UNAUTHORIZED,
      });
      return;
    }

    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
      } else {
        let data = req.body;
        if (req.files.productImg) {
          let image = req.files.productImg[0].path;
          data.productImg = image;
        }
        if (req.files.images) {
          let image = [];
          req.files.images.map((data) => {
            image.push(data.path);
          });
          data.images = image.concat(req.body.images ? req.body.images : []);
        }

        let result = await PRODUCT.findOneAndUpdate(
          { _id: req.params.id },
          { $set: data },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: responseMessage.UPDATE_SUCCESS("Product"),
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//Get One Product By Id
_product.getProductByUserId = async (req, res) => {
  try {
    let result = await PRODUCT.find({ addedBy: req.userId })
      .populate("addedBy", "-password")
      .populate("subcategory", "title")
      .populate("category", "title");
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//Get bestDeals Products
_product.bestDeals = async (req, res) => {
  try {
    let NewIn = await PRODUCT.find().populate("subcategory", "title").populate("category", "title").sort({ createdAt: -1 });
    let bestDeal = await PRODUCT.find().populate("subcategory", "title").populate("category", "title").sort({ discount: -1 });
    let thirdRow = await PRODUCT.find().populate("subcategory", "title").populate("category", "title");

    if (!thirdRow) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: { NewIn, bestDeal, thirdRow },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//Get dailyNewIn Products
_product.recommendProducts = async (req, res) => {
  try {
    let result = await PRODUCT.find().sort({ createdAt: -1 });

    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Product"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

_product.homeProducts = async (req, res) => {
  try {
    let criteria;
    if (req.query.fil === "NewIn") {
      criteria = { $sort: { createdAt: -1 } };
    }
    if (req.query.fil === "bestDeal") {
      criteria = { $sort: { discount: -1 } };
    }
    if (req.query.fil === ("thirdRow" || "fourthRow")) {
      criteria = { $sort: { createdAt: -1 } };
    }
    
    let dat = JSON.parse(req.query.bodydata)

    let filter = [];
    if (dat.color.length > 0) {
      filter = [
        {
          $match: { color:{$all:  dat.color} },
        }

      ];
    }

    if (dat.productSize.length > 0) {
      filter.push(
        {
          $match: { size:{$all:  dat.productSize} },
        }
      );
    }

    const sort = {};
    let isSort = false;
    if (dat.price == 1 || dat.price == -1) {
      sort["currentProductPrice"] = Number(dat.price);
      isSort = true;
    }

    if (dat.rating == 1 || dat.rating == -1) {
      sort["rating"] = Number(dat.rating);
      isSort = true;
    }

    if (dat.time == 1 || dat.time == -1) {
      sort["createdAt"] = Number(dat.time);
      isSort = true;
    }

    if (isSort) {
      filter.push({
        $sort: { ...sort },
      });
    }

    let data = await PRODUCT.aggregate([
      {
        $lookup: {
          from: "favorites",
          let: { product: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$product", "$$product"] },
              },
            },
          ],
          as: "favorites",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        }
      },

      { $unwind: "$category" },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        }
      },
      { $unwind: "$subcategory" },



      {
        $addFields: {
          isWishlisted: {
            $cond: {
              if: { $size: "$favorites" },
              then: true,
              else: false,
            },
          },
        },
      },
      criteria,
      ...filter
    ]);
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: data,
      // filterData
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// Product list acc. to user in discount sorting list
_product.discount = async (req, res) => {
  try {

    let data = await PRODUCT.aggregate([
      {
        $match: {
          $and: [{
            addedBy: mongoose.Types.ObjectId(req.userId),
          },

          { "discountPercent": { $ne: "N/A" } }

          ]
        }
      },
      { $sort: { discount: -1 } },
    ]);
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// Product list acc. to user in discount sorting list
_product.filterScreen = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      throw { message: message.PAGE_INVALID };
    }

    let filter = {};
    let aggregate_options = [];
    if (req.query.search) {
      filter = {
        title: {
          $regex: req.query.search ? req.query.search : "",
          $options: "i",
        },
      };
    }

    let priceCriteria = req.query.price
      ? (req.query.price == 1 ? { $sort: { price: 1 } } :
        (req.query.price == -1 ? { $sort: { price: -1 } } : {}))
      : {};
    let ratingCriteria = req.query.rating
      ? (req.query.rating == 1 ? { $sort: { rating: 1 } } :
        (req.query.rating == -1 ? { $sort: { rating: -1 } } : {}))
      : {};
    let dateCriteria = req.query.date
      ? (req.query.date == 1 ? { $sort: { createdAt: 1 } } :
        (req.query.date == -1 ? { $sort: { createdAt: -1 } } : {}))
      : {};
    let sizeCriteria = req.query.size
      ? (req.query.size == 1 ? { $sort: { createdAt: 1 } } : {}) ||
      (req.query.size == -1 ? { $sort: { createdAt: -1 } } : {})
      : {};
    let colorCriteria = req.query.color
      ? (req.query.color == 1 ? { $sort: { createdAt: 1 } } : {}) ||
      (req.query.color == -1 ? { $sort: { createdAt: -1 } } : {})
      : {};
    let color = [32, 34];

    let data = await PRODUCT.aggregate([
      {
        $project: {
          commonToBoth: { $setIntersection: ["$size", color] },
        },
      },
      {
        $addFields: {
          isWishlisted: {
            $cond: {
              if: { $size: "$commonToBoth" },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $match: { isWishlisted: true },
      },
    ]);
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

_product.getSellerProduct = async (req, res) => {
  try {
    let mydata = await PRODUCT.aggregate([
      { $match: { addedBy: mongoose.Types.ObjectId(req.query.sellerId) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      { $unwind: "$subcategory" },

      {
        $lookup: {
          from: "users",
          localField: "addedBy",
          foreignField: "_id",
          as: "addedBy",
        },
      },
      { $unwind: "$addedBy" },

      {
        $lookup: {
          from: "favorites",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$product", "$$id"] },
              },
            },
            { $match: { favBy: mongoose.Types.ObjectId(req.userId) } },

          ],
          as: "favorites",
        },
      },
      {
        $addFields: {
          isFavourite: { $cond: { if: { $size: "$favorites" }, then: true, else: false } }
        }
      },

      { $sort: { "createdAt": -1 } },
      {
        $project: {
          favorites: 0
        }
      }

    ]);

    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: mydata

    })

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
};

_product.filterProducts = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    let filter = [];
    if (req.query.color.length > 0) {
      filter = [
        {
          $addFields: {
            commonColor: { $setIntersection: ["$color", req.query.color] },
            colorPresent: {
              $cond: {
                if: { $size: "$commonColor" },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $match: { colorPresent: true },
        },
      ];
    }

    if (req.query.productSize.length > 0) {
      filter.push(
        {
          $addFields: {
            commonSize: { $setIntersection: ["$size", req.query.productSize] },
            sizePresent: {
              $cond: {
                if: { $size: "$commonSize" },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $match: { sizePresent: true },
        },
        { $skip: pageSize * (pageNo - 1) },
        { $limit: pageSize },
      );
    }

    const sort = {};
    let isSort = false;
    if (req.query.price == 1 || req.query.price == -1) {
      sort["price"] = Number(req.query.price);
      isSort = true;
    }

    if (req.query.rating == 1 || req.query.rating == -1) {
      sort["rating"] = Number(req.query.rating);
      isSort = true;
    }

    if (req.query.time == 1 || req.query.time == -1) {
      sort["createdAt"] = Number(req.query.time);
      isSort = true;
    }

    if (isSort) {
      filter.push({
        $sort: { ...sort },
      });
    }

    let data = await PRODUCT.aggregate([...filter]);


    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
}

_product.getProductDetailBySubCategory = async (req, res) => {
  try{
    let result = await PRODUCT.aggregate([
      {
        $match: {
          subcategory: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'catgoryDetail'
        }
      },
      {
        $unwind: {
          path: '$catgoryDetail'
        }
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'subcategory',
          foreignField: '_id',
          as: 'subCatgoryDetail'
        }
      },
      {
        $unwind: {
          path: '$subCatgoryDetail'
        }
      },
      {
        $lookup: {
          from: 'users',
          let : {addedBy: '$addedBy'},
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$addedBy"] },
              }
            },
            {
              $lookup: {
                from: 'sellers',
                localField: '_id',
                foreignField: 'requestedUser',
                as: 'sellerAddress'
              }
            },
            {
              $unwind: {
                path: '$sellerAddress'
              }
            }
          ],
          as: 'addedByDetails'
        }
      },
      {
        $unwind: {
          path: '$addedByDetails'
        }
      }
    ])
    if(result.length == 0){
      res.status(400).send({
          success:false,
          message:responseMessage.RECORD_NOTFOUND('Data')
      })
      return
    }
    res.status(200).send({
      success:true,
      message:responseMessage.DATA_FOUND,
      data:result
  })
  }catch(error){
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
}




_product.getSimilarProduct = async (req, res) => {
  try {
    let mydata = await PRODUCT.aggregate([

      {$match:{subcategory:mongoose.Types.ObjectId(req.query.subcategory),_id: { $ne:mongoose.Types.ObjectId(req.query.productid)} }},

      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      { $unwind: "$subcategory" },

      {
        $lookup: { 
          from: "favorites",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$product", "$$id"] },
              },
            },
            { $match: {favBy:mongoose.Types.ObjectId(req.userId)} },

          ],
          as: "favorites",
        },
      },
      {
        $addFields:{
            isFavourite: { $cond: { if: { $size: "$favorites" }, then: true, else: false } }
          }
      },

       {
         $project:{
          favorites:0
       }
      }
 
    ]);
  
      res.status(200).send({
        success:true,
        message:responseMessage.DATA_FOUND,
        data:mydata

    })
    
  } catch (error) {
        res.status(400).send({
          success:false,
          message:responseMessage.SOMETHING_WRONG
      })
  }
};

_product.getProductWithFilter = async(req, res) => {
  try{
    let match = {};
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      throw { message: message.PAGE_INVALID };
    }
    let product = await PRODUCT.find()

    if(req.query.color){
      match.color = req.query.color
    }

    console.log("Match Object: ",match);

    let filter = await PRODUCT.aggregate([
      {
        "aggs":{
          "color": {
            "filter": {}
          }
        }
      }
    ])

    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      // data: product,
      filter: filter
    });
  }catch(error){
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
}



module.exports = _product;
