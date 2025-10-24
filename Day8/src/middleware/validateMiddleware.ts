import { ZodType, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

interface ValidationSchemas {
  params?: ZodType<any, any>;
  body?: ZodType<any, any>;
  query?: ZodType<any, any>;
}

export const validate =
  (schemas: ValidationSchemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allIssues: ZodError['issues'] = []; //
      const validatedData: { params?: any; body?: any; query?: any } = {};

      if (schemas.body) {
        const result = await schemas.body.safeParseAsync(req.body);
        if (!result.success) allIssues.push(...result.error.issues);
        else validatedData.body = result.data;
      }

      if (allIssues.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data',
          errors: allIssues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }

      (req as any).validatedData = validatedData;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
