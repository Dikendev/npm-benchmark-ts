	type FunctionUnderBenchmark<T, U> = (...args: T[]) => U;

	export interface BenchmarkFunctions<T, U> {
		functionDescription: string;
		functionUnderTest: FunctionUnderBenchmark<T, U>;
		detail?: string;
	}
