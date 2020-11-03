const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary');
let async = require("async")
var FCM = require('fcm-push');

let NodeGeocoder = require('node-geocoder');
cloudinary.config({
    cloud_name: 'dl2d0v5hy',
    api_key: '841684319665911',
    api_secret: 'kG5j1sXJT3eeNAp5CtpZgIdfQzM'
});


const accountSid = 'AC596ef7dbd338dc52c4c1e41bd0fc477d';
const authToken = '5dcb0753a292c6d907ba7f17d7e8f80d';
const client = require('twilio')(accountSid, authToken);


module.exports = {
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


    Paging(array, limit = 2, page = 1) {
        return array.slice(limit * (page - 1), limit * (page - 1) + limit);
    },

    smsSender: (numberGiven, otp, callback) => {
    client.messages
    client.messages
        .create({             
            from: '+13367906768',
            body: ` verification job: ${otp}`,
            to: numberGiven
        }, (error, result) => {
            if (error) {
                console.log("this is error in sending otp to phone number", error);
                callback(error, null)
            } else {
                console.log('phone otp sent: ' + result);
                callback(null, result)

            }
        })
    },
    phoneSms: (numberGiven,subject,callback) => {
        client.messages
        client.messages
            .create({
                from: '+13367906768',
                to: numberGiven,
                body: subject

            }, (error, result) => {
                if (error) {
                    console.log("this is error in sending otp to phone number", error);
                    callback(error, null)
                } else {
                    console.log('phone otp sent: ' + result);
                    callback(null, result)

                }
            })
    },
    uploadImg: (base64, callback) => {
        cloudinary.v2.uploader.upload(base64, (err, result1) => {
            console.log("=====================", err, result1);
            
            if(result1) {
                callback(null, result1.secure_url)
            }
            else {
                callback(true, null);
            }
        })
    },
    imageUploadCloudinary: (pic, callback) => {
        cloudinary.v2.uploader.upload(pic, {
            resource_type: "raw"
        }, (error, result) => {
            console.log("ttttttttttttttttttttttttttttttttt", error, result)
            if (error) {
                callback(error, null)
            }
            else {    
                callback(null, result.secure_url)
            }
        })
    },
    pdfUploadCloudinary: (pic, callback) => {
        cloudinary.v2.uploader.upload(pic, {
            resource_type: "raw"
        }, (error, result) => {
            console.log("ttttttttttttttttttttttttttttttttt", error, result)
            if (error) {
                callback(error, null)
            }
            else {
                callback(null, result.secure_url)
            }
        })
    },
    videoUploadCloudinary: (data, callback) => {
        cloudinary.v2.uploader.upload(data,
            { resource_type: "video" },
            (error, result) => {
                console.log("ttttttttttttttttttttttttttttttttt", error, result)
                if (error) {
                    console.log("error in upload", error)
                    callback(error, null)
                }
                else {
                    console.log()
                    callback(null, result.secure_url)
                }
            })
    },

    videoUpload: (data, callback) => {
        cloudinary.v2.uploader.upload(data,
            { resource_type: "video" },
            function (error, result) {
                console.log(result, error)
                console.log(result, callback)
                if (error) {
                    console.log("kkkkkkkkkkkkk", error)
                    callback(true, null)
                } else {
                    callback(null, result.secure_url)
                }

            }
        )
    },
    imageUploadMulter: (data, callback) => {
        var filea;
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/')
            },
            filename: function (req, file, cb) {
                var date = Date.now();
                cb(null, file.fieldname + '-' + date + '.jpg')
                filea = file.fieldname + '-' + date + '.jpg'
                callback(null, filea)
            }
        })

        console.log('>>>>>>90>>>>>>', filea)
        var upload = multer({ storage: storage }).array('profileImage', 10);
        upload(data, (error, result) => {
            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
            } else if (error) {
                console.log("failuer in upload", result)

                callback(error, null)
            } else {
                var flag = 1
                console.log("success in upload", flag)

            }
        })
        // console.log("success in upload",flag)

        // if(flag==1){
        //     callback(null, filename)
        // }
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
    getLatLong: (place, callback) => {
        var options = {
            provider: 'opencage',
            httpAdapter: 'https', // Default
            apiKey: '7233f6a1343f4c96b7a9e67b4fd9e9dc', // for Mapquest, OpenCage, Google Premier
            formatter: null         // 'gpx', 'string', ...
        };
        var geocoder = NodeGeocoder(options);
        geocoder.geocode(place, function (err, res) {
            // console.log("IA MA ON 276",err,res)
            if (err) {
                callback(err, null)
            } else {
                // console.log(res)
                callback(null, res)
            }

        });
    },
    getAddress: (coordinates, callback) => {
        var options = {
            provider: 'opencage',
            httpAdapter: 'https', // Default
            apiKey: '7233f6a1343f4c96b7a9e67b4fd9e9dc', // for Mapquest, OpenCage, Google Premier
            formatter: null         // 'gpx', 'string', ...
        };
        var geocoder = NodeGeocoder(options);
        geocoder.reverse(coordinates, function (err, res) {
            if (err) {
                callback(err, null)
            } else {
                console.log(res);
                const street = res[0].streetName;
                const city = res[0].city;
                const state = res[0].state;
                const country = res[0].country;
                const zip = res[0].zip;
                const address = {}
                address.street = street;
                address.city = city;
                address.state = state;
                address.country = country;
                address.zip = zip;
                callback(null, address)
            }
        });
    },


    // const getAddresss=(coor)=>{
    //     var options = {
    //         provider: 'opencage',
    //         httpAdapter: 'https', // Default
    //         apiKey: '7233f6a1343f4c96b7a9e67b4fd9e9dc', // for Mapquest, OpenCage, Google Premier
    //         formatter: null         // 'gpx', 'string', ...
    //       };
    //       var geocoder = NodeGeocoder(options);
    //     geocoder.reverse(coor, function(err, res) {
    //         console.log(res);
    //       });
    // }

    // getAddresss({lat:45.767, lon:4.833});

    // // {lat:45.767, lon:4.833}
    pushNotification: (deviceTokens, title, body, callback) => {
        var serverKey = 'AAAA9kTiWkQ:APA91bGxIT9UIOEqsnIb5YVYJyecuEHOnaC59qrhNmBpMU-uzyIMGqco8Hq6egipLhKYmyx4EabnBk_dUD94x8UT8Uw3BoVrk7h6y7c37ugkBF-PWot-FIiwoEqfnqdDs9aWoP83tuYL';
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
                console.log("Push notification detail>>", err, response, deviceTokens);
                callback(null, response)
            }
        })
    },
    failedEmail: (email, subject, firstName, callback) => {

        let html = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <meta name="x-apple-disable-message-reformatting">
  <title>Confirm Your Email</title>
  <!--[if mso]>
  <xml>   
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <style>
    table {border-collapse: collapse;}
    .spacer,.divider {mso-line-height-rule:exactly;}
    td,th,div,p,a {font-size: 13px; line-height: 22px;}
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
  </style>
  <![endif]-->
<style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
    table {border-collapse:separate;}
      a, a:link, a:visited {text-decoration: none; color: #00788a;} 
      a:hover {text-decoration: underline;}
      h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
      .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
      .ExternalClass {width: 100%;}
    @media only screen {
      .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
      .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
    }

    img {border: 0; line-height: 100%; vertical-align: middle;}
    #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
</style>
</head>
<body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
    <div width="100%" style="margin:0; background:#f5f6fa">
        <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
            <tbody>
                <tr style="margin:0;padding:0">
                    <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                        <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                            <tbody>
                            </tbody>
                        </table>
                        <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                            <tbody>
                                <tr style="margin:0;padding:0">
                                    <td style="text-align:center; padding: 10px;">
                                        <img src="https://res.cloudinary.com/dbctmsgx1/image/upload/v1563770166/2019-07-19_moyouf.png" alt="kryptoro" width="100" class="">
                                    </td>
                                </tr>
                                <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                    <td>
                                        <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                            <tbody>
                                                <tr style="margin:0;padding:0">
                                                    <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                    </td>
                                                </tr>
                                                <tr style="margin:0;padding:0">
                                                    <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                        <img src="http://www.pngall.com/wp-content/uploads/2016/06/Fail-Stamp-PNG-Image.png" alt="Email register" style="height: 70px; width: 160px">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </td>
                </tr>

                <tr>
                    <td>
                        <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                            <tbody>
                                <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                    &nbsp;
                                    </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                        <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:26px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">Dear ${firstName}</p>
                                    </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                        <p style="margin:0 30px;color:#3a4161">Fax failed!<br>You will receive the refund in 2-4 business days.</p>
                                    </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                    &nbsp;
                                    </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:17px;font-weight:bold;line-height:20px;color:#ffffff">
                                        <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                            <tbody>
                                                <tr style="margin:0;padding:0">
                                                    <td>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ffffff;font-weight:500;font-family:'Open Sans',Open Sans,Verdana">Fax sending unsuccessfull</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                <tr style="margin:0;padding:0">
                                    <td height="40" bgcolor="#ffffff" style="background:#ffffff;font-size:0;line-height:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                                        &nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="30" style="font-size:0;line-height:0;text-align:center">
                    &nbsp;
                    </td>
                </tr>
            </tbody>
        </table>
        <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
            <tbody>

      <tr style="margin:0;padding:0">
                <td height="20" style="font-size:0;line-height:0">
                    &nbsp;
                </td>
            </tr>

            <tr style="margin:0;padding:0">
                <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                    <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">© Faxnow. All rights reserved.</p>
                </td>
            </tr>
            <tr style="margin:0;padding:0">
                <td height="20" style="font-size:0;line-height:0">
                    &nbsp;
                </td>
            </tr>
        </tbody></table>
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
            html: html
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("222222222222222", error)
                callback(error, null)
            } else {
                callback(null, info.response)
            }
        });
    },
    emailSenderUser: (email, subject, sellerName, _id,callback) => {

        let html = `<html lang="en">
                          <head>
                            <meta charset="utf-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <meta name="description" content="">
                            <meta name="author" content="">
                            <title>User Info</title>
                          </head>
                          <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                         
                            <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                          <div>
                              <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                                    <img height="70" width="150" src="https://lh3.googleusercontent.com/-gl4Gj5A0EC4/XjALlxZILdI/AAAAAAAAADM/tgb1cs9urUgPPqUPxR9RcAKwDrOewJ7OACK8BGAsYHg/s0/favicon.ico" alt="Email register" class="">
                                </td>
                            </tr>
                                    <tr>
                                      <td style="padding: 50px 15px 10px;">Dear ${sellerName}, </td>
                                    </tr>
                                    <tr>
                                    <td style="padding: 10px 15px 10px;">Thank you for using Social media marketplace! </td>
                                  </tr>
                                  
                                  <tr>
                                  <td style="padding: 10px 15px 10px;"><p>Your product is out of stock. productId is: ${_id}</a></p></td>
                                  </tr>
                                    
                                    <tr>
                                      <td style="padding: 25px 15px 20px;">
                                        Thanks &amp; Regards, <br> Team Of Bayise!
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

        const mailOptions = {
            from: global.gConfig.nodemailer.user,
            to: email,
            subject: subject,
            html: html
        };

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                "user": global.gConfig.nodemailer.user,
                "pass": global.gConfig.nodemailer.pass

            }

        })
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                callback(error, null)
            } else {
                callback(null, info.response)
            }
        });

    },
    emailSenderAllUser: (email, subject, sellerName, image, callback) => {

        let html = `<html lang="en">
                          <head>
                            <meta charset="utf-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <meta name="description" content="">
                            <meta name="author" content="">
                            <title>User Info</title>
                          </head>
                          <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                         
                            <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                          <div>
                              <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                                    <img height="70" width="150" src="https://lh3.googleusercontent.com/-gl4Gj5A0EC4/XjALlxZILdI/AAAAAAAAADM/tgb1cs9urUgPPqUPxR9RcAKwDrOewJ7OACK8BGAsYHg/s0/favicon.ico" alt="Email register" class="">
                                </td>
                            </tr>
                                    <tr>
                                      <td style="padding: 50px 15px 10px;">Dear ${sellerName}, </td>
                                    </tr>
                                    <tr>
                                    <td style="padding: 10px 15px 10px;">Thank you for using Social media marketplace! </td>
                                  </tr>
                                  
                                  <tr>
                                  <td style="padding: 10px 15px 10px;"><p>Now you can again bidd this product. <img height="70" width="150" src=${image} alt="Email register" class=""></a></p></td>
                                  </tr>
                                    
                                    <tr>
                                      <td style="padding: 25px 15px 20px;">
                                        Thanks &amp; Regards, <br>Team Of Bayise!
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

        const mailOptions = {
            from: global.gConfig.nodemailer.user,
            to: email,
            subject: subject,
            html: html
        };

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                "user": global.gConfig.nodemailer.user,
                "pass": global.gConfig.nodemailer.pass

            }

        })
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                callback(error, null)
            } else {
                callback(null, info.response)
            }
        });

    },
    emailSenderBidder: (emailGiven, subject, text, image,callback) => {
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
                                        <div> <img src="${image}" style="padding: 0px;margin: 0px; width="100" height="100""></div>      
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
    emailSenderSeller: (email, subject, sellerName, enterBidding, callback) => {

        let html = `<html lang="en">
                          <head>
                            <meta charset="utf-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <meta name="description" content="">
                            <meta name="author" content="">
                            <title>User Info</title>
                          </head>
                          <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
                         
                            <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
                          <div>
                              <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
                                    <img height="70" width="150" src="https://lh3.googleusercontent.com/-gl4Gj5A0EC4/XjALlxZILdI/AAAAAAAAADM/tgb1cs9urUgPPqUPxR9RcAKwDrOewJ7OACK8BGAsYHg/s0/favicon.ico" alt="Email register" class="">
                                </td>
                            </tr>
                                    <tr>
                                      <td style="padding: 50px 15px 10px;">Dear ${sellerName}, </td>
                                    </tr>
                                    <tr>
                                    <td style="padding: 10px 15px 10px;">Your product has been bidd by new user</td>
                                  </tr>
                                  
                                  <tr>
                                  <td style="padding: 10px 15px 10px;"><p>bidding cost is: ${enterBidding}</a></p></td>
                                  </tr>
                                    
                                    <tr>
                                      <td style="padding: 25px 15px 20px;">
                                        Thanks &amp; Regards, <br>Team Of Bayise!
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

        const mailOptions = {
            from: global.gConfig.nodemailer.user,
            to: email,
            subject: subject,
            html: html
        };

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                "user": global.gConfig.nodemailer.user,
                "pass": global.gConfig.nodemailer.pass

            }

        })
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                callback(error, null)
            } else {
                callback(null, info.response)
            }
        });

    },
}

// service: 'gmail',
//     auth: {
//     "user": global.gConfig.nodemailer.user,
//         "pass": global.gConfig.nodemailer.pass

// }
//         });
// var mailOptions = {
//     from: "<do_not_reply@gmail.com>",
//     to: emailGiven,
//     subject: subject,
//     text: data
// };