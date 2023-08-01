//import all required packages
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const passportGoogleoAuth2 = require("./config/passport_google_oauth_strategy");
const passportFacebook = require("./config/passport_facebook_strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//for parsing the form data into urlencoded format
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//serving the static files
app.use(express.static("./public"));
//set up the layout
app.use(expressLayouts);
//extract the css and js links to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
//sets up for the store profile pictures
app.use("/uploads", express.static(__dirname + "/uploads"));

//handle session cookie
app.use(
  session({
    name: "Quora",
    secret: "asjfsdhd",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:process.env.MONGO_URL,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(`Error in the mongo Store ${err}`);
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//express routes handler
app.use("/", require("./routes"));
//start the server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on ${port}`);
});
