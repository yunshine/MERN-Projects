const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override'); /* Lets you use HTTP verbs such as PUT or DELETE in places not supported in the client */
const bodyParser = require('body-parser'); /* Parses incoming request bodies */
const expressSanitizer = require('express-sanitizer'); /* Sanitizes data from inputs */

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    console.log("process.env: ", process.env.NODE_ENV || "development environment");
}

// app.use(express.json());
// app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true })); // for data in url payloads, no JSON...
app.use(expressSanitizer());

// this will select the database url based on the environment that runs it...
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/mern-todo';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('The MERN-Todo app is connected to the Mongo database!'))
    .catch(error => console.log("Mongo database not connected...", error.message));

// const userRouter = require('./routes/User');
// app.use('/user', userRouter);

// app.use(cafeRoutes);
// app.use(commentRoutes);
// app.use(userRoutes);
// app.use(indexRoutes);


app.listen(3000, () => {
    console.log("Welcome to MERN-Todo! You've created a server using Express. The server has started and is now listening on port 3000...");
});



// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
//     console.log("process.env: ", process.env.NODE_ENV || "development environment");
// }

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const flash = require('connect-flash');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const path = require('path');
// const LocalStrategy = require('passport-local');
// const methodOverride = require('method-override');
// const expressSanitizer = require('express-sanitizer');
// const Cafe = require('./models/cafe');
// const Comment = require('./models/comment');
// const User = require('./models/user');
// // const seedDB = require('./seeds');

// // require all routes...
// const cafeRoutes = require('./routes/cafes');
// const commentRoutes = require('./routes/comments');
// const userRoutes = require('./routes/users');
// const indexRoutes = require('./routes/index');


// // Seed the database...
// // seedDB();

// // where the database lives... on my computer or in a cloud...
// // lines 7 & 8 of .env...

// // this will select the database url based on the environment that runs it...
// const url = process.env.DATABASEURL || 'mongodb://localhost:27017/collocafe';
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })
//     .then(() => console.log('Connected to database!'))
//     .catch(error => console.log("Database not connected...", error.message));

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true })); // for data in url payloads, no JSON...
// app.use(methodOverride('_method'));
// app.use(expressSanitizer());
// app.use(flash());
// // app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views'));

// // PASSPORT CONFIGURATIONS for authentication ================================
// // set up express session...
// app.use(require('express-session')({
//     secret: 'Rusty is the cutest dog!',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // passes currentUser to EVERY route, which we need for our navbar links
// app.use(function (req, res, next) {
//     res.locals.currentUser = req.user;
//     // flash-connect will now be available on every page...
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });
// // =======================================================================

// //  ***** USE THE ROUTES *****
// // =======================================================================

// app.use(cafeRoutes);
// app.use(commentRoutes);
// app.use(userRoutes);
// app.use(indexRoutes);
// // =======================================================================

// app.listen(process.env.PORT || 3000, process.env.IP, () => {
//     console.log("Welcome! You've created a server using Express. The server has started and is now listening on port 3000...");
// });