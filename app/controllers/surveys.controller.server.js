import responsesModel from '../models/responses.js'
import surveyModel from '../models/survey.js';
import nodemailer from "nodemailer";

var today = new Date();

//displyas surveyLists
export function DisplaySurveyList(req, res, next) {
    surveyModel.find(function (err, surveyCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'My Surveys',
            page: 'surveys/list',
            surveys: surveyCollection,
            //displayName: UserDisplayName(req)
        });
    })
}

//loads create a survey page
export function DisplayCreateSurveyPage(req, res, next) {
    res.render('index', {
        title: 'Create Survey',
        page: 'surveys/create',
        //displayName: UserDisplayName(req)
    });
}



//next releases CodeFix: createdBy should accept the value of the username  who  is logged in.
// We should avoid hard coding the createdBy field.
//  proesses survey create page
export function ProcessSurveyCreatePage(req, res, next) {
    let newSurvey = surveyModel({
        createdBy: "Siddharth Verma",
        template: "Multiple Choice",
        title: req.body.title,
        createdOn: today,
        active: req.body.active,
        expiry: req.body.expire,
        questions: req.body.questionArray,
        options: req.body.optionsArray
    });
    
    
    surveyModel.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        
    })
}

export function DisplaySurveyEditPage(req, res, next) {
    let id = req.params.id;

    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'Edit Survey',
            page: 'surveys/edit',
            survey: survey,
            //displayName: UserDisplayName(req)
        });
    });


}
// processes survey edit page/survey update page
export function ProcessSurveyEditPage(req,res,next){
    let id = req.params.id;

    let updatedSurvey = surveyModel({
        _id: req.body.id,
        createdBy: req.body.createdBy,
        template: "Multiple Choice",
        title: req.body.title,
        createdOn: req.body.createdOn,
        expiry: req.body.expiringOn,
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

        if(req.body[`choices${i+1}`] !== ""){
            updatedSurvey.options.push(req.body[`choices${i+1}`]);
        }

        if(req.body[`choices${i+1}`] == "undefined" || req.body[`choices${i+1}`] == null){
            updatedSurvey.options[i] = [];
        }
    }
    
    surveyModel.updateOne({
        _id: id
    }, updatedSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/surveys/list');
    })
}

// processes deletion of selected survey
export function ProcessSurveyDelete(req, res, next) {
    let id = req.params.id;

    surveyModel.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/surveys/list');
    })
}

// displays the survey page
export function DisplaySurveyPage(req, res, next) {
    let id = req.params.id;

    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', {
            title: 'Complete Survey',
            page: 'surveys/view',
            survey: survey,
            //displayName: UserDisplayName(req)
        });
    });
}

// processes survey page
export function ProcessSurveyPage(req, res, next) {
    let newSubmission = responsesModel({
        surveyID: req.body.surveyID,
        surveyor: req.body.surveyorName,
        surveyorEmail: req.body.surveyorEmail,
        template: "Multiple Choice",
        title: req.body.surveyTitle,
        createdOn: req.body.createdOn,
        expiry: req.body.expiringOn,
        surveyAuthor: req.body.createdBy,
        questions: [],
        responses: []
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

        if(req.body[`choices${i+1}`] !== ""){
            newSubmission.responses.push(req.body[`choices${i+1}`]);
        }

        if(req.body[`choices${i+1}`] == "undefined" || req.body[`choices${i+1}`] == null){
            const index = newSubmission.responses.indexOf(req.body[`choices${i+1}`]);
            if (index > -1) {
                newSubmission.responses.splice(index, 1);
            }
        }
    }

    responsesModel.create(newSubmission, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
    })
    
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
        to:  `${req.body.surveyorEmail}`,
        subject: `Thank you for completing the survey!`,
        text: `Hello ${req.body.surveyorName},\n\nOn behalf of the entire team at Survey13, we wanted to thank you for completing the survey, "${req.body.surveyTitle}". Below is a brief summary of your survey:\n\nQuestions: \n`
    };

    for(var i = 0;i < newSubmission.questions.length; i++){
        mailOptions.text += `${i+1}. ${newSubmission.questions[i]}\n`;
    }

    for(var i = 0; i < newSubmission.responses.length; i++){
        mailOptions.text += `Answer to question ${i+1}: ${newSubmission.responses[i]}\n`;
    }

    mailOptions.text += '\nWe hope you enjoyed your experience on Survey13. Hoping to have you visit us again to complete another survey.\n\nRegards,\nThe Survey13 Team';

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    

    res.redirect('/surveys/list');
}

export function DisplaySurveyStatsPage(req, res, next) {
    let id = req.params.id;
    let respondents = 0;
    const counts = {};
    var question1Array = {};
    var responseArray = [];
    var element;
    
    surveyModel.findById(id, (err, survey) => {
        if (err) {
            console.error(err);
            res.end(err);
        }


        else {
            let survID = survey._id;
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
                    respondents: respondents,
                    counts: counts,
                    question1Array: question1Array,
                    responseArray: responseArray,
                    element: element,
                    //displayName: UserDisplayName(req)
                });
            })
        }
    });
}