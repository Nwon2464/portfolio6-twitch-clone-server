const passport = require("passport");
const chalk = require("chalk");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../models/user");
const GOOGLE_CLIENT_ID="104901537063-ce1q2og53ifsa98lhhnued019v03o9sn.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// // // browser sends the cookie back and received the id
passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      //   return null;
      // console.log(profile);
      try {
        Users.findOne({
          googleId: profile.id,
        }).then((currentUser) => {
          if (currentUser) {
            //already have user
            console.log("already have user");
            done(null, currentUser);
          } else {
            // if not, create user in our db
            new Users({
              googleId: profile.id,
              googleImage: profile._json.picture,
              displayName: profile.displayName,
              googleEmail: profile._json.email,
            })
              .save()
              .then((newUser) => {
                console.log("New data saved in MONGODB", newUser);
                done(null, newUser);
              });
          }
        });
      } catch (error) {
        throw new Error();
      }
    }
  )
);
