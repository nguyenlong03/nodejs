import { User } from "../models/user.model"
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { RegisterUserInputs } from "../utils/validation/userRegister";
import jwt, { JwtPayload } from "jsonwebtoken";
import {config} from "../config/envConfig"
import {loginInput} from "../utils/validation/userLogin"
import { error } from "console";
import { subscribe } from "diagnostics_channel";

export const getUser = async(req: Request, res: Response , next: NextFunction) => { 
   res.status(200).json({message: "Hello backend"});
};


export const createUser = async (req:Request, res:Response , next: NextFunction) => {
  try {
  const { full_name, email, password ,confirmPassword  } = req.body as RegisterUserInputs;
  // kiểm tra user đã tồn tại
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: "email already exists"
    });
  }
  // mã hóa mật khẩu
   const hashPassword = await bcrypt.hash(password, 10);
  // const hashedPassword = Number(password);

  // tạo user mới
   await User.create({
    full_name,
    email,
    password: hashPassword,
  });
  // trả về response
    res.status(201).json({
      success: true,
      message: "Registered successfully",
    }); 
  } catch (error) {
    next(error);
}
}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // lấy thông tin đăng nhập từ request body
    const { email, password } = req.body as loginInput;

    const user = await User.findOne({ where: { email } });
    // kiểm tra xem user có tồn tại không
    if (!user) return res.status(404).json({ 
      success: false,
      error: "Not Found",
      message: "Email does not exist" });
      // kiểm tra xem mật khẩu có đúng không
    if (!user.password)
      return res.status(500).json({ message: "Password hash not found for this user" });
  // so sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ 
      success: false,
      error: "Unauthorized",
      message: "Password is incorrect" });
    // tạo và ký JWT token
    const payload: JwtPayload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, config.TOKEN, { expiresIn: "1h" });

    // Lưu token vào cookie HttpOnly  
    // nếu không dùng cookie thì trả về token trong response body
    res.cookie("token", token, { httpOnly: true });
  // trả về response thành công
    res.status(200).json({
      success: true,
      message: "Login success",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    next(error);
  }
};


export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    res.clearCookie("token" , { httpOnly: true });
    res.status(200).json({ 
      success: true,
      message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}
