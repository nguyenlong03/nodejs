
import User from "../models/user.model";

// fillter email database
export const findOneEmail =async(email:string)=>{
    return await User.findOne({where : {email}})
}
// create users
export const creatUser = async (full_name:string , email:string, password: string, phone:string)=>{
   const existingUser = await findOneEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }
   return await User.create({full_name ,email ,password , phone});
}
// login user
export const loginUser = async(email:string)=>{
return await User.findOne({where : {email}})
}