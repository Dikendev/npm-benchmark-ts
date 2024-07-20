import { Options, saveJsonFile } from "./utils/save-json-file";
import { ChartData } from "./chart/chart-data";

export interface ChartDataResult {
	[key: string]: ChartDataResultBenchmark;
}

export interface ChartDataResultBenchmark {
	name: string;
	duration: number;
}

export type FunctionUnderBenchmark<T, U> = (...args: T[]) => U;

export interface BenchmarkFunctions<T, U> {
	name: string;
	functionUnderTest: FunctionUnderBenchmark<T, U>;
	description?: string;
}

export class BenchMarkJs {
	chart: ChartData;

	constructor() {
		this.chart = new ChartData();
	}

	/**
	 * @description Benchmark function and create a chart
	 */
	async benchMark<T, U>(
		benchMarkNameFile: string,
		benchmarkFunctions: BenchmarkFunctions<T, U>[],
		options?: Options
	): Promise<ChartDataResult> {
		const chartData = this.measurePerformance(benchmarkFunctions);

		if (options?.dirPath !== undefined) {
			await this.chart.createChart(benchMarkNameFile, chartData, options);
			await saveJsonFile(benchMarkNameFile, chartData, options);
		}
		return chartData;
	}

	/**
	 * @description Measure the performance of the functions, lower time is better
	 */
	measurePerformance<T, U>(
		benchmarkFunctions: BenchmarkFunctions<T, U>[]
	): ChartDataResult {
		const chartData: ChartDataResult = {};

		for (const { name, functionUnderTest, description } of benchmarkFunctions) {
			performance.mark("start");
			functionUnderTest();
			performance.mark("end");
			performance.measure(name, {
				start: "start",
				end: "end",
				detail: description,
			});

			const measureResults = performance.getEntriesByName(name);
			measureResults.forEach((measureResult) => {
				chartData[name] = {
					name: measureResult.name,
					duration: measureResult.duration,
				};
			});
		}
		return chartData;
	}
}
