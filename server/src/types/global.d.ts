import { UserWithRole } from "./data";
import { isEmpty, last } from "@/common/extensions";

declare global {
    
    namespace Express {
        interface Request {
            currentUser: UserWithRole;
        }
    }

    interface Array<T> {
        isEmpty: typeof isEmpty;
        last: typeof last;
    }

}
