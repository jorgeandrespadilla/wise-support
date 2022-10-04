import dotenv from "dotenv";
import { envParser, loadEnv } from "@/utils/dotenvHelpers";

export const IS_DEV = loadEnv<boolean>("NODE_ENV", {
    defaults: "development",
    parserCallback: (value) => value === "development"
});

if (IS_DEV) dotenv.config();

export const PORT = loadEnv<number>("SERVER_PORT", { defaults: 4000, parserCallback: envParser.number });
export const BASE_URL = loadEnv<string>("SERVER_BASE_URL", { defaults: "/" }); // Should include leading slash