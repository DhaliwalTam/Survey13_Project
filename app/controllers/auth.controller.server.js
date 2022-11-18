import express from 'express';

// Need Passport
import passport from 'passport';

// Need to include the User Model for authentication
import User from '../models/user.js'

// import DisplayName Utility method
import { UserDisplayName } from '../utils/index.js';

// Displays the Log in page
export function DisplayLoginPage(req, res, next) {
    if(!req.user){ 
        return res.render('index', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), registerSuccessful: req.flash('registerSuccessful'), 
        displayName: UserDisplayName(req)})
    }

    return res.redirect('/surveys/list');
}

// Displays the Register page
export function DisplayRegisterPage(req, res, next) {
    if(!req.user){ 
        return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), registerError: req.flash('registerError'), displayName: UserDisplayName(req)})
    }

    return res.redirect('/surveys/list');
}


// Processes the user's request to login
export function ProcessLoginPage(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            console.error(err);
            res.end(err);
        }

        if(!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.logIn(user, function(err) {
            if(err) {
                console.error(err);
                res.end(err);
            }

            return res.redirect('/surveys/list');
        });

    })(req, res, next);
}

// Processes the user's request to register for an account
export function ProcessRegisterPage(req, res, next) {
    var today = new Date();
    var dateOfBirth = new Date(req.body.dob);
    var age = today.getFullYear() - dateOfBirth.getFullYear();
    var m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }

    if (age < 14) {
        req.flash('registerError', 'You must be older than 14 to register.');
        return res.redirect('/register');
    }

    else if (age >= 14) {
        let newUser = new User({
            username: req.body.username,
            address: req.body.emailAddress,
            password: req.body.password,
            displayName: req.body.firstName + " " + req.body.lastName,
            DOB: req.body.dob
        });

        User.register(newUser, req.body.password, function (err) {
            if (err) {
                if (err.name == "UserExistsError") {
                    console.error('Error! User Already Exists');
                    req.flash('registerMessage', 'User Already Exists');
                } else {
                    console.error(err);
                    req.flash('registerMessage', 'Server Error');
                }

                return res.redirect('/register');
            }

            return passport.authenticate('local')(req, res, function () {
                req.logOut(function(err) {
                    if(err) {
                        console.error(err);
                        res.end(err);
                    };
            
                    console.log('User Logged Out Successfully');
                });
                
                req.flash('registerSuccessful', 'Successfully registered! Please log in below.');
                return res.redirect('/login');
            });
        })
    }
}

// Processes the user's request to log out of account
export function ProcessLogoutPage(req, res, next) {
    req.logOut(function(err) {
        if(err) {
            console.error(err);
            res.end(err);
        };

        console.log('User Logged Out Successfully');
    });

    res.redirect('/login');
}