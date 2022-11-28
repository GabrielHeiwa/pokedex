import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(router);

export { app };
