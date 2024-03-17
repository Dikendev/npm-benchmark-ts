import ChartJsImage from "chartjs-to-image";
import { BenchmarkFunctions, ChartDataResult } from "./interfaces";
import writefile from "fs";
import { saveJsonFile } from "./utils/save-json-file";

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
 * @description Prepare the data for the chart
 */
export function prepareChartData(chartData: ChartDataResult) {
	const dataLabels: string[] = [];
	const data: number[] = [];
	const keys = Object.keys(chartData);
	for (const key of keys) {
		dataLabels.push(chartData[key].name);
		data.push(chartData[key].duration);
	}
	return { dataLabels, data };
}

/**
 * @description Create a chart from the benchmark data
 */
export const createChart = (
	benchMarkNameFile: string,
	chartData: ChartDataResult
) => {
	const { dataLabels, data } = prepareChartData(chartData);
	const label = "Execution time in ms";

	const myChart = new ChartJsImage();
	myChart.setConfig({
		type: "bar",
		data: { labels: dataLabels, datasets: [{ label, data }] },
	});
	myChart.toFile(`./TMP/${benchMarkNameFile}.png`);
};

/**
 * @description Benchmark function and create a chart
 */
export async function benchMark<T, U>(
	benchMarkNameFile: string,
	benchmarkFunctions: BenchmarkFunctions<T, U>[]
) {
	const chartData = measurePerformance(benchmarkFunctions);
	createChart(benchMarkNameFile, chartData);
	await saveJsonFile(benchMarkNameFile, chartData);
}
