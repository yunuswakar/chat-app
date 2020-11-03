// const config = require('../config/config')
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const QRCode = require('qrcode')
const accountSid = 'AC596ef7dbd338dc52c4c1e41bd0fc477d';
const authToken = '5dcb0753a292c6d907ba7f17d7e8f80d';
const client = require('twilio')(accountSid, authToken);
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: global.gConfig.cloudinary.cloud_name,
  api_key: global.gConfig.cloudinary.api_key,
  api_secret: global.gConfig.cloudinary.api_secret
});
const async = require('async');
var NodeGeocoder = require('node-geocoder');
var FCM = require('fcm-push');



module.exports = {

  getOTP() {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  },
  
  pushNotification: (deviceTokens, title, body, callback) => {
    var serverKey = 'AAAAlL551Z0:APA91bEu84eiRAYIIVbELzcSe3802bybzsLfvFFijnn70SPeL73EloXgRBZaRHPUGRwqbUMdP7r3ZEQ7GyEWyxMauILeZJJmBn-1z3TjCxMx1KcW95rtAc_486cEOE6FVLf9_bG1kYeO';
    var fcm = new FCM(serverKey)
   
    var message = {
        to: deviceTokens,
         "content_available": true,
        collapse_key: 'your_collapse_key',
        notification: {
            title: title,
            body: body,
        }
    };
    console.log("device token is =========>>>>>", deviceTokens)
    fcm.send(message, function (err, response) {
        console.log("message is =====>>>", message)
        console.log("me here >>>>>>=====>>>", err, response)
        if (err) {
            console.log("err is =======>>>>>233", err)
            callback(err, null)
        }
        else {
            console.log("Push notification detail>>>>>>", err, response, deviceTokens);
            callback(null, response)
        }
    })
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
                                                      <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO KNOWIT</div>
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
      subject: 'Know it',
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
  sendOtpFor2fa: (email, text, otp, callback) => {

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
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                                  </span>
                                </td>                                   
                              </tr>               
                            </tbody>
                              </table>
                              
                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                                <tbody>
                                  <tr>
                                           <td  style="text-align: center;     padding: 16px 0px;">
                                                        <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO KNOWIT</div>
                                    </td> 
                                      </tr>
                                      <tr>
                                           <td  style="text-align: justify; padding: 10px 0px;">
                                                        <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;">Your otp for knowit is ${otp}</div>
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
      subject: text,
      text: text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, info.response)
      }
    });

  },
  sendMail: (email, text, callback) => {

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
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                                  </span>
                                </td>                                   
                              </tr>               
                            </tbody>
                              </table>
                              
                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                                <tbody>
                                  <tr>
                                           <td  style="text-align: center;     padding: 16px 0px;">
                                                        <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO KNOWIT</div>
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
      subject: 'Welcome KnowIt',
      Body:text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, info.response)
      }
    });

  },

  sendOtpFor2fa: (email, text, otp, callback) => {

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
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                                  </span>
                                </td>                                   
                              </tr>               
                            </tbody>
                              </table>
                              
                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                                <tbody>
                                  <tr>
                                           <td  style="text-align: center;     padding: 16px 0px;">
                                                        <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO LIGHTHOUSE</div>
                                    </td> 
                                      </tr>
                                      <tr>
                                           <td  style="text-align: justify; padding: 10px 0px;">
                                                        <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;">Your otp for lighthouse enterprises is ${otp}</div>
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
      subject: text,
      text: text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, info.response)
      }
    });

  },

  sendSMSOTPSNS: function sendSMS(to_number, message, cb) {
    sns.publish({
      Message: message,
      Subject: 'LightHouse Enterprises Otp',
      PhoneNumber: '+91' + to_number
    }, cb);
  },
  sendRejectionMail: (email, subject, comment, callback) => {

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
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                                  </span>
                                </td>                                   
                              </tr>               
                            </tbody>
                              </table>
                              
                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                                <tbody>
                                  <tr>
                                           <td  style="text-align: center;     padding: 16px 0px;">
                                                        <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO LIGHTHOUSE</div>
                                    </td> 
                                      </tr>
                                      <tr>
                                           <td  style="text-align: justify; padding: 10px 0px;">
                                                        <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;">${comment}</div>
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
      subject: subject,
      text: comment,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, info.response)
      }
    });

  },

  weeklyEmailTemplate: async (email, subject, category, subCategory, title, martName, Retailer, AppliesOn, ExpiryDate, Links, header, footer, id, config, callback) => {
    var newData = await weeklyEmailTemplateModel.findOne({ status: "ACTIVE" })
    // var templateImage = newData.image
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                </span>
              </td>                                   
            </tr>               
          </tbody>
            </table>
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
              <tbody>
                <tr>
                         <td  style="text-align: center;     padding: 16px 0px;">
                                      <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">${header}</div>
                  </td> 
                    </tr>
                    <tr>
                         <td  style="text-align: justify; padding: 10px 0px;">
                                      <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;"><h2>Category:${category}</h2><h2>SubCategory:${subCategory}</h2><h3>${title}|<br>${martName}| <br>${Retailer}|<br>${AppliesOn}|<br>${ExpiryDate}|<br>${Links}</h3></div>
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
            <h4>If you want to unsubscribe to our email templates click on this link.<br>${config}/${id}</h4>
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
      subject: 'Lighthouse Enterprises',
      //text: text,
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, info.response)
      }
    });

  },


  contactUs: async (email, subject, name, description, callback) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        "user": global.gConfig.nodemailer.user,
        "pass": global.gConfig.nodemailer.pass

      }
    });
    var generalMail = await configModel.findOne({ configType: "GENERAL" })
    var mailOptions = {
      from: email,
      to: generalMail.email,
      subject: `${subject} from ${name},${email}`,
      text: description,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, info.response)
      }
    });

  },

  sendSMS: (mobileNumber, body, callback) => {
    client.messages.create({
      'body':`your knowIt otp:${body} Dont share with anyone`,
      'to': mobileNumber,
      "from": "+13367906768"
    }, (twilioErr, twilioResult) => {
      if (twilioErr) {
        callback(twilioErr, null);
      }
      else {
        callback(null, twilioResult);
      }
    })
  },

  uploadImage(img, callback) {
    cloudinary.v2.uploader.upload(img, (err, result) => {
      if (err) {
        callback(err, null)
      }
      else {
        console.log(result.secure_url)
        callback(null, result.secure_url)
      }
    });
  },

  uploadMultipleImage: (imageB64, callback) => {
    let imageArr = []
    async.eachSeries(imageB64, (items, callbackNextiteration) => {
      module.exports.uploadImage(items, (err, url) => {

        if (err)
          console.log("error is in line 119", err)
        else {
          imageArr.push(url);
          callbackNextiteration();
        }
      })
    }, (err) => {
      console.log("imageArr", imageArr)

      callback(null, imageArr);

    }

    )
  },


  Validator: (body) => {
    var a = Object.keys(body)
    for (let i = 0; i < a.length; i++) {
      if (body[a[i]] == undefined) { return `${a[i]} required!` }
    }
    return ""
  },

  qrcodeGenrate: (code, callback) => {

    QRCode.toDataURL(code, function (err, url) {
      if (err) {
        callback(err, null)
      }
      else {
        callback(null, url)
      }
    })
  },

  uploadPDF: async (imageB64, callback) => {
    cloudinary.v2.uploader.upload(imageB64, (error, url) => {
      if (error) {
        callback(error, null)
      }
      else {
        callback(null, url)
      }
    })
  },
  multiplePdfUploadCloudinary: async (imageB64, callback) => {
    let promiseArr = [];
    let pdfArr = [];
    let pages = [];
    // for(let i of imageB64){
    //     awaitpromiseArr.push(cloudinary.v2.uploader.upload(i));
    // }

    async.forEach(imageB64, (key1, callback) => {
      promiseArr.push(cloudinary.v2.uploader.upload(key1));
    })

    let imageArr = await Promise.all(promiseArr);
    for (let i of imageArr) {
      pdfArr.push(i.secure_url)
      pages.push(i.pages)
    }

    callback(null, pdfArr, pages);

  },

  getLatLong: (place, callback) => {
    var options = {
      provider: 'opencage',
      httpAdapter: 'https', // Default
      apiKey: '7233f6a1343f4c96b7a9e67b4fd9e9dc', // for Mapquest, OpenCage, Google Premier
      formatter: null // 'gpx', 'string', ...
    };
    var geocoder = NodeGeocoder(options);
    geocoder.geocode(place, function (err, res) {
      console.log("IA MA ON 276", err, res)
      if (err) {
        callback(err, null)
      } else {
        // console.log(res)
        callback(null, res)
      }

    });
  },


  sendEmailSNS: (to, subject, name, description, callback) => {
    const params = {
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: description
          }
          // Html: {
          //     Charset: 'UTF-8',
          //     Data: "THIS IS A TEST MESSAGE"
          // },
          /* replace Html attribute with the following if you want to send plain text emails. 
          Text: {
              Charset: "UTF-8",
              Data: message
          }
       */
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${subject} from ${name},${to}`
        }
      },
      ReturnPath: "contact@sangathan.co.in",
      Source: "contact@sangathan.co.in",
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        callback(null, data)
      }
    });
  },


  sendotp2faSNS: (email, text, otp, callback) => {
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
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                                  </span>
                                </td>                                   
                              </tr>               
                            </tbody>
                              </table>
                              
                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
                                <tbody>
                                  <tr>
                                           <td  style="text-align: center;     padding: 16px 0px;">
                                                        <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO LIGHTHOUSE</div>
                                    </td> 
                                      </tr>
                                      <tr>
                                           <td  style="text-align: justify; padding: 10px 0px;">
                                                        <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;">Your otp for lighthouse enterprises is ${otp}</div>
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
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          //   Text: {
          //     Charset: "UTF-8",
          //     Data: description
          // },
          Html: {
            Charset: 'UTF-8',
            Data: html
          },
          /* replace Html attribute with the following if you want to send plain text emails. 
          Text: {
              Charset: "UTF-8",
              Data: message
          }
       */
        },
        Subject: {
          Charset: 'UTF-8',
          Data: text
        }
      },
      ReturnPath: "contact@sangathan.co.in",
      Source: "contact@sangathan.co.in",
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        callback(null, data)
      }
    });
  },

  sendMailSNS: (email, text, callback) => {
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                </span>
              </td>                                   
            </tr>               
          </tbody>
            </table>
            
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
              <tbody>
                <tr>
                         <td  style="text-align: center;     padding: 16px 0px;">
                                      <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO LIGHTHOUSE</div>
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
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          //   Text: {
          //     Charset: "UTF-8",
          //     Data: description
          // },
          Html: {
            Charset: 'UTF-8',
            Data: html
          },
          /* replace Html attribute with the following if you want to send plain text emails. 
          Text: {
            Charset: "UTF-8",
            Data: message
          }
          */
        },
        Subject: {
          Charset: 'UTF-8',
          Data: text
        }
      },
      ReturnPath: "contact@sangathan.co.in",
      Source: "contact@sangathan.co.in",
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        callback(null, data)
      }
    });
  },


  sendRejectionMailSNS: (email, text, callback) => {
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                </span>
              </td>                                   
            </tr>               
          </tbody>
            </table>
            
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
              <tbody>
                <tr>
                         <td  style="text-align: center;     padding: 16px 0px;">
                                      <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">WELCOME TO LIGHTHOUSE</div>
                  </td> 
                    </tr>
                    <tr>
                         <td  style="text-align: justify; padding: 10px 0px;">
                                      <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;">${comment}</div>
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
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          //   Text: {
          //     Charset: "UTF-8",
          //     Data: description
          // },
          Html: {
            Charset: 'UTF-8',
            Data: html
          },
          /* replace Html attribute with the following if you want to send plain text emails. 
          Text: {
            Charset: "UTF-8",
            Data: message
          }
          */
        },
        Subject: {
          Charset: 'UTF-8',
          Data: text
        }
      },
      ReturnPath: "contact@sangathan.co.in",
      Source: "contact@sangathan.co.in",
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        callback(null, data)
      }
    });
  },


  weeklyEmailTemplateSES: async (email, subject, category, subCategory, title, martName, Retailer, AppliesOn, ExpiryDate, Links, header, footer, id, config, callback) => {
    var newData = await weeklyEmailTemplateModel.findOne({ status: "ACTIVE" })
    // var templateImage = newData.image
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbOjNXusDbfOgC_MN0qmY041K049T_LUFCWM9k4wao8Dd66vlY" style="padding: 0px;margin: 0px; width="100" height="100"">
                </span>
              </td>                                   
            </tr>               
          </tbody>
            </table>
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-weight:600;margin-bottom:50px;padding:0px 15px; ">
              <tbody>
                <tr>
                         <td  style="text-align: center;     padding: 16px 0px;">
                                      <div style="color:#0513E7;font-size:25px;margin-bottom:5px;">${header}</div>
                  </td> 
                    </tr>
                    <tr>
                         <td  style="text-align: justify; padding: 10px 0px;">
                                      <div style="color:#1C0790;font-size:20px;margin-bottom:5px;font-weight: 200;"><h2>Category:${category}</h2><h2>SubCategory:${subCategory}</h2><h3>${title}|<br>${martName}| <br>${Retailer}|<br>${AppliesOn}|<br>${ExpiryDate}|<br>${Links}</h3></div>
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
            <h4>If you want to unsubscribe to our email templates click on this link.<br>${config}/${id}</h4>
          </table>
        </div>
  </body>
  </html>`
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          //   Text: {
          //     Charset: "UTF-8",
          //     Data: description
          // },
          Html: {
            Charset: 'UTF-8',
            Data: html
          },
          /* replace Html attribute with the following if you want to send plain text emails. 
          Text: {
            Charset: "UTF-8",
            Data: message
          }
          */
        },
        Subject: {
          Charset: 'UTF-8',
          Data: text
        }
      },
      ReturnPath: "contact@sangathan.co.in",
      Source: "contact@sangathan.co.in",
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        callback(null, data)
      }
    });
  }






}