import { Router } from "express";
import SessionController from "../controllers/session.controllers.js";

const router = Router();
const sessionController = new SessionController();

router.post('/register',  sessionController.register);
router.post('/login', sessionController.login);
router.get('/failregister', sessionController.failRegister);
router.get('/faillogin', sessionController.failLogin);
router.get('/logout', sessionController.logout);
router.get('/github', sessionController.github);
router.get('/githubcallback', sessionController.githubCallbacks);

export default router;