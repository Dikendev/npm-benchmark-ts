import ChartJsImage from "chartjs-to-image";
import { ChartDataResult } from ".";

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
		chartData: ChartDataResult
	) => {
		const { dataLabels, data } = this.prepareChartData(chartData);
		const label = "Execution time in ms";

		const myChart = new ChartJsImage();
		myChart.setConfig({
			type: "bar",
			data: { labels: dataLabels, datasets: [{ label, data }] },
		});
		myChart.toFile(`./TMP/${benchMarkNameFile}.png`);
	};
}
