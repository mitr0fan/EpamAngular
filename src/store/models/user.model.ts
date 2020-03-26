export interface CurrentUser {
    id: number;
    firstName: string;
    lastName: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface UserError {
    errorStatus: boolean;
    errorMessage: string;
}

export interface Credentials {
    email: string;
    password: string;
}
