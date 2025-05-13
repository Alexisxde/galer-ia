export const $ = <T extends HTMLElement>(
	selector: string,
	context: Document | HTMLElement = document
) => {
	return context.querySelector<T>(selector)
}

export const $$ = <T extends HTMLElement>(
	selector: string,
	context: Document | HTMLElement = document
) => {
	return context.querySelectorAll<T>(selector)
}
