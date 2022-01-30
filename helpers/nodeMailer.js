/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const nodemailer = require("nodemailer");

module.exports = {
  /**
   * for send mail
   */
  sendMail(to, subject, html, message) {
    const transporter = nodemailer.createTransport({
      // create smtp protocol values
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });
    let mailOptions = {
      // set data for mail options
      from: process.env.EMAILFROM,
      to: to,
      subject: subject,
      html: html,
      message: message
    };
    return new Promise(function (resolve, reject) {
      // use send mail function to send mail to other user
      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          // if error reject message
          reject(Error(err));
        } else {
          // else send success into resolve
          resolve(0);
        }
      });
    });
  },


  // email link generate
  EMAILHTML(link) {
    return (
      '<div><h3>Click following link for reset your password</h3><a href="' +
      link +
      '">Rest password</a> </div>'
    );
  },
  NOTIHTML(message) {
    return (
      '<div>' + message +
       '</div>'
    );
  },
};
