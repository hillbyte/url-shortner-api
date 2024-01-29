const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URI);
    console.log(`DB connected at host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("DB connection Error", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
