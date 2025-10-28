import {z} from "zod";

export const registerSchema  = z.object({
   username : z.string().min(3,"Phải có ít nhất 3 ký tư"),
   email: z.string().email("Email không hợp lệ"),
   password : z.string().min(8,"Phải có ít nhất 8 ký tự")
            .regex(/[0-9]/ , "phải có ít nhất 1 chữ số ")
            .regex(/[A-Z]/, "Phải có ít nhất 1 chữ Hoa ")
            .regex(/[!@#$%^&*(){}|":<>]/ , " phải có ít nhất 1 ký tự đặc biệt")
})

export const loginSchema = z.object({
    username : z.string().min(3 ,  "phải có ít nhất 3 ký tự"),
    password : z.string().min(8 , "phải có ít nhất 8 ký tự")
})
export const forgotPasswordSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
});