const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();
require("./config");
const api = require("./api");
const authRoutes = require("./auth");
const middlewares = require("./middlewares");
const tokenMiddleware = require("./auth/middleware");


const COOKIE_KEY="abcdefg";
const MONGO_URI="mongodb://dnjsskarb7:Ion2ikgWF7g0oeg8@ac-xsgbecx-shard-00-00.bjecozp.mongodb.net:27017,ac-xsgbecx-shard-00-01.bjecozp.mongodb.net:27017,ac-xsgbecx-shard-00-02.bjecozp.mongodb.net:27017/?ssl=true&replicaSet=atlas-52w0vh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3000;
const app = express();
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1day for authorized cookie
    keys: [COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("👏👏👏👏👏👏 Mongo DB Atlas has been connected! 👏👏👏👏👏👏");
});
// AIzaSyBoGacSo3I4Ns7Y756tGfw0YZueRclQZ8g google
//clientid 1090803691910-jmqgsf3e6u0rboqudlhdg28gc7b482di.apps.googleusercontent.com
//client-secret 4E6h8hGTNKocXYHqnudpZhiC
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(tokenMiddleware.checkTokenSetUser);
app.get("/", (req, res) => {
  console.log(req.user);
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    user: req.user,
  });
});

app.use("/api/v1", api);
app.use("/auth", authRoutes);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT || 3000, () => {
  console.log(`Listening on ${PORT}...👀`);
});
