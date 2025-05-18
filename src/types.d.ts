import { ImagesTable } from "@/db/schema"

export interface API {
	generations_by_pk: GenerationsByPk
}

export interface GenerationsByPk {
	generated_images?: GeneratedImagesEntity[] | null
	modelId: string
	prompt: string
	negativePrompt: string
	imageHeight: number
	imageWidth: number
	sdVersion: string
	status: string
	presetStyle: string
	id: string
	createdAt: string
	promptMagic: boolean
	photoReal: boolean
	prompt_moderations?: PromptModerationsEntity[] | null
	generation_elements?: null[] | null
}

export interface GeneratedImagesEntity {
	url: string
	id: string
	generated_image_variation_generics?: null[] | null
}

export interface PromptModerationsEntity {
	moderationClassification?: null[] | null
}

export interface APIError {
	error: string
	path: string
	code: string
}

export type ImagesTableType = typeof ImagesTable.$inferSelect

export interface Images {
	_id: ImagesTableType._id
	id_model: ImagesTableType.id_model
	url: ImagesTableType.url
	prompt: ImagesTableType.prompt
	size: ImagesTableType.size
}
