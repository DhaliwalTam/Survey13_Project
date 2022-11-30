import { Router } from "express";
import { AuthGuard } from "../utils/index.js";
import { DisplayHomePage, DisplayUpdatePage, 
    ProcessUpdatePage, ProcessPasswordPage, 
    DisplayPasswordPage,DisplayForgotPassPage, ProcessForgotPassPage, 
    DisplayCodePage, SendCodeEmail, 
    ProcessCodePage, DisplayEnterCodePage, DisplayAboutPage} from "../controllers/index.controller.server.js";

const router = Router();

// Display home page
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);

// Display profile update page
router.get('/update/:id',AuthGuard,DisplayUpdatePage);

// Process profile update page
router.post('/update/:id',ProcessUpdatePage);

// Display password change page
router.get('/password/:id',AuthGuard,DisplayPasswordPage);

// Process password change page
router.post('/password/:id',AuthGuard,ProcessPasswordPage);

// Display forgot password page
router.get('/forgotPass',DisplayForgotPassPage);

// Process forgot password page
router.post('/forgotPass',ProcessForgotPassPage);

// Display pages where a random code is generated to be sent to the user's email if he/she forgets their password
router.get('/generateCode',DisplayCodePage);
router.get('/enterCode',DisplayEnterCodePage);

// Process pages where the code generated is sent and the user can input the code that has been sent
router.post('/generateCode', SendCodeEmail);
router.post('/enterCode', ProcessCodePage);

// Display the about page
router.get('/about',DisplayAboutPage);


export default router;