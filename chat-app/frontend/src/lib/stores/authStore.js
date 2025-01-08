import { writable } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set} = writable({
        isAuthenticated: false,
        user: null,
        loading: true
    });

    return {
        subscribe,
        login: (userData) => {
            set({
                isAuthenticated: true,
                user: userData,
                loading: false
            });
            // Store in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(userData));
        },
        logout: () => {
            set({
                isAuthenticated: false,
                user: null,
                loading: false
            });
            localStorage.removeItem('user');
        },
        initializeFromStorage: () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                set({
                    isAuthenticated: true,
                    user: JSON.parse(storedUser),
                    loading: false
                });
            } else {
                set({
                    isAuthenticated: false,
                    user: null,
                    loading: false
                });
            }
        }
    };
}

export const authStore = createAuthStore();