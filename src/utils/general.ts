/**
 * This function removes null values from a string.
 * @param data - The input string from which null values need to be removed.
 * @returns A string without null values.
 */
export const replaceNullValueInString = (data: string) => {
	return data.replace(/\bnull\b/g, "");
};

/**
 * A function that handles the click event by blurring the active element.
 * @return {void}
 */
export const handleClick = (): void => {
	const button = document.activeElement;
	(button as HTMLElement)?.blur();
};
