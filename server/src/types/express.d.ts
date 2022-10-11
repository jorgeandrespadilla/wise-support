import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}

export { }; // See https://bit.ly/3MlKFGJ