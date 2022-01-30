/*  @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
 */
"use strict";

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


 const emailPort=process.env.emailPort;
const constantConfig=require("../app/static/model/static.model")

module.exports = {
    /**
     * for send mail
     */
   async sendMail(to, subject, html) {

        let SMTPEmail= await constantConfig.findOne({label:"SMTP Email"})
        let SMTPPassword= await constantConfig.findOne({label:"SMTP Password"})

        let hostname= await constantConfig.findOne({label:"hostname"})

      
        const transporter = nodemailer.createTransport({
            // create smtp protocol values
            host:hostname.englishValue,
            port:emailPort,
            secure: false, // true for 465, false for other ports
            auth: {
                user:SMTPEmail.englishValue,
                pass:SMTPPassword.englishValue,
            },
        });

         
        let mailOptions = {
            // set data for mail options
            from:SMTPEmail.englishValue,
            to: to,
            subject: subject,
            html: html,
        };
        return new Promise(function (resolve, reject) {
            // use send mail function to send mail to other user
            transporter.sendMail(mailOptions, (err, res) => {
                if (err) {
                    reject(Error(err.Error));
                } else {
                    // else send success into resolve
                    resolve(0);
                }
            });
        });
    },


 async EMAILHTML(link) {
    let message = await constantConfig.find({});

    return `<div><h3>Click following link for verify your email</h3>  <a href="${link}" target="_blank">click here</a>
</div>`;
  },
  VERIFYEMAILHTML(link) {

    return `<div><h3>Click following link for verify your email</h3>  <a href="${link}" target="_blank">click here</a>
</div>`;
  },
};