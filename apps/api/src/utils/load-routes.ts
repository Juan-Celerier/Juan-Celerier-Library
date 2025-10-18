import { Router } from "express";
import routes from "../routes/index.js";

export function loadRoutes(): Router {
  return routes;
}
