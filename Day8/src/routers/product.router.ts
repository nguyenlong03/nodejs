import Express  from "express";
import { createProduct, getProducts , productDetail } from "../controllers/product.controller";
import { verifyToken } from "../middleware/authMiddleware";
import {checkAdmin} from "../middleware/authMiddleware"

const productRouter = Express.Router();
productRouter.get("/",verifyToken ,checkAdmin,getProducts);
productRouter.get("/:id",verifyToken,checkAdmin,productDetail);

// tạo sản phẩm mới (chỉ admin)
productRouter.post("/",verifyToken,checkAdmin,createProduct)


export default productRouter;