const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const bcrypt = require("bcrypt");
const router = require("./routes/userRoutes");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const TransactionRoutes = require("./routes/transactionRoutes");
const { editTransaction } = require("./controllers/transactionController");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

connectDb();

app.post("/register", userRouter);
app.post("/login", userRouter);

app.post("/add", TransactionRoutes);
app.post("/get", TransactionRoutes);
app.put("/edit", TransactionRoutes);
app.delete("/delete", TransactionRoutes)

app.listen(port, () => {
  console.log(`Server running on Port:${port}`);
});
