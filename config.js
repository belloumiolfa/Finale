var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
/**
 * connect to mongodb
 */
mongoose
  .connect(
    "mongodb://localhost:27017/TrustiT_WORK",
    { useNewUrlParser: true },
    null
  )
  .then(() => console.log("-- MongoDB connected --"))
  .catch(error => console.log(error));

module.exports = { mongoose };
