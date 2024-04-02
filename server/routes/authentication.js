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
      return res.status(404).json({
        message: "User does not exists. Try to signup with this email",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const { Password, ...userWithoutPassword } = user._doc;
      return res.status(200).send(userWithoutPassword);
    });
  })(req, res, next);
});

// Show currently logged in user
router.post("/signup/local", async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ Email: req.body.Email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists!" });
    }

    const { ...data } = req.body;
    const newUser = new userModel({
      ...data,
      Password: hashPassword(data.Password),
    });

    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (error) {
    return res.status(500).send(error.message);
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
