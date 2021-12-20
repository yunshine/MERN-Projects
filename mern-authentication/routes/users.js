// MOVE CODE FROM ROUTES TO CONTROLLER FILE LATER...

const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
// const Todo = require('../models/Todo');
const { json } = require('express');

const signToken = userID => {
    return JWT.sign({
        iss: "mern-authentication",
        sub: userID,
    }, process.env.REACT_APP_JWT_SECRET, { expiresIn: "1h" });
}

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: { msgBody: "An error has occurred", msgError: true } });
        }
        if (user) {
            res.status(400).json({ message: { msgBody: "That username is already taken", msgError: true } });
        } else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgBody: "An error has occurred", msgError: true } });
                } else {
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
                }
            });
        }
    });
});

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        console.log("user login route - authenticated");
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("in /logout function in user routes...");
    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "" }, success: true });
});

// Maintains login persistence for React...
userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("in /authenticated function in user routes...");
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

// userRouter.post('/todo', passport.authenticate('jwt', { session: false }), (req, res) => {
//     const todo = new Todo(req.body);
//     todo.save(err => {
//         if (err) {
//             res.status(500).json({ message: { msgBody: "An error has occurred", msgError: true } });
//         } else {
//             req.user.todos.push(todo);
//             req.user.save(err => {
//                 if (err) {
//                     res.status(500).json({ message: { msgBody: "An error has occurred", msgError: true } });
//                 } else {
//                     res.status(200).json({ message: { msgBody: "Todo successfully created", msgError: false } });
//                 }
//             });
//         }
//     });
// });

// userRouter.get('/todos', passport.authenticate('jwt', { session: false }), (req, res) => {
//     User.findById({ _id: req.user._id }).populate('todos').exec((err, document) => {
//         if (err) {
//             res.status(500).json({ message: { msgBody: "An error has occurred", msgError: true } });
//         } else {
//             res.status(200).json({ todos: document.todos, authenticated: true });
//         }
//     });
// });

// userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
//     if (req.user.role === "admin") {
//         res.status(200).json({ message: { msgBody: "You are an admin", msgError: false } });
//     } else {
//         res.status(403).json({ message: { msgBody: "You are NOT an admin", msgError: true } });
//     }
// });



module.exports = userRouter;

// const express = require('express');
// const userRouter = express.Router();
// const passport = require('passport');

// add in the correct models...
// const User = require('../models/user');
// const Cafe = require('../models/cafe');

// add in the middlewareObj...
// const middleware = require('../middleware/index.js');
// const { request } = require('express');

// UPDATE User - bookmarks one cafe to the user model...
// Q: first, before bookmarking, is the user logged in? Use middleware...
// userRouter.put("/users/:userID/bookmark/:cafeID", middleware.isLoggedIn, (req, res) => {
//     Cafe.findById(req.params.cafeID, function (err, foundCafe) {
//         if (err) {
//             console.log(error);
//             req.flash('error', "There was an error, and that cafe could not be found...");
//             res.redirect(`cafes/${req.params.cafeID}`);
//         } else {
//             // middleware has already checked if the user is logged in...
//             let newUser = {};

//             User.findByIdAndUpdate(req.params.userID, newUser, function (err, updatedUser) {
//                 updatedUser.bookmarks.push(foundCafe);
//                 updatedUser.save();
//                 if (err) {
//                     console.log(error);
//                     req.flash('error', "That user could not be found.");
//                     res.redirect(`/ users / ${req.params.userID}`);
//                 } else {
//                     req.flash('success', "That cafe has been bookmarked.");
//                     res.redirect(`/users/${req.params.userID}`);
//                 }
//             });
//         }
//     });
// });

// UPDATE User - deletes a bookmarks from the user model...
// Q: first, before deleting the bookmark, is user logged in? Use middleware...
// userRouter.put("/users/:userID/deletebookmark/:cafeID", middleware.isLoggedIn, (req, res) => {
//     Cafe.findById(req.params.cafeID, function (err, foundCafe) {
//         if (err) {
//             console.log(error);
//             req.flash('error', "There was an error, and that cafe could not be found...");
//             res.redirect(`/users/${req.params.userID}`);
//         } else {
//             // middleware has already checked if the user is logged in...
//             let newUser = {};

//             User.findByIdAndUpdate(req.params.userID, newUser, function (err, updatedUser) {
//                 let indexToDelete;

//                 for (let i = 0; i < updatedUser.bookmarks.length; i++) {
//                     if (updatedUser.bookmarks[i]._id.toString() === req.params.cafeID.toString()) {
//                         indexToDelete = i;
//                         break;
//                     }
//                 };

//                 updatedUser.bookmarks.splice(indexToDelete, 1);
//                 updatedUser.save();
//                 if (err) {
//                     console.log(error);
//                     req.flash('error', "That user could not be found.");
//                     res.redirect(`/users/ ${req.params.userID}`);
//                 } else {
//                     req.flash('success', "That bookmark has been deleted.");
//                     res.redirect(`/users/${req.params.userID}`);
//                 }
//             });
//         }
//     });
// });

// UPDATE User - deletes a bookmarks from the user model from the cafe show page...
// Q: first, before deleting the bookmark, is user logged in? Use middleware...
// userRouter.put("/users/:userID/cafebookmarkdelete/:cafeID", middleware.isLoggedIn, (req, res) => {
//     Cafe.findById(req.params.cafeID, function (err, foundCafe) {
//         if (err) {
//             console.log(error);
//             req.flash('error', "There was an error, and that cafe could not be found...");
//             res.redirect(`/users/${req.params.userID}`);
//         } else {
//             // middleware has already checked if the user is logged in...
//             let newUser = {};

//             User.findByIdAndUpdate(req.params.userID, newUser, function (err, updatedUser) {
//                 let indexToDelete;

//                 for (let i = 0; i < updatedUser.bookmarks.length; i++) {
//                     if (updatedUser.bookmarks[i]._id.toString() === req.params.cafeID.toString()) {
//                         indexToDelete = i;
//                         break;
//                     }
//                 };

//                 updatedUser.bookmarks.splice(indexToDelete, 1);
//                 updatedUser.save();
//                 if (err) {
//                     console.log(error);
//                     req.flash('error', "That user could not be found.");
//                     res.redirect(`/users/ ${req.params.userID}`);
//                 } else {
//                     req.flash('success', "Your bookmark has been deleted.");
//                     res.redirect(`/cafes/${req.params.cafeID}`);
//                 }
//             });
//         }
//     });
// });


// SHOW Route - shows one user
// userRouter.get("/users/:id", (req, res) => {
//     User.findById(req.params.id).populate("bookmarks").exec(function (err, foundUser) {
//         if (err) {
//             console.log(err);
//             req.flash('error', "There was an error, and that user could not be found...");
//             res.redirect("/cafes");
//         } else {
//             // renders the show page view with the one user from the DB
//             res.render("users/show.ejs", { user: foundUser });
//         }
//     });
// });

module.exports = userRouter;
