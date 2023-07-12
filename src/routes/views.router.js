import { Router } from "express";
import ViewsController from "../controllers/views.controllers.js";
import { adminSession, privateAcces, publicAcces } from "../middlewares/middlewareAccess.js";

const router = Router();
const viewsController = new ViewsController();


router.get('/admin', adminSession, viewsController.adminRender);
router.get('/', privateAcces, viewsController.homeRender);
router.get('/current', privateAcces ,viewsController.currentRender);
router.get('/carts/:cid', privateAcces, viewsController.cartRender);
router.get('/product/:pid', privateAcces, viewsController.productRender);
router.get('/products', privateAcces, viewsController.productsRender);
router.get('/chat', privateAcces, viewsController.chatRender);
router.get('/register', publicAcces, viewsController.registerRender);
router.get('/login', publicAcces, viewsController.loginRender);

export default router;

