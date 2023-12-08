// including modules to the project
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
// const keys = require('../config/keys');
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const ServerIp = require("../routes/ServerIP");

router.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["simpleKey"],
  })
);

router.use(passport.initialize());
router.use(passport.session());

// To encode user into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// To decode user from a cookie
passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => {
    done(null, user);
  });
});

// Using google passport strategy
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: keys.googleClientID,
// 			clientSecret: keys.googleClientSecret,
// 			callbackURL: '/api/auth/google/callback',
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			// this is returned after google code to google profile exchange with google
// 			userModel.findOne({ googleID: profile.id }).then((user) => {
// 				if (user) {
// 					//console.log("user found");
// 					done(null, user);
// 				} else {
// 					const newUser = new userModel({
// 						Fname: profile.name.givenName,
// 						Lname: profile.name.familyName,
// 						Email:
// 							profile.name.givenName +
// 							profile.name.familyName +
// 							'@projectwatchdog.com',
// 						googleID: profile.id,
// 						Password: profile.id,
// 						Department: 'Computer Science',
// 					});

// 					bcrypt.genSalt(10, (err, salt) => {
// 						bcrypt.hash(newUser.Password, salt, (err, hash) => {
// 							//if(err) throw err;
// 							newUser.Password = hash;
// 							newUser.save().then((user) => done(null, user));
// 						});
// 					});
// 				}
// 			});
// 		}
// 	)
// );

// router.get(
// 	'/google',
// 	passport.authenticate('google', {
// 		scope: ['profile', 'email'],
// 	})
// );

// router.get(
// 	'/google/callback',
// 	passport.authenticate('google'), // perform code-profile exchange
// 	(req, res) => {
// 		res.redirect('http://localhost:4500/api/auth/login');
// 	}
// );

// Using pasport-local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "Email",
      passwordField: "Password",
    },
    (Email, Password, done) => {
      userModel
        .findOne({
          Email: Email,
        })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect Email." });
          }
          // Check if password is correct
          bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Incorrect Password");
              return done(null, false, { message: "Incorrect Password." });
            }
          });
        });
    }
  )
);

router.get("/login/fail", (req, res) => {
  res.send({ message: "fail" });
});

// Login route
router.post("/login/local", (req, res, next) => {
  return passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(ServerIp.ipAddress + "/api/auth/login/fail");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Exclude password and other sensitive data before sending the user object
      const { Password, ...userWithoutPassword } = user._doc;
      return res.send(userWithoutPassword);
    });
  })(req, res, next);
});

// Show currently loged in user
router.get("/show/current", (req, res) => {
  const { user } = req;
  const { Password, ...rest } = user["_doc"];

  res.send(rest);
});

// Registor route
router.post("/signup/local", (req, res) => {
  userModel.findOne({ Email: req.body.Email }).then((user) => {
    if (user) {
      res.json({ error: "User Already Exist" });
    } else {
      const newUser = new userModel({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Email: req.body.Email,
        Password: req.body.Password,
        Department: req.body.Department,
        OtherDescription: req.body.OtherDescription,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Password, salt, async (err, hash) => {
          newUser.Password = hash;
          try {
            const user = await newUser.save();
            res.json(user);
          } catch (error) {
            res.send(error);
          }
        });
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

// Loading Model
require("../models/DBComponents");
const userModel = mongoose.model("User");

module.exports = router;
