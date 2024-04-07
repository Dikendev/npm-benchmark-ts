export class SumMethods {
	static sumNumberUsingFor(numbers: number[]): number {
		let result: number = 0;
		for (let i = 0; i < numbers.length; i++) {
			result += numbers[i];
		}
		return result;
	}

	static sumNumberUsingReduce(numbers: number[]): number {
		return numbers.reduce((acc, current) => acc + current, 0);
	}
}

export const generateArray = (length: number): number[] => {
	const numbers: number[] = [];
	for (let i = 0; i < length; i++) {
		numbers.push(i);
	}
	return numbers;
};
