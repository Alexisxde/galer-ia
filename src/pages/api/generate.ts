import { db } from "@/db"
import { ImagesTable } from "@/db/schema"
import type { API } from "@/types"
import type { APIRoute } from "astro"
import { sql } from "drizzle-orm"

const MODELS = [
	"de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
	"1aa0f478-51be-4efd-94e8-76bfc8f533af",
	"aa77f04e-3eec-4034-9c07-d0f619684628",
	"e71a1c2f-4f80-4800-934f-2c68979d8cc8",
	"1aa0f478-51be-4efd-94e8-76bfc8f533af"
]

const SIZES = [
	{ size: "1/1", width: 512, height: 512 },
	{ size: "2/3", width: 984, height: 1472 },
	{ size: "16/9", width: 1536, height: 864 }
]

function getSizeDimensions(size: string) {
	const foundSize = SIZES.find(s => s.size === size)
	if (!foundSize) throw new Error("Size not found")
	return { width: foundSize.width, height: foundSize.height }
}

export const POST: APIRoute = async ({ request, locals }) => {
	const { userId } = locals.auth()
	if (!userId) return new Response("Unauthorized", { status: 401 })

	const images = await db
		.select()
		.from(ImagesTable)
		.where(sql`${ImagesTable.id_user} = ${userId}`)

	if (images.length >= 10) {
		return new Response(
			JSON.stringify({
				type: "error",
				message: "Limit of 10 images per user."
			}),
			{ headers: { "Content-Type": "application/json" }, status: 400 }
		)
	}

	const { prompt: prompt_text, model, size } = await request.json()

	if (!prompt_text) throw new Error("Prompt is required")
	if (typeof prompt_text !== "string")
		throw new Error("Prompt must be a string")
	if (!model) throw new Error("Model is required")
	if (typeof model !== "string") throw new Error("Model must be a string")
	if (!size) throw new Error("Size is required")
	if (typeof size !== "string") throw new Error("Size must be a string")
	if (!MODELS.includes(model)) throw new Error("Model is not valid")
	if (!SIZES.some(s => s.size === size)) throw new Error("Size is not valid")

	const { width, height } = getSizeDimensions(size)
	let idImage: string

	try {
		const res = await fetch(import.meta.env.API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${import.meta.env.API_KEY_LEONARDO_AI}`,
				Accept: "application/json"
			},
			body: JSON.stringify({
				modelId: model,
				contrast: 3.5,
				prompt: prompt_text,
				num_images: 1,
				width,
				height,
				alchemy: true,
				presetStyle: "DYNAMIC",
				enhancePrompt: false
			})
		})
		const data = await res.json()
		console.log(data)
		idImage = data?.sdGenerationJob.generationId
	} catch (e) {}

	const res = new Promise((_resolve, _reject) => {
		if (!idImage) throw new Error("Server Internal Error")

		const intervalId = setInterval(async () => {
			try {
				const res = await fetch(`${import.meta.env.API_URL}/${idImage}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${import.meta.env.API_KEY_LEONARDO_AI}`,
						Accept: "application/json"
					}
				})

				const data = await res.json()
				if (data.generations_by_pk.status === "PENDING") return
				if (data.generations_by_pk.status === "COMPLETE") {
					clearInterval(intervalId)
					_resolve(data)
				}
			} catch (error) {
				console.error("Error fetching data:", error)
				_reject(error)
			}
		}, 1500)
	})

	const { generations_by_pk } = (await res) as unknown as API
	const {
		prompt,
		generated_images: generatedImages,
		modelId: id_model
	} = generations_by_pk

	if (!generatedImages || generatedImages.length === 0)
		throw new Error("No generated images found.")

	const imageUrl = generatedImages[0]?.url
	if (!imageUrl) throw new Error("The generated image URL is invalid.")
	const image = { _id: idImage!, id_model, url: imageUrl, prompt, size }
	await db.insert(ImagesTable).values({ ...image, id_user: userId })

	return new Response(JSON.stringify({ type: "success", data: image }), {
		headers: { "Content-Type": "application/json" },
		status: 200
	})
}
