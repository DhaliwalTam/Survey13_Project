import { Router } from "express";
import { AuthGuard } from "../utils/index.js";
import {DisplaySurveyList, DisplayCreateSurveyPage, ProcessSurveyCreatePage,DisplaySurveyEditPage, ProcessSurveyEditPage,
DisplaySurveyPage, ProcessSurveyPage, DisplaySurveyStatsPage, ProcessSurveyDelete} from "../controllers/surveys.controller.server.js";

const router = Router();

router.get('/surveys/list', DisplaySurveyList);
router.get('/surveys/create', AuthGuard, DisplayCreateSurveyPage);
router.post('/surveys/create', AuthGuard, ProcessSurveyCreatePage);
router.get('/surveys/edit/:id', AuthGuard, DisplaySurveyEditPage);
router.post('/surveys/edit/:id', AuthGuard, ProcessSurveyEditPage);
router.get('/surveys/view/:id', AuthGuard, DisplaySurveyPage);
router.post('/surveys/view/:id', AuthGuard, ProcessSurveyPage);
router.get('/surveys/stats/:id', AuthGuard, DisplaySurveyStatsPage);
router.get('/survey-delete/:id', AuthGuard, ProcessSurveyDelete);



export default router;