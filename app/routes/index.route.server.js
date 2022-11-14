import { Router } from "express";
import { AuthGuard } from "../utils/index.js";
import { DisplayHomePage, DisplayUpdatePage, 
    ProcessUpdatePage, ProcessPasswordPage, 
    DisplayPasswordPage,DisplayForgotPassPage, ProcessForgotPassPage, 
    DisplayCodePage, SendCodeEmail, 
    ProcessCodePage, DisplayEnterCodePage} from "../controllers/index.controller.server.js";

const router = Router();

router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/update/:id',DisplayUpdatePage);

router.post('/update/:id',ProcessUpdatePage);
router.get('/password/:id',AuthGuard,DisplayPasswordPage);
router.post('/password/:id',AuthGuard,ProcessPasswordPage);
router.get('/forgotPass',DisplayForgotPassPage);
router.post('/forgotPass',ProcessForgotPassPage);
router.get('/generateCode', DisplayCodePage);
router.get('/enterCode',DisplayEnterCodePage);
router.post('/generateCode', SendCodeEmail);
router.post('/enterCode', ProcessCodePage);


export default router;