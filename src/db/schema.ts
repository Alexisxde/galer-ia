import { sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const ImagesIA = sqliteTable("images_ia", {
	image_ia_id: text("image_id").primaryKey().notNull(),
	id_user: text("id_user").notNull(),
	url: text("url").notNull(),
	created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`)
})

export type ImagesIATableType = typeof ImagesIA.$inferSelect
