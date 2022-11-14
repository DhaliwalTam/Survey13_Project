import { UserDisplayName } from "../utils/index.js";
import { GetUserID } from "../utils/index.js";
import userModel from '../models/user.js';
import nodemailer from 'nodemailer';

var codeArray = [];

export function DisplayHomePage(req, res, next) {
    let publisher = UserDisplayName(req);

    if(publisher !== ""){
        userModel.find({displayName: publisher}, function (err, user) {
            if (err) {
                console.error(err);
                res.end(err);
            } 
            
            else {
                var userID = user[0]._id;
                userModel.find({ _id: userID}, function (err, user) {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }

                    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req), user:user, id:GetUserID(req)});
                })
                
            }
        })
    }    
    else{
        res.render('index', {title: 'Home', page: 'home', displayName: UserDisplayName(req), id:GetUserID(req)});
    }
}

export function DisplayUpdatePage(req,res,next){
    let id = req.params.id;

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
            id: GetUserID(req)
        });
    });
}


export function ProcessUpdatePage(req,res,next){
    let id = req.params.id;
   
    let updatedUser = userModel({
        _id: req.body.id,
        username: req.body.userName,
        password: req.body.password,
        address: req.body.email,
        DOB: req.body.dob
    })

    userModel.updateOne({_id: id }, updatedUser, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        else {
            console.log('details changed')
            res.redirect('/surveys/list') ;         
        }
    } )
}

export function DisplayPasswordPage(req,res,next){
    let id = req.params.id;

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
            id: GetUserID(req)
        });
    });
}


export function ProcessPasswordPage(req, res, next){
    let id = req.body.id;
    
    let updatedUser = userModel({
        _id: req.body.id,
        username: req.body.userName,
        password: req.body.new,
    })

    userModel.updateOne({_id: id }, updatedUser, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }
    })
    
    
    userModel.findByUsername(req.body.username, (err, user) => {
        if (err) {
            console.error(err);
            res.end(err);
        } 
        
        else {
            user.changePassword(req.body.old, req.body.new, function (err) {
                if (err) {
                    console.error(err);
                    res.end(err);
                } 
                
                else {
                    console.log("changed");
                }
            });
        }

    });
}

export function DisplayForgotPassPage(req,res,next){
    res.render('index', {title: 'Forgot your password', page: 'forgotPass', displayName: {}, messages:req.flash('userNotFound'), id:GetUserID(req)});
}

export function ProcessForgotPassPage(req,res,next){
    userModel.findOne({address: req.body.email}, function (err, user) {
        if (err) {
            console.error(err);
            res.end(err);
        } 
        
        else if(!user){
            req.flash('userNotFound', 'Hmm.. that email does not exist in our system. Please try again!');
            return res.redirect('/forgotPass');
        }
        else {
            let id = user._id;
            let updatedUser = userModel({
                _id: id,
                password: req.body.newPassword,
            });

            userModel.updateOne({_id:id }, updatedUser, (err) => {
                if(err){
                    console.error(err);
                    res.end(err);
                }
            })

            userModel.findByUsername(user.username, (err, userAlt) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                } 
                
                else {
                    userAlt.setPassword(req.body.newPassword, function (err) {
                        if (err) {
                            console.error(err);
                            res.end(err);
                        } 
                        
                        else {
                            console.log("changed");
                            userAlt.save();
                            res.redirect('/logout');
                        }
                    });
                }
        
            });
    }});  

}

export function DisplayCodePage(req,res,next){
    res.render('index', {title: 'Get your code', page: 'code', displayName: UserDisplayName(req), messages:req.flash('codeSent'), id:GetUserID(req)});
}

export function DisplayEnterCodePage(req,res,next){
    res.render('index', {title: 'Enter your code', page: 'enterCode',id:GetUserID(req), displayName: UserDisplayName(req), code:req.flash('code'), messages:req.flash('invalidCode'), codeSent:req.flash('codeSent')});
}


export function SendCodeEmail(req,res,next){
    var randomNumber =  Math.floor(1000 + Math.random() * 9000);
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

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
        
    codeArray[0] = randomNumber;
    req.flash('code',`${randomNumber}`);
    req.flash('codeSent','A code has been sent to your email. Please enter it below.')
    return res.redirect('/enterCode');
}


export function ProcessCodePage(req,res,next){
    if(req.body.code !== req.body.val) {
        req.flash('invalidCode', 'Invalid code. Please try again!');
        return res.render('index', {title: 'Enter your code', page: 'enterCode', displayName: {}, code:codeArray[0], messages:req.flash('invalidCode')});
    } 
    
    else{
        res.redirect('/forgotPass');
    }

}