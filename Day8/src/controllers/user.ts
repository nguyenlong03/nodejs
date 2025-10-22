import { User } from "../models/models"
import { NextFunction, Request, Response } from "express";

export const getUser = async(req: Request, res: Response , next: NextFunction) => { 
    try {
    
        const getUses = await User.findAll({
            attributes: { exclude: ["password", "refresh_token", "reset_token"] }
        });
       
        res.status(200).json(getUses);
    } catch (error) {
       next(error);
    }
};