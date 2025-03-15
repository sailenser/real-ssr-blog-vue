import type { Store } from 'pinia';

export interface AuthStore extends Store {
    login: Promise<void>;
    register: Promise<void>;
    setUser: Promise<void>;
    isAuth: boolean;
}