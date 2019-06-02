const NodeMailer = require("nodemailer");
const ENV = require("../Constants");
const { User } = require("../Models/User");

//nodemailer configuration
// const SetUpMail = () => {
//   return NodeMailer.createTransport({
//     host: ENV.EMAIL_HOST,
//     port: ENV.EMAIL_PORT,
//     auth: {
//       user: ENV.EMAIL_USER,
//       pass: ENV.EMAIL_PASS
//     }
//   });
// };

const SetUpMail = () => {
  return NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.GMAIL_USER,
      pass: ENV.GMAIL_PASS
    }
  });
};

const sendConfirmationEmail = (userEmail, token) => {
  const url = User.generateConfirmationUrl(token);

  const tranport = SetUpMail();
  const email = {
    from: "trustit.work",
    to: userEmail,
    subject: "Welcome to TrustiT.WORK",
    html: ` <a href="${url}">Welcome to TrustiT.WORK. Please, confirm your email. </a>`
  };

  tranport.sendMail(email);
};

module.exports = { sendConfirmationEmail };
