import fs from "fs";
import { promisify } from "util";
import { filePath, FileType } from "./file-path";

const writeFileAsync = promisify(fs.writeFile);

export interface Options {
	dirPath: string;
}

export const saveJsonFile = async (
	fileName: string,
	data: object,
	options?: Options
) => {
	if (options?.dirPath === undefined) return;

	try {
		const path = filePath({
			dirPath: options.dirPath,
			fileName,
			fileType: FileType.JSON,
		});
		await writeFileAsync(path, JSON.stringify(data));
	} catch (err) {
		throw err;
	}
};
