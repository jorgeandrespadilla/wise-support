import { isEmpty } from "shared/extensions";

declare global {
    
    interface Array<T> {
        isEmpty: typeof isEmpty;
    }

}
