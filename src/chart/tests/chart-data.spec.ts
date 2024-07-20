import { ChartDataResult } from "../..";
import { ChartData } from "../chart-data";

describe("ChartData", () => {
	let chartData: ChartData;

	beforeEach(() => {
		chartData = new ChartData();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should be defined", () => {
		expect(chartData).toBeDefined();
	});

	describe("prepareChartData", () => {
		it("should return an object with the correct format", () => {
			const data: ChartDataResult = {
				forLoop: {
					name: "forLoop",
					duration: 0.1234,
				},
				reduce: {
					name: "reduce",
					duration: 3.5678,
				},
			};

			const chartDataResult = chartData.prepareChartData(data);

			expect(chartDataResult).toHaveProperty("dataLabels");
		});
	});
});
