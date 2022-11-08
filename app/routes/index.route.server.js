import { Router } from "express";
import {DisplayHomePage} from "../controllers/index.controller.server.js";

const router = Router();

router.get('/', DisplayHomePage);


export default router;