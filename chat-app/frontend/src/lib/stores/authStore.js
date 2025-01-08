import { writable } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set } = writable({
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
            document.cookie = `session=${userData.token}; path=/; max-age=86400`;
        },
        logout: () => {
            set({
                isAuthenticated: false,
                user: null,
                loading: false
            });
            localStorage.removeItem('user');
            document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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