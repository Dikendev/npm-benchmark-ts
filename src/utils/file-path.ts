import path from "path";

export const FileType = {
	JSON: "json",
	PNG: "png",
} as const;

export type FileType = (typeof FileType)[keyof typeof FileType];

export interface FileOptions {
	dirPath: string;
	fileName: string;
	fileType: FileType;
}

/**
 * @description Get the file path
 */
export const filePath = (fileOptions: FileOptions): string => {
	try {
		const { dirPath, fileName, fileType } = fileOptions;
		if (!dirPath) throw new Error("Directory path is required");
		if (!fileName) throw new Error("File name is required");
		return path.join(dirPath, `${fileName}.${fileType}`);
	} catch (error) {
		throw error;
	}
};
