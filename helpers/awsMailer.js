/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const config = require("../middlewares/config"); // aws mail set in config file
var ses = require("node-ses"), // import node aws mailer
  client = ses.createClient({
    key: config.KEY,
    secret: config.SECRET_KEY,
  });

module.exports = {
  // send mail function to send email to any type of user
  async sendMail(to, subject, html) {
    
      return new Promise((resolve, reject)=>{
        client.sendEmail(
          {
            to: to.toString(),
            from: process.env.EMAILUSER.toString(),
            subject: subject,
            message: html,
            altText: "plain text",
            html: `"<html>HTML version of the body</html>
            
            "`,
          },

          // always return callback for response
          async function (err, resp, data) {
           if(resp){
             resolve(true)
           }else{
             reject(false)
           }
          }
        );

      })

  },
  // signup email of user 
  signup(firstName, signtoken) {
    return (
      `<html><body style="background-color:#c6b89d">
      <center style="background-color:#fff;text-align: center;width:600px;max-width:100%;padding-top: 40px;border-radius: 10px;margin: 40px auto;font-family:sans-serif;>
                              <table width=" 100% ">
                                  <tbody>
                                    <tr><img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img">
                                    </tr>
                                    <tr>
                                      <td >
                                          <h1 style="color:#ba9037;margin-bottom:0;">Welcome to Salus!</h1>
                                          <p style="text-align:center; ">
                                              <img width="90px " src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9Tt6e-s5azvktMNf0pbudSxqU256bbrAD1Q&usqp=CAU " alt="img ">
                                          </p>
                                          <h2>Successful</h2>
    
                                          <p style="margin-top:8px;">Hello  ${firstName}</p>
                                          <p style="margin-top:8px;">You have successfully signed up</p>
                                          <a style="display: inline-block; text-decoration: none; padding: 14px 40px; background-color:#ba9037;; border: 1px solid #ba9037;; border-radius: 5px; color: #FFF; margin-bottom: 15px; font-size: 16px; " target="_blank " href="` +
      process.env.SIGNUPTOKENURL +
      "/" +
      signtoken +
      `">Click here</a>
                                      </td>
                                  </tr>
                              </tbody>
                              <tfoot>
                                <div style="background-color:black;color:#fff;padding:10px 0 ;border-radius:0 0 10px 10px;">
                                  <p style="color:#fff; ">
                          Copyright© 2020 Salus | All Rights Reserved</p>
                                </div>
                              </tfoot>
      </table>
      </center>
    </body>
    </html>`
    );
  },

  // tae singup email template
  TAESignup(firstName, Tsigntoken) {
    return (
      `<html><body style="background-color:#c6b89d">
      <center style="background-color:#fff;text-align: center;width:600px;max-width:100%;padding-top: 40px;border-radius: 10px;margin: 40px auto;font-family:sans-serif;>
                              <table width=" 100% ">
                                  <tbody>
                                    <tr><img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img">
                                    </tr>
                                    <tr>
                                      <td >
                                          <h1 style="color:#ba9037;margin-bottom:0;">Welcome to Salus!</h1>
                                          <p style="text-align:center; ">
                                              <img width="90px " src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9Tt6e-s5azvktMNf0pbudSxqU256bbrAD1Q&usqp=CAU " alt="img ">
                                          </p>
                                          <h2>Successful</h2>
    
                                          <p style="margin-top:8px;">Hello ${firstName}</p>
                                          <p style="margin-top:8px;">You have signed up successfully</p>
                                          <a style="display: inline-block; text-decoration: none; padding: 14px 40px; background-color:#ba9037;; border: 1px solid #ba9037;; border-radius: 5px; color: #FFF; margin-bottom: 15px; font-size: 16px; " target="_blank " href="` +
      process.env.SIGNUPTOKENURL +
      "/" +
      Tsigntoken +
      `">Click here</a>
                                        
                                      </td>
                                  </tr>
                              </tbody>
                              <tfoot>
                                <div style="background-color:black;color:#fff;padding:10px 0 ;border-radius:0 0 10px 10px;">
                                  <p style="color:#fff; ">
                          Copyright© 2020 Salus | All Rights Reserved</p>
                                </div>
                              </tfoot>
      </table>
      </center>
    </body>
    </html>`
    );
  },
  
  // user appointment booking to expert email template
  booking(userName, saveAppointment, date, checkTae) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
  <body style="background-color:#c6b89d">
  <center
  style="
    background-color: #fff;
    text-align: center;
    width: 600px;
    max-width: 100%;
    padding-top: 40px;
    border-radius: 10px;
    margin: 40px auto;
    font-family: sans-serif;
  "
>
  <table width="100%">
    <tr>
      <td>
        <table width="100%">
          <tbody>
            <tr>
              <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
            </tr>
            <tr>
              <td>
                <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                <p style="text-align: center">
                  <img
                    width="130px"
                    src="https://cdn0.iconfinder.com/data/icons/sales-delivery/128/check-512.png"
                    alt="img "
                  />
                </p>
                <p style="padding:0 10px;">
                Hello  ${checkTae.firstName}
                 </p>
                <h2
                  style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                >
                  Your booking request has been placed
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table width="100%">
          <tbody>
            <tr>
              <td class="inner contents">
                <div class="table-responsive">
                  <table class="table-new">
                    <tbody>
                      <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DAY</th>
                        <th>TIME</th>
                      </tr>
                      <tr>
                        <td>${saveAppointment._id}</td>
                        <td>${userName.firstName}</td>
                        <td>${date}</td>
                        <td>${saveAppointment.appointmentTimeSlot}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
  <tfoot>
    <div
      style="
        background-color: black;
        color: #fff;
        padding: 10px 0;
        border-radius: 0 0 10px 10px;
      "
    >
      <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
    </div>
  </tfoot>
</center>
  </body></html>
  `;
  },
  UserBooking(checkTae, saveAppointment, date, userName) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
    <body style="background-color:#c6b89d"
    
    >
    <center
    style="
      background-color: #fff;
      text-align: center;
      width: 600px;
      max-width: 100%;
      padding-top: 40px;
      border-radius: 10px;
      margin: 40px auto;
      font-family: sans-serif;
    "
  >
    <table width="100%">
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
              </tr>
              <tr>
                <td>
                  <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                  <p style="text-align: center">
                    <img
                      width="130px"
                      src="https://cdn0.iconfinder.com/data/icons/sales-delivery/128/check-512.png"
                      alt="img "
                    />
                  </p>
                  <p style="padding:0 10px;">
                  Hello  ${userName.firstName}
                   </p>
                  <h2
                    style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                  >
                    Your booking request has been placed
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <td class="inner contents">
                  <div class="table-responsive">
                    <table class="table-new">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>TAE</th>
                          <th>DAY</th>
                          <th>TIME</th>
                        </tr>
                        <tr>
                          <td>${saveAppointment._id}</td>
                          <td>${checkTae.firstName}</td>
                          <td>${date}</td>
                          <td>${saveAppointment.appointmentTimeSlot}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
    <tfoot>
      <div
        style="
          background-color: black;
          color: #fff;
          padding: 10px 0;
          border-radius: 0 0 10px 10px;
        "
      >
        <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
      </div>
    </tfoot>
  </center>

  </body></html>
  `;
  },

  // appoinment booking reschedule
  TAERescheduled(dates, checkAppointment) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
  <body style="background-color:#c6b89d">
    <center
    style="
      background-color: #fff;
      text-align: center;
      width: 600px;
      max-width: 100%;
      padding-top: 40px;
      border-radius: 10px;
      margin: 40px auto;
      font-family: sans-serif;
    "
  >
    <table width="100%">
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
              </tr>
              <tr>
                <td>
                  <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                  <p style="text-align: center">
                    <img
                      width="130px"
                      src="https://cdn0.iconfinder.com/data/icons/sales-delivery/128/check-512.png"
                      alt="img "
                    />
                  </p>
                  <p style="padding:0 10px;">
                  Hello  ${checkAppointment.tae_id.firstName}
                   </p>
                  <h2
                    style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                  >
                  Your booking has been rescheduled
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <td class="inner contents">
                  <div class="table-responsive">
                    <table class="table-new">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>USER</th>
                          <th>DAY</th>
                          <th>TIME</th>
                        </tr>
                        <tr>
                          <td>${checkAppointment._id}</td>
                          <td>${checkAppointment.customer_id.firstName}</td>
                          <td>${dates}</td>
                          <td>${checkAppointment.appointmentTimeSlot}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
    <tfoot>
      <div
        style="
          background-color: black;
          color: #fff;
          padding: 10px 0;
          border-radius: 0 0 10px 10px;
        "
      >
        <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
      </div>
    </tfoot>
  </center>

  </body>
  
    </html>`;
  },

  // rescheduled confirmation email template
  UserRescheduled(dates, checkAppointment) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
  <body style="background-color:#c6b89d">
  <center
  style="
    background-color: #fff;
    text-align: center;
    width: 600px;
    max-width: 100%;
    padding-top: 40px;
    border-radius: 10px;
    margin: 40px auto;
    font-family: sans-serif;
  "
>
  <table width="100%">
    <tr>
      <td>
        <table width="100%">
          <tbody>
            <tr>
              <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
            </tr>
            <tr>
              <td>
                <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                <p style="text-align: center">
                  <img
                    width="130px"
                    src="https://cdn0.iconfinder.com/data/icons/sales-delivery/128/check-512.png"
                    alt="img "
                  />
                </p>
                <p style="padding:0 10px;">
                Hello  ${checkAppointment.customer_id.firstName}
                 </p>
                <h2
                  style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                >
                Your booking has been rescheduled
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table width="100%">
          <tbody>
            <tr>
              <td class="inner contents">
                <div class="table-responsive">
                  <table class="table-new">
                    <tbody>
                      <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DAY</th>
                        <th>TIME</th>
                      </tr>
                      <tr>
                        <td>${checkAppointment._id}</td>
                        <td>${checkAppointment.tae_id.firstName}</td>
                        <td>${dates}</td>
                        <td>${checkAppointment.appointmentTimeSlot}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
  <tfoot>
    <div
      style="
        background-color: black;
        color: #fff;
        padding: 10px 0;
        border-radius: 0 0 10px 10px;
      "
    >
      <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
    </div>
  </tfoot>
</center>
  </body>
  
    </html>`;
  },

  // cancel appointment booking
  cancelledTAEBooking(approve, datee) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
  <body style="background-color:#c6b89d">

    <center
    style="
      background-color: #fff;
      text-align: center;
      width: 600px;
      max-width: 100%;
      padding-top: 40px;
      border-radius: 10px;
      margin: 40px auto;
      font-family: sans-serif;
    "
  >
    <table width="100%">
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
              </tr>
              <tr>
                <td>
                  <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                  <p style="text-align: center">
                  <img width="90px " src="https://www.pngitem.com/pimgs/m/169-1699819_cancel-subscription-icon-crossed-out-circle-transparent-hd.png" alt="img ">
                  </p>
                  <p style="padding:0 10px;">
                  Hello  ${approve.tae_id.firstName}
                   </p>
                  <h2
                    style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                  >
                  Your booking has been cancelled
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <td class="inner contents">
                  <div class="table-responsive">
                    <table class="table-new">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>USER</th>
                          <th>DAY</th>
                          <th>TIME</th>
                        </tr>
                        <tr>
                          <td>${approve._id}</td>
                          <td>${approve.customer_id.firstName}</td>
                          <td>${datee}</td>
                          <td>${approve.appointmentTimeSlot}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
    <tfoot>
      <div
        style="
          background-color: black;
          color: #fff;
          padding: 10px 0;
          border-radius: 0 0 10px 10px;
        "
      >
        <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
      </div>
    </tfoot>
  </center>
  </body>
  
  
    </html>`;
  },

  // cancel booking by user email template
  cancelledUserBooking(approve, datee) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
  <body style="background-color:#c6b89d">
  <center
    style="
      background-color: #fff;
      text-align: center;
      width: 600px;
      max-width: 100%;
      padding-top: 40px;
      border-radius: 10px;
      margin: 40px auto;
      font-family: sans-serif;
    "
  >
    <table width="100%">
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
              </tr>
              <tr>
                <td>
                  <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                  <p style="text-align: center">
                  <img width="90px " src="https://www.pngitem.com/pimgs/m/169-1699819_cancel-subscription-icon-crossed-out-circle-transparent-hd.png" alt="img ">
                  </p>
                  <p style="padding:0 10px;">
                  Hello  ${approve.customer_id.firstName}
                   </p>
                  <h2
                    style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                  >
                  Your booking has been cancelled
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <td class="inner contents">
                  <div class="table-responsive">
                    <table class="table-new">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>TAE</th>
                          <th>DAY</th>
                          <th>TIME</th>
                        </tr>
                        <tr>
                          <td>${approve._id}</td>
                          <td>${approve.tae_id.firstName}</td>
                          <td>${datee}</td>
                          <td>${approve.appointmentTimeSlot}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
    <tfoot>
      <div
        style="
          background-color: black;
          color: #fff;
          padding: 10px 0;
          border-radius: 0 0 10px 10px;
        "
      >
        <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
      </div>
    </tfoot>
  </center>
  </body>
  
  
    </html>`;
  },

  // booking confirmation email template
  confirmUserBooking(approve, datee) {
    return `<html>
    <style>
    table {
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .webkit {
      max-width: 700px;
      padding: 30px;
      border-top: 3px solid #ff5a00;
      margin-top: 30px;
      background: #fff;
      margin-bottom: 30px;
      border-bottom: 3px solid #ff5a00;
    }

    .outer {
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
    }

    .inner {
      padding: 10px;
    }

    .contents {
      width: 100%;
    }

    /* One column layout */
    .one-column .contents {
      text-align: left;
    }

    .one-column p {
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #5a5a5a;
    }

    .table-new {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }

    .table-new td,
    .table-new th {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 12px;
    }

    .table-new tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table-new tr:hover {
      background-color: #ddd;
    }

    .table-new th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #cda966;
      color: white;
    }

    .one-border {
      border-bottom: 1px solid #eee;
    }

    /* Left sidebar layout */
    .left-sidebar {
      text-align: center;
      font-size: 0;
    }
    .left-sidebar .column {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .left-sidebar .left {
      width: 70%;
    }
    .left-sidebar .right {
      width: 30%;
    }

    .left-sidebar .contents {
      font-size: 14px;
      text-align: center;
    }
    .left-sidebar a {
      color: #85ab70;
    }
  </style>
  <body style="background-color:#c6b89d">
  <center
    style="
      background-color: #fff;
      text-align: center;
      width: 600px;
      max-width: 100%;
      padding-top: 40px;
      border-radius: 10px;
      margin: 40px auto;
      font-family: sans-serif;
    "
  >
    <table width="100%">
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <img width="80px" src="http://salusf.toxsl.in/assets/images/logo.png" alt="img" />
              </tr>
              <tr>
                <td>
                  <h1 style="color: #ba9037; margin-bottom: 0"></h1>
                  <p style="text-align: center">
                  <img width="90px " src="https://www.pngitem.com/pimgs/m/169-1699819_cancel-subscription-icon-crossed-out-circle-transparent-hd.png" alt="img ">
                  </p>
                  <p style="padding:0 10px;">
                  Hello  ${approve.customer_id.firstName}
                   </p>
                  <h2
                    style="margin-top: 8px; color: #ba9037; margin-bottom: 0"
                  >
                  Your booking has been confirmed By TAE
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="100%">
            <tbody>
              <tr>
                <td class="inner contents">
                  <div class="table-responsive">
                    <table class="table-new">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>TAE</th>
                          <th>DAY</th>
                          <th>TIME</th>
                        </tr>
                        <tr>
                          <td>${approve._id}</td>
                          <td>${approve.tae_id.firstName}</td>
                          <td>${datee}</td>
                          <td>${approve.appointmentTimeSlot}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
    <tfoot>
      <div
        style="
          background-color: black;
          color: #fff;
          padding: 10px 0;
          border-radius: 0 0 10px 10px;
        "
      >
        <p style="color: #fff">Copyright© 2020 Salus | All Rights Reserved</p>
      </div>
    </tfoot>
  </center>
  </body>
  
  
    </html>`;
  },

  // user status approved by admin email template
  userApproved(userBlock) {
    return `<html>
    <body style="background-color:#c6b89d">
    <center style="background-color:#fff;text-align: center;width:600px;max-width:100%;padding-top: 40px;border-radius: 10px;margin: 40px auto;;font-family: sans-serif;>
                            <table width="100%">
                                <tbody>
                                  <tr><img width="80px"  src="http://salusf.toxsl.in/assets/images/logo.png" alt="img">
  
                                  </tr>
                                    <td >
  
                                      <h1 style="color:#ba9037">Congratulations</h1>
                                        <p style="text-align:center;">
                                            <img width="130px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTNyJgi2w3a4cWTMy9y99SafInH6b4IwPftw&usqp=CAU" alt="img">
                                        </p>
                                        <p style="margin-top:8px;"> Hello  ${userBlock.firstName}</p>
  
                                            <p style="margin-top:8px;">Your Account has been approved</p>
  
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                              <div style="background-color:black;color:#fff;padding:10px 0;border-radius:0 0 10px 10px;">
                                <p style="color:#fff;">
                        Copyright© 2020 Salus | All Rights Reserved</p>
                              </div>
                            </tfoot>
                    </table>
    </center>
  </body>
  
    </html>`;
  }, 

  // ban user by admin panel email template
  userBanned(userBlock) {
    return `<html>
    <body style="background-color:#c6b89d">
    <center style="background-color:#fff;text-align: center;width:600px;max-width:100%;padding-top: 40px;border-radius: 10px;margin: 40px auto;font-family:sans-serif;>
                            <table width=" 100% ">
                                <tbody>
                                  <tr><img width="80px"src="http://salusf.toxsl.in/assets/images/logo.png" alt="img">
                                  </tr>
                                  <tr>
                                    <td >
                                        <h1 style="color:#ba9037;margin-bottom:0;">Alert!</h1>
                                        <p style="text-align:center; ">
                                            <img width="100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTti2QX0Lr3ACs4GeM9OdNUpJUDJv1ngTizrg&usqp=CAU " alt="img ">
                                        </p>
                                        <p style="padding:0 10px;">
                                        Hello ${userBlock.firstName}
                                        </p>
                                        <p style="padding:0 10px;">
                                         Your account has been banned for unusual activity.
                                        </p>
                                      
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                              <div style="background-color:black;color:#fff;padding:10px 0 ;border-radius:0 0 10px 10px;">
                                <p style="color:#fff; ">
                        Copyright© 2020 Salus | All Rights Reserved</p>
                              </div>
                            </tfoot>
                </table>
    </center>
  </body>
  
  
    </html>`;
  },

  // tae status approve by admin email template
  TAEApproved(expertBlock) {
    return `<html>
    <body style="background-color:#c6b89d">
    <center style="background-color:#fff;text-align: center;width:600px;max-width:100%;padding-top: 40px;border-radius: 10px;margin: 40px auto;;font-family: sans-serif;>
                            <table width="100%">
                                <tbody>
                                  <tr><img width="80px"  src="http://salusf.toxsl.in/assets/images/logo.png" alt="img">
  
                                  </tr>
                                    <td >
  
                                      <h1 style="color:#ba9037">Congratulations</h1>
                                        <p style="text-align:center;">
                                            <img width="130px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTNyJgi2w3a4cWTMy9y99SafInH6b4IwPftw&usqp=CAU" alt="img">
                                        </p>
                                        <p style="margin-top:8px;">Hello ${expertBlock.userId.firstName}</p>
                                            <p style="margin-top:8px;"> Account has been approved</p>
                                        
  
  
                                       
  
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                              <div style="background-color:black;color:#fff;padding:10px 0;border-radius:0 0 10px 10px;">
                                <p style="color:#fff;">
                        Copyright© 2020 Salus | All Rights Reserved</p>
                              </div>
                            </tfoot>
                    </table>
    </center>
  </body>
  
    </html>`;
  },

  // ban tae for login email template
  TAEBanned(expertBlock) {
    return `<html>
    <body style="background-color:#c6b89d">
    <center style="background-color:#fff;text-align: center;width:600px;max-width:100%;padding-top: 40px;border-radius: 10px;margin: 40px auto;font-family:sans-serif;>
                            <table width=" 100% ">
                                <tbody>
                                  <tr><img width="80px"  src="http://salusf.toxsl.in/assets/images/logo.png" alt="img">
                                  </tr>
                                  <tr>
                                    <td >
                                        <h1 style="color:#ba9037;margin-bottom:0;">Notice!</h1>
                                        <p style="text-align:center; ">
                                            <img width="100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTti2QX0Lr3ACs4GeM9OdNUpJUDJv1ngTizrg&usqp=CAU " alt="img ">
                                        </p>
                                        <p style="padding:0 10px;">
                                        Hello ${expertBlock.userId.firstName}
                                       </p>
                                        <p style="padding:0 10px;">
                                         Your account has been banned for unusual activity.
                                        </p>
                                      
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                              <div style="background-color:black;color:#fff;padding:10px 0 ;border-radius:0 0 10px 10px;">
                                <p style="color:#fff; ">
                        Copyright© 2020 Salus | All Rights Reserved</p>
                              </div>
                            </tfoot>
                </table>
    </center>
  </body>
  
  
    </html>`;
  },
};
