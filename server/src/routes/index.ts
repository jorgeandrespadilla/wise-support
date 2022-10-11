import { BASE_URL } from "@/constants/settings";
import { Application } from "express";
import users from "./users";

export const configurePublicRoutes = (app: Application) => {
    app.get(BASE_URL, (_req, res) => {
        res.send("Server is running!");
    });
}

export const configureProtectedRoutes = (app: Application) => {
    app.use(BASE_URL, users);
}