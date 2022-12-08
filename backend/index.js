const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const visitRouter = require("./routes/visitRoutes");

const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("connected to db");
}
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/visits", visitRouter);

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`server is running on ${PORT}`);
});
