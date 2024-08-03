/**
 * This function removes null values from a string.
 * @param data - The input string from which null values need to be removed.
 * @returns A string without null values.
 */
export const replaceNullValueInString = (data: string) => {
	return data.replace(/\bnull\b/g, "");
};
