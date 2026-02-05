export interface User{
    id: string;
    email: string;
    name: string;
    surname: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}