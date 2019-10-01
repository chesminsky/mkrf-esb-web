import { User } from '../shared/models/user';

export interface UserRow {
    expanded?: boolean;
    model: User;
}
