/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

var FCM = require('fcm-push');

module.exports = {
  pushNotification: (deviceTokens, title, body,chatId,userName,profileImg,senderId,receiverId) => {
    var serverKey = 'AAAAWcr08xs:APA91bHL0T347rVLQKP6C5j4o7Tk4TkTrN1OQsrh4qoDIfkNgfSElJ_eUBJkmeDya_8myL-XzPdfKRXk8P1AQHy-ccdyrJ_ggIkBECmSaOHt900T_55SZ8fbtzTzj3jFreq1In6UssDo';
    var fcm = new FCM(serverKey)
   
    var message = {
        to: deviceTokens,
         "content_available": true,
        collapse_key: 'your_collapse_key',
        data : {
            your_custom_data_key: 'socket',
            chatId:chatId,
            userName:userName,
            profileImg:profileImg,
            senderId:senderId,
            receiverId:receiverId
    },
        notification: {
            title: title,
            body: body
        }
    };
    console.log("device token is =========>>>>>", deviceTokens)
    fcm.send(message, function (err, response) {
        console.log("message is =====>>>", message)
        console.log("me here >>>>>>=====>>>", err, response)
        if (err) {
            console.log("err is =======>>>>>233", err)
            // callback(err, null)
        }
        else {
            console.log("Push notification detail>>>>>>",response);
            // callback(null, response)
        }
    })
},
};
