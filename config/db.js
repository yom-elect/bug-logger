const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://YomiDev:WkfNtZporyuVaabO@cluster0.asyjr.mongodb.net/BugLogger?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB Connected");
  } catch {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
