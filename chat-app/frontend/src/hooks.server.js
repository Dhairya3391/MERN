import { redirect } from '@sveltejs/kit';

const unprotectedRoutes = ['/login', '/register'];

export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');
    const path = event.url.pathname;

    // If the route needs authentication and user is not logged in
    if (!unprotectedRoutes.includes(path) && !session) {
        throw redirect(303, '/login');
    }

    // If user is logged in and tries to access login/register pages
    if (unprotectedRoutes.includes(path) && session) {
        throw redirect(303, '/');
    }

    const response = await resolve(event);
    return response;
}