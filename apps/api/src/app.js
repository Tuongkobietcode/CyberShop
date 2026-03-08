import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const app = express();

const allowedOrigins = new Set(
  [
    process.env.CLIENT_USER_URL,
    process.env.CLIENT_ADMIN_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
  ].filter(Boolean)
);

function isAllowedLocalOrigin(origin) {
  try {
    const url = new URL(origin);
    return ["localhost", "127.0.0.1"].includes(url.hostname);
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || isAllowedLocalOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin ${origin}`));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "CyberShop API is running",
  });
});

app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
