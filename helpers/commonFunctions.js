/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const constant = require("../helpers/constant");// set constant from file
var FCM = require('fcm-push');

module.exports = {

  // common response for api`s
  setResponseObject: async (req, success, message, data) => {
    let resp = {}
    if (success.status === false) {
      resp = {
        success: false,
        dateCheck: constant.dateCheck,
        typeStatus: 1
      };
    } else {
      resp = {
        success: success,
        dateCheck: constant.dateCheck,
      };
    }

    if (message) {
      resp["message"] = message;
    }
    if (data) {
      resp["data"] = data;
    }
    req.newRespData = await resp;
    return;
  },

  // get day month year for date object
  getDateFromObj: async (date) => {
    var date = new Date(date);
    var day = date.getDate(); //Date of the month: 2 in our example
    var month = date.getMonth(); //Month of the Year: 0-based index, so 1 in our example
    var year = date.getFullYear()
    return day + "/" + month + "/" + year
  },

  getOTP() {
    var otp = Math.floor(1000000 + Math.random() * 9000000);
    return otp;
  },
  pushNotification: (deviceTokens, title, body, orderId) => {
    var serverKey = 'AAAAWcr08xs:APA91bHL0T347rVLQKP6C5j4o7Tk4TkTrN1OQsrh4qoDIfkNgfSElJ_eUBJkmeDya_8myL-XzPdfKRXk8P1AQHy-ccdyrJ_ggIkBECmSaOHt900T_55SZ8fbtzTzj3jFreq1In6UssDo';
    var fcm = new FCM(serverKey)
    var message = {
      to: deviceTokens,
      "content_available": true,
      collapse_key: 'your_collapse_key',
      notification: {
        title: title,
        body: body,
        orderId: orderId
      },
      data: {
        orderId: orderId
      }

    };
    fcm.send(message, function (err, response) {
      if (err) {
        // callback(err, null)
        console.log(null, err)
      }
      else {
        console.log(null, response)
        // callback(null, response)
      }
    })  
  },
  followNotification: (deviceTokens, title, body, userId) => {
    var serverKey = 'AAAAWcr08xs:APA91bHL0T347rVLQKP6C5j4o7Tk4TkTrN1OQsrh4qoDIfkNgfSElJ_eUBJkmeDya_8myL-XzPdfKRXk8P1AQHy-ccdyrJ_ggIkBECmSaOHt900T_55SZ8fbtzTzj3jFreq1In6UssDo';
    var fcm = new FCM(serverKey)
    var message = {
      to: deviceTokens,
      "content_available": true,
      collapse_key: 'your_collapse_key',
      data: {
        userId: userId, 
      },
      notification: {
        title: title,
        body: body
      }
    };
    fcm.send(message, function (err, response) {
      if (err) {
        console.log(null, err)
      }
      else {
        console.log(null, response)
        // callback(null, response)
      }
    })
  },

  messageNotification: (deviceTokens, title, body) => {
    var serverKey = 'AAAAWcr08xs:APA91bHL0T347rVLQKP6C5j4o7Tk4TkTrN1OQsrh4qoDIfkNgfSElJ_eUBJkmeDya_8myL-XzPdfKRXk8P1AQHy-ccdyrJ_ggIkBECmSaOHt900T_55SZ8fbtzTzj3jFreq1In6UssDo';
    var fcm = new FCM(serverKey)
    var message = {
      to: deviceTokens,
      "content_available": true,
      collapse_key: 'your_collapse_key',
      notification: {
        title: title,
        body: body
      }
    };
    fcm.send(message, function (err, response) {
      if (err) {
        callback(err, null)
      }
      else {
        callback(null, response)
      }
    })
  },

  passwordChangedNotification: (deviceTokens, title, body) => {
    var serverKey = 'AAAAWcr08xs:APA91bHL0T347rVLQKP6C5j4o7Tk4TkTrN1OQsrh4qoDIfkNgfSElJ_eUBJkmeDya_8myL-XzPdfKRXk8P1AQHy-ccdyrJ_ggIkBECmSaOHt900T_55SZ8fbtzTzj3jFreq1In6UssDo';
    var fcm = new FCM(serverKey)
    var message = {
      to: deviceTokens,
      "content_available": true,
      collapse_key: 'your_collapse_key',
      notification: {
        title: title,
        body: body
      }
    };
    fcm.send(message, function (err, response) {
      if (err) {
        callback(err, null)
      }
      else {
        callback(null, response)
      }
    })
  },

  messagePushNotification: (deviceTokens, title, body,receiverName,senderId,chatId) => {
    var serverKey = 'AAAAWcr08xs:APA91bHL0T347rVLQKP6C5j4o7Tk4TkTrN1OQsrh4qoDIfkNgfSElJ_eUBJkmeDya_8myL-XzPdfKRXk8P1AQHy-ccdyrJ_ggIkBECmSaOHt900T_55SZ8fbtzTzj3jFreq1In6UssDo';
    var fcm = new FCM(serverKey)
    var message = {
      to: deviceTokens,
      "content_available": true,
      collapse_key: 'your_collapse_key',
      data: {
        user_name: receiverName,
        senderId: senderId,
        chatId:chatId,
        type: "chat"
      },
      notification: {
        title: title,
        body: body,
      },
    };
    fcm.send(message, function (err, response) {
      if (err) {
        // callback(err, null)
        console.log(null, err)
      }
      else {
        console.log(null, response)
        // callback(null, response)
      }
    })  
  },
};


