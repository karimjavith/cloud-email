import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karim.dev.2020@gmail.com",
    pass: "<karimdev2020/>"
  }
});
export const sendMailForFunctions = functions.https.onCall(
  async (data, context) => {
    console.log(data);
    const dest = data.email;

    const mailOptions = {
      from: "Camels <noreply@camels-dev.firebaseapp.com>",
      to: dest,
      subject: "Welcome to Camels!", // email subject
      html: `<p style="font-size: 16px;">Hello,</p>
                 <br />
                 <p>Please click on the below link to sign up for Camel 2020</p>
                 <a href="${data.link}">Sign up</a>
             ` // email content in HTML
    };

    // returning result
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, async (error: any, info: any) => {
        if (error) {
          console.log(error);
          reject({
            message: error,
            isError: true
          });
        }
        console.log("Email sent");
        resolve({
          message: "Email sent!!",
          isError: false
        });
      });
    });
  }
);
