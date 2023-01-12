const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dharm:Vpj3mlZSasAU2Rb1@cluster0.xgthslz.mongodb.net/expTracker?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () => console.log("mongodb server connected"));
