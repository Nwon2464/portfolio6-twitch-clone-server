const passport = require("passport");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const signupUsers = require("../models/signup");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

router.get("/signup", (req, res) => {
  res.json({ msg: "AA" });
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const result = schema.validate({
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    // email:
    dateofbirth: Number(req.body.dateofbirth),
    month: Number(req.body.month),
    year: Number(req.body.year),
  });
  if (result.error === undefined) {
    signupUsers
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          console.log("user=>", user);
          const error = new Error("please choose other username");
          next(error);
        } else {
          bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
            const newUser = {
              username: req.body.username,
              password: hashedPassword,
            };
            new signupUsers(newUser).save().then((completedNewUser) => {
              completedNewUser.password = "your password is secured";
              res.json(completedNewUser);
            });
          });
        }
      });
  } else {
    console.log("you reached error");
    next(result.error);
  }

  // console.log(value);
  // res.json(result);
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // res.send({ username: req.body.username, password: hashedPassword });
});

router.get("/current_user", (req, res) => {
  res.json(req.user);
});

//auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
  // res.send(req.user);
});

module.exports = router;