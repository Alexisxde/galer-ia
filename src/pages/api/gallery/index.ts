import { db } from "@/db"
import { ImagesTable } from "@/db/schema"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ url }) => {
	const limit = url.searchParams.get("limit")
	const images = await db
		.select()
		.from(ImagesTable)
		.limit(Number(limit) ?? 20)

	return new Response(JSON.stringify(images), {
		headers: { "Content-Type": "application/json" }
	})
}
