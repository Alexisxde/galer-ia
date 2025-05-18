import { db } from "@/db"
import { ImagesTable } from "@/db/schema"
import type { APIRoute } from "astro"
import { sql } from "drizzle-orm"

export const GET: APIRoute = async ({ params }) => {
	const { id } = params

	if (!id) {
		return new Response(
			JSON.stringify({
				type: "error",
				code: "unAuthorized",
				message: "You must be logged in to access this resource."
			}),
			{ status: 401 }
		)
	}

	const images = await db
		.select()
		.from(ImagesTable)
		.where(sql`${ImagesTable.id_user} = ${id}`)

	return new Response(JSON.stringify(images), {
		headers: { "Content-Type": "application/json" }
	})
}
