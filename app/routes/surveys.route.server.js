import { Router } from "express";
import { AuthGuard } from "../utils/index.js";
import {DisplaySurveyList, DisplayCreateSurveyPage, ProcessSurveyCreatePage,DisplaySurveyEditPage, ProcessSurveyEditPage,
DisplaySurveyPage, ProcessSurveyPage, DisplaySurveyStatsPage, ProcessSurveyDelete, ProcessSurveyStatsPage} from "../controllers/surveys.controller.server.js";

const router = Router();

// Display survey list
router.get('/surveys/list', DisplaySurveyList);

// Display survey create page
router.get('/surveys/create', AuthGuard, DisplayCreateSurveyPage);

// Process survey create page
router.post('/surveys/create', ProcessSurveyCreatePage);

// Display survey edit page
router.get('/surveys/edit/:id', AuthGuard, DisplaySurveyEditPage);

// Process survey edit page
router.post('/surveys/edit/:id', ProcessSurveyEditPage);

// Display main survey page where an anonymous user can complete and submit the survey
router.get('/surveys/view/:id', DisplaySurveyPage);

// Process main survey page
router.post('/surveys/view/:id', ProcessSurveyPage);

// Display survey statistics page
router.get('/surveys/stats/:id', AuthGuard, DisplaySurveyStatsPage);

// Process survey statistics page i.e. the statistics are emailed to the user
router.post('/surveys/stats/:id',ProcessSurveyStatsPage);

// Process survey delete
router.get('/survey-delete/:id', ProcessSurveyDelete);


export default router;