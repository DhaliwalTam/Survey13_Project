import { UserDisplayName } from "../utils/index.js";
import { GetUserID } from "../utils/index.js";
import { GetUsername } from "../utils/index.js";
import userModel from '../models/user.js';
import nodemailer from 'nodemailer';

var codeArray = [];

// Display main home page of website
export function DisplayHomePage(req, res, next) {
    var publisher = UserDisplayName(req);

    if (publisher !== "") {
        userModel.find({ displayName: publisher }, function(err, user) {
            if (err) {
                console.error(err);
                res.end(err);
            } else {
                var userID = user[0]._id;
                userModel.find({ _id: userID }, function(err, user) {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }

                    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req), user: user, id: GetUserID(req), username: GetUsername(req) });
                })

            }
        })
    } else {
        res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req), id: GetUserID(req), username: GetUsername(req) });
    }
}

// Display the profile update page
export function DisplayUpdatePage(req, res, next) {
    var id = req.params.id;

    userModel.findById(id, (err, user) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'Update your profile',
            page: 'update',
            user: user,
            displayName: UserDisplayName(req),
            id: GetUserID(req),
            username: GetUsername(req)
        });
    });
}

// Processes the user's request to update profile
export function ProcessUpdatePage(req, res, next) {
    var id = req.params.id;

    var updatedUser = userModel({
        _id: req.body.id,
        username: req.body.userName,
        password: req.body.password,
        address: req.body.email,
        DOB: req.body.dob
    })

    userModel.updateOne({ _id: id }, updatedUser, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            console.log('details changed')
            res.redirect('/logout');
        }
    })
}

// Display password change page
export function DisplayPasswordPage(req, res, next) {
    var id = req.params.id;

    userModel.findById(id, (err, user) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'Change your password',
            page: 'password',
            user: user,
            displayName: UserDisplayName(req),
            id: GetUserID(req),
            username: GetUsername(req)
        });
    });
}

// Processes the user's request to change password
export function ProcessPasswordPage(req, res, next) {
    var id = req.body.id;

    var updatedUser = userModel({
        _id: req.body.id,
        username: req.body.userName,
        password: req.body.new,
    })

    userModel.updateOne({ _id: id }, updatedUser, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    })


    userModel.findByUsername(req.body.username, (err, user) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            user.changePassword(req.body.old, req.body.new, function(err) {
                if (err) {
                    console.error(err);
                    res.end(err);
                } else {
                    console.log("changed");
                }
            });
        }

    });
}

// Display forgot password page
export function DisplayForgotPassPage(req, res, next) {
    res.render('index', { title: 'Forgot your password', page: 'forgotPass', displayName: UserDisplayName(req), messages: req.flash('userNotFound'), id: GetUserID(req), username: GetUsername(req) });
}

// Processes the user's request once they initiate the process of recovering their password
export function ProcessForgotPassPage(req, res, next) {
    userModel.findOne({ address: req.body.email }, function(err, user) {
        if (err) {
            console.error(err);
            res.end(err);
        } else if (!user) {
            req.flash('userNotFound', 'Hmm.. that email does not exist in our system. Please try again!');
            return res.redirect('/forgotPass');
        } else {
            var id = user._id;
            var updatedUser = userModel({
                _id: id,
                password: req.body.newPassword,
            });

            userModel.updateOne({ _id: id }, updatedUser, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
            })

            userModel.findByUsername(user.username, (err, userAlt) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                } else {
                    userAlt.setPassword(req.body.newPassword, function(err) {
                        if (err) {
                            console.error(err);
                            res.end(err);
                        } else {
                            console.log("changed");
                            userAlt.save();
                            res.redirect('/logout');
                        }
                    });
                }

            });
        }
    });

}

// Display the page where the user can enter their email address and receive the verification code once they click 'Forgot Password'
export function DisplayCodePage(req, res, next) {
    res.render('index', {
        title: 'Get your code',
        page: 'code',
        displayName: UserDisplayName(req),
        userNotFound: req.flash('userNotFound'),
        messages: req.flash('codeSent'),
        id: GetUserID(req),
        username: GetUsername(req)
    });
}

// Displays the page where the user can enter the verification code that they received via email
export function DisplayEnterCodePage(req, res, next) {
    res.render('index', {
        title: 'Enter your code',
        page: 'enterCode',
        id: GetUserID(req),
        username: GetUsername(req),
        displayName: UserDisplayName(req),
        code: req.flash('code'),
        messages: req.flash('invalidCode'),
        codeSent: req.flash('codeSent')
    });
}

// Sends the email containing the verification code to the user's registered email address
export function SendCodeEmail(req, res, next) {
    userModel.findOne({ address: req.body.email }, function(err, user) {
        if (err) {
            console.error(err);
            res.end(err);
        } else if (!user) {
            req.flash('userNotFound', 'Hmm.. that email does not exist in our system. Please try again!');
            return res.redirect('/generateCode');
        } else {
            var randomNumber = Math.floor(1000 + Math.random() * 9000);
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'survey13stats@gmail.com',
                    pass: 'fndekejdersasehc'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                from: 'survey13stats@gmail.com',
                to: `${req.body.email}`,
                subject: `Your Reset Code - Survey13`,
                text: `Your unique 4-digit code is ${randomNumber}`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            codeArray[0] = randomNumber;
            req.flash('code', `${randomNumber}`);
            req.flash('codeSent', 'A code has been sent to your email. Please enter it below.')
            return res.redirect('/enterCode');

        }
    });
}

// Processes and validates the verification code that the user enters
export function ProcessCodePage(req, res, next) {
    if (req.body.code !== req.body.val) {
        req.flash('invalidCode', 'Invalid code. Please try again!');
        return res.render('index', {
            title: 'Enter your code',
            page: 'enterCode',
            displayName: UserDisplayName(req),
            id: GetUserID(req),
            username: GetUsername(req),
            code: codeArray[0],
            messages: req.flash('invalidCode')
        });
    } else {
        res.redirect('/forgotPass');
    }

}

// Display the about us page
export function DisplayAboutPage(req, res, next) {
    res.render('index', {
        title: 'About Survey13',
        page: 'about',
        displayName: UserDisplayName(req),
        id: GetUserID(req),
        username: GetUsername(req)
    });
}

// Display the tutorial page
export function DisplayTutorialPage(req, res, next) {
    res.render('index', {
        title: 'Survey13 Tutorial',
        page: 'tutorial',
        displayName: UserDisplayName(req),
        id: GetUserID(req),
        username: GetUsername(req)
    });
}