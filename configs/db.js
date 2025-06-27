const mongoose = require("mongoose");
const uri = process.env.MONGO_DB_URI;
async function runDB() {
  try {
    await mongoose.connect(uri);
    console.log("DB connected successfuly");
  } catch (e) {
    console.error(e.message);
  }
}
module.exports = runDB;
