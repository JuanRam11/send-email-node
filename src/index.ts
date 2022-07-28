'use strict';
// This is to allow the use of ENV variables on this code only when running in development mode.
if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}
// This is for using the Nodemailer package to send emails
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
   // create reusable transporter object using the default SMTP transport of the nodemailer package
   let transporter = nodemailer.createTransport({
      host: process.env.HOST, // Your host, change this in your own enviroment variables file
      port: 465,
      secure: true,
      auth: {
         user: process.env.USEREMAIL, // Your user email, change this in your own enviroment variables file
         pass: process.env.USERPASS, // Your user password, change this in your own enviroment variables file
      },
   });

   // this is the data we are going to send as an email
   let info = await transporter.sendMail({
      // This is from whom the email is going to come from, change this in your own enviroment variables file
      from: `"Info 👻" <${process.env.FROM}>`, // sender address
      // This is to whom the email is going to be sent, change this in your own enviroment variables file
      to: process.env.TO, // list of receivers
      subject: 'Hello from test ✔', // Subject line
      text: 'Hello this is a test', // plain text body
      html: '<b>Hello, this is a test </b>', // html body
   });

   // This verify that the email was or was not sent to the user, if not, it throws an error otherwise it shows a message saying that message as sent
   transporter.verify(function (err, success) {
      if (err) {
         // This is console loged if there was an error sending the email
         console.log(
            'There is a problem in the server, please try again later ',
            err
         );
      } else {
         // This is console loged if the email is sent successfully
         console.log('Your message was sent successfully');
      }
   });
}

// Catch erros on mail function
main().catch(console.error);
