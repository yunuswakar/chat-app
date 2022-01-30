/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const dotenv = require("dotenv");
dotenv.config();                      
const secretKey = process.env.stripe_Key;

const ORDER = require("../model/orderModel");
// const CART = require("../../cartService/model/cartModel");
const CART = require("../../cartServices/model/cartModel");
const PRODUCT = require("../../productService/model/productModel");
const ADDRESS = require("../../userServices/model/addressModel");
const ORDERNOTIFICATION = require("../../notificationService/model/orderNotificationModel");
const USER = require("../../userServices/model/userModel")
const stripe = require("stripe")(secretKey);

const Constant =require("../../../helpers/constant")
var ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose"); // set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files

const commonFunction = require("../../../helpers/commonFunctions");
const _order = {};

//Add order for COD(cash on delivery)
_order.addOrder = async (req, res) => {  
  try {
    let user=await USER.findOne({_id:req.userId})
    let data = req.body;
    var randomNumber = commonFunction.getOTP(7);
    let addressId=data.addressId

    let address=await ADDRESS.findOne({_id:data.addressId})

    let result = await ORDER.create(req.body.orderData);

    let array = [];
    result.map((a) => {
      array.push(a._id);
    });
    req.body.orderData.map(async (data) => {
      let result = await PRODUCT.findOne({ _id: data.product });
      let updateData = await PRODUCT.update(
        { _id: data.product },
        { $set: { quantity: result.quantity - data.quantity } },
        { new: true, multi: true }
      );
    });

    
    req.body.orderData.forEach(async (element) => {
      await CART.deleteMany({
        product: element.product,
        addedBy: element.booked_by,
      });
    });
    var date = new Date();
    let dateValue=await date.setDate(date.getDate() + 5);
    let updateData = await ORDER.findOneAndUpdate(
      { _id: { $in: array } },
      { $set: { orderId: randomNumber,delivery_date:dateValue,name:address.name,email:address.email,mobileNumber:address.mobileNumber,address1:address.address1,address2:address.address2,
        country:address.country,pincode:address.pincode
      }},
      { new: true, multi: true }
    );

  let pushNot=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! You have successfully ordered this pruduct`)

    let obj={
      sendBy:req.userId,
      sendTo:req.userId,
      title: "famebase",
      body:`Dear ${user.userName}! You have successfully ordered this product`,
      message:`Dear ${user.userName}! You have successfully ordered this product`,
      notificationType: "Order",
      orderId: randomNumber
  }
  let paymentNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Payment has been successfully done!`)
           
  let payobj={
  sendBy:req.userId,
  sendTo:req.userId,
  title: "Famebase",
  body:`Dear ${user.userName}! Your Order ${randomNumber} amounting to Rs. ${updateData.price} has been received.`,
  message:`Dear ${user.userName}! Your Order ${randomNumber} amounting to Rs. ${updateData.price} has been received.`,
  notificationType: "Payment",
  orderId: randomNumber
}
  let results = await new ORDERNOTIFICATION(obj).save();
  let payresults = await new ORDERNOTIFICATION(payobj).save();
    res.status(200).send({
      success: true,
      message: responseMessage.VERIFICATION("Ordered "),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
_order.payment=async(req, res)=>{
  try {

    let user=await USER.findOne({_id:req.userId})
     
    if (req.body.cardId && req.body.customerId) {
      let charge=await stripe.charges
              .create({
                amount: req.body.amount * 100,
                currency:Constant.currency,
                customer:req.body.customerId,
                description: "charge created for order product",
              });
              
              let data = req.body;
              var randomNumber = commonFunction.getOTP(7);
              let address=await ADDRESS.findOne({_id:req.body.addressId})
          
              let result = await ORDER.create(req.body.orderData);

              let array = [];
              result.map((a) => {
                array.push(a.id);
              });
              req.body.orderData.map(async (data) => {
                let result = await PRODUCT.findOne({ _id: data.product });
                let updateData = await PRODUCT.findByIdAndUpdate(
                  { _id: data.product },
                  { $set: { quantity: result.quantity - data.quantity } },
                  { new: true, multi: true }
                );
              });
              req.body.orderData.forEach(async (element) => {
                await CART.deleteMany({
                  product: element.product,
                  addedBy: element.booked_by,
                });
              });
              var date = new Date();
              
              let dateValue=await date.setDate(date.getDate() + Constant.day); 

              let updateData = await ORDER.update(
                { _id: { $in: array } },
                { $set: { orderId: randomNumber,delivery_date:dateValue,name:address.name,email:address.email,mobileNumber:address.mobileNumber,address1:address.address1,address2:address.address2,
                  country:address.country,pincode:address.pincode,paymentMethod:"Stripe",transactionId:charge.balance_transaction,customerId:req.body.customerId,
                  chargeId: charge.id, receipt_url: charge.receipt_url,currency: charge.currency,transactionStatus: charge.status
                }},
                { new: true, multi: true }
              );  
              
              let pushNot=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! You have successfully ordered this pruduct && Your fambase order ID:${randomNumber}`)
              let paymentNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Payment has been successfully done!`)
               let obj={
                 sendBy:req.userId,
                 sendTo:req.userId,
                 title: "Famebase",
                 body:`Dear ${user.userName}! You have successfully ordered this product`,
                 message:`Dear ${user.userName}! You have successfully ordered this product`,
                 notificationType: "Order",
                 orderId: randomNumber
             }
             let payobj={
              sendBy:req.userId,
              sendTo:req.userId,
              title: "Famebase",
              body:`Dear ${user.userName}! Your Order ${randomNumber} amounting to Rs. ${updateData.price} has been received.`,
              message:`Dear ${user.userName}! Your Order ${randomNumber} amounting to Rs. ${updateData.price} has been received.`,
              notificationType: "Payment",
              orderId: randomNumber
          }
             let results = await new ORDERNOTIFICATION(obj).save();
             let payresults = await new ORDERNOTIFICATION(payobj).save();
              res.status(200).send({
                success: true,
                message: responseMessage.VERIFICATION("Ordered"),
                data: charge,
              });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
}


//Add order
_order.addOrderss = async (req, res) => {
  try {
    let data = req.body;
    let result = await ORDER.create(req.body.orderData);

    res.status(200).send({
      success: true,
      message: responseMessage.VERIFICATION("Ordered "),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
//Edit order
_order.editOrder = async (req, res) => {
  try {
    let user=await USER.findOne({_id:req.userId})

    let updation = await ORDER.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true }
    );

    let orderQuantity=updation.quantity;
    let productQuantity=await PRODUCT.findOne({_id:updation.product})

    let productUpdation = await PRODUCT.findOneAndUpdate(
      { _id:updation.product},
      { $set: { quantity:productQuantity.quantity+orderQuantity}},
      { new: true }
    );
    if (!updation) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Order"),
      });
      return;
    }

    let pushNot=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! As per your request your order has been cancelled successfully && Your fambase order ID:${updation.orderId}`)
 
     let obj={
       sendBy:req.userId,
       sendTo:req.userId,
       title: "famebase",
       body: `Dear ${user.userName}! As per your request your order has been cancelled successfully && Your fambase order ID:${updation.orderId}`,
       message: `Dear ${user.userName}! As per your request your order has been cancelled successfully && Your fambase order ID:${updation.orderId}`,
       notificationType: "OrderCancel",
       orderId: updation.orderId
   }
   let results = await new ORDERNOTIFICATION(obj).save();

   res.status(200).send({
    success: true,
    message: responseMessage.DELETE("Record"),
    data: updation,
  });

  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: error.message });
  }
};

//Get list of orders to user
_order.getOrders = async (req, res) => {
  try {

    let result = await ORDER.find({ booked_by: req.userId,status: { $in: [Constant.Pending,Constant.Confirmed,Constant.InProgress,Constant.Packed]} //
// =======
//     let result = await ORDER.find({ booked_by: req.userId,status: { $in: [Constant.Pending,Constant.Confirmed,Constant.InProgress]} //
// >>>>>>> ca6b4c7e0291c2b73dc96e9544c9d8b11d49c3ea
  }).populate(
      "product"
    ).sort({createdAt:-1});
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Order "),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.RECORDFOUND,
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
//Get cancel order
_order.cancelOrder = async (req, res) => {
  try {
    let result = await ORDER.find({ booked_by: req.userId,status:Constant.Cancelled}).populate(
      "product"
    ).sort({createdAt:-1});
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Order"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.RECORDFOUND,
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//Get cancel order
_order.completeOrder = async (req, res) => {
  try {
    let result = await ORDER.find({ booked_by: req.userId,status:Constant.Delivered}).populate(
      "product sellerId" 
    ).sort({createdAt:-1});
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Order "),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.RECORDFOUND,
      data: result
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};



//Get list of orders to seller
_order.getSellerOrders = async (req, res) => {
  try {
    let result = await ORDER.aggregate([
      {
        $lookup: {
          from: "products",
          let: { product: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$addedBy", mongoose.Types.ObjectId(req.userId)],
                },
              },
            }
          ],
          as: "product",
        },
      },
    ]);
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Order "),
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
      message: error.message,
    });
  }
};

//Get filtered list of orders to seller
_order.filterList = async (req, res) => {
  try {

    let filter = req.params.status==0? {} : {status: Number(req.params.status)};

    let result = await ORDER.find(filter).populate({ 
      path: 'product',
      populate: {
        path: 'category',
        select: 'title'
      },
      select: 'title images category' 
   }).select('-quantity');

    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Order "),
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
      message: error.message,
    });
  }
};

//Delete order
_order.deleteOrder = async (req, res) => {
  try {
    let deletion = await ORDER.findOneAndRemove(
      { _id: req.params.id }
    );
    if (!deletion) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Order"),
      });
    }

    res.status(200).send({
      success: true,
      message: responseMessage.DELETE("Record")
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: error.message });
  }
};

//Return Request
_order.returnRequest = async (req, res) => {
  try {
    let updation = await ORDER.findOneAndUpdate(
      { _id: req.params.id },
      {$set:
        {
          retReason: req.body.reason,
          status:6
        }
      }
    );
    if (!updation) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Order"),
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: responseMessage.REQUEST("Return Request")
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: error.message });
  }
};

_order.getAllOrders = async (req, res) => {
  try {
    let pageSize = parseInt(req.query.pageSize) || Constant.pageSize
    let pageNo = parseInt(req.query.pageNo);
    let query={}
      if (req.query.status == Constant.page) {
        
      }else{
        query.status=parseInt(req.query.status)
      }
    let mydata = await ORDER.aggregate([

      {$match:{sellerId:mongoose.Types.ObjectId(req.userId)}},
      {
        $lookup: { 
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {$match:query},
      { $unwind: "$product" },

      {
        $lookup: {
          from: "users",
          localField: "booked_by",
          foreignField: "_id",
          as: "booked_by",
        },
      },
      { $unwind: "$booked_by" },

      {$sort:{"createdAt":-1}},
     
      { $skip: pageSize * (pageNo - 1) },
      { $limit: pageSize },
    ]);

   
    let totalCount = await ORDER.aggregate([
      {$match:{sellerId:mongoose.Types.ObjectId(req.userId)}},

      {$match:query},

      {
        $count: "mydata"
      }
    ]);
    if (mydata.length==Constant.length) {
      res.status(200).send({
        success:true,
        message:responseMessage.DATA_FOUND,
        data:[],
        count:0
      });
    }
    else{
      res.status(200).send({
        success:true,
        message:responseMessage.DATA_FOUND,
        data:mydata ? mydata :[],
        count:totalCount[0].mydata
    })
    }
  } catch (error) {
        res.status(400).send({
          success:false,
          message:error.message
      })
  }
};
_order.viewProduct= async (req, res) => {
  try {
    let result = await ORDER.find({_id:req.query.id}).populate("product booked_by")
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Order "),
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
      message: error.message,
    });
  }
};

//Listing of Card
_order.cardDetails= async(req, res)=>{
  try {
    const cards = await stripe.customers.listSources(
      req.query.customerId,(err,result)=>{
        if (result) {
          res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:result
        })
        }
      });
    
  } catch (error) {
      res.status(400).send({
          success:false,
          message:error.message
      })
  }
}
//Listing of Products 
_order.createCard= async(req, res)=>{
  try {
      stripe.tokens
        .create({
          card: {
            number: parseInt(req.body.cardNumber),
            exp_month: req.body.expMonth,
            exp_year: req.body.expYear,
            cvc: req.body.cvc,
            currency:Constant.currency,
          },
        })
        .catch((error) => {
          res.status(200).send({
            message: error.raw.message,
            status:410
          });
        })
        .then(async(token) => {
          if(token === undefined){
            return
          }
          let cardData=await stripe.customers.createSource(
            req.body.customerId,
            
            {source:token.id}
          ); 
          res.status(200).send({
            success: true,
            message: responseMessage.VERIFICATION("Card created"),
            data: cardData,
          });

        });
  } 
  
  catch (error) {
      res.status(400).send({
          success:false,
          message:error.message
      })
  }
}
//Listing of Products 
_order.deleteCard= async(req, res)=>{
  try {
    const deleted = await stripe.customers.deleteSource(
      req.query.customerId,
      req.query.cardId
    ); 
    res.status(200).send({
      success: true,
      message: responseMessage.DELETE("Card")
    });  
  } catch (error) {
      res.status(400).send({
          success:false,
          message:error.message
      })
  }
}

_order.getOrderAsPerStatus = async (req,res,next) => {
  try {
    const getOrdersByStatus = await ORDER.find({status : req.body.orderStatus});
    if(getOrdersByStatus){
      res.status(200).send({
        success:true, 
        message:responseMessage.DATA_FOUND,
        data:getOrdersByStatus
    })
    }else 
      res.status(400).send({
        success:true,
        message:responseMessage.NOT_FOUND
    })
   
  } catch (error) {
    res.status(400).send({
      success:false,
      message:error.message
  })
  }
}

_order.getListofStripePaymentTransaction = async(req, res) => {
  try{
    let charges = {}
    let pageSize = parseInt(req.query.pageSize) || Constant.pageSize
    let pageNo = parseInt(req.query.pageNo);

    let transactions = await ORDER.find({paymentMethod: "Stripe"}).populate("product").limit(pageSize).skip(pageSize * (pageNo - 1)).sort({createdAt:-1})
// =======
//     let transactions = await ORDER.find({paymentMethod: "Stripe"}).populate("product").limit(pageSize).skip(pageSize * (pageNo - 1)).sort({createdAt:-1})
// >>>>>>> ca6b4c7e0291c2b73dc96e9544c9d8b11d49c3ea
    // const count = await ORDER.countDocuments({paymentMethod: "Stripe"})
    charges = await stripe.charges.list();
    charges.data.map((e,i) => {
      transactions.map((ele,ind) => {
        if(e.id === ele.chargeId){
          e.transactions = ele
        }
      })
    })
    res.status(200).send({
      success:true, 
      message:responseMessage.DATA_FOUND,
      data: charges,
      
  })
  }catch(error){
    res.status(400).send({
      success:false,
      message:error.message,
    })
  }
}


module.exports = _order;
