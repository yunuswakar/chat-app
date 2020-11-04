const bcrypt = require('bcryptjs')
const mailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const cloudinary = require('cloudinary')
const async = require('async')
let speakEasy = require('speakeasy');
var NodeGeocoder = require('node-geocoder');
var crypto = require('crypto');
const twilio = require("twilio");
var algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

let transporter;
cloudinary.config({
    cloud_name: "sumit9211",
    api_key: "885582783668825",
    api_secret: "0dT6FoxdcGb7UjTKtUGQbAVdOJI"
});
const accountSid = 'AC70d02cf2c76d11ff4e6c0f3e9ecfb923';
const authToken = '052a59ef85f9fec4aa0f8c7dd46886bb';

let secret = speakEasy.generateSecret({
    length: 20
});
let salt = bcrypt.genSaltSync(10)

module.exports = {

    responseHandler: (res, responseCode, responseMessage, data, token) => {
        res.send({
            responseCode: responseCode,
            responseMessage: responseMessage,
            data: data,
            token: token
        })
    },
    createHash: (password, callback) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err)
                callback(err, null)
            else
                callback(null, hash)
        })
    },
    compareHash: (password, storedHash, callback) => {
        bcrypt.compare(password, storedHash, (err, result) => {
            if (err)
                callback(null)
            else
                callback(null, result)
        })
    },

    jwtDecode: (token, callback) => {
        console.log("jwt")
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                callback(null)
                console.log(err)
            } else {
                callback(null, decoded.id)
            }
        })
    },

    jwtEncode: (auth) => {
        console.log("token generate")
        var token = jwt.sign({ id: auth }, config.secret, { expiresIn: 86400 })
        return token;
    },
    imageUploadToCloudinary: (imageB64, callback) => {
        return cloudinary.v2.uploader.upload(imageB64, (err, result) => {
            callback(null, result.url);
        })
    },

    sendMailTest: (email, otp, callback) => {
        // var html = "`</h3><br><p>Welcome to BMCT System!</p><br><p>Thanks for choosing our system. Please use below details for Verify.</p><br><h3>OPT :" + text + "<br><br>Regards<br>BMCT Team.`"
        const mailBody = {
            from: "<do_not_reply@gmail.com>",
            to: email,
            subject: `OTP ${otp}`
            // html: "</h3>Your password is " + text + "</h3>"
        };
        mailer.createTransport({
            service: 'GMAIL',
            secure: true, 
            auth: {
                user: "yunuswakar0786@gmail.com",
                pass: "8757824768"
            },
            port: 587,
            host: 'smtp.gmail.com'

        }).sendMail(mailBody, callback)
    },
    uploadMultipleImages: (imagesB64, callback) => {
        let a = [];
        async.eachSeries(imagesB64, (item, callbackNextIteratn) => {
            module.exports.imageUploadToCloudinary(item, (err, url) => {
                if (err) throw err
                else {
                    a.push(url);
                    callbackNextIteratn();
                }
            })
        }, (err) => {
            console.log("Done with async loop")
            callback(null, a);

        })
    },

    generateOTP: (callback) => {
        let secret = speakEasy.generateSecret({
            length: 20
        });
        console.log("secret======>>>>>>" + JSON.stringify(secret))
        let token = 123456;
        callback(token, secret);
    },

    sendText: (number, otp, callback) => {
        console.log(number, "====>>>", typeof (number))
        client.messages
            .create({
                to: number,
                from: "+19513192317",
                body: 'Your one-time password for Tap Culture is' + otp,
            })
            .then((message) => {
                console.log("space", message.sid)
                callback(message.sid);
            }, (err) => {
                console.log(err);
                callback(null);
            });
    },

    verifyOTP: (otp, secret, callback) => {
        let tokenValidates = speakEasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: otp,
            window: 10 //implies that 10==5 min @default step=30s
        });
        console.log("tokenValidates", tokenValidates)
        callback(tokenValidates);
    },

    getLatLong: (place, callback) => {
        let fn, temp;
        var options = {
            provider: 'google',
            // Optional depending on the providers
            apiKey: 'AIzaSyB959XY2RqlTkZNYuNRp1EU_YiA3KjS71Q' // for Mapquest, OpenCage, Google Premier
        };
        var geocoder = NodeGeocoder(options);
        geocoder.geocode(place, function (err, result) {
            if (result) {
                console.log(result)
                callback(result[0].latitude, result[0].longitude)
            }
        });
    },

    getPlace: (place, callback) => {
        console.log("place callback------------>", place)
        console.log(place[0])
        var para = {
            lat: place[1],
            lon: place[0]
        }
        console.log(para)
        let fn, temp;
        var options = {
            provider: 'google',
            // Optional depending on the providers
            apiKey: 'AIzaSyB959XY2RqlTkZNYuNRp1EU_YiA3KjS71Q' // for Mapquest, OpenCage, Google Premier
        };
        var geocoder = NodeGeocoder(options);
        geocoder.reverse(para, function (err, result) {
            console.log("place is ---------->>", result)
            if (result) {
                callback(result)
            }
        });
    },

    //nodemailer
    sendMail: (email, subject, text, callback) => {
        var html = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
        <style type="text/css">
        
        body {	font-family: 'Roboto', sans-serif;	font-size: 16px;	font-weight: 300;	color: #888;	line-height: 30px;	margin: 0 auto;	position: relative;}
        .main {	width: 320px;	margin: 40px auto;	background: #282B3B;	padding: 10px;}
        .logo {	text-align: left;	margin-bottom: 30px;	margin-top: 20px;	width: 100%;	}
        .logo a {	color: #e1e1e1;	font-size: 22px;	display: block;	line-height: 18px;	text-decoration: none;}
        .content {	background: #fff;	padding: 30px;			text-align: center;}
        .content h2 {	font-size: 22px;	color: #282B3B;	margin: 0;	padding: 0;}
        .content a.email_logo {	margin-bottom: 10px;	display: inline-block;	margin-top: 10px;}
        .content p.body_text {	margin-bottom: 10px;	display: inline-block;	margin-top: 10px;	font-size: 14px;	color: #282B3B;	line-height: 20px;	font-weight: 500;}
        .content p.body_text a.just_click {	font-size: 14px;	color: #282B3B;	line-height: 20px;	font-weight: 500;	text-decoration: none;}
        .content .confirm_btn a {	text-decoration: none;	font-size: 14px;	color: #fff;	background: #F7921A;	border: 1px solid #8b847e;
            padding: 5px 30px;	margin-top: 5px;	display: inline-block;	border-radius: 5px;}
        .content p.about_text {	margin-bottom: 0px;	display: inline-block;	margin-top: 60px;	font-size: 16px;	color: #656565;	line-height: 20px;	font-weight: 400;}
        .content p.about_text a {	text-decoration: underline;	color: #656565;}
        footer {	margin: 0 auto;	text-align: center;	width: 100%;	display: inline-block;}
        footer p {	color: #e1e1e1;	font-size: 10px;	line-height: 20px;	padding: 20px 80px;	margin-bottom: 0}
        footer p span {	font-size: 16px;	position: relative;	top: 2px;}
        </style>
        </head>
        
        <body>
        <div class="main">
          <div class="logo"> <a href="" >BMCT</a> </div>
          <div class="content">
            <table width="100%" border="0" align="center">
              <tbody width="100%">
                <tr>
                  <td><h2>Almost Done</h2></td>
                </tr>
                <tr>
                  <td><a class="email_logo" href=href=""><img alt="" src="/img/BMCT_Icon_Emails.png"></a></td>
                </tr>
                <tr>
                  <td><p class="body_text">To proceed further <br />
                       <br />
                      </p></td>
                </tr>
                <tr>
                  <td><p class="body_text"><a href="" class="just_click"> YOUR OTP IS :</a> </p></td>
                </tr>
                <tr>
                  <td class="confirm_btn"><a href="" >${text}</a></td>
                </tr>
                <tr>
                  <td><p></p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <footer>
            <p>2018 <span>©</span> BMCT <br />
              All rights reserved</p>
          </footer>
        </div>
        </body>
        </html>
        
        `
        const mailBody = {
            from: "<do_not_reply@gmail.com>",
            to: email,
            subject: subject,
            html: html
        };
        mailer.createTransport({
            service: 'GMAIL',
            auth: {
                user: config_json.nodemailer.user,
                pass: config_json.nodemailer.pass
            },
            port: 587,
            host: 'smtp.gmail.com'

        }).sendMail(mailBody, callback)
    },


    sendSMS: (message, number, callback) => {
        let client = new twilio(config_json.twilio.sid, config_json.twilio.auth_token);
        client.messages.create({
            body: message,
            to: "+91" + number, // Text this number
            from: config_json.twilio.number // From a valid Twilio number
        })
            .then((message) => {
                callback(null, message.sid);
            })
            .catch((response) => {
                callback(response);
            })
    },

    getOTP: () => {
        var val = Math.floor(100000 + Math.random() * 900000);
        console.log("value==>>", val);
        return val;
    },
    //function to upload image
    uploadImg: (base64, callback) => {
        cloudinary.uploader.upload(base64, (result1) => {
            if (result1.secure_url) {
                callback(null, result1.secure_url)
            }
            else {
                callback(true, null);
            }
        })
    },
    upload_image: async (req, res) => {
        // res_promises will be an array of promises
        let res_promises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
                if (error) reject(error)
                else resolve(result.public_id)
            })
        })
        )
        // Promise.all will fire when all promises are resolved 
        Promise.all(res_promises)
            .then(result => res.json({ 'response': upload }))
            .catch((error) => {/*  handle error */ })
    }
}
