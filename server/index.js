import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import initializeLogging from "./startup/logging.js";
import initializeRoutes from "./startup/routes.js";
import initializeConfig from "./startup/config.js";
import initializeDB from "./startup/db.js";
import initializeProd from "./startup/prod.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

initializeLogging(); // logging first to catch errors
initializeRoutes(app);
initializeConfig(app);
initializeDB();

if (app.get("env") === "production") {
  initializeProd(app);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} successfully.`);
});
