// @ts-check
import node from "@astrojs/node"
import react from "@astrojs/react"
import clerk from "@clerk/astro"
import { dark } from "@clerk/themes"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import { defineConfig, envField } from "astro/config"

export default defineConfig({
	env: {
		schema: {
			PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
				context: "client",
				access: "public"
			}),
			CLERK_SECRET_KEY: envField.string({ context: "server", access: "secret" })
		}
	},
	trailingSlash: "never",
	output: "server",
	devToolbar: { enabled: false },
	vite: { plugins: [tailwindcss()] },
	integrations: [clerk({ appearance: { baseTheme: dark } }), react(), icon()],
	adapter: node({ mode: "standalone" })
})
