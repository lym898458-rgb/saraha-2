import { Router } from "express";
import { loginWithGoogle, signin, signup } from "./auth.service.js";
import { successResponse } from "../../common/response/success.response.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { loginWithGoogleDto, signinDto, signupDto } from "./auth.dto.js";

const authRouter = Router();

authRouter.post("/signup", validationMiddleware(signupDto), async (req, res) => {
  const user = await signup(req.body);
  successResponse({
    res,
    status: 201,
    msg: "User created successfully",
    data: user,
  });
});

authRouter.post("/signin", validationMiddleware(signinDto), async (req, res) => {
  const data = await signin(req.body);
  successResponse({ 
    res,
    msg: "Data Retrieved",
    data
   });
});

authRouter.post(
  "/login-with-google",
  validationMiddleware(loginWithGoogleDto),
  async (req, res) => {
    const data = await loginWithGoogle(req.body);
    successResponse({
      res,
      msg: "Logged in with Google",
      data,
    });
  },
);

export default authRouter;
