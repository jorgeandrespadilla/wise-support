import { UserProfile } from './data';
import { isEmpty, last } from '@/common/extensions';

declare global {
    namespace Express {
        interface Request {
            currentUser: UserProfile;
        }
    }

    interface Array {
        isEmpty: typeof isEmpty;
        last: typeof last;
    }
}
