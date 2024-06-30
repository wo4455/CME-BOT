import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import initializeLogging from "./startup/logging.js";
import initializeRoutes from "./startup/routes.js";
import initializeDB from "./startup/db.js";
import initializeProd from "./startup/prod.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

// Resolve the path to the client/dist directory from the project root
const clientDistPath = path.resolve(rootDir, "../client/dist");

// Serve the static files from the React app located in client/dist
app.use(express.static(clientDistPath));

initializeLogging(); // logging first to catch errors
initializeRoutes(app);
// initializeDB();

if (app.get("env") === "production") {
  initializeProd(app);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} successfully.`);
});
