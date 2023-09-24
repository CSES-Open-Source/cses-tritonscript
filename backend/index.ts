import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connect";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import user from "./routes/user";
import auth from "./routes/auth";
import settings from "./utils/config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: settings.domain }));

app.use("/api/user", user);
app.use("/api/auth", auth);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
