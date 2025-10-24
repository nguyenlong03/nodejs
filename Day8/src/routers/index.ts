import Express  from "express";
import productRouter from "./product";
import userRouter from "./user";

const router = Express.Router();
// router users
router.use("/users", userRouter);
// router products
router.use("/products", productRouter);

export default router;