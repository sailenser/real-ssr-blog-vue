import { defineStore } from "pinia";
import type { User, AuthApi } from "../api/typesApi/typesUser.ts"
import {computed, ref} from "vue";
import type { ApiResponse } from "../api/typesApi/types.ts"

interface AuthState {
  user: User | null;
  ready: Promise<void>;
}

export default function createAuthStore(authApi: AuthApi) {
  return defineStore('auth', () => {
    let readyResolver: (() => void) | null = null;
    const ready = new Promise<void>(resolve => readyResolver = resolve);
    const user = ref(null)
    const isAuth = computed(() =>user.value !== null);
    async function login(this: AuthState & { login: (user: User) => Promise<void> }, user: User): Promise<void> {
      const { data } = await authApi.login(user);
      this.user = data;
    }
    async function register(this: AuthState & { register: (user: User) => Promise<void> }, user: User): Promise<void> {
      const { data }: ApiResponse<User> = await authApi.register(user);
      console.log(data)
    }
    async function setUser(this: AuthState & { setUser: (newUser: User | null) => Promise<void> }, newUser: User | null): Promise<void> {
      this.user = newUser;
      if (readyResolver) {
        readyResolver();
      }
    }
    return { user, isAuth, ready, setUser, login, register }
  });
}