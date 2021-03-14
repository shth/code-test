var express = require("express");
var login = require("./routes/login");
var consultations = require("./routes/consultations");
var bodyParser = require("body-parser");
var dbConnection = require("./dbConnection.js");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
var router = express.Router();
// test route
router.get("/", function (req, res) {
  res.json({ message: "welcome to our upload module apis" });
});
//route to handle user registration
router.post("/register", login.register);
router.post("/login", login.login);
router.post("/consultations", consultations.create);
router.get("/consultations/:consultationId", consultations.get);
router.post("/consultations/search", consultations.search);
app.use("/api", router);

dbConnection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
    console.log(err);
  }
});

process.on("SIGINT", function () {
  console.log("closing database connection");

  dbConnection.close();
  process.exit();
});

app.listen(3000);
