export interface ChartDataResult {
	[key: string]: ChartDataResultBenchmark;
}

export interface ChartDataResultBenchmark {
	name: string;
	duration: number;
}
