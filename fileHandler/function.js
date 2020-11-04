const mongoose = require('mongoose')
let config = require('../config/config.js')
let nodemailer = require('nodemailer')
let crypto = require('crypto')
var bcrypt = require('bcryptjs');
let saltRounds = 10;
let myPlaintextPassword = 's0/\/\P4$$w0rD'
let jwt = require('jsonwebtoken');
var Notification=require('../models/notificationSchema')
const cloudinary = require('cloudinary')
var apn = require("apn"),
options, connection, notification;
// create a passphrase random
var passphrase = require('passphrase');

const accountSid = 'AC2f70a2338e2e98c22238204f8e8e2f46';
const authToken = '1dcfc1b53628ef167d1f92098a317998';
const client = require('twilio')(accountSid, authToken);
//  nexmo credentials 
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '1ae2c8a3',
    apiSecret: '9hvObNUEuZkpQDeH'
});


// to hit any url (third party)
var Client = require('node-rest-client').Client;
var nodeClient = new Client();



exports.responseHandler = (res, responseCode, responseMessage, data) => {
    res.send({
        responseCode: responseCode,
        responseMessage: responseMessage,
        data: data
    })
},

    exports.imageUploadToCloudinary = (imageB64, callback) => {
       
        cloudinary.v2.uploader.upload(imageB64, (err, result) => {
            console.log("===>>>>in cloudinary function =====>>>", err, result);
            callback(result.url);
        })
    },



    exports.crypt = function (divPass) {
        
        const secret = 'Mobiloitte1';
        const hash = crypto.createHmac('sha256', secret)
            .update(divPass)
            .digest('hex');
        return hash;

    };

exports.bcrypt = function (divPass, cb) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(divPass, salt, function (err, hashPassword) {
            cb(null, hashPassword)
        });
    });


};

exports.bcryptVerify = (password, dbPassword, cb) => {
    console.log("=======in bcypt verify", password, dbPassword)
    bcrypt.compare(password, dbPassword, (err, res) => {
        if (err) {
            return commonFile.responseHandler(res, 400, "Invalid Credentials.")
        } else {
            
            cb(null, res)
        }
    });
}


exports.jwt = (body, cb) => {
    console.log("calling jwt function ====", body)
    let token = jwt.sign(body, config.jwtSecretKey)
    console.log("token====", token)
    cb(null, token)

};

exports.jwtVerify = (req, res, next) => {
    if (req.headers.jwt == "null" || req.headers.jwt == "" || req.headers.jwt == "undefined" || req.headers.jwt == null || req.headers.jwt == undefined) {
        console.log("token missing")
        return commonFile.responseHandler(res, 400, "Token Missing")
    }

    jwt.verify(req.headers.jwt, config.jwtSecretKey, function (err, decoded) {
        if (err) {
            console.log("Invalid token")
            return commonFile.responseHandler(res, 400, "Token Invalid", err)
        } else {
            
            next();
        }
    });


}


/*  Allow less secure apps: ON  from your gmail for sending gmail*/

exports.sendEmail = (email, subject, message, link, cc, bcc, callback) => {
    console.log("in send email for forgot password ==> ", email, subject, message, link)
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ph-anuj@mobiloitte.com',
            pass: 'anuj11083'
        }
    })
    let messageObj = {
        from: 'Noreply<ph-anuj@mobiloitte.com>',
        to: email,
        subject: subject,
        text: message, //"A sentence just to check the nodemailer",
        html: link, //"Click on this link to <a href=" + link + ">reset Password</a>",
        cc: cc,
        bcc: bcc
    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("in send mail second console-----", err, info)
        if (err) {
            console.log("Error occured", err)
            callback(null);
        } else {
            console.log("Mail sent")
            callback(null, info)
        }
    })
}

exports.balanceCal = async (contract, ownerAddress) => {
    try {
        var balance = await contract.methods.balanceOf(ownerAddress).call();
        return balance;
    } catch (err) {
        return err;
    }
}

//  twilio for sending otp on mobiles
exports.sendMessage = (number, text, callback) => {
    client.messages.create({
        body: 'Your otp-  ' + "123642dfherw5",
        to: '+917451919823', // Text this number
        from: '+15868008694' // From a valid Twilio number
    }).then(data => {
        console.log("your otp is====>>", data)
        callback(null, data)
    }).catch(err => {
        console.log("in catch send otp to mobile by twilio===")
        callback(err)
    })
}

//  nexmo for sending otp on mobiles
exports.sendMessageNexmo = (number, otp, callback) => {
    callback(null, otp)
    return;
    let from = '+918273242159';
    let to = '+91' + number;
    let text = 'Your OTP verification number is ' + otp;
    nexmo.message.sendSms(from, to, text, (error, response) => {
        if (error) {
            console.log("second")
            throw error;
        } else {
            console.log("response=====>>", response)
            callback(null, otp)
        }
    })
}
// create the passphrase
exports.createPass = (cb) => {
    var entropy = 175;//create 12 words passphrase
    passphrase(entropy, (_, phrase, actualEntropy) => {
        console.log('My passphrase is:', phrase);
        cb(null, phrase);
    });
}

// get the response from third party or etherscan
exports.nodeClient = (url, cb) => {
    nodeClient.get(url, (data, response) => {
        console.log("data==>>", data);
        cb(null, data)
    });
}

// get the response from third party or etherscan
exports.hoursFormat = (second) => {
     d = Number(second);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " : " : " : ") : "00 : ";
    var mDisplay = m > 0 ? m + (m == 1 ? " : " : " : ") : "00 : ";
    var sDisplay = s > 0 ? s + (s == 1 ? " " : " ") : "00";
    return hDisplay + mDisplay + sDisplay; 
}

exports.sendNotification = (deviceToken, title, message, data, notiObj) => {



    var serverKey = 'AAAAdtyNEC0:APA91bFeZPCM-fslejcqzZHNrXE_fExyhkjqn5FzuXj4mJ3X9pkClFG9Hs0I76-pnIRmw512uEVBkhrMBzYF7FbqEirrVS6anw0uEuu8o3gzZG48hhCKlQrIEIZs36os5qTZiRU9b02r';
    var fcm = new FCM(serverKey);
    data["title"] = title;
    data["body"] = message;
    var payload = {

        to: deviceToken,
        "content_available": true,
        collapse_key: 'your_collapse_key',
        notification: {
            title: title,
            body: message,
            click_action: "fcm.ACTION.NOTIF"
        },
        data: data
    };

    fcm.send(payload, function (err, response) {
        if (err) {
        } else {
            let obj = {
                customerId: { cid: notiObj.userId, image: notiObj.image, name: notiObj.name },
                bussinessId: { bid: notiObj.businessManId },
                noti_type: 'CUSTOMER',
                eventId: notiObj.eventId,
                content: message,
                type: notiObj.type,
            };
            if (notiObj.eventStatus)
                obj.eventStatus = notiObj.eventStatus;

            let noti = new (obj);
            noti.save((er1, ress) => {
                if(er1){
                    console.log("Error is==========>",er1)
                }
                else{
                   Console.log("Notification saved successfully") 
                }
            })

        }
    });

}


exports.sendiosNotification = function(deviceToken1,msg,sendorId,senderName) {
    var options = {
        "cert": "mobiloitteenterprisedistribution.pem",  
        "key": "mobiloitteenterprisedistribution.pem",
        "passphrase": "Mobiloitte1",
        "gateway": "gateway.push.apple.com",
        "port": 2195,
        "enhanced": true,
        "cacheLength": 5
        };


    var deviceToken = deviceToken1;
        var title = "VideoPosting";
        var message = 'Text';
        var chatType = 'chatType';
        var apnConnection = new apn.Connection(options);
        var note = new apn.Notification();
        note.badge = 1;
        note.alert = msg;
        note.sound = 'default';
        note.payload = { title: title, message: msg, type: "chatType" ,sendorId:sendorId, senderName:senderName};
      
        try {
       apnConnection.pushNotification(note, deviceToken)
             console.log('iOS Push Notification send');
        } catch (ex) {
         console.log("Error in push notification-- ", ex);
        }
    }

