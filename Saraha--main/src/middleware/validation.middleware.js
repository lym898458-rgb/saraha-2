import { AppError } from "../common/exceptions/app.error.js";

// 2 params: data (req.body), contract (dto) >> fit >> next
// throw AppError(400) if it doesn't fit
export function validationMiddleware(dto) {
  return function (req, res, next) {
    const { success, data, error } = dto.safeParse(req.body);
    if (!success) {
      const messageArr = error.issues.map(
        (issue) => `${issue.path.join(".") || "body"}: ${issue.message}`,
      );
      throw new AppError(messageArr.join(", "), 400);
    }
    // parsed data: trimmed / lowercased, and unknown keys are stripped
    req.body = data;
    next();
  };
}
