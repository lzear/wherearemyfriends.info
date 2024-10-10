import express from "express";
import { Express } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";

export const configureApp = (app: Express): void => {
  app.set("trust proxy", 1);

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
