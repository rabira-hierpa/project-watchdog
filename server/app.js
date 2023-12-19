// importing important modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); // to change post request to put
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const auth = require("./routes/authentication");
const users = require("./routes/users");
const archive = require("./routes/archive");
const projects = require("./routes/projects");
const milestones = require("./routes/milestones");
const tasks = require("./routes/tasks");
const requests = require("./routes/requests");
const history = require("./routes/history");
const chats = require("./routes/chats");
const cors = require("cors");
// const keys = require('./config/keys');
const ServerIP = require("./routes/ServerIP");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const sessionOptions = {
  secret: "pwdsecretapp",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost/pwd-db" }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: false,
  },
};

app.use(cors());

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method-Override Middleware
app.use(methodOverride("_method"));
app.use(cookieParser());

// Passport Middleware
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// Routing to '/'
app.get("/", (req, res) => {
  res.send("HELLO PROJECT WATCHDOG");
});

// Initializing mongodb and connecting
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/pwd-db")
  .then(() => {
    projectModel.createIndexes({
      ProjectTitle: "text",
      ProjectDescription: "text",
    });
    console.log("MongoDB Connected ....");
  })
  .catch((err) => console.log(err));

// /api/archive route to routes/archive.js
app.use("/api/archive", archive);

// /api/users route to routes/users.js
app.use("/api/users", users);

// /api/projects route to routes/projects.js
app.use("/api/projects", projects);

// /api/milestones route to routes/milestones.js
app.use("/api/milestones", milestones);

// /api/tasks route to routes/tasks.js
app.use("/api/tasks", tasks);

// /api/requests route to routes/requests.js
app.use("/api/requests", requests);

// /api/history route to routes/history.js
app.use("/api/history", history);

// /api/chats route to routes/chats.js
app.use("/api/chats", chats);

// /api/auth route to routes/authentication.js
app.use("/api/auth", auth);

// Listening to port 4500
const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

// Loading Model
require("./models/DBComponents");
const projectModel = mongoose.model("Project");
