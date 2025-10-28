import Express  from "express";
import { getProducts , productDetail } from "../controllers/productList";
;

const productRouter = Express.Router();
productRouter.get("/" , getProducts);
productRouter.get("/:id", productDetail);

// tạo sản phẩm mới (chỉ admin)


export default productRouter;