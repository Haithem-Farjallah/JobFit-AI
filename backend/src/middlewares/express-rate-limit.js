import { rateLimit } from "express-rate-limit";
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 4, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipFailedRequests: true, // Do not count failed requests (status >= 400)
});
