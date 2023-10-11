import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import { createUserRouter } from "./routes/users.js";

const app = express();

app.use(cors());
app.use(json());
app.disable("x-powered-by");

app.use("/users", createUserRouter());

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.send("<h2>All set!");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
