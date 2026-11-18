import {
  BadReqException,
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/app.exceptions.js";
import { ProviderEnum } from "../../common/enum/user.enum.js";
import { encryptValue } from "../../common/security/encryption.js";
import { verifyGoogleIdToken } from "../../common/security/google.js";
import { compareHashedValue, hashValue } from "../../common/security/hash.js";
import { generateAccessToken } from "../../common/security/token.js";
import { createNewDoc, findOneDoc } from "../../DB/model/db.repo.js";
import { userModel } from "../../DB/model/user.model.js";

export async function signup(userData) {
  const { email } = userData;
  const existingEmail = await findOneDoc({
    model: userModel,
    filter: { email },
  });
  if (existingEmail) {
    throw ConflictException();
  }
  userData.password = await hashValue({ value: userData.password });
  if(userData.phone){
    userData.phone = encryptValue({data: userData.phone , key: "secret key 123"});
  }
  return createNewDoc({ model: userModel, data: userData });
}

export async function signin({ email, password }) {
  const user = await findOneDoc({ model: userModel, filter: { email } });
  // google users have no password, so they can't login with email/password
  if (!user || user.provider !== ProviderEnum.LOCAL) {
    throw NotFoundException({ errMsg: "INVALID EMAIL OR PASSWORD" });
  }
  const isPasswordMatch = await compareHashedValue({
    value: password,
    encValue: user.password,
  });
  if (!isPasswordMatch) {
    throw NotFoundException({ errMsg: "INVALID EMAIL OR PASSWORD" });
  }
  return { accessToken: generateAccessToken(user) };
}

// idToken comes from body
export async function loginWithGoogle({ idToken }) {
  // 1. verify idToken and get user info from google
  const payload = await verifyGoogleIdToken(idToken);
  if (!payload.email_verified) {
    throw BadReqException({ errMsg: "Google email is not verified" });
  }
  // 2. check user existence
  let user = await findOneDoc({
    model: userModel,
    filter: { email: payload.email },
  });
  // 3. if exists >> return token
  // 4. if not >> create user then return token
  if (!user) {
    const fullName = (payload.name || "").trim().split(" ");
    const firstName = (payload.given_name || fullName[0] || "User").slice(0, 20);
    const lastName = (
      payload.family_name || fullName.slice(1).join(" ") || firstName
    ).slice(0, 20);
    [user] = await createNewDoc({
      model: userModel,
      data: {
        firstName,
        lastName,
        email: payload.email,
        provider: ProviderEnum.GOOGLE,
        confirmEmail: true,
        profilePicPath: payload.picture,
      },
    });
  }
  return { accessToken: generateAccessToken(user) };
}
