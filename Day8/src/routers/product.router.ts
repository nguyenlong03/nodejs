import Express  from "express";
import { createProduct, getProducts , productDetail , deleteProduct, updateProduct } from "../controllers/product.controller";
import { verifyToken } from "../middleware/authMiddleware";
import {checkAdmin} from "../middleware/authMiddleware"
const productRouter = Express.Router();
productRouter.get("/",verifyToken ,getProducts);
productRouter.get("/:id",verifyToken,productDetail);

// product crud
productRouter.post("/",verifyToken,checkAdmin,createProduct)
productRouter.post("/delete/:id" ,verifyToken,checkAdmin, deleteProduct)
productRouter.post("/update/:id",verifyToken, updateProduct)

export default productRouter;