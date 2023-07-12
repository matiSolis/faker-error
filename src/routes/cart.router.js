import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";

const router = Router();
const cartController = new CartController();

router.get('/', cartController.getAllCarts);
router.get('/:cid', cartController.getCartById);
router.get('/:cid/detail', cartController.getDetailsInCart);
router.post('/', cartController.createNewCart);
router.post('/:cid/products/:pid', cartController.addProductInCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantity);
router.put('/:cid', cartController.addProductsToCart);
router.post('/:cid/purchase', cartController.purchaseCart);
router.delete('/:cid', cartController.clearCart);

export default router;