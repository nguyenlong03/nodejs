import { User } from "../models/user.model"
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { RegisterUserInputs } from "../utils/validation/userRegister";
import jwt from "jsonwebtoken";
import {config} from "../config/envConfig"
import {loginInput} from "../utils/validation/userLogin"

export const getUser = async(req: Request, res: Response , next: NextFunction) => { 
   res.status(200).json({message: "Hello backend"});
};


export const createUser = async (req:Request, res:Response , next: NextFunction) => {
  try {
  const { full_name, email, password ,confirmPassword } = req.body as RegisterUserInputs;
  // kiểm tra user đã tồn tại
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "email already exists" });
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
      message: "Registered successfully",
    }); 
  } catch (error) {
    next(error);
}
}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as loginInput  ;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email does not exist" });

    if (!user.password)
      return res.status(500).json({ message: "Password hash not found for this user" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password is incorrect" });

    const token = jwt.sign({ id: user.id, role: user.role }, config.TOKEN, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login success",
      data: {
        id: user.id,
        email: user.email,
        token,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

