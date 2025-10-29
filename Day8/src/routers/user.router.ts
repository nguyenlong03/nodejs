import Express  from "express";
import {  createUser , loginUser} from "../controllers/user.controller";
import { validate } from "../middleware/validateMiddleware";
import { registerUserSchema  } from "../utils/validation/userRegister"
import { loginSchema } from "../utils/validation/userLogin";
import { logoutUser } from "../controllers/user.controller";
import {getUser} from "../controllers/user.controller"
import { refreshToken } from '../controllers/user.controller'


const userRouter = Express.Router();
// users router
userRouter.get("/", getUser)
userRouter.post("/register", validate({ body: registerUserSchema }), createUser   );
userRouter.post("/login", validate({body:loginSchema}),loginUser);
userRouter.post("/refresh-token", refreshToken);
userRouter.post("/logout", logoutUser);

export default userRouter;