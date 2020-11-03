var Sender = require('aws-sms-send');
const { config } = require('../config/config')
const mailer = require('nodemailer')
const fs = require('fs');
var FCM = require('fcm-push');
var path = require("path");
var cloudinary = require('cloudinary');
const twilio = require('twilio');
const userModel = require('../model/userModel')

cloudinary.config({
    "cloud_name": "dxpgsnqbw",
    "api_key": "549273191543456",
    "api_secret": "eN8D-qIT_VlPrtuX-kRYCg8zVdw"
});
var aws_topic = 'arn:aws:sns:us-east-1:872543194279:swiftpro'

var awsConfig = {
    AWS: {
        accessKeyId: 'AKIAIXZDX73MUUGCBGZQ',
        secretAccessKey: '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',
        region: 'us-east-1',
    },
    topicArn: aws_topic,
};

// const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');
const stripe=require("stripe")("sk_test_ZHansZT1CxkNml9BUCNZhTVG00fV4GVpBw");

var sender = new Sender(awsConfig);
/**
    * Function Name : getOTP
    * Description   : Genrate random number 
    *
    *
    * @return otp
    */
const getOTP = function () {
    var otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}
/**
    * Function Name : sendSms
    * Description   : Send Sms with SNS (AWS)
    *
    *
    * @return otp
    */
const sendSms1 = function (message, mobile, callback) {
    sender.sendSms(message, 'remittance', false, mobile)
        .then(function (response) {
            callback(null, response)
        })
        .catch(function (err) {
            callback(null, err)
        })
}


const sendSms = function (message, number, callback) {
    let client = new twilio("AC596ef7dbd338dc52c4c1e41bd0fc477d", "5dcb0753a292c6d907ba7f17d7e8f80d");
    client.messages.create({
        body: message,
        to: number,
        from: "+13367906768"
    })
    callback(null, message);
    // .then((message) => {
    //     callback(null, message);
    //     console.log("message====>>>>>>>", message)
    // })
    // .catch(function (err) {
    //     callback(err, null)
    // })
}
/**
    * Function Name : writeImage
    * Description   : upload Image for multi part
    *
    *
    * @return otp
    */
const writeImage = function (file, filename, pathImage, callback) {
    try {
        fs.readFile(file.path, function (err, fileData) {
            if (err) {
                return callback(err);
            } else {
                const imagePath = path.join(__dirname, '../' + '' + pathImage);
                const fullPath = imagePath + filename;
                console.log('fullPath ' + fullPath)
                fs.writeFile(fullPath, fileData, (err) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(false, filename);
                    }
                })
            }
        })

    } catch (err) {
        console.log(err);
        callback(err);
    }
}


/**
    * Function Name : sendMail
    * Description   : Send the mail for OTP
    *
    *
    * @return otp
    */
const sendMail = function (email, subject, name, otp, callback) {
    let html = `<html lang="en">
                      <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta name="description" content="">
                        <meta name="author" content="">
                        <title>Vendor & Users</title>
                      </head>
                      <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                     
                        <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                      <div>
                          <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                            <tbody>
                            <tr style="margin:0;padding:0">
                            <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">

                                
                            REMITTANCE          
                                
                            </td>
                        </tr>
                                <tr>
                                  <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
                                </tr>
                                <tr>
                                <td style="padding: 10px 15px 10px;">Thank you for using WalletApp </td>
                              </tr>
                              
                                <tr>
                                <td style="padding: 50px 15px 10px;"><p>Your OTP is:  ${otp}</a></p></td>
                                </tr>
                               
                                       
                                <tr>
                                  <td style="padding: 25px 15px 20px;">
                                    Thanks &amp; Regards <br> Team WalletApp
                                    </td>
                               </tr>
                               <tr>
                             </tr>
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </body>
                     </html>`
    const mailBody = {
        from: "<do_not_reply@gmail.com>",
        to: email,
        subject: subject,
        html: html
    };
    mailer.createTransport({
        service: 'GMAIL',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        },
        port: 587,
        host: 'smtp.gmail.com'


    }).sendMail(mailBody, callback)
}

const sendVendorMail = function (email, subject, name, body, callback) {
    let html = `<html lang="en">
                        <head>
                          <meta charset="utf-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <meta name="description" content="">
                          <meta name="author" content="">
                          <title>Vendor & Users</title>
                        </head>
                        <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                       
                          <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                        <div>
                            <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                              <tbody>
                              <tr style="margin:0;padding:0">
                              <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                              
                               Welcome to Walletapp
                              </td>
                          </tr>
                                  <tr>
                                    <td style="padding: 50px 15px 10px;">Hello ${name}, </td>
                                  </tr>
                                  <tr>
                                  <td style="padding: 10px 15px 10px;">Congratulations !! Your new vendor account has been set up. </td>
                                  </tr>
                                  <tr>
                                  <td style="padding: 15px 15px 10px;">Please bookmark the link:${body}.</td>
                                  </tr>
                                
                                  <tr>
                                    <td style="padding: 25px 15px 20px;">
                                      Thanks &amp; Regards <br> Team WalletApp
                                      </td>
                                 </tr>
                                 <tr>
                               </tr>
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </body>
                       </html>`
    const mailBody = {
        from: "<do_not_reply@gmail.com>",
        to: email,
        subject: subject,
        html: html
    };
    mailer.createTransport({
        service: 'GMAIL',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        },
        port: 587,
        host: 'smtp.gmail.com'
    }).sendMail(mailBody, callback)
}











const sendVendorNotiMail = function (emailTo, subject, name, body, callback) {

    console.log("what >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", emailTo)



    let html = `<html lang="en">
                        <head>
                          <meta charset="utf-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <meta name="description" content="">
                          <meta name="author" content="">
                          <title>Vendor & Users</title>
                        </head>
                        <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                       
                          <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                        <div>
                            <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                              <tbody>
                              <tr style="margin:0;padding:0">
                              <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                              REMITTANCE
                              </td>
                          </tr>
                                  <tr>
                                    <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
                                  </tr>
                                  <tr>
                                  <td style="padding: 15px 15px 10px;">${body}.</td>
                                  </tr>
                                  <tr>
                                  <td style="padding: 10px 15px 10px;">Thank you for using WalletApp </td>
                                </tr>
                                
                                  <tr>
                                    <td style="padding: 25px 15px 20px;">
                                      Thanks &amp; Regards <br> Team WalletApp
                                      </td>
                                 </tr>
                                 <tr>
                               </tr>
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </body>
                       </html>`
    // const mailBody = {
    //     from: "<do_not_reply@gmail.com>",
    //     to: email,
    //     subject: subject,
    //     html: html
    // };
    // mailer.createTransport({
    //     service: 'GMAIL',
    //     auth: {
    //         user: global.gConfig.user,
    //         pass: global.gConfig.pass
    //     },
    //     port: 587,
    //     host: 'smtp.gmail.com'
    // }).sendMail(mailBody, callback)

    let transporter = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        }
    });

    emailTo.forEach(function (to, i, array) {
        console.log("1", i)
        var msg = {
            from: global.gConfig.user, // sender address
            // subject: "Hello ✔", // Subject line
            subject: subject, // Subject line

            // text: "please again ignore it final1 ✔", // plaintext body
            html: html,
            to: to
            // html: "<b>Hello world ✔</b>" // html body
        }
        // msg.to = to;
        transporter.sendMail(msg, function (err, result) {

            console.log("2>>>>>>", err, result)
            if (err) {
                console.log('Sending to ' + to + ' failed: ' + err);

                return
                // callback(err,null)
            } else {
                console.log('Sent to ' + to);
                if (i !== emailTo.length - 1) {
                    return
                }
                else {
                    console.log("in last execution")
                    callback(null, result)
                }
            }

            if (i === emailTo.length - 1) {
                console.log("dsfdfddf")

                msg.transport.close();


            }

        });
    });



}

























const sendMailAdmin = function (email, subject, time, callback) {
    let html = `<html lang="en">
                      <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta name="description" content="">
                        <meta name="author" content="">
                        <title>Welcome</title>
                      </head>
                      <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                     
                        <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                      <div>
                          <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                            <tbody>
                            <tr style="margin:0;padding:0">
                            <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                            REMITTANCE
                            </td>
                        </tr>
                                <tr>
                                  <td style="padding: 50px 15px 10px;">Dear Admin, </td>
                                </tr>
                                <tr>
                                <td style="padding: 10px 15px 10px;">Thank you for using WalletApp </td>
                              </tr>
                              
                                <tr>
                                <td style="padding: 10px 15px 10px;"><p>You are successfully logged in!</a></p></td>
                                <tr>
                                <td style="padding: 10px 15px 10px;"><p>Your latest login was done on ${time}</a></p></td>
                                </tr>
                                </tr>
                               
                                       
                                <tr>
                                  <td style="padding: 25px 15px 20px;">
                                    Thanks &amp; Regards <br> Team WalletApp
                                    </td>
                               </tr>
                               <tr>
                             </tr>
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </body>
                     </html>`
    const mailBody = {
        from: "<do_not_reply@gmail.com>",
        to: email,
        subject: subject,
        html: html
    };
    mailer.createTransport({
        service: 'GMAIL',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        },
        port: 587,
        host: 'smtp.gmail.com'


    }).sendMail(mailBody, callback)
}

const sendLinkMail = function (email, subject, name, link, callback) {
    let html = `<html lang="en">
                        <head>
                          <meta charset="utf-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <meta name="description" content="">
                          <meta name="author" content="">
                          <title>Vendor & Users</title>
                        </head>
                        <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                       
                          <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                        <div>
                            <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                              <tbody>
                              <tr style="margin:0;padding:0">
                              <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                              REMITTANCE
                              </td>
                          </tr>
                                  <tr>
                                    <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
                                  </tr>
                                  <tr>
                                  <td style="padding: 10px 15px 10px;">Thank you for using WalletApp </td>
                                </tr>
                                
                                  <tr>
                                  <td style="padding: 50px 15px 10px;"><p>Your link for forgot password :  ${link}</a></p></td>
                                  </tr>
                                 
                                         
                                  <tr>
                                    <td style="padding: 25px 15px 20px;">
                                      Thanks &amp; Regards <br> Team WalletApp
                                      </td>
                                 </tr>
                                 <tr>
                               </tr>
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </body>
                       </html>`
    const mailBody = {
        from: "<do_not_reply@gmail.com>",
        to: email,
        subject: subject,
        html: html
    };
    mailer.createTransport({
        service: 'GMAIL',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        },
        port: 587,
        host: 'smtp.gmail.com'
    }).sendMail(mailBody, callback)
}


const sendRequestMoneyMail = function (email, subject, name, otp, callback) {
    let html = `<html lang="en">
                        <head>
                          <meta charset="utf-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <meta name="description" content="">
                          <meta name="author" content="">
                          <title>Vendor & Users</title>
                        </head>
                        <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                       
                          <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                        <div>
                            <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                              <tbody>
                              <tr style="margin:0;padding:0">
                              <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                              REMITTANCE
                              </td>
                          </tr>
                                  <tr>
                                    <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
                                  </tr>
                                  <tr>
                                  <td style="padding: 10px 15px 10px;">Thank you for using WalletApp </td>
                                </tr>
                                
                                  <tr>
                                  <td style="padding: 50px 15px 10px;"><p>Your OTP for Add money: ${otp}</a></p></td>
                                  <td style="padding: 50px 15px 10px;"><p>Share this OTP to Vendor for money</a></p></td>
                                  </tr>
                                 
                                  <tr>
                                    <td style="padding: 25px 15px 20px;">
                                      Thanks &amp; Regards <br> Team WalletApp
                                      </td>
                                 </tr>
                                 <tr>
                               </tr>
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </body>
                       </html>`
    const mailBody = {
        from: "<do_not_reply@gmail.com>",
        to: email,
        subject: subject,
        html: html
    };
    mailer.createTransport({
        service: 'GMAIL',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        },
        port: 587,
        host: 'smtp.gmail.com'
    }).sendMail(mailBody, callback)
}

const sendMailToVendor = function (email, subject, text, callback) {
    let transporter = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: global.gConfig.user,
            pass: global.gConfig.pass
        }
    });
    let mailOptions = {
        from: "<do_not_reply@gmail.com>",
        to: email,
        subject: subject,
        text:text

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(error);
        } else {
            callback(null, 'Email sent: ' + info.response);
        }
    });
}


/**
    * Function Name : uploadImage
    * Description   : Upload the image on the cloudnary
    *
    *
    * @return otp
    */

const uploadImage = function (base64, callback) {
    cloudinary.v2.uploader.upload(base64, (err, result1) => {
        console.log("im in cloudinary>>>>>>>>>>>>>>>>>>>", result1)
        if (result1.secure_url) {
            console.log("im in cloudinary111111111111", result1)
            callback(null, result1.secure_url)
        }
        else {
            callback(true, null);
        }
    })
}



// const uploadImage =  async function (image_data, callback) {
//     // var binaryData = new Buffer(image_data, 'base64');
//     //console.log("dfghsdsghds",binaryData)
//      await cloudinary.uploader.upload(image_data, function (result) {
//         if (result) {
//             console.log(result.secure_url,result);
//             callback(null, result.secure_url);
//         }
//         else {
//             callback(true, null);
//         }

//     })
// }


const pushNotification = function (deviceTokens, message, title, body, callback) {
    var serverKey = 'AAAAelLhCWQ:APA91bHaGIpHilsBDRz5e7UwfBOiTFwnQIioCKoE9pH2Q_jeZRGiE6YO89qt2Snhb49mM8qjd4BBvr097sTLS9XoRv7mcs_1owJhJp8_MkjRhWYE4mSgnNJyEQaN9KG8hrMh71cZObfk';
    var fcm = new FCM(serverKey);

    console.log("Device token:", deviceTokens)
    console.log("Message:", message)
    console.log("Title:", title)
    console.log("Body:", body)
    var message = {
        to: deviceTokens,
        notification: {
            title: title,
            body: body
        }
    };
    console.log("device token is =========>>>>>", deviceTokens)
    fcm.send(message, function (err, response) {
        console.log("message is =====>>>", message)
        if (err) {
            console.log("err is =======>>>>>233", err)
            callback(true, err)
        }
        else {
            console.log("Push notification detail>>", response, deviceTokens);
            callback(false, deviceTokens)
        }
    });
}

const checkBalance = async (adminAccount) => {
    return new Promise((resolve, reject) => {
        stripe.balance.retrieve({
            stripe_account: adminAccount,
        }, (err, balance) => {
            console.log("i am here >>>>", err, balance)

            if (err) {

                reject({ status: false, message: err })

                // res.send({ response_code: 500, response_message: "Internal server error" })
            }
            else {
                resolve({ status: true, balance: balance })
            }
        })
    })
}


const transferAmount = async (sendAmount, withdrawAccountId) => {
    console.log("req. data>>>>>>>", sendAmount, withdrawAccountId)
    new Promise((resolve, reject) => {
        stripe.transfers.create({
            amount: sendAmount,
            currency: "usd",
            destination: withdrawAccountId,//"acct_1EOhSzLVglzITKT2",///admin   u2 // ,   //180467 , // 272721 , 273221
        }, (err1, result1) => {

            console.log("transfer >>>>>>>>>", err1, result1)


            if (err1) {
                reject({ status: false, message: err1 })
            }
            else {
                resolve({ status: true, result: result1 })
            }
        })
    })

}


const thirdParty = function (data) {
    requestify.get('http://apilayer.net/api/live?access_key=943604b879c5a6f063725de6afa75ae1&currencies=' + localCurrency + '&source=USD')
        .then(function (response1) {
            console.log("get me result====>>", response1)



            // var responseValue = response1.getBody();
            // var storeValue = responseValue.quotes;
            // var currencyPrice = storeValue['USD' + localCurrency];
            // var total = currencyPrice * price * btc;
            // var calculateMarging = (total * margin) / 100;
            // var marginPrice = calculateMarging + total;
            res.send({ responseCode: 200, message: "Price Equation", result: { price: marginPrice, margin: margin, data } })
        })
}

const getUserBalance = async (userId) => {
    console.log("userId>>>>>>>", userId)
    var result;
    return new Promise((resolve, reject) => {

        userModel.findOne({ "_id": userId }, (err, data) => {
            if (err) {
                result = {
                    response_code: 500,
                    response_message: "Internal server error",
                }
                reject(result)
            }
            else if (!data) {
                result = {
                    response_code: 404,
                    response_message: "Data not found"
                }
                resolve(result)
            }
            else {
                result = {
                    response_code: 200,
                    response_message: "User Balance",
                    result: data.balance
                }
                resolve(result)
            }
        })
    })
}

const UserExist = async (data, availableId) => {
    return new Promise((resolve, reject) => {
        var response = {}
        var query = {
            $and: [{ status: { $in: ["ACTIVE", "BLOCKED"] } }, {
                $or: [{ email: data.email },
                { mobileNumber: data.mobileNumber }]
            }]
        }
        userModel.findOne(query, (error, checkUserName) => {
            if (error) {
                response = {
                    status: false,
                    response_code: 500,
                    response_message: "Internal server error",
                }
                resolve(response)
            }
            else if (!checkUserName) {
                response = {
                    status: true,
                    response_code: 404,
                    response_message: "User not found"
                }
                resolve(response)
            }
            else {
                if (checkUserName._id == availableId) {
                    response = {
                        status: true,
                        response_code: 404,
                        response_message: "User not found"
                    }
                    resolve(response)
                }
                else {
                    if (checkUserName.email == data.email) {
                        response = { status: false, response_code: 404, response_message: "Email already exists", }
                        resolve(response)
                    }
                    else {
                        response = { status: false, response_code: 404, response_message: "Mobile number already exists" }
                        resolve(response)
                    }
                }
            }
        })
    })
}
module.exports = {
    getOTP,
    sendSms,
    sendMail,
    writeImage,
    uploadImage,
    sendMailAdmin,
    pushNotification,
    checkBalance,
    transferAmount,
    thirdParty,
    sendSms1,
    getUserBalance,
    sendVendorMail,
    sendLinkMail,
    sendRequestMoneyMail,
    UserExist,
    sendVendorNotiMail,
    sendMailToVendor
}
