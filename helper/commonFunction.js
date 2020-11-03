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
              
                      <table style="width:600px;margin:0px auto;background:#48DA95;padding:0px;border: 4px solid black;    border-radius: 6px;" cellpadding="0" cellspacing="0" >
                          <tbody>
                      <tr>
                        <td style='font-size: 16px;text-align:center;' >
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;">
                          <tbody>
                          <tr style="background-color:#4977D3; text-align:left;">
                            <td style="font-size:16px;text-align:left;">  
                              <span style="display:inline-block;height: 100px;text-align:left;border-bottom: 4px solid black!important;border-right: 4px solid black!important;">
                                <img src="https://res.cloudinary.com/dl2d0v5hy/image/upload/v1580106579/zpzfjodybyx17nwnquis.jpg" style="padding: 0px;margin: 0px; width="100" height="100"">
                              </span>
                            </td>                                   
                          </tr>               
                        </tbody>
                          </table>
                          
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                            <tbody>
                              <tr>
                                       <td  style="text-align: center;     padding: 16px 0px;">
                                                    <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO ORBISTUR</div>
                                </td> 
                                  </tr>
                                  <tr>
                                       <td  style="text-align: justify; padding: 10px 0px;">
                                                    <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;">${text}</div>
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
      subject: 'Orbistur Enterprises',
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
                
                        <table style="width:600px;margin:0px auto;background:#48DA95;padding:0px;border: 4px solid black;    border-radius: 6px;" cellpadding="0" cellspacing="0" >
                            <tbody>
                        <tr>
                          <td style='font-size: 16px;text-align:center;' >
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;">
                            <tbody>
                            <tr style="background-color:#4977D3; text-align:left;">
                              <td style="font-size:16px;text-align:left;">  
                                <span style="display:inline-block;height: 100px;text-align:left;border-bottom: 4px solid black!important;border-right: 4px solid black!important;">
                                  <img src="https://res.cloudinary.com/dl2d0v5hy/image/upload/v1580106579/zpzfjodybyx17nwnquis.jpg" style="padding: 0px;margin: 0px; width="100" height="100"">
                                </span>
                              </td>                                   
                            </tr>               
                          </tbody>
                            </table>
                            
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                              <tbody>
                                <tr>
                                         <td  style="text-align: center;     padding: 16px 0px;">
                                                      <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO ORBISTUR</div>
                                  </td> 
                                    </tr>
                                    <tr>
                                         <td  style="text-align: center; padding: 10px 0px;">
                                                      <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;"> Dear ${firstName}<p>Please click on the link for reset password.<a href = '${global.gConfig.url}/${_id}'><button> Click here </button></a></div>
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
      subject: 'Orbistur Enterprises',
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


  multipleImageUploadCloudinary: (imageB64, callback) => {
    let imageArr = []
    async.eachSeries(imageB64, (items, callbackNextiteration) => {
        module.exports.imageUploadCloudinary(items, (err, url) => {
            if (err)
                console.log("error is in line 119", err)
            else {
                imageArr.push(url);
                callbackNextiteration();
            }
        })
    }, (err) => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhh", imageArr)

        callback(null, imageArr);
    }

    )
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
    jwt.verify(token, 'orbistur', (err, decoded) => {

      if (err) {
        callback(err, null)
      } else {
        console.log(" i am here verify", decoded.id)
        callback(null, decoded.id)

      }
    })
  },


  sendSms: (number, otp, callback) => {
    sender.sendSms(`Your otp is ${otp}`, 'orbistur', false, number)
      .then(function (response) {
        callback(null, response);
      })
      .catch(function (err) {
        callback(err, null);
      })

  }



}