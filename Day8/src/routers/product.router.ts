import Express  from "express";
import { createProduct, getProducts , productDetail , deleteProduct } from "../controllers/product.controller";
import { verifyToken } from "../middleware/authMiddleware";
import {checkAdmin} from "../middleware/authMiddleware"

const productRouter = Express.Router();
productRouter.get("/",verifyToken ,checkAdmin,getProducts);
productRouter.get("/:id",productDetail);

// tạo sản phẩm mới (chỉ admin)
productRouter.post("/",verifyToken,checkAdmin,createProduct)
productRouter.post("/:id" ,verifyToken,checkAdmin, deleteProduct)


export default productRouter;