/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const CART = require("../model/cartModel");
const PRODUCT = require("../../productService/model/productModel");

const mongoose = require("mongoose"); // set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const _cart = {};

//Add Products to the Cart
_cart.addProduct = async (req, res) => {
  try {
    let data = req.body;
    data.addedBy = req.userId;

    let alreadyAdded = await CART.findOne({
      product: data.product,
      addedBy: req.userId,
    });

    let result;
    if (alreadyAdded) {
      let quantity = alreadyAdded.quantity + data.quantity;
      result = await CART.findOneAndUpdate(
        { product: data.product, addedBy: req.userId },
        { $set: { quantity: quantity } },
        { new: true }
      );
      // let productData=await PRODUCT.findOne({_id:data.product})

      //  let totalPrice=productData.currentProductPrice;

      // result = await CART.findOneAndUpdate(
      //   { product: data.product, addedBy: req.userId },
      //   { $set: { totalPrice: totalPrice*result.quantity } },
      //   { new: true }
      // );



    } else {

      // let productData=await PRODUCT.findOne({_id:data.product})

      // let totalPrice=productData.currentProductPrice*data.quantity;


      // console.log(`totalPrice`, totalPrice)
      // data.totalPrice=totalPrice

      result = await CART.create(data);


    }
    console.log(result,"[[[[[[[[[[[[[[[[[[[[[")
    res.status(200).send({
      success: true,
      message: responseMessage.VERIFICATION("Product Added To the Cart"),
      data: result,
    });
  } catch (error) {
    console.log(error,"//////////////////")
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Edit Products of the Cart
_cart.editProduct = async (req, res) => {
  try {
    let data = req.body
    data.quantity = data.inc ? 1 : -1;

    let result = await CART.findOneAndUpdate(
        { product: data.product, addedBy: req.userId },
        { $inc: { quantity: data.quantity } },
        { new: true }
      );
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Record"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.SUCCESSS_EDIT("Quantity"),
      data: result,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: responseMessage.SOMETHING_WRONG });
  }
};

//Get List of Products in Cart by Login User
_cart.getProducts = async (req, res) => {
  try {
    let result = await CART.find({ addedBy: req.userId, quantity:{$gt:0} }).populate(
      "product"
    );
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Product "),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.RECORDFOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Remove Products from Cart
_cart.removeProducts = async (req, res) => {
  try {
    let result = await CART.findOneAndRemove({ addedBy: req.userId, _id:req.params.id });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Product "),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.REMOVEDSUCCESSS('Product'),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

module.exports = _cart;
