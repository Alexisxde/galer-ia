import type { ImagesTableType } from "@/types"
import { useState } from "react"

interface Props extends ImagesTableType {}

const MODELS = [
	{
		id: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
		name: "Phoenix Model 1.0",
		image: "/models/phoenix-model.jpg"
	},
	{
		id: "1aa0f478-51be-4efd-94e8-76bfc8f533af",
		name: "Anime Pastel",
		image: "/models/anime-pastel-dream-model.jpg"
	},
	{
		id: "aa77f04e-3eec-4034-9c07-d0f619684628",
		name: "Kino XL",
		image: "/models/kino-xl-model.jpg"
	},
	{
		id: "e71a1c2f-4f80-4800-934f-2c68979d8cc8",
		name: "Anime XL",
		image: "/models/anime-xl-model.jpg"
	},
	{
		id: "1aa0f478-51be-4efd-94e8-76bfc8f533af",
		name: "Dream Shaper",
		image: "/models/dream-shaper-model.jpg"
	}
]

export default function Modal({ _id, prompt, id_model }: Props) {
	const [open, setOpen] = useState(false)
	const [copy, setCopy] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(prompt)
			setCopy(true)
			setTimeout(() => setCopy(false), 2000)
		} catch (err) {
			console.error("Error: ", err)
		}
	}

	const findModelById = (id: string) => MODELS.find(model => model.id === id)
	const model = findModelById(id_model)

	return (
		<>
			<img
				onClick={() => setOpen(true)}
				className="mb-4 rounded-md"
				src={`/image/${_id}`}
				alt={prompt}
			/>
			{open && (
				<div className="relative z-50">
					<div
						className={`background ${open ? "show" : "hide"} fixed inset-0 bg-neutral-950/75 transition-opacity`}></div>
					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<div
								className={`modal ${open ? "show" : "hide"} relative max-w-fit transform overflow-hidden rounded-lg bg-neutral-900 text-left shadow-xl transition-all sm:my-8 sm:w-full`}>
								<div className="bg-neutral-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="flex items-center justify-between">
										<span className="text-xl font-medium">Preview</span>
										<button
											onClick={() => setOpen(false)}
											className="flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 capitalize transition-all duration-300 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												className="size-5">
												<path
													stroke-linecap="round"
													strokeLinejoin="round"
													d="M6 18 18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
									<div className="mt-2 flex w-full flex-col gap-4 md:flex-row">
										<img
											className="mb-4 max-w-md rounded-md object-cover"
											src={`/image/${_id}`}
											loading="lazy"
											alt={prompt}
										/>
										<div className="flex max-h-fit w-full max-w-md flex-col justify-between gap-2 rounded-md bg-neutral-800 p-4">
											<div className="flex flex-col">
												<div className="flex items-center justify-between">
													<span className="text-xl font-medium">Prompt</span>
													<button
														title="Copy prompt"
														className="flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 capitalize transition-all duration-300 ease-in-out hover:border-neutral-300 hover:bg-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
														onClick={handleCopy}>
														{!copy ? (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth="1.5"
																stroke="currentColor"
																className="size-5">
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
																/>
															</svg>
														) : (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth="1.5"
																stroke="currentColor"
																className="size-5">
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
																/>
															</svg>
														)}
													</button>
												</div>
												<p className="text-left text-sm text-neutral-500">
													{prompt}
												</p>
											</div>
											{model && (
												<div className="relative w-fit">
													<img
														className="rounded-md object-cover size-24"
														src={model.image}
														alt={model.name}
													/>
													<span className="absolute bottom-0 z-10 px-4 pb-2 text-xs font-semibold capitalize md:text-sm">
														{model.name}
													</span>
													<div className="absolute top-0 bottom-0 z-5 size-full rounded-md bg-gradient-to-b from-transparent from-40% via-black/20 to-black/80"></div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
