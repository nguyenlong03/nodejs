import Express  from "express";
import productRouter from "./product.router";
import userRouter from "./user.router";
import asyncMiddleware from "../middleware/asyncMiddleware";

const router = Express.Router();
// router users
router.use("/users",asyncMiddleware(userRouter) );
// router products
router.use("/products",asyncMiddleware(productRouter));

export default router;