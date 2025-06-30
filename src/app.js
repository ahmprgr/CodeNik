const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const authRouter = require("./modules/user/auth/userRouter.js");
const { getMe } = require("./modules/user/auth/userController");
const isAdmin = require("./middlewares/isAdmin.js");
const authGuard = require("./middlewares/authGuard.js");
const courseRouter = require("./modules/admin/courses/courseRouter.js");
require("dotenv").config();

const app = express();

//* middlewares
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 36,
      httpOnly: true,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URI,
      ttl: 60 * 60 * 36,
      autoRemove: "native",
    }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

//* router
app.use("/api/auth", authRouter);
app.use("/api/admin",router)
app.get("/api/user/me",authGuard,getMe)

module.exports = app;
