//import all required packages
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");
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
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://igsahilsayyad:9325@quora.bp1ogml.mongodb.net/?retryWrites=true&w=majority",
        autoRemove:'disabled'
    },
        function(err){
            console.log("Error in the mongo Store");
        }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//express routes handler
app.use("/", require("./routes"));
//start the server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on ${port}`);
});
