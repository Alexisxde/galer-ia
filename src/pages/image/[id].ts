import { db } from "@/db"
import { ImagesTable } from "@/db/schema"
import type { APIRoute } from "astro"
import { sql } from "drizzle-orm"

export const GET: APIRoute = async ({ params }) => {
	const { id } = params

	if (!id) {
		return new Response(
			JSON.stringify({ type: "error", message: "Image id no exist" }),
			{ headers: { "Content-Type": "application/json" }, status: 404 }
		)
	}

	const image = await db
		.select()
		.from(ImagesTable)
		.where(sql`${ImagesTable._id} = ${id}`)

	if (!image || image.length === 0) {
		return new Response(
			JSON.stringify({ type: "error", message: "Image no exist" }),
			{ headers: { "Content-Type": "application/json" }, status: 404 }
		)
	}

	const response = await fetch(image?.[0].url)
	const buffer = Buffer.from(await response.arrayBuffer())
	return new Response(buffer, {
		headers: {
			"Content-Type": "image/png",
			"X-Image-Name": `GalerIA - ${image?.[0]?._id}`
		},
		status: 200
	})
}
