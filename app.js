var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const handleErrors = require("./middlewares/handleErrors");
const connectDB = require("./config/database");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
const questionRouter = require("./routes/questions");
var app = express();
connectDB();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("client/build"));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);

// serve static assests in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// catch 404 and forward to error handler
console.log(process.env.NODE_ENV);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(handleErrors);

module.exports = app;
