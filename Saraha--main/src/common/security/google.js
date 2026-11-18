import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../../config/config.js";
import { AppError } from "../exceptions/app.error.js";

const client = new OAuth2Client();

// returns { email, name, given_name, family_name, picture, email_verified, sub }
export async function verifyGoogleIdToken(idToken) {
  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
  } catch {
    throw new AppError("Invalid Google token", 401);
  }
  return ticket.getPayload();
}
