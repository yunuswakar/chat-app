var nodemailer = require('nodemailer');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const accountSid = 'AC596ef7dbd338dc52c4c1e41bd0fc477d';
const authToken = '5dcb0753a292c6d907ba7f17d7e8f80d';
const client = require('twilio')(accountSid, authToken);
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dl2d0v5hy',
  api_key: '841684319665911',
  api_secret: 'kG5j1sXJT3eeNAp5CtpZgIdfQzM'
});

const FCM = require('fcm-push');
var Sender = require('aws-sms-send');
var aws_topic = 'arn:aws:sns:us-east-1:729366371820:coinbaazar';
var config = {
  AWS: {
    accessKeyId: 'AKIAIZ32QDUFAGKVPQNA',
    secretAccessKey: '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',
    region: 'us-east-1',
  },
  topicArn: aws_topic,
};

var sender = new Sender(config);




module.exports = {

  getOTP() {
    var otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  },

  sendMail: (email, otp, callback) => {
    let html = `<html lang="en"><head>

                  <meta charset="utf-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <meta name="description" content="">
                  <meta name="author" content="">
                
                  <title></title>
              
                 
              
              </head>
              <body style="margin: 0px; padding: 0px;">
                <div style="min-width:600px;margin:0px;background:#fff;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
              
                      <table style="width:600px;margin:0px auto;background:#E7E71D;padding:0px;border: 4px solid black;    border-radius: 6px;" cellpadding="0" cellspacing="0" >
                          <tbody>
                      <tr>
                        <td style='font-size: 16px;text-align:center;' >
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;">
                          <tbody>
                          <tr style="background-color:#EB230F; text-align:left;">
                            <td style="font-size:16px;text-align:left;">  
                              <span style="display:inline-block;height: 100px;text-align:left;border-bottom: 4px solid black!important;border-right: 4px solid black!important;">
                                <img src="https://res.cloudinary.com/dl2d0v5hy/image/upload/v1574933062/bvld7yaitliwvf3ciips.png" style="padding: 0px;margin: 0px; width="100" height="100"">
                              </span>
                            </td>                                   
                          </tr>               
                        </tbody>
                          </table>
                          
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                            <tbody>
                              <tr>
                                       <td  style="text-align: center;     padding: 16px 0px;">
                                                    <div style="color:#437EF2;font-size:25px;margin-bottom:5px;">WELCOME TO INNER PURPOSE</div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: center; padding: 10px 0px;">
                                                    <div style="color:#F24358;font-size:20px;margin-bottom:5px;font-weight: 200;">Your otp is:- ${otp}. Please verify this otp for reset password.</div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: center;">
                                                    <div style="color:#fff;font-size:25px;margin-bottom:5px;font-weight: 200;"></div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: center;    padding: 20px 0px;">
                                                    
                                </td> 
                                  </tr>                 
                            </tbody>
                          </table>
              
                        </table>
                      </div>
                  
                </body>
                </html>`

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass

      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: email,
      subject: 'Inner Purpose Enterprises',
      //text: text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      } else {
        callback(null, info.response)
      }
    });
  },

  sendLink: (email, firstName, _id, callback) => {

    let html = `<html lang="en"><head>

                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta name="description" content="">
                    <meta name="author" content="">
                  
                    <title></title>
                
                   
                
                </head>
                <body style="margin: 0px; padding: 0px;">
                  <div style="min-width:600px;margin:0px;background:#fff;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                
                        <table style="width:600px;margin:0px auto;background:#E7E71D;padding:0px;border: 4px solid black;    border-radius: 6px;" cellpadding="0" cellspacing="0" >
                            <tbody>
                        <tr>
                          <td style='font-size: 16px;text-align:center;' >
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;">
                            <tbody>
                            <tr style="background-color:#EB230F; text-align:left;">
                              <td style="font-size:16px;text-align:left;">  
                                <span style="display:inline-block;height: 100px;text-align:left;border-bottom: 4px solid black!important;border-right: 4px solid black!important;">
                                  <img src="https://res.cloudinary.com/dl2d0v5hy/image/upload/v1574933062/bvld7yaitliwvf3ciips.png" style="padding: 0px;margin: 0px; width="100" height="100"">
                                </span>
                              </td>                                   
                            </tr>               
                          </tbody>
                            </table>
                            
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                              <tbody>
                                <tr>
                                         <td  style="text-align: center;     padding: 16px 0px;">
                                                      <div style="color:#437EF2;font-size:25px;margin-bottom:5px;">WELCOME TO INNER PURPOSE</div>
                                  </td> 
                                    </tr>
                                    <tr>
                                         <td  style="text-align: center; padding: 10px 0px;">
                                                      <div style="color:#F24358;font-size:20px;margin-bottom:5px;font-weight: 200;"> Dear ${firstName}<p>Please click on the link for reset password.<a href = '${global.gConfig.url}/${_id}'><button> Click here </button></a></div>
                                  </td> 
                                    </tr>
                                    <tr>
                                         <td  style="text-align: center;">
                                                      <div style="color:#fff;font-size:25px;margin-bottom:5px;font-weight: 200;"></div>
                                  </td> 
                                    </tr>
                                    <tr>
                                         <td  style="text-align: center;    padding: 20px 0px;">
                                                      
                                  </td> 
                                    </tr>                 
                              </tbody>
                            </table>
                
                          </table>
                        </div>
                    
                  </body>
                  </html>`

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass

      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: email,
      subject: 'Inner Purpose Enterprises',
      //text: text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      } else {
        callback(null, info.response)
      }
    });

  },

  emailSend: (email, text, callback) => {

    let html = `<html lang="en"><head>

                  <meta charset="utf-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <meta name="description" content="">
                  <meta name="author" content="">
                
                  <title></title>
              
                 
              
              </head>
              <body style="margin: 0px; padding: 0px;">
                <div style="min-width:600px;margin:0px;background:#fff;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
              
                      <table style="width:600px;margin:0px auto;background:#E7E71D;padding:0px;border: 4px solid black;    border-radius: 6px;" cellpadding="0" cellspacing="0" >
                          <tbody>
                      <tr>
                        <td style='font-size: 16px;text-align:center;' >
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;">
                          <tbody>
                          <tr style="background-color:#EB230F; text-align:left;">
                            <td style="font-size:16px;text-align:left;">  
                              <span style="display:inline-block;height: 100px;text-align:left;border-bottom: 4px solid black!important;border-right: 4px solid black!important;">
                                <img src="https://res.cloudinary.com/dl2d0v5hy/image/upload/v1574933062/bvld7yaitliwvf3ciips.png" style="padding: 0px;margin: 0px; width="100" height="100"">
                              </span>
                            </td>                                   
                          </tr>               
                        </tbody>
                          </table>
                          
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                            <tbody>
                              <tr>
                                       <td  style="text-align: center;     padding: 16px 0px;">
                                                    <div style="color:#437EF2;font-size:25px;margin-bottom:5px;">WELCOME TO INNER PURPOSE</div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: justify; padding: 10px 0px;">
                                                    <div style="color:#F24358;font-size:20px;margin-bottom:5px;font-weight: 200;">${text}</div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: center;">
                                                    <div style="color:#fff;font-size:25px;margin-bottom:5px;font-weight: 200;"></div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: center;    padding: 20px 0px;">
                                                    
                                </td> 
                                  </tr>                 
                            </tbody>
                          </table>
              
                        </table>
                      </div>
                  
                </body>
                </html>`

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass

      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: email,
      subject: 'Inner Purpose Enterprises',
      text: text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      } else {
        callback(null, info.response)
      }
    });

  },

  multipleSendSMS: (mobileNumbers, body, callback) => {
    return new Promise((resolve, reject) => {
      mobileNumbers.forEach(a => {
        client.messages.create({
          'body': body,
          'to': a,
          "from": "+13367906768"
        }, (twilioErr, twilioResult) => {
          if (twilioErr) {
            console.log("251", twilioErr);

          }
          else {
            console.log("255", twilioResult);

          }
        })
      })
      resolve("Message sent");
    })
  },

  uploadImage(img, callback) {
    cloudinary.v2.uploader.upload(img, (err, result) => {
      if (err) {
        callback(err, null)
      }
      else {
        callback(null, result.secure_url)
      }
    });
  },

  videoUpload(base64, callback) {
    cloudinary.v2.uploader.upload(base64,
      {
        resource_type: "video",
      },
      function (error, result) {
        if (error) {
          callback(error, null)
        }
        else {
          callback(null, result.secure_url)
        }
      });
  },

  jwtDecode: (token, callback) => {
    jwt.verify(token, 'innerPurpose', (err, decoded) => {

      if (err) {
        callback(err, null)
      } else {
        console.log(" i am here verify", decoded.id)
        callback(null, decoded.id)

      }
    })
  },

  pushNotification: (deviceToken, title, body, callback) => {
    var serverKey = 'AAAA-OAfjaw:APA91bEg_tDxVV74p1WEODBC_-hNhjuEprUvtfKJ9ziyWTBl3xEludmpjIk5Ou6w-2xiV62PPdpLmsuQ3dLcFBWDt1FkASYj0Af0TdybWQOrWLGiiGHYixZi3OgEf-6I2_2KXqd_Oje_';
    var fcm = new FCM(serverKey);

    var message = {
      to: deviceToken, // required fill with device token or topics
      "content_available": true,
      notification: {
        title: title,
        body: body
      }
    };

    //callback style
    fcm.send(message, function (err, response) {
      if (err) {
        console.log(">>>>>>>>>>", err)
        callback(err, null)
      } else {
        console.log(">>>>>>>>>response", response)
        callback(null, response)
      }
    });

  },

  sendMessageViaNotification: (deviceToken, msg, callback) => {
    var serverKey = 'AAAA-OAfjaw:APA91bEg_tDxVV74p1WEODBC_-hNhjuEprUvtfKJ9ziyWTBl3xEludmpjIk5Ou6w-2xiV62PPdpLmsuQ3dLcFBWDt1FkASYj0Af0TdybWQOrWLGiiGHYixZi3OgEf-6I2_2KXqd_Oje_';
    var fcm = new FCM(serverKey);

    var message = {
      to: deviceToken, // required fill with device token or topics
      "content_available": true,
      notification: {
        title: msg,
        body: msg
      }
    };

    //callback style
    fcm.send(message, function (err, response) {
      if (err) {
        console.log(">>>>>>>>>>", err)
        callback(err, null)
      } else {
        console.log(">>>>>>>>>response", response)
        callback(null, response)
      }
    });

  },



  parameterRequired(body) {

    const a = Object.keys(body)
    let i;

    for (i = 0; i < a.length; i++) {
      console.log("aaaaaaaaa", body[a[i]])
      if (body[a[i]] == undefined) {
        console.log("this key is missing", a[i])
        return a[i];
      }
    }


  },

  sendSms: (number, otp, callback) => {
    sender.sendSms(`Your otp is ${otp}`, 'innerPurpose', false, number)
      .then(function (response) {
        callback(null, response);
      })
      .catch(function (err) {
        callback(err, null);
      })

  },

  sendSms2: (number, body, callback) => {
    sender.sendSms(body, 'innerPurpose', false, number)
      .then(function (response) {
        callback(null, response);
      })
      .catch(function (err) {
        callback(err, null);
      })

  },

  sendMultipleSMS: (mobileNumbers, body, callback) => {
    return new Promise((resolve, reject) => {
      mobileNumbers.forEach(a => {
        sender.sendSms(body, 'innerPurpose', false, a)
          .then(function (response) {
            console.log(">>>>>response", response)
          })
          .catch(function (err) {
            console.log(">>>>>>>err", err)
          })
      })
      resolve("Message sent");
    })
  }



}