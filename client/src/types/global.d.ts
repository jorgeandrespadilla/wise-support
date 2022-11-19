import { isEmpty, isLast } from "shared/extensions";

declare global {
    
    interface Array<T> {
        isEmpty: typeof isEmpty;
        isLast: typeof isLast;
    }

}
