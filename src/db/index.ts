import * as schema from "@/db/schema"
import { drizzle } from "drizzle-orm/libsql/node"

export const db = drizzle({
	connection: {
		url: import.meta.env.TURSO_DATABASE_URL!,
		authToken: import.meta.env.TURSO_AUTH_TOKEN!
	},
	schema
})
