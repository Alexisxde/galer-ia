import type { Images } from "@/types"
import type { FormEvent } from "react"
import { useState } from "react"

const SIZE: Record<string, string> = {
	"1/1": "size-88",
	"16/9": "w-full aspect-video",
	"2/3": "w-full h-96"
}

export default function FormGenerate() {
	const [data, setData] = useState<Images | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		const formData = new FormData(form)
		const prompt = formData.get("prompt")
		const model = formData.get("model")
		const size = formData.get("size")
		if (!prompt || !model || !size) return

		setLoading(true)
		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				body: JSON.stringify({ prompt: prompt.toString().trim(), model, size }),
				headers: { "Content-Type": "application/json" }
			})
			const data = await response.json()
			if (data.type === "success") setData(data.data)
			if (data.type === "error") setError(data)
			setLoading(false)
		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
		<section className="flex w-full max-w-3xl flex-col items-center px-4 pb-4">
			<div className="p-4">
				{loading && (
					<div className="grid size-88 animate-pulse place-items-center rounded-lg bg-neutral-800">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							className="size-24 text-neutral-500">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
						</svg>
					</div>
				)}
				{data?.url && !loading && (
					<img
						className={`rounded-md object-cover ${SIZE[data.size]}`}
						src={data.url}
						alt={data.prompt}
					/>
				)}
				{error && <p className="text-sm text-red-500">{error?.message}</p>}
			</div>
			<div className="flex w-full items-center">
				<form
					onSubmit={handleSubmit}
					className="mx-auto flex w-full flex-col gap-4">
					<div className="relative">
						<div className="absolute top-0 flex w-full justify-center">
							<div className="animate-border-width h-[1px] rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
						</div>
						<textarea
							autoComplete="off"
							placeholder="Type your prompt here..."
							name="prompt"
							className="block h-32 w-full resize-none rounded-md border border-neutral-800 bg-neutral-950/75 px-4 py-3 text-xs focus:ring-1 focus:ring-neutral-700 focus:outline-none md:h-32 md:text-sm"></textarea>
						<div className="absolute right-0 bottom-0 flex w-full max-w-52 items-center justify-end p-4">
							<button
								type="submit"
								className="relative z-10 inline-flex h-6 w-32 items-center justify-center rounded-md bg-neutral-100 px-2 text-xs font-medium text-neutral-950 transition-colors focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50 focus:outline-none md:h-8 md:text-sm">
								<div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
								<div className="flex items-center justify-center">
									{loading ? (
										<svg
											className="size-6 animate-spin fill-neutral-600 text-neutral-200"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
									) : (
										"Generate"
									)}
								</div>
							</button>
						</div>
					</div>
					<div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4">
						<label className="relative">
							<input
								className="peer hidden"
								type="radio"
								name="model"
								defaultChecked
								value="de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3"
							/>
							<img
								className="rounded-md object-cover transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"
								src="/models/phoenix-model.jpg"
								alt="Model Phoenix"
							/>
							<span className="absolute bottom-0 z-10 px-4 pb-2 text-xs font-semibold capitalize md:text-sm">
								Phoenix 1.0
							</span>
							<div className="absolute top-0 bottom-0 z-5 size-full rounded-md bg-gradient-to-b from-transparent from-40% via-black/20 to-black/80"></div>
						</label>
						<label className="relative">
							<input
								className="peer hidden"
								type="radio"
								name="model"
								value="1aa0f478-51be-4efd-94e8-76bfc8f533af"
							/>
							<img
								className="rounded-md object-cover transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"
								src="/models/anime-pastel-dream-model.jpg"
								alt="Model Anime Pastel Dream"
							/>
							<span className="absolute bottom-0 z-10 px-4 pb-2 text-xs font-semibold capitalize md:text-sm">
								Anime Pastel
							</span>
							<div className="absolute top-0 bottom-0 z-5 size-full rounded-md bg-gradient-to-b from-transparent from-40% via-black/20 to-black/80"></div>
						</label>
						<label className="relative">
							<input
								className="peer hidden"
								type="radio"
								name="model"
								value="aa77f04e-3eec-4034-9c07-d0f619684628"
							/>
							<img
								className="rounded-md object-cover transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"
								src="/models/kino-xl-model.jpg"
								alt="Model Kino XL"
							/>
							<span className="absolute bottom-0 z-10 px-4 pb-2 text-xs font-semibold capitalize md:text-sm">
								Kino XL
							</span>
							<div className="absolute top-0 bottom-0 z-5 size-full rounded-md bg-gradient-to-b from-transparent from-40% via-black/20 to-black/80"></div>
						</label>
						<label className="relative">
							<input
								className="peer hidden"
								type="radio"
								name="model"
								value="e71a1c2f-4f80-4800-934f-2c68979d8cc8"
							/>
							<img
								className="rounded-md object-cover transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"
								src="/models/anime-xl-model.jpg"
								alt="Model Anime XL"
							/>
							<span className="absolute bottom-0 z-10 px-4 pb-2 text-xs font-semibold capitalize md:text-sm">
								Anime XL
							</span>
							<div className="absolute top-0 bottom-0 z-5 size-full rounded-md bg-gradient-to-b from-transparent from-40% via-black/20 to-black/80"></div>
						</label>
						<label className="relative">
							<input
								className="peer hidden"
								type="radio"
								name="model"
								value="1aa0f478-51be-4efd-94e8-76bfc8f533af"
							/>
							<img
								className="rounded-md object-cover transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"
								src="/models/dream-shaper-model.jpg"
								alt="Model Dream Shaper"
							/>
							<span className="absolute bottom-0 z-10 px-4 pb-2 text-xs font-semibold capitalize md:text-sm">
								Dream Shaper
							</span>
							<div className="absolute top-0 bottom-0 z-5 size-full rounded-md bg-gradient-to-b from-transparent from-40% via-black/20 to-black/80"></div>
						</label>
					</div>
					<div className="flex gap-2">
						<label className="relative flex size-20 flex-col items-center justify-center gap-2 rounded-sm">
							<input
								className="peer hidden"
								type="radio"
								name="size"
								value="1/1"
								defaultChecked
							/>
							<div className="z-2 flex flex-col items-center justify-center gap-2">
								<div className="size-10 border-2 border-neutral-700"></div>
								<span className="text-xs">1 / 1</span>
							</div>
							<div className="absolute size-full rounded-md bg-neutral-800 transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"></div>
						</label>
						<label className="relative flex size-20 flex-col items-center justify-center gap-2 rounded-sm">
							<input
								className="peer hidden"
								type="radio"
								name="size"
								value="2/3"
							/>
							<div className="z-2 flex flex-col items-center justify-center gap-2">
								<div className="h-10 w-8 border-2 border-neutral-700"></div>
								<span className="text-xs">2 / 3</span>
							</div>
							<div className="absolute size-full rounded-md bg-neutral-800 transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"></div>
						</label>
						<label className="relative flex size-20 flex-col items-center justify-center gap-2 rounded-sm">
							<input
								className="peer hidden"
								type="radio"
								name="size"
								value="16/9"
							/>
							<div className="z-2 flex flex-col items-center justify-center gap-2">
								<div className="h-10 w-16 scale-90 border-2 border-neutral-700"></div>
								<span className="text-xs">16 / 9</span>
							</div>
							<div className="absolute size-full rounded-md bg-neutral-800 transition-colors duration-300 ease-in-out not-peer-checked:opacity-50 peer-checked:border peer-checked:border-neutral-600"></div>
						</label>
					</div>
				</form>
			</div>
		</section>
	)
}
