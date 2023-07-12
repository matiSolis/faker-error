import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:pid', productController.updateProductById);
router.delete('/:pid', productController.deleteProductById);
export default router;  