import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../config/config.js";
import { toSeconds } from "../utils/time.js";

export function generateAccessToken(user) {
  const payload = {
    name: user.username,
    email: user.email,
    sub: String(user._id),
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: toSeconds(1, "h"),
  });
  // todo: refresh token >> refresh token
}
