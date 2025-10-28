import Express  from "express";
import {  createUser , loginUser} from "../controllers/user";
import { validate } from "../middleware/validateMiddleware";
import { registerUserSchema  } from "../utils/validation/userRegister"
import { loginSchema } from "../utils/validation/userLogin";
import { logoutUser } from "../controllers/user";


const userRouter = Express.Router();
// users router
userRouter.post("/register", validate({ body: registerUserSchema }), createUser   );
userRouter.post("/login", validate({body:loginSchema}),loginUser);
userRouter.post("/logout", logoutUser);
export default userRouter;