import express from "express";
import userRoute from "../routes/user.js";
import authRoute from "../routes/auth.js";
import error from "../middleware/error.js";
import cookieParser from "cookie-parser";
import saveChatsRoute from "../routes/save.js";
import loadChatsRoute from "../routes/load.js";
import chatRoute from "../routes/chat.js";
import mainRoute from "../routes/main.js";

export default function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use("/chat", chatRoute);
  app.use("/new", userRoute);
  app.use("/auth", authRoute);
  app.use("/save", saveChatsRoute);
  app.use("/load", loadChatsRoute);
  app.use("/", mainRoute);

  app.use(error); // must be last
}
