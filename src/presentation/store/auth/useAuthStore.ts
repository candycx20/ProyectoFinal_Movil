import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    refreshToken?: string;
    user?: User;

    login: (username: string, password: string) => Promise<boolean>;
    // checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: "checking",
    token: undefined,
    refreshToken: undefined,
    user: undefined,

    login: async (username: string, password: string) => {
        const resp = await authLogin(username, password);
        if (!resp || !resp.user) {
            set({ status: "unauthenticated", token: undefined, user: undefined });
            return false;
        }
        console.log({resp});
        await StorageAdapter.setItem('token', resp.tokens.access)
        const storedToken = await StorageAdapter.getItem('token')
        // await StorageAdapter.setItem('tokenrefresh', resp.tokens.refresh)
        console.log({storedToken})
        set({
            status: "authenticated",
            token: resp.tokens.access,
            refreshToken: resp.tokens.refresh,
            user: resp.user,
        });
        return true;
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined})
    }
}));
