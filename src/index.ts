import { Options, saveJsonFile } from "./utils/save-json-file";
import { ChartData } from "./utils/save-chart-data";

export interface ChartDataResult {
	[key: string]: ChartDataResultBenchmark;
}

export interface ChartDataResultBenchmark {
	name: string;
	duration: number;
}

export type FunctionUnderBenchmark<T, U> = (...args: T[]) => U;

export interface BenchmarkFunctions<T, U> {
	functionDescription: string;
	functionUnderTest: FunctionUnderBenchmark<T, U>;
	detail?: string;
}

/**
 * @description Measure the performance of the functions, lower time is better
 */
export function measurePerformance<T, U>(
	benchmarkFunctions: BenchmarkFunctions<T, U>[]
): ChartDataResult {
	const chartData: ChartDataResult = {};
	for (const {
		functionDescription,
		functionUnderTest,
		detail,
	} of benchmarkFunctions) {
		performance.mark("start");
		functionUnderTest();
		performance.mark("end");
		performance.measure(functionDescription, {
			start: "start",
			end: "end",
			detail,
		});
		const measureResults = performance.getEntriesByName(functionDescription);
		measureResults.forEach((measureResult) => {
			chartData[functionDescription] = {
				name: measureResult.name,
				duration: measureResult.duration,
			};
		});
	}
	return chartData;
}

/**
 * @description Benchmark function and create a chart
 */
export async function benchMark<T, U>(
	benchMarkNameFile: string,
	benchmarkFunctions: BenchmarkFunctions<T, U>[],
	options?: Options
): Promise<ChartDataResult> {
	const chartData = measurePerformance(benchmarkFunctions);

	if (options?.dirPath !== undefined) {
		ChartData.createChart(benchMarkNameFile, chartData, options);
		await saveJsonFile(benchMarkNameFile, chartData, options);
	}

	return chartData;
}
