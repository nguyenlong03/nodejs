import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { asyncMiddleware } from "../middleware/asyncMiddleware";

interface ValidationSchemas {
  params?: ZodType<any, any>;
  body?: ZodType<any, any>;
  query?: ZodType<any, any>;
}

// Middleware validate Zod + asyncMiddleware
export const validate =
 (payload: ValidationSchemas) =>
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const allIssues: ZodError["issues"] = [];
    const validatedData: { params?: any; body?: any; query?: any } = {};

    //  Validate body
    if (payload.body) {
      const result = await payload.body.safeParseAsync(req.body);
      if (!result.success) allIssues.push(...result.error.issues);
      else validatedData.body = result.data;
    }

    //  Validate params
    if (payload.params) {
      const result = await payload.params.safeParseAsync(req.params);
      if (!result.success) allIssues.push(...result.error.issues);
      else validatedData.params = result.data;
    }

    //  Validate query
    if (payload.query) {
      const result = await payload.query.safeParseAsync(req.query);
      if (!result.success) allIssues.push(...result.error.issues);
      else validatedData.query = result.data;
    }

    //  Nếu có lỗi -> trả về 400
    if (allIssues.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: allIssues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    // Gắn dữ liệu đã validate vào request
    (req as any).validatedData = validatedData;
    next();
  });
