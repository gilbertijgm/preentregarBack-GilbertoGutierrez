import { Router } from "express";
import * as controller from "../controllers/carts.controllers.js";

const router = Router();

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.post('/:idCart/product/:idProd', controller.addProductToCart);

export default router;