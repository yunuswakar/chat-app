var nodemailer = require('nodemailer');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
let async = require("async");
const activityModel = require('../models/activityModel');
const accountSid = 'ACa878b8a30179a33ab80ebf57140002eb';
const authToken = 'e1d014505ab9b202eaf8149d0d2c225a';
const client = require('twilio')(accountSid, authToken);
const cloudinary = require('cloudinary');
var FCM = require('fcm-node');
cloudinary.config({
  cloud_name: 'dl2d0v5hy',
  api_key: '841684319665911',
  api_secret: 'kG5j1sXJT3eeNAp5CtpZgIdfQzM'
});





module.exports = {

  uploadImg: (img, cb) => {
    cloudinary.uploader.upload(img, function (result) {
      console.log("image url", result.img)
      if (result)
        cb(null, result)
      else
        cb(true, null)
    }, {
        resource_type: 'auto',
      });
  },
  Paging(array, limit = 10, page = 1) {
    return array.slice(limit * (page - 1), limit * (page - 1) + limit);
  },

  Validator: (body) => {
    var a = Object.keys(body)
    for (let i = 0; i < a.length; i++) {
      if (body[a[i]] == undefined) { return `${a[i]} required!` }
    }
    return ""
  },
  emailSender: (emailGiven, subject, text, callback) => {
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
                            <img src="https://lh3.googleusercontent.com/-gl4Gj5A0EC4/XjALlxZILdI/AAAAAAAAADM/tgb1cs9urUgPPqUPxR9RcAKwDrOewJ7OACK8BGAsYHg/s0/favicon.ico" style="padding: 0px;margin: 0px; width="100" height="100"">
                          </span>
                        </td>                                   
                      </tr>               
                    </tbody>
                      </table>
                      
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                        <tbody>
                          <tr>
                                   <td  style="text-align: center;     padding: 16px 0px;">
                                                <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">Thank you for using Social media marketplace!</div>
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

    console.log("22<>>>>>>>>>>>>>", emailGiven)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass
      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: emailGiven,
      subject: subject,
      html: html,
      text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("this is error >>>>>>>>>>>38>>>>>. ", error);
        callback(error, null)
      } else {
        callback(null, info.response)
      }
    });

  },
  adminEmail: (emailGiven, subject, name, text, callback) => {
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
                            <img src="https://lh3.googleusercontent.com/-gl4Gj5A0EC4/XjALlxZILdI/AAAAAAAAADM/tgb1cs9urUgPPqUPxR9RcAKwDrOewJ7OACK8BGAsYHg/s0/favicon.ico" style="padding: 0px;margin: 0px; width="100" height="100"">
                          </span>
                        </td>                                   
                      </tr>               
                    </tbody>
                      </table>
                      
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                        <tbody>
                          <tr>
                                   <td  style="text-align: center;     padding: 16px 0px;">
                                                <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">Thank you for using Social media marketplace!</div>
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

    console.log("22<>>>>>>>>>>>>>", emailGiven)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass
      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: emailGiven,
      subject: subject,
      html: html,
      text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("this is error >>>>>>>>>>>38>>>>>. ", error);
        callback(error, null)
      } else {
        callback(null, info.response)
      }
    });

  },
  subAdminEmail: (emailGiven, subject, text, callback) => {
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
                          <img src="https://lh3.googleusercontent.com/-gl4Gj5A0EC4/XjALlxZILdI/AAAAAAAAADM/tgb1cs9urUgPPqUPxR9RcAKwDrOewJ7OACK8BGAsYHg/s0/favicon.ico" style="padding: 0px;margin: 0px; width="100" height="100"">
                        </span>
                      </td>                                   
                    </tr>               
                  </tbody>
                    </table>
                    
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                      <tbody>
                        <tr>
                                 <td  style="text-align: center;     padding: 16px 0px;">
                                              <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">Thank you for using Social media marketplace!</div>
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

    console.log("22<>>>>>>>>>>>>>", emailGiven)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass
      }
    });
    var mailOptions = {
      from: "<do_not_reply@gmail.com>",
      to: emailGiven,
      subject: subject,
      html: html,
      text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("this is error >>>>>>>>>>>38>>>>>. ", error);
        callback(error, null)
      } else {
        callback(null, info.response)
      }
    });

  },

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
                                                    <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO SOCIALX</div>
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
  //   "sendMail": function(email,text) {
  //     console.log('verify email', email,text);
  //     var transporter = nodemailer.createTransport({
  //        service:"Gmail",
  //         auth: {
  //             user: "node-trainee@mobiloitte.com",
  //             pass: "Mobiloitte1"
  //         }
  //     });
  //     var mailOption = {
  //         from: "node-trainee@mobiloitte.com",
  //         to: email,
  //         subject: "socialX",
  //         text: text
  //     }
  //     transporter.sendMail(mailOption, function(error, info) {
  //         if (error) {
  //             console.log("error----->>>" + error);
  //         } else {
  //             console.log("send verification email");
  //         }
  //     });
  // },
  sendMail: (email, text, callback) => {
    console.log("fccccccccccc", email, text)
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

    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error----->>>" + error);
      } else {
        console.log("send verification email");
      }
    });

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
  multipleVideoUploadCloudinary: (imageB64, callback) => {
    let imageArr = []
    async.eachSeries(imageB64, (items, callbackNextiteration) => {
      module.exports.videoUpload(items, (err, url) => {
        if (err)
          console.log("error is in line 119", err)
        else {
          imageArr.push(url);
          callbackNextiteration();
        }
      })
    }, (err) => {
      console.log("vvvvvvvvvvvvvvvvvvvvvvvv", imageArr)

      callback(null, imageArr);
    }

    )
  },

  sendSms: (mobileNumber, text, callback) => {

    client.messages.create({
      body: 'Your otp-  ' + text,
      to: mobileNumber,
      from: "+12254420834"
    },
      (err, result) => {
        // console.log("sms part>>>37",err,result)
        if (err) {
          callback(err, null)
          // console.log("Errorrr>>>>>>", err);

        } else {
          callback(null, result)
          // console.log("Successfulll", result)
        }

      })
  },


  imageUploadCloudinary: (pic, callback) => {
    cloudinary.v2.uploader.upload(pic, {
      resource_type: "raw"
    }, (error, result) => {
      //console.log("ttttttttttttttttttttttttttttttttt", error, result)
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, result.secure_url)
      }
    })
  },
  /**
  * Function Name : uploadMedia
  * Description   : upload image,video and files base-64 to cloudinary
  *
  *
  * @return secure_url
  */
  uploadMedia: async (base64) => {
    try {
      return new Promise(async (resolve, reject) => {
        for (const i in base64) {
          const url = await cloudinary.v2.uploader.upload(base64[i].string, { resource_type: "auto" });
          base64[i]["url"] = url.secure_url;
          delete base64[i].string;
        }
        resolve(base64);
      })
    } catch (error) {
      throw error;
    }
  },

  uploadStory: (base64) => {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(base64,
        {
          resource_type: "auto",
        },
        function (error, result) {
          if (error) {
            console.log(error, null)
          }
          else {
            resolve(result.secure_url)
          }
        });
    })
  },
  //-------------------------Push notiFICATION----------
  pushNotification: (deviceToken, title, body, callback) => {
    var serverKey = 'AAAAZ2aopdo:APA91bEMglXrF64lrBuLULOP_oLfKzaPCteIM4Vx9RfZ_xm7Zi5cVvGI-vvM5lqOtnyTp2jRTPS2LXDS2XcHWfQ46LlOAoOJtXx9MVVib13zFvHF8n0SYiQlfRMcX9VYkFhxgeF3TbkT';
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
  getCode: () => {
    var idLength = 8;
    var chars = "A,S,D,F,G,H,J,K,L,Q,W,E,R,T,Y,U,I,O,P,Z,X,C,V,B,N,M,8,7,4,5,6,0,1,3,2,9";
    chars = chars.split(",");
    var min = 0;
    var max = chars.length - 1;
    var id = "";
    for (var i = 0; i < idLength; i++) {
      id += chars[Math.floor(Math.random() * (max - min + 1) + min)];
    }
    return id;
  },

  saveActivity: (obj) => {
    return new Promise((resolve, reject) => {
      var temp;
      new activityModel(obj).save((err, activityResult) => {
        if (err) {
          temp = { response_code: 500, response_message: "Internal server error.", err: err }
          resolve(temp)
        }
        else {
          temp = { response_code: 200, response_message: "Activity saved.", result: activityResult }
          resolve(temp)
        }
      })
    })
  },



  
//   sendSms: () => {
//   var options = {
//     headers: {
//         "apikey":apiKey,
//         "mode": 'sandbox',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(req.body),
//     url: 'https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/price'
// };
// request(options, async function (error, response, body) {
//     if (error) {
//         res.send({ status: false, error })
//     }
//     else {}
//   })
// },












}
