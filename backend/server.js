import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import { config } from "dotenv";

config();

const app = express();

app.use(bodyParser.json());

connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });
