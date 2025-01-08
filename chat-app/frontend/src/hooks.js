import { redirect } from '@sveltejs/kit';

const unprotectedRoutes = ['/login', '/register'];

export const handle = async ({ event, resolve }) => {
    const user = event.cookies.get('user');
    const path = event.url.pathname;

    // If the route needs authentication and user is not logged in
    if (!unprotectedRoutes.includes(path) && !user) {
        throw redirect(303, '/login');
    }

    // If user is logged in and tries to access login/register pages
    if (unprotectedRoutes.includes(path) && user) {
        throw redirect(303, '/');
    }

    const response = await resolve(event);
    return response;
};
