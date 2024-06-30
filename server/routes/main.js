import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Define the __filename and rootDir using `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

// Resolve the path to the client/dist directory from the project root
const clientDistPath = path.resolve(rootDir, "../client/dist");

router.get("*", (req, res) => {
  res.sendFile(path.resolve(clientDistPath, "index.html"));
});

export default router;
