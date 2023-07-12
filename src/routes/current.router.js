import { Router } from "express";
import ViewsController from "../controllers/views.controllers.js";

const router = Router();
const viewsController = new ViewsController();

router.get('/current', viewsController.currentRender);

export default router;