import path from "path";

export const filePath = (dirPath: string, fileName: string): string => {
	try {
		if (!dirPath) throw new Error("Directory path is required");
		if (!fileName) throw new Error("File name is required");
		return path.join(dirPath, fileName);
	} catch (error) {
		throw error;
	}
};
