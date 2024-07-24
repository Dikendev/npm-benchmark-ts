import ChartJsImage from "chartjs-to-image";
import { ChartDataResult } from "..";
import { CHART_LABEL } from "../constants/chart.constants";
import { Options } from "../utils/save-json-file";
import { filePath, FileType } from "../utils/file-path";

export interface DataSets {
	label: string;
	data: number[];
}

export interface Data {
	dataLabels: string[];
	data: number[];
}

export class ChartData {
	/**
	 * @description Create a chart from the benchmark data
	 */
	createChart = async (
		benchMarkNameFile: string,
		chartData: ChartDataResult,
		options?: Options
	): Promise<void> => {
		const label = CHART_LABEL;

		if (options?.dirPath === undefined) return;

		const { dataLabels, data } = this.prepareChartData(chartData);

		const chart = new ChartJsImage();

		this.chartConfig(chart, dataLabels, { label, data });

		await chart.toFile(
			filePath({
				dirPath: options.dirPath,
				fileName: benchMarkNameFile,
				fileType: FileType.PNG,
			})
		);
	};

	/**
	 * @description Prepare the data for the chart
	 */
	prepareChartData(chartData: ChartDataResult): Data {
		const dataLabels: string[] = [];
		const data: number[] = [];
		const keys = Object.keys(chartData);

		for (const key of keys) {
			const func = chartData[key];
			dataLabels.push(func.name);
			data.push(func.duration);
		}

		return { dataLabels, data };
	}

	private chartConfig(
		myChart: ChartJsImage,
		dataLabels: string[],
		dataSets: DataSets
	) {
		const { label, data } = dataSets;
		myChart.setConfig({
			type: "bar",
			data: {
				labels: dataLabels,
				datasets: [{ label, data }],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								stepSize: 0.5,
								beginAtZero: true,
							},
						},
					],
				},
			},
		});
	}
}
