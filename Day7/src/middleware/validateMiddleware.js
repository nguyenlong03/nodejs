import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    // Bảo vệ khi truyền sai schema (undefined / không phải Zod schema)
    if (!schema || typeof schema.safeParse !== "function") {
      throw new TypeError("Invalid schema passed to validate middleware");
    }
    const result = schema.safeParse(req.body);
    // Nếu dữ liệu không hợp lệ
    if (!result.success) {
      // Zod v4 sử dụng `issues` thay vì `errors`
      const issues = result.error?.issues || result.error?.errors || [];
      // Log lỗi để dễ debug
      console.log("Validation error:", issues);
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: issues.map((err) => ({
          field: Array.isArray(err.path) ? err.path[0] ?? "unknown" : "unknown",
          message: err.message,
        })),
      });
     
    }
    // Nếu hợp lệ thì gán data đã parse lại cho req.body
    req.body = result.data;
    return next();
  } catch (error) {
    console.error("Middleware validate lỗi:", error);
    // Nếu lỗi đến từ Zod
    if (error instanceof ZodError) {
      const issues = error.issues || error.errors || [];
      return res.status(400).json({
        success: false,
        message: "Lỗi xác thực dữ liệu",
        errors: issues.map((err) => ({
          field: Array.isArray(err.path) ? err.path[0] ?? "unknown" : "unknown",
          message: err.message,
        })),
      });
    }

    // Nếu là lỗi khác
    return res.status(600).json({
      success: false,
      message: "lỗi khác",
    });
  }
};
