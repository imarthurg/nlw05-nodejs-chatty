import express from "express";

import "./database";

import { router } from "./routes";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" })
});

app.use(express.json());
app.use(router);

app.listen(3019, () => {
  console.log("Application Started");
}); 