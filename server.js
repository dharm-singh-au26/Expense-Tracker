const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const userRoute = require("./routes/usersroute");
const transactionRoute = require("./routes/transactionsRoute");

app.use("/api/users", userRoute);
app.use("/api/transactions/", transactionRoute);

app.listen(5000, () => {
  console.log(`App Listening on port ${port}`);
});
