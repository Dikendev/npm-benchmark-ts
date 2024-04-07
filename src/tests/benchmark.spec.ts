import { benchMark, BenchmarkFunctions } from "..";
import { generateArray, SumMethods } from "./sum-methods-mock";

const saveJsonFile = require("../utils/save-json-file");
import { ChartData } from "../utils/save-chart-data";

describe("Benchmark", () => {
	it("should accept any type of methods parameters and return types", async () => {
		const arrayLength = 1000000;
		const numberArray = generateArray(arrayLength);

		const spySaveFile = jest.spyOn(saveJsonFile, "saveJsonFile");
		const spySaveChart = jest.spyOn(ChartData, "createChart");

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

		const benchMarkResult = await benchMark<number, number>(
			"comparison_sum_methods",
			[benchmark1, benchmark2],
			{ saveFile: true }
		);

		expect(benchMarkResult).toHaveProperty("forLoop");
		expect(benchMarkResult).toHaveProperty("forLoop");
		expect(benchMarkResult.forLoop).toHaveProperty("name");
		expect(benchMarkResult.forLoop).toHaveProperty("duration");
		expect(benchMarkResult).toHaveProperty("reduce");
		expect(benchMarkResult.reduce).toHaveProperty("name");
		expect(benchMarkResult.reduce).toHaveProperty("duration");
		expect(spySaveFile).toHaveBeenCalled();
		expect(spySaveFile).toHaveBeenCalledTimes(1);
		expect(spySaveChart).toHaveBeenCalled();
		expect(spySaveChart).toHaveBeenCalledTimes(1);
	});
});
