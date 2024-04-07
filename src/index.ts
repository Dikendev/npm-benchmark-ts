import { BenchmarkFunctions, ChartDataResult } from "./interfaces";
import { saveJsonFile } from "./utils/save-json-file";
import { ChartData } from "./chart-data";

/**
 * @description Measure the performance of the functions, lower time is better
 */
export function measurePerformance<T, U>(
	benchmarkFunctions: BenchmarkFunctions<T, U>[]
) {
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
	benchmarkFunctions: BenchmarkFunctions<T, U>[]
) {
	const chartData = measurePerformance(benchmarkFunctions);
	ChartData.createChart(benchMarkNameFile, chartData);
	await saveJsonFile(benchMarkNameFile, chartData);
}
