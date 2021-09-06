import "reflect-metadata";
import express from "express";
import cors from "cors";

import "./database";

import routes from "./routes";

const app = express();

app.get("/", (_, res) => {
  res.json({
    message: "Welcome to the banca server",
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running on localhost:%s", PORT));
