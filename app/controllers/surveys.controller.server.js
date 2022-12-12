import responsesModel from '../models/responses.js'
import surveyModel from '../models/survey.js';
import nodemailer from "nodemailer";
import userModel from '../models/user.js';
import { UserDisplayName } from '../utils/index.js';
import { GetUserID } from "../utils/index.js";
import { GetUsername } from "../utils/index.js";

var today = new Date();


//display surveyLists
export function DisplaySurveyList(req, res, next) {
    var publisher = UserDisplayName(req);

    if (publisher !== "") {
        userModel.find({
            displayName: publisher
        }, function (err, user) {
            if (err) {
                console.error(err);
                res.end(err);
            } else {
                var userID = user[0]._id;
                surveyModel.find({
                    publisherID: userID
                }, function (err, surveyCollection) {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }

                    res.render('index', {
                        title: 'My Surveys',
                        page: 'surveys/list',
                        surveys: surveyCollection,
                        displayName: UserDisplayName(req),
                        id:GetUserID(req), 
                        username: GetUsername(req)
                    });
                });
            }
        })
    } 
    
    else {
        surveyModel.find(function (err, surveyCollection) {
            if (err) {
                console.error(err);
                res.end(err);
            }
    
            res.render('index', {
                title: 'Survey List',
                page: 'surveys/list',
                surveys: surveyCollection,
                displayName: UserDisplayName(req),
                id:GetUserID(req),
                username: GetUsername(req)
            });
        })
    }
}

//loads create a survey page
export function DisplayCreateSurveyPage(req, res, next) {
    res.render('index', {
        title: 'Create a Survey',
        page: 'surveys/create',
        displayName: UserDisplayName(req),
        id:GetUserID(req),
        username: GetUsername(req)
    });
}

//  processes survey create page
export function ProcessSurveyCreatePage(req, res, next) {
    var publisher = UserDisplayName(req);

    userModel.find({ displayName: publisher }, function (err, user) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        else {
            var newSurvey = surveyModel({
                createdBy: req.body.createdBy,
                publisherID: user[0]._id,
                template: req.body.oTypeList,
                title: req.body.title,
                createdOn: today,
                active: req.body.active,
                expiry: req.body.expire,
                attempts: 0,
                questions: req.body.questionArray,
                options: req.body.optionsArray,
                optionType: req.body.optionTypeArray
            });

            surveyModel.create(newSurvey, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                };

            })
            res.redirect('/surveys/list');
        }
    })
}

// Displays the page where the user can edit a survey
export function DisplaySurveyEditPage(req, res, next) {
    var id = req.params.id;

    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: `Edit: ${survey.title}`,
            page: 'surveys/edit',
            survey: survey,
            displayName: UserDisplayName(req),
            id:GetUserID(req),
            username: GetUsername(req)
        });
    });
}

// processes survey edit page/survey update page
export function ProcessSurveyEditPage(req,res,next){
    var id = req.params.id;
    var defaultOptions = [];

    var updatedSurvey = surveyModel({
        _id: req.body.id,
        createdBy: req.body.createdBy,
        template: req.body.oTypeList,
        title: req.body.title,
        createdOn: req.body.createdOn,
        expiry: req.body.expiringOn,
        attempts: req.body.attempts,
        questions: [],
        options: []
    });

    for(var i = 0; i < req.body.ques.length; i++){
        if(req.body.ques[i] !== ""){
            updatedSurvey.questions.push(req.body.ques[i]);
        }

        if(req.body.ques[i] == "undefined" || req.body.ques[i] == null ){
            const index = updatedSurvey.questions.indexOf(req.body.ques[i]);
            if (index > -1) {
                updatedSurvey.questions.splice(index, 1);
            }
        }

        if(req.body[`choices${i+1}`] == ""){
            updatedSurvey.options.push([""]);
            defaultOptions.push([""]);
        }

        else if(req.body[`choices${i+1}`] !== ""){
            updatedSurvey.options.push(req.body[`choices${i+1}`]);
            defaultOptions.push(req.body[`options${i+1}`]);
            console.log(req.body[`choices${i+1}`])
        }

        else if(req.body[`choices${i+1}`] == "undefined" || req.body[`choices${i+1}`] == null){
            updatedSurvey.options[i] = [];
            defaultOptions[i] = [];
        }
    }


    var a = defaultOptions.toString();
    var b = updatedSurvey.options.toString();
    
    if (a !== b) {
        responsesModel.deleteMany({surveyID: id}, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
        });

        updatedSurvey.attempts = 0;
    }
    
    surveyModel.updateOne({_id: id}, updatedSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/surveys/list');
    });
}

// processes deletion of a selected survey
export function ProcessSurveyDelete(req, res, next) {
    var id = req.params.id;

    surveyModel.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
    })
        responsesModel.deleteMany({surveyID:id},(err)=>{
            if (err) {
                console.error(err);
                res.end(err);
            }
    
            res.redirect('/surveys/list');
        });
    
}

// displays the main survey page where anonymous users can complete a survey
export function DisplaySurveyPage(req, res, next) {
    var id = req.params.id;

    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: survey.title,
            page: 'surveys/view',
            survey: survey,
            displayName: UserDisplayName(req),
            id:GetUserID(req),
            username: GetUsername(req)
        });
    });
}

// processes the main survey once a user clicks 'Submit'
export function ProcessSurveyPage(req, res, next) {
    var text = [];
    
    var newSubmission = responsesModel({
        surveyID: req.body.surveyID,
        surveyor: req.body.surveyorName,
        surveyorEmail: req.body.surveyorEmail,
        template: req.body.oTypeList,
        title: req.body.surveyTitle,
        createdOn: req.body.createdOn,
        expiry: req.body.expiringOn,
        surveyAuthor: req.body.createdBy,
        questions: [],
        responses: [],
        comments: [],
        textResponses: []
    })

    
    for(var i = 0; i < req.body.ques.length; i++){
        if(req.body.ques[i] !== "undefined"){
            newSubmission.questions.push(req.body.ques[i]);
        }

        if(req.body.ques[i] == "undefined" || req.body.ques[i] == null ){
            const index = newSubmission.questions.indexOf(req.body.ques[i]);
            if (index > -1) {
                newSubmission.questions.splice(index, 1);
            }
        }

        if(req.body[`choices${i+1}`] == "undefined" || req.body[`choices${i+1}`] == null){
            const index = newSubmission.responses.indexOf(req.body[`choices${i+1}`]);
            if (index > -1) {
                newSubmission.responses.splice(index, 1);
            }
        }
        
        
        else if(req.body[`choices${i+1}`] !== ""){
            newSubmission.responses.push(req.body[`choices${i+1}`].toString());
        }

        if(req.body[`question${i+1}`] == "undefined" || req.body[`question${i+1}`] == null){
            const index = text.indexOf(req.body[`question${i+1}`]);
            if (index > -1) {
                text.splice(index, 1);
            }
        }
       
        else if((req.body[`question${i+1}`] !== "undefined" || req.body[`question${i+1}`] !== null) && req.body[`question${i+1}`] !== ""){
            var str = req.body[`question${i+1}`];
            var newStr = `Question ${i+1}: ${str}`;
            newSubmission.responses.push(req.body[`question${i+1}`]);
            text.push(newStr);
        }

        if(req.body[`text${i+1}`] == "undefined" || req.body[`text${i+1}`] == null){
            const index = text.indexOf(req.body[`text${i+1}`]);
            if (index > -1) {
                text.splice(index, 1);
            }
        }
       
        else if((req.body[`text${i+1}`] !== "undefined" || req.body[`text${i+1}`] !== null) && req.body[`text${i+1}`] !== ""){
            var str = req.body[`text${i+1}`];
            var newStr = `Question ${i+1}: ${str}`;
            text.push(newStr);
        }
    }
    
    newSubmission.textResponses.push(text);
    newSubmission.comments.push(req.body.comments);
    responsesModel.create(newSubmission, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
    })
    
    // var transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'survey13stats@gmail.com',
    //         pass: 'fndekejdersasehc'
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    // var mailOptions = {
    //     from: 'survey13stats@gmail.com',
    //     to:  `${req.body.surveyorEmail}`,
    //     subject: `Thank you for completing the survey!`,
    //     text: `Hello ${req.body.surveyorName},\n\nOn behalf of the entire team at Survey13, we wanted to thank you for completing the survey, "${req.body.surveyTitle}". Below is a brief summary of your survey:\n\nQuestions: \n`
    // };

    // for(var i = 0;i < newSubmission.questions.length; i++){
    //     mailOptions.text += `${i+1}. ${newSubmission.questions[i]}\n`;
    // }

    // for(var i = 0; i < newSubmission.responses.length; i++){
    //     mailOptions.text += `Answer to question ${i+1}: ${newSubmission.responses[i]}\n`;
    // }

    // mailOptions.text += `Comments: ${req.body.comments}\nWe hope you enjoyed your experience on Survey13.\n As a token of gratitude, an Amazon e-gift card will be emailed to your shortly!\n Hoping to have you visit us again to complete another survey.\n\nRegards,\nThe Survey13 Team`;

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
            
    //     }
    // });
    
    surveyModel.findOne({_id: newSubmission.surveyID}, function(err,survey){
        if(err){
            console.error(err);
            res.end(err);
        }
        
        else{
            surveyModel.updateOne({_id: newSubmission.surveyID}, {attempts: ++survey.attempts}, (err) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                };
            })
            
        }
    })
    res.redirect('/surveys/list');
}

// Displays the survey statistics page for a given survey
export function DisplaySurveyStatsPage(req, res, next) {
    var id = req.params.id;
    var question1Array = {};
    
    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        else {
            var survID = survey._id;
            responsesModel.find({ surveyID: survID }, function (err, responseCollection) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }

                for (var i = 0; i < survey.questions.length; i++) {
                    question1Array[`question${i + 1}`] = `${survey.questions[i]}`;
                    question1Array[`Responsesquestion${i + 1}`] = "";
                }

                for (var i = 0; i < responseCollection.length; i++) {
                    for (var j = 0; j < survey.questions.length; j++) {
                        question1Array[`Responsesquestion${j + 1}`] += `${responseCollection[i].responses[j]},`;
                    }
                }

                res.render('index', {
                    title: 'Survey Stats',
                    page: 'surveys/stats',
                    responses: responseCollection,
                    survey: survey,
                    question1Array: question1Array,
                    
                    displayName: UserDisplayName(req),
                    id:GetUserID(req), 
                    username: GetUsername(req)
                });
            })
        }
    });
}

// Emails the survey statistics to user's registered email address
export function ProcessSurveyStatsPage(req, res, next) {
    var publisher = UserDisplayName(req);
    var mailOptions;

    userModel.find({
        displayName: publisher
    }, function (err, user) {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            var userEmail = user[0].address;
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

            if(req.body.freeTextExist){
                mailOptions = {
                    from: 'survey13stats@gmail.com',
                    to: `${userEmail}`,
                    subject: `Data for survey titled: ${req.body.surveyTitle}`,
                    text: `Total number of respondents:${req.body.numberOfRespondents}\nQuestions:\n${req.body.questions}\nAnswers with percentage of responses:\nN/A\n\nFree-text Responses:\n${req.body.freeTextResponses.join('\n')}`
                };
            }

            else if(!req.body.freeTextExist){
                mailOptions = {
                    from: 'survey13stats@gmail.com',
                    to: `${userEmail}`,
                    subject: `Data for survey titled: ${req.body.surveyTitle}`,
                    text: `Total number of respondents:${req.body.numberOfRespondents}\nQuestions:\n${req.body.questions}\nAnswers with percentage of responses:\n${req.body.percentChosen}`
                };
            }   


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })
}