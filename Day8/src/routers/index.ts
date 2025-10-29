import Express  from "express";
import productRouter from "./product.router";
import userRouter from "./user.router";

const router = Express.Router();
// router users
router.use("/users", userRouter);
// router products
router.use("/products", productRouter);

export default router;