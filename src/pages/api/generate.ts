import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, locals }) => {
	const { userId } = locals.auth()
	if (!userId) return new Response("Unauthorized", { status: 401 })

	const { prompt } = await request.json()
	if (!prompt) {
		return new Response("Prompt is required", { status: 400 })
	}
	if (typeof prompt !== "string") {
		return new Response("Prompt must be a string", { status: 400 })
	}

	await new Promise(resolve => setTimeout(resolve, 10000))

	return new Response(
		JSON.stringify({ id: "1234", prompt, image_url: "src/assets/test/2.jpg" }),
		{ headers: { "Content-Type": "application/json" } }
	)
}
