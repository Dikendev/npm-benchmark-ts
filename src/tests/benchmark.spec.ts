import { benchMark } from "../benchmark";
import { SumMethods } from "../sum-methods";
import { generateArray } from "../utils/generate-numbers";
import { BenchmarkFunctions } from "../interfaces";

describe("Benchmark", () => {
	it("should accept any type of methods parameters and return types", async () => {
		const arrayLength = 1000000;
		const numberArray = generateArray(arrayLength);

		const benchmark1: BenchmarkFunctions<number, number> = {
			functionDescription: "forLoop",
			functionUnderTest: () => SumMethods.sumNumberUsingFor(numberArray),
			detail: "Sum numbers using for",
		};

		const benchmark2: BenchmarkFunctions<number, number> = {
			functionDescription: "reduce",
			functionUnderTest: () => SumMethods.sumNumberUsingReduce(numberArray),
			detail: "Sum numbers using reduce",
		};

		await benchMark<number, number>("comparison_sum_methods", [
			benchmark1,
			benchmark2,
		]);
	});
});
