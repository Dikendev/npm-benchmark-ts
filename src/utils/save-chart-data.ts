import ChartJsImage from "chartjs-to-image";
import { ChartDataResult } from "..";
import { CHART_LABEL } from "../constants/chart.constants";
import { Options } from "./save-json-file";

export class ChartData {
	/**
	 * @description Prepare the data for the chart
	 */
	static prepareChartData(chartData: ChartDataResult) {
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
	static createChart = (
		benchMarkNameFile: string,
		chartData: ChartDataResult,
		options?: Options
	) => {
		const label = CHART_LABEL;
		if (options?.dirPath === undefined) {
			return;
		}
		const { dataLabels, data } = this.prepareChartData(chartData);
		const myChart = new ChartJsImage();
		myChart.setConfig({
			type: "bar",
			data: { labels: dataLabels, datasets: [{ label, data }] },
		});
		myChart.toFile(`${options.dirPath}/${benchMarkNameFile}.png`);
	};
}
