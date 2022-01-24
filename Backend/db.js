const mongoose = require("mongoose");
const mongooseURI =
  "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const conenctTomongo = () => {
  mongoose.connect(mongooseURI, () => {
    console.log("Connected to mongoose Successfully");
  });
};

module.exports = conenctTomongo;
