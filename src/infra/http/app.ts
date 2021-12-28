import "@config/bootstrap";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import uploadConfig from "@config/upload";
import { logger } from "@util/logger";
import { AppError } from "./errors/AppError";
import { routes } from "./routes";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(cookieParser());

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(Sentry.Handlers.requestHandler());
app.use("/public", express.static(uploadConfig.directory));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

app.use(morgan("tiny"));

export { app };
