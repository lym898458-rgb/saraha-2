// DTOs = the contracts between FE and BE (validation layer on the BE side)
import { z } from "zod";
import { GenderEnum } from "../../common/enum/user.enum.js";

const emailField = z.email().trim().toLowerCase();

// contract of signup
export const signupDto = z.object({
  firstName: z.string().trim().min(2).max(20),
  lastName: z.string().trim().min(2).max(20),
  email: emailField,
  password: z.string().min(8), // regex
  phone: z.string().trim().optional(),
  gender: z
    .number()
    .refine((value) => Object.values(GenderEnum).includes(value), {
      message: "Invalid gender",
    })
    .optional(),
});

// contract of signin
export const signinDto = z.object({
  email: emailField,
  password: z.string().min(8),
});

// contract of login with google
export const loginWithGoogleDto = z.object({
  idToken: z.string().min(1),
});
