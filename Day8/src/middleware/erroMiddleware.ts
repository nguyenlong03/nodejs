import { Request, Response, NextFunction } from "express";
import { config } from "../config/envConfig";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
    stack: config.NODE_ENV === "production" ? undefined : err.stack,
  });
};


