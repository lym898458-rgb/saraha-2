import express from "express";
import dns from "dns";
import cors from "cors";
import { CLIENT_ORIGIN } from "./config/config.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { globalErrMiddleware } from "./middleware/error.middleware.js";
import { dbConnection } from "./DB/db.connetion.js";
import authController from "./module/auth/auth.controller.js";

async function bootstrape() {
  const app = express();
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  app.use(express.json());
  app.use(cors({ origin: [CLIENT_ORIGIN] }));
  await dbConnection(app);

  app.use("/auth",authController)
  
  app.all("{/*dummy}", notFoundMiddleware);
  app.use(globalErrMiddleware);
}
bootstrape();
