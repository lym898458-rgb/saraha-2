import dotenv from "dotenv";
import path from "node:path";

dotenv.config({path: path.resolve("./.env.dev")});

export const PORT = Number(process.env.PORT) || 3000;
export const ATLAS_URI = process.env.ATLAS_URI;
export const ENCRYPYION_KEY = process.env.ENCRYPYION_KEY;
export const SALT_ROUND = Number(process.env.SALT_ROUND);
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:4200";
