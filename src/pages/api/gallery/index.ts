import { db } from "@/db"
import { ImagesTable } from "@/db/schema"
import type { APIRoute } from "astro"

export const GET: APIRoute = async () => {
	const images = await db.select().from(ImagesTable)

	return new Response(JSON.stringify(images), {
		headers: { "Content-Type": "application/json" }
	})
}
