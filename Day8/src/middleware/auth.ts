import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import {config} from "../config/envConfig"

// verifytoken
export const verifyToken =  (req: Request , res : Response , next : NextFunction)=>{
    try {
         // lấy ra token
    const authenHeader = req.headers["authorization"]
    const token = authenHeader && authenHeader.split(" ")[1]
    if (!token) {
       return res.status(401).json({
            message : "not token"
        })
    }
    // jwt checkuser 
    jwt.verify(token , config.TOKEN , async (err , decodeUesr: any )=>{
        if(err){
          return  res.status(403).json({
                message : "token expired"
            })
        }
        const user = await User.findByPk(decodeUesr.id,{
            attributes: {exclude:["password"]}
        })
        if (!user) {
            return res.status(404).json({
                message : "user does not exist"
            })
            
        }
        (req as any).user =user
        next()
    } )
    } catch (error) {
        next(error)
    }
  


}

// check quyền 
export const checkAdmin = async (req: Request , res:Response , next : NextFunction)=>{
     try {
       const user = (req as any).user
        if (!user) {
           return res.json({
            message:"not logged in or invalid token"
           });
        }
        if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied, only admin allowed",
    });
  }
        next()
     } catch (error) {
        next(error)
     }
}

