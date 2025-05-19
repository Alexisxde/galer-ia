import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server"

const isProtectedRoute = createRouteMatcher([
	"/gallery(.*)",
	"/models",
	"/generate"
])

export const onRequest = clerkMiddleware((auth, context, next) => {
	const { userId, redirectToSignIn } = auth()
	if (isProtectedRoute(context.request) && !userId) return redirectToSignIn()
	return next()
})
