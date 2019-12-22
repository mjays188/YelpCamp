let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let flash = require("connect-flash");
let passport = require("passport");
let methodOverride = require("method-override");
let LocalStrategy = require("passport-local");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let User = require("./models/user");
let seedDB = require("./seeds");
let indexRoutes = require("./routes/index");
let campgroundRoutes = require("./routes/campgrounds");
let commentRoutes = require("./routes/comments");

//app config
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true}, {useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Badminton is the best game in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("The YelpCamp Server has started!");
});