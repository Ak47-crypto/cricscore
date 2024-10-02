import express from "express";
import cors from "cors";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// routes import
import { useRoutes } from "./routes/routes";
app.use("/api",useRoutes)


export  {app}