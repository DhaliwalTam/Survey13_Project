import express from 'express';

// Need Passport
import passport from 'passport';

// Need to include the User Model for authentication
import User from '../models/user.js'

// import DisplayName Utility method
import { UserDisplayName } from '../utils/index.js';

// Display functions
export function DisplayLoginPage(req, res, next) {
    if(!req.user){ 
        return res.render('index', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)})
    }

    return res.redirect('/surveys/list');
}

export function DisplayRegisterPage(req, res, next) {
    if(!req.user){ 
        return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)})
    }

    return res.redirect('/surveys/list');
}


// Process functions
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

export function ProcessRegisterPage(req, res, next) {
    let newUser = new User({
        username: req.body.username, 
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName,
        DOB: req.body.dob
        });

        User.register(newUser, req.body.password, function(err) {
            if(err) {
                if(err.name == "UserExistsError") {
                    console.error('Error! User Already Exists');
                    req.flash('registerMessage', 'User Already Exists');
                } else {
                    console.error(err);
                    req.flash('registerMessage', 'Server Error');
                }

                return res.redirect('/register');
            }

            return passport.authenticate('local')(req, res, function() {
                req.flash('registerSuccessful', 'Succesfully registered! Please log in below.');
                return res.render('index', {title: 'Login', page: 'login', messages: req.flash('registerSuccessful'), displayName: {}})
            });
        })
}

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