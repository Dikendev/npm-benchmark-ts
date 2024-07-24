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

export class Arrays {
	static generateArray = (length: any): number[] => {
		const numbers: number[] = [];
		for (let i = 0; i < length; i++) {
			numbers.push(i);
		}
		return numbers;
	};

	static generateArrayWithRandom = (length: number): number[] => {
		return new Array(length).fill(1);
	};
}
