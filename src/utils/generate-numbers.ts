export const generateArray = (length: number): number[] => {
	const arr: number[] = [];
	for (let i = 0; i < length; i++) {
		arr.push(i);
	}
	return arr;
};
