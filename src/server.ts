import express from "express";

import "./database";

import { routes } from "./routes";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" })
});

app.use(express.json());
app.use(routes);

app.listen(3019, () => {
  console.log("Application Started");
}); 