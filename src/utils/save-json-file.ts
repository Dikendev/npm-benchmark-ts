import fs from "fs";
import { promisify } from "util";
import path from "path";

const writeFileAsync = promisify(fs.writeFile);

export interface Options {
	dirPath: string;
}

export const saveJsonFile = async (
	fileName: string,
	data: object,
	options?: Options
) => {
	if (options?.dirPath === undefined) {
		return;
	}
	let filePath: string;
	try {
		filePath = path.join(options.dirPath, `${fileName}.json`);
		await writeFileAsync(filePath, JSON.stringify(data));
	} catch (err) {
		throw err;
	}
};
