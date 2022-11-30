import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
	express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use(morgan("dev"));
app.use(router);

export { app };
