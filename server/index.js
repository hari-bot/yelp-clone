import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

//Middlewares
app.use(morgan("short"));
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json({ message: "Yelp Server" });
});

app.listen(PORT, () => {
  console.log(`Apllication is running on ${PORT}`);
});
