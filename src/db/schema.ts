import { sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const ImagesTable = sqliteTable("images", {
	_id: text("_id").primaryKey().notNull(),
	id_user: text("id_user").notNull(),
	id_model: text("id_model").notNull(),
	url: text("url").notNull(),
	prompt: text("prompt").notNull(),
	size: text("size").notNull(),
	created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`)
})
