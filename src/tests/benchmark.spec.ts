import { BenchmarkFunctions, BenchMarkJs } from "..";
import { Options } from "../utils/save-json-file";
import { Arrays, SumMethods } from "./sum-methods-mock";
const saveJsonFile = require("../utils/save-json-file");

describe("Benchmark", () => {
	let benchMarkJs: BenchMarkJs;

	beforeEach(() => {
		benchMarkJs = new BenchMarkJs();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should be defined", () => {
		expect(benchMarkJs).toBeDefined();
	});

	it("should accept any type of methods parameters and return types", async () => {
		const arrayLength = 1000000;
		const numberArray = Arrays.generateArray(arrayLength);

		const benchmark1: BenchmarkFunctions<number, number> = {
			name: "forLoop",
			functionUnderTest: () => SumMethods.sumNumberUsingFor(numberArray),
			description: "Sum numbers using for",
		};

		const benchmark2: BenchmarkFunctions<number, number> = {
			name: "reduce",
			functionUnderTest: () => SumMethods.sumNumberUsingReduce(numberArray),
			description: "Sum numbers using reduce",
		};

		const benchMarkResult = await benchMarkJs.benchMark<number, number>(
			"comparison_sum_methods",
			[benchmark1, benchmark2]
		);

		expect(benchMarkResult).toHaveProperty("forLoop");
		expect(benchMarkResult).toHaveProperty("forLoop");
		expect(benchMarkResult.forLoop).toHaveProperty("name");
		expect(benchMarkResult.forLoop).toHaveProperty("duration");
		expect(benchMarkResult).toHaveProperty("reduce");
		expect(benchMarkResult.reduce).toHaveProperty("name");
		expect(benchMarkResult.reduce).toHaveProperty("duration");
	});

	it("should save the benchmark data to a file", async () => {
		const arrayLength = 1000000;
		const numberArray = Arrays.generateArray(arrayLength);

		const spySaveFile = jest.spyOn(saveJsonFile, "saveJsonFile");

		const benchmark1: BenchmarkFunctions<number, number> = {
			name: "forLoop",
			functionUnderTest: () => SumMethods.sumNumberUsingFor(numberArray),
			description: "Sum numbers using for",
		};

		const benchmark2: BenchmarkFunctions<number, number> = {
			name: "reduce",
			functionUnderTest: () => SumMethods.sumNumberUsingReduce(numberArray),
			description: "Sum numbers using reduce",
		};

		const options: Options = {
			dirPath: "TMP",
		};

		await benchMarkJs.benchMark<number, number>(
			"comparison_sum_methods",
			[benchmark1, benchmark2],
			options
		);

		expect(spySaveFile).toHaveBeenCalled();
		expect(spySaveFile).toHaveBeenCalledTimes(1);
	});

	it("should return the comparison result of generating array with for and fill", async () => {
		const arrayLength = 10_000_000;

		const benchmarkFork: BenchmarkFunctions<number, number[]> = {
			name: "For Loop",
			functionUnderTest: () => Arrays.generateArray(arrayLength),
			description: "Generate array using for loop",
		};

		const benchmarkFill: BenchmarkFunctions<number, number[]> = {
			name: "Fill",
			functionUnderTest: () => Arrays.generateArrayWithRandom(arrayLength),
			description: "Generate array using fill",
		};

		const comparisonResult = await benchMarkJs.benchMark(
			"Comparison Generate Numbers Array function",
			[benchmarkFork, benchmarkFill],
			{ dirPath: "TMP" }
		);
	});
});
