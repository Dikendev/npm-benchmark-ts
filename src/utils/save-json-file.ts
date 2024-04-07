import fs from "fs";
import { promisify } from "util";
import path from "path";

const writeFileAsync = promisify(fs.writeFile);

export interface Options {
	saveFile: boolean;
	dirPath?: string;
}

export const saveJsonFile = async (
	fileName: string,
	data: object,
	options: Options = { saveFile: true }
) => {
	if (options.saveFile === false) {
		return;
	}

	const defaultPath = "./TMP";
	const pathValid = options.dirPath ? options.dirPath : defaultPath;

	let filePath: string;
	try {
		filePath = path.join(pathValid, `${fileName}.json`);
		await writeFileAsync(filePath, JSON.stringify(data));
	} catch (err) {
		throw err;
	}
};
