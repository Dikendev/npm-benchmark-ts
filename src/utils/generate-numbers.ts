export const generateArray = (length: number): number[] => {
	const numbers: number[] = [];
	for (let i = 0; i < length; i++) {
		numbers.push(i);
	}
	return numbers;
};
