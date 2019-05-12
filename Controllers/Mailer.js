const NodeMailer = require("nodemailer");
const ENV = require("../Constants");
const { User } = require("../Models/User");

//nodemailer configuration
const SetUpMail = () => {
  return NodeMailer.createTransport({
    host: ENV.EMAIL_HOST,
    port: ENV.EMAIL_PORT,
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS
    }
  });
};

const sendConfirmationEmail = (userEmail, token) => {
  const url = User.generateConfirmationUrl(token);

  const tranport = SetUpMail();
  const email = {
    from: "",
    to: userEmail,
    subject: "Welcome to TrustiT.WORK",
    text: `
    Welcome to TrustiT.WORK. Please, confirm your email.
    ${url}
    `
  };

  tranport.sendMail(email);
};

module.exports = { sendConfirmationEmail };
