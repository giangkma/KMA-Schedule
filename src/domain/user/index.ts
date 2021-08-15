export interface UserToken {
    authToken: string;
}

export enum UserRole {
    member = 'member',
}

export interface User {
    id: number;
    username: string;
    role: UserRole;
}

export interface ResponseAuth {
    dataJson: any;
    message: string;
    status: boolean;
}

export interface DataLogin {
    username: string;
    password: string;
}
