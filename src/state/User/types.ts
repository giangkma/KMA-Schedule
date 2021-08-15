import { User } from 'src/domain/user';

export interface UserState {
    information?: User;
    schedules?: any;
}
