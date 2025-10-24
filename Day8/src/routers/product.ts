import Express  from "express";
import { getProducts } from "../controllers/productList";

const productRouter = Express.Router();
productRouter.get("/", getProducts);

export default productRouter;