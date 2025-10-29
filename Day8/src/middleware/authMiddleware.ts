import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import { config } from '../config/envConfig'
import { asyncMiddleware } from './asyncMiddleware'



export const verifyToken = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  // Lấy token từ header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401);
    throw new Error("Access token missing");
  }

  //  Dùng Promise để verify JWT
  const decodeUser: any = await new Promise((resolve, reject) => {
    jwt.verify(token, config.TOKEN, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });

  // Tìm user theo id trong payload
  const user = await User.findByPk(decodeUser.id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized: User not found");
  }

  (req as any).user = user;
  next();
});


// check quyền
export const checkAdmin = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    // Nếu chưa login hoặc token invalid
    if (!user) {
      res.status(401); // Unauthorized
      throw new Error("Not logged in or invalid token");
    }

    // Kiểm tra quyền admin
    if (user.role !== "admin") {
      res.status(403); // Forbidden
      throw new Error("Access denied, only admin allowed");
    }

    next();
  }
);

