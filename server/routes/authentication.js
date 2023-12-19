// including modules to the project
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
// const keys = require('../config/keys');
const LocalStrategy = require("passport-local").Strategy;
const ServerIp = require("./ServerIP");
const {
  comparePassword,
  hashPassword,
} = require("../utils/helpers/comparePassword");

// To encode user into a cookie
passport.serializeUser((user, done) => {
  done(null, user["_id"]);
});

// To decode user from a cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
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

// Using passport-local strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "Email",
      passwordField: "Password",
    },
    async (Email, Password, done) => {
      try {
        if (!Email || !Password) {
          done(
            {
              status: 404,
              message: "Email and password required!",
            },
            null
          );
        }
        const user = await userModel.findOne({ Email });
        if (!user) {
          done(
            {
              status: 404,
              message: `${Email} not found! Make sure you have an account associated with your email.`,
            },
            null
          );
        }
        // Check if password is correct
        const isValid = comparePassword(Password, user.Password);
        if (!isValid) {
          done({
            status: 401,
            message: "Invalid credentials!",
          });
        }
        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Login route
router.post("/login/local", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(err.status).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ message: "Login failed" });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      const { Password, ...userWithoutPassword } = user._doc;
      return res.send(userWithoutPassword);
    });
  })(req, res, next);
});

// Show currently logged in user
router.get("/show/current", (req, res) => {
  if (req.isAuthenticated()) {
    const { Password, ...userWithoutPassword } = req.user["_doc"];
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Register route
router.post("/signup/local", async (req, res) => {
  try {
    const user = await userModel.findOne({ Email: req.body.Email });
    if (user) {
      res.json({ error: "User already exists!" });
    } else {
      const newUser = new userModel({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Email: req.body.Email,
        Password: hashPassword(req.body.Password),
        Department: req.body.Department,
        OtherDescription: req.body.OtherDescription,
      });

      const user = await newUser.save();
      res.json(user);
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

// Loading Model
require("../models/DBComponents");
const userModel = mongoose.model("User");

module.exports = router;
