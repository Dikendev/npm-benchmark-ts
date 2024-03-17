import fs from "fs";
import { promisify } from "util";
import path from "path";

const writeFileAsync = promisify(fs.writeFile);

export const saveJsonFile = async (fileName: string, data: object) => {
	try {
		const filePath = path.join("./TMP", `${fileName}.json`);
		await writeFileAsync(filePath, JSON.stringify(data));
		console.log("File saved successfully.");
	} catch (err) {
		console.error("Error saving file:", err);
		throw err;
	}
};
