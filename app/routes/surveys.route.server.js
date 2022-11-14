import { Router } from "express";
import { AuthGuard } from "../utils/index.js";
import {DisplaySurveyList, DisplayCreateSurveyPage, ProcessSurveyCreatePage,DisplaySurveyEditPage, ProcessSurveyEditPage,
DisplaySurveyPage, ProcessSurveyPage, DisplaySurveyStatsPage, ProcessSurveyDelete, ProcessSurveyStatsPage} from "../controllers/surveys.controller.server.js";

const router = Router();

router.get('/surveys/list', DisplaySurveyList);
router.get('/surveys/create', AuthGuard, DisplayCreateSurveyPage);
router.post('/surveys/create', ProcessSurveyCreatePage);
router.get('/surveys/edit/:id', AuthGuard, DisplaySurveyEditPage);
router.post('/surveys/edit/:id', ProcessSurveyEditPage);
router.get('/surveys/view/:id', DisplaySurveyPage);
router.post('/surveys/view/:id', ProcessSurveyPage);
router.get('/surveys/stats/:id', AuthGuard, DisplaySurveyStatsPage);
router.get('/survey-delete/:id', ProcessSurveyDelete);
router.post('/surveys/stats/:id',ProcessSurveyStatsPage);

export default router;