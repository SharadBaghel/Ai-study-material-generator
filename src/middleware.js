import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Correctly define the route matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)','/create'],'/course(.*)'); 

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect(); // Protect the route if it matches
    }
});

// Configure the matcher to skip Next.js internals and static files
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/api/(.*)',
        '/trpc/(.*)', // Ensure this line is included if you're using tRPC
    ],
};
