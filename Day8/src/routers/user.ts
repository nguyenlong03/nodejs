import Express  from "express";
import {  createUser , loginUser} from "../controllers/user";
import { validate } from "../middleware/validateMiddleware";
import { registerUserSchema  } from "../utils/validation/userRegister"
import { loginSchema } from "../utils/validation/userLogin";


const userRouter = Express.Router();
// users router
userRouter.post("/register", validate({ body: registerUserSchema }), createUser   );
userRouter.post("/login", validate({body:loginSchema}),loginUser);

export default userRouter;