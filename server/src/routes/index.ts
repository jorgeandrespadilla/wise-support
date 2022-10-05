import { BASE_URL } from "@/constants/settings";
import { Application } from "express";
import users from "./users";

export const configureRoutes = (app: Application) => {
    app.use(BASE_URL, users);
}