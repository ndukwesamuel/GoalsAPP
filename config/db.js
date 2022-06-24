const mongoose = require("mongoose");

// if (process.env.NODE_ENV === "production") {

//   const DB = process.env.MONGO_URI_LOCAL.toString()
//   console.log("this is production ");
//   return DB
// } else {
//   const DB = process.env.MONGO_URI_LOCAL.toString()
//   console.log("this is production ");
//   return DB
//   console.log("this is local");
// }

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI.toString());

    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
