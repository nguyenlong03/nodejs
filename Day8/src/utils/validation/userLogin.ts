import { z} from "zod"
import { validateEmail, validtaLogin } from './baset';

export const loginSchema = z.object({
    email : z.string(),
    password : z.string()
}).superRefine((data , ctx)=>{
   const {email , password} = data
   validateEmail(email , ctx)
   validtaLogin(password,ctx)
})

export  type loginInput = z.infer<typeof loginSchema>