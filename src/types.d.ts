import { ImagesTable } from "@/db/schema"

export type Images = typeof ImagesTable.$inferSelect
